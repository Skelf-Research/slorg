# Library Usage

Use LORG as a library in your Node.js applications.

## Installation

```bash
npm install lorg
```

## Basic Usage

```javascript
import LorgSearch from 'lorg';

// Initialize with API key
const searcher = new LorgSearch(process.env.OPENAI_API_KEY);

// Perform a search
const results = await searcher.search('What is machine learning?');

console.log(results.answer);
console.log(results.keywords);
console.log(results.results);
```

## API

### Constructor

```javascript
const searcher = new LorgSearch(apiKey);
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | string | No | OpenAI API key (falls back to `OPENAI_API_KEY` env var) |

### search(query, options)

Perform a complete AI-powered search.

```javascript
const results = await searcher.search(query, options);
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `query` | string | - | Search query |
| `options.model` | string | `gpt-4o-mini` | OpenAI model |
| `options.maxResults` | number | `5` | Max results to process |

**Returns:**

```javascript
{
  answer: string,           // AI-generated answer
  knowledgeGraph: object,   // Structured knowledge graph
  keywords: string[],       // Extracted keywords
  results: Array<{          // Search results
    answer: string,
    source: string,
    score: number,
    content: string,
    title: string
  }>,
  tokenCount: number        // Total tokens used
}
```

## Individual Methods

### generateAnswerAndGraph(query)

Generate an answer and knowledge graph for a query.

```javascript
const { result, tokens } = await searcher.generateAnswerAndGraph(query);
console.log(result.answer);
console.log(result.knowledge_graph);
```

### extractKeywords(graph)

Extract search keywords from a knowledge graph.

```javascript
const { result: keywords, tokens } = await searcher.extractKeywords(graph);
console.log(keywords); // ['keyword1', 'keyword2', ...]
```

### searchSearxNG(keywords)

Search the web using SearxNG.

```javascript
const results = await searcher.searchSearxNG('machine learning tutorial');
console.log(results); // Array of search results
```

### fetchHtml(url)

Fetch and extract text content from a URL.

```javascript
const content = await searcher.fetchHtml('https://example.com');
console.log(content);
```

### processHtmlContent(html, query, originalAnswer)

Analyze HTML content for relevance to a query.

```javascript
const { result, tokens } = await searcher.processHtmlContent(
  htmlContent,
  'What is ML?',
  'Machine learning is...'
);

console.log(result.matchScore);      // 0.0 - 1.0
console.log(result.extractedContent); // Relevant content
```

## Examples

### Basic Search

```javascript
import LorgSearch from 'lorg';

async function basicSearch() {
  const searcher = new LorgSearch();

  const results = await searcher.search('How does photosynthesis work?');

  console.log('Answer:', results.answer);
  console.log('Tokens used:', results.tokenCount);
}

basicSearch();
```

### Custom Model and Results

```javascript
import LorgSearch from 'lorg';

async function customSearch() {
  const searcher = new LorgSearch();

  const results = await searcher.search('Explain quantum computing', {
    model: 'gpt-4o',
    maxResults: 10
  });

  results.results.forEach((result, i) => {
    console.log(`${i + 1}. ${result.title} (${result.score.toFixed(2)})`);
  });
}

customSearch();
```

### Step-by-Step Search

```javascript
import LorgSearch from 'lorg';

async function stepByStep() {
  const searcher = new LorgSearch();
  const query = 'What is blockchain?';

  // Step 1: Generate answer and knowledge graph
  console.log('Generating answer...');
  const { result: { answer, knowledge_graph } } =
    await searcher.generateAnswerAndGraph(query);
  console.log('Answer:', answer);

  // Step 2: Extract keywords
  console.log('Extracting keywords...');
  const { result: keywords } = await searcher.extractKeywords(knowledge_graph);
  console.log('Keywords:', keywords);

  // Step 3: Search the web
  console.log('Searching web...');
  const searchResults = await searcher.searchSearxNG(keywords.join(' '));
  console.log('Found', searchResults.length, 'results');

  // Step 4: Process top result
  if (searchResults.length > 0) {
    const html = await searcher.fetchHtml(searchResults[0].url);
    const { result } = await searcher.processHtmlContent(html, query, answer);
    console.log('Relevance score:', result.matchScore);
  }
}

stepByStep();
```

### Error Handling

```javascript
import LorgSearch from 'lorg';

async function safeSearch() {
  const searcher = new LorgSearch();

  try {
    const results = await searcher.search('My query');
    console.log(results.answer);
  } catch (error) {
    if (error.message.includes('API key')) {
      console.error('Please set your OpenAI API key');
    } else if (error.message.includes('rate limit')) {
      console.error('Rate limited, please wait');
    } else {
      console.error('Search failed:', error.message);
    }
  }
}

safeSearch();
```

## TypeScript

LORG works with TypeScript:

```typescript
import LorgSearch from 'lorg';

interface SearchResult {
  answer: string;
  source: string;
  score: number;
  content: string;
  title: string;
}

interface LorgResults {
  answer: string;
  knowledgeGraph: object;
  keywords: string[];
  results: SearchResult[];
  tokenCount: number;
}

async function typedSearch(): Promise<void> {
  const searcher = new LorgSearch(process.env.OPENAI_API_KEY);
  const results: LorgResults = await searcher.search('What is TypeScript?');
  console.log(results.answer);
}
```

## Next Steps

- [API Reference](../api-reference/lorg-search.md) - Complete API documentation
- [Architecture](../architecture/overview.md) - How LORG works
