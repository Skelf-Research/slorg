import OpenAI from 'openai';
import { JSDOM } from 'jsdom';
import { encoding_for_model } from 'tiktoken';

class LorgSearch {
  constructor(apiKey) {
    this.openai = new OpenAI({ 
      apiKey: apiKey || process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL || undefined
    });
    
    // Environment variables with defaults
    this.defaultModel = process.env.LORG_DEFAULT_MODEL || "gpt-4o-mini";
    this.searchApiUrl = process.env.LORG_SEARCH_API_URL || "https://search-dev.d736.uk/search";
    this.searchEngines = process.env.LORG_SEARCH_ENGINES || "google,yahoo,bing,duckduckgo";
    this.searchLimit = process.env.LORG_SEARCH_LIMIT || "20";
  }

  countTokens(text, model = this.defaultModel) {
    try {
      const encoder = encoding_for_model(model);
      const tokens = encoder.encode(text);
      encoder.free();
      return tokens.length;
    } catch (error) {
      // If token counting fails, return 0
      return 0;
    }
  }

  async callOpenAI(system, user, model = this.defaultModel) {
    const inputTokens = this.countTokens(system) + this.countTokens(user);
    
    try {
      const completion = await this.openai.chat.completions.create({
        model: model,
        messages: [
          { role: "system", content: `${system} Provide your response as a valid JSON object.` },
          { role: "user", content: user }
        ],
        response_format: { "type": "json_object" }
      });
      
      const totalTokens = inputTokens + completion.usage.total_tokens;
      return { content: completion.choices[0].message.content, tokens: totalTokens };
    } catch (error) {
      throw new Error(`OpenAI API error: ${error.message}`);
    }
  }

  async generateAnswerAndGraph(query) {
    const { content, tokens } = await this.callOpenAI(
      "Generate an answer and a knowledge graph for the given query. The answer should be a concise and accurate response to the query. The knowledge graph should be a structured representation of the query, including entities, relationships, and other relevant information.",
      query
    );
    
    try {
      const parsedResult = JSON.parse(content);
      return { result: parsedResult, tokens };
    } catch (error) {
      throw new Error(`Failed to parse OpenAI response: ${error.message}`);
    }
  }

  async extractKeywords(graph) {
    const { content, tokens } = await this.callOpenAI(
      "Extract a list of potential search keywords from the given knowledge graph. The keywords should be a concise and accurate representation of the query, including entities, relationships, and other relevant information.",
      JSON.stringify(graph)
    );
    
    try {
      const parsedResult = JSON.parse(content);
      return { result: parsedResult, tokens };
    } catch (error) {
      throw new Error(`Failed to parse OpenAI response: ${error.message}`);
    }
  }

  async searchSearxNG(keywords) {
    try {
      const response = await fetch(this.searchApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          q: keywords,
          format: 'json',
          engines: this.searchEngines,
          limit: this.searchLimit,
        }),
      });
      
      const data = await response.json();
      return data.results;
    } catch (error) {
      throw new Error(`SearxNG search error: ${error.message}`);
    }
  }

  async fetchHtml(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const dom = new JSDOM(html);
      const content = dom.window.document.body.textContent || "";
      return content.trim();
    } catch (error) {
      throw new Error(`Failed to fetch HTML: ${error.message}`);
    }
  }

  async processHtmlContent(html, query, originalAnswer) {
    // Get additional context information
    const currentDate = new Date().toISOString();
    
    const { content, tokens } = await this.callOpenAI(
      "Analyze HTML content and determine its relevance (as a score between 0 and 1) to the given query. Extract the main textual content from the HTML, ignoring boilerplate elements like headers, footers, and navigation. Then, determine how well this query is answered by the extracted content and strict about the rating. Consider the provided context information when analyzing relevance. Return the matchScore and the extractedContent.",
      `Query: ${query}

Context Information:
- Current Date: ${currentDate}

HTML content: ${html}`
    );
    
    try {
      const parsedResult = JSON.parse(content);
      return { result: parsedResult, tokens };
    } catch (error) {
      throw new Error(`Failed to parse OpenAI response: ${error.message}`);
    }
  }

  async search(query, options = {}) {
    const model = options.model || this.defaultModel;
    const maxResults = options.maxResults || 5;
    
    let tokenCount = 0;
    let results = [];
    
    try {
      // Step 1: Generate answer and knowledge graph
      const { result: { answer, knowledge_graph }, tokens: tokens1 } = await this.generateAnswerAndGraph(query);
      tokenCount += tokens1;
      
      // Step 2: Extract keywords
      const { result: keywords, tokens: tokens2 } = await this.extractKeywords(knowledge_graph);
      tokenCount += tokens2;
      
      // Step 3: Search using SearxNG
      const searchResults = await this.searchSearxNG(
        Array.isArray(keywords) ? keywords.join(' ') : query
      );
      
      // Step 4: Fetch HTML and process content
      let bestMatches = [];
      
      for (const result of searchResults.slice(0, maxResults)) {
        try {
          const html = await this.fetchHtml(result.url);
          const { result: { extractedContent, matchScore }, tokens: tokens3 } = await this.processHtmlContent(html, query, answer);
          tokenCount += tokens3;
          
          bestMatches.push({
            answer,
            source: result.url,
            score: matchScore,
            content: extractedContent,
            title: result.title
          });
          
          // Sort by score and keep only top results
          bestMatches.sort((a, b) => b.score - a.score);
          if (bestMatches.length > maxResults) {
            bestMatches = bestMatches.slice(0, maxResults);
          }
        } catch (error) {
          // Continue with other results if one fails
          console.warn(`Failed to process ${result.url}: ${error.message}`);
        }
      }
      
      return {
        answer,
        knowledgeGraph: knowledge_graph,
        keywords: Array.isArray(keywords) ? keywords : [],
        results: bestMatches,
        tokenCount
      };
    } catch (error) {
      throw new Error(`Search failed: ${error.message}`);
    }
  }
}

export default LorgSearch;