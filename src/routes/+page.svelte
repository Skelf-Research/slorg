<script>
    import { onMount } from 'svelte';
    import { searchQuery, searchResults, isLoading, searchHistory, tokenCount } from '$lib/store';
    import { generateAnswerAndGraph, extractKeywords, searchSearxNG, fetchHtml, processHtmlContent } from '$lib/api';
  
    let query = '';
    let localSearchResults = [];
    let llmAnswer = '';
    let knowledgeGraph = '';
    let extractedKeywords = []; // Define extractedKeywords here
  
    async function handleSubmit() {
      $isLoading = true;
      $searchQuery = query;
      $searchHistory = [...$searchHistory, query];
      llmAnswer = '';
      knowledgeGraph = '';
      extractedKeywords = []; // Reset extractedKeywords
  
      try {
        // Reset token count
        $tokenCount = 0;
  
        // Step 1: Generate answer and knowledge graph
        const { result: { answer, knowledge_graph }, tokens: tokens1 } = await generateAnswerAndGraph(query);
        $tokenCount += tokens1;
        llmAnswer = answer;
        knowledgeGraph = knowledge_graph;
  
        // Step 2: Extract keywords
        const { result: keywords, tokens: tokens2 } = await extractKeywords(knowledge_graph);
        $tokenCount += tokens2;
        extractedKeywords = Array.isArray(keywords) ? keywords : []; // Trigger reactivity by creating a new array
  
        // Step 3: Search using SearxNG
        const searchResults = await searchSearxNG(query);
  
        // Step 4: Fetch HTML and process content
        let bestMatch = null;
        let bestMatchScore = 0;
  
        for (const result of searchResults) {
          const html = await fetchHtml(result.url);
          const { result: { extractedContent, matchScore }, tokens: tokens3 } = await processHtmlContent(html, query, answer);
          $tokenCount += tokens3;
  
          if (matchScore > bestMatchScore) {
            bestMatchScore = matchScore;
            bestMatch = { answer, source: result.url, score: matchScore, content: extractedContent };
          }
  
          if (bestMatchScore > 0.8) break;
        }
  
        localSearchResults = bestMatch ? [bestMatch] : [{ answer, source: "No good match found", score: 0, content: "No relevant content extracted" }];

      } catch (error) {
        console.error('Search error:', error);
        localSearchResults = [{ content: 'An error occurred during the search.' }];
      }
  
      $searchResults = localSearchResults;
      $isLoading = false;
    }
  
    onMount(() => {
      query = $searchQuery;
    });
  </script>
  
  <div class="space-y-4">
    <h1 class="text-3xl font-bold">Answer AI </h1>
    
    <form on:submit|preventDefault={handleSubmit} class="mb-4">
      <div class="form-control">
        <div class="input-group">
          <input type="text" bind:value={query} placeholder="Enter your search query" class="input input-bordered w-full" />
          <button type="submit" class="btn btn-primary" disabled={$isLoading}>
            {#if $isLoading}
              <span class="loading loading-spinner"></span>
            {:else}
              Search
            {/if}
          </button>
        </div>
      </div>
    </form>
  
    {#if $tokenCount > 0}
      <div class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Total tokens used: {$tokenCount}</span>
      </div>
    {/if}
  
    {#if llmAnswer}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">LLM Answer</h2>
          <p>{llmAnswer}</p>
        </div>
      </div>
    {/if}
  
    {#if knowledgeGraph}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Knowledge Graph</h2>
          <pre>{knowledgeGraph}</pre>
        </div>
      </div>
    {/if}
  
    {#if extractedKeywords.length > 0}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Extracted Keywords</h2>
          <ul>
            {#each extractedKeywords as keyword}
              <li>{keyword}</li>
            {/each}
          </ul>
        </div>
      </div>
    {/if}
  
    {#if $searchResults.length > 0}
      <div class="space-y-4">
        {#each $searchResults as result}
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Search Result</h2>
              <p><strong>Answer:</strong> {result.answer}</p>
              <p><strong>Source:</strong> <a href={result.source} target="_blank" rel="noopener noreferrer">{result.source}</a></p>
              <p><strong>Match Score:</strong> {result.score.toFixed(2)}</p>
              <p><strong>Extracted Content:</strong> {result.content}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
