# LorgSearch Class

The main class for performing AI-powered searches.

## Import

```javascript
import LorgSearch from 'lorg';
```

## Constructor

```javascript
new LorgSearch(apiKey?)
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `apiKey` | string | No | `process.env.OPENAI_API_KEY` | OpenAI API key |

### Example

```javascript
// Using environment variable
const searcher = new LorgSearch();

// Using explicit API key
const searcher = new LorgSearch('sk-your-key-here');
```

## Properties

### Instance Properties

| Property | Type | Description |
|----------|------|-------------|
| `openai` | OpenAI | OpenAI client instance |
| `defaultModel` | string | Default model from `LORG_DEFAULT_MODEL` or `gpt-4o-mini` |
| `searchApiUrl` | string | SearxNG API URL |
| `searchEngines` | string | Comma-separated search engines |
| `searchLimit` | string | Maximum search results |

## Methods

### search(query, options?)

Perform a complete AI-powered search.

```javascript
const results = await searcher.search(query, options);
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | The search query |
| `options` | object | No | Search options |
| `options.model` | string | No | OpenAI model to use |
| `options.maxResults` | number | No | Maximum results (default: 5) |

#### Returns

```typescript
Promise<{
  answer: string;
  knowledgeGraph: object;
  keywords: string[];
  results: Array<{
    answer: string;
    source: string;
    score: number;
    content: string;
    title: string;
  }>;
  tokenCount: number;
}>
```

#### Example

```javascript
const results = await searcher.search('What is quantum computing?', {
  model: 'gpt-4o',
  maxResults: 10
});

console.log(results.answer);
console.log(results.tokenCount);
```

---

### generateAnswerAndGraph(query)

Generate an AI answer and knowledge graph for a query.

```javascript
const { result, tokens } = await searcher.generateAnswerAndGraph(query);
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | The query to process |

#### Returns

```typescript
Promise<{
  result: {
    answer: string;
    knowledge_graph: object;
  };
  tokens: number;
}>
```

#### Example

```javascript
const { result, tokens } = await searcher.generateAnswerAndGraph(
  'Explain machine learning'
);

console.log('Answer:', result.answer);
console.log('Graph:', result.knowledge_graph);
console.log('Tokens:', tokens);
```

---

### extractKeywords(graph)

Extract search keywords from a knowledge graph.

```javascript
const { result, tokens } = await searcher.extractKeywords(graph);
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `graph` | object | Yes | Knowledge graph object |

#### Returns

```typescript
Promise<{
  result: string[];
  tokens: number;
}>
```

#### Example

```javascript
const { result: keywords } = await searcher.extractKeywords(knowledgeGraph);
console.log('Keywords:', keywords.join(', '));
```

---

### searchSearxNG(keywords)

Search the web using SearxNG.

```javascript
const results = await searcher.searchSearxNG(keywords);
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `keywords` | string | Yes | Search keywords |

#### Returns

```typescript
Promise<Array<{
  url: string;
  title: string;
  content: string;
  engine: string;
}>>
```

#### Example

```javascript
const results = await searcher.searchSearxNG('machine learning tutorial');

results.forEach(result => {
  console.log(`${result.title}: ${result.url}`);
});
```

---

### fetchHtml(url)

Fetch and extract text content from a URL.

```javascript
const content = await searcher.fetchHtml(url);
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | URL to fetch |

#### Returns

```typescript
Promise<string>
```

#### Example

```javascript
const content = await searcher.fetchHtml('https://example.com/article');
console.log('Content length:', content.length);
```

---

### processHtmlContent(html, query, originalAnswer)

Analyze HTML content for relevance to a query.

```javascript
const { result, tokens } = await searcher.processHtmlContent(html, query, answer);
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `html` | string | Yes | HTML content to analyze |
| `query` | string | Yes | Original search query |
| `originalAnswer` | string | Yes | AI-generated answer |

#### Returns

```typescript
Promise<{
  result: {
    matchScore: number;      // 0.0 to 1.0
    extractedContent: string;
  };
  tokens: number;
}>
```

#### Example

```javascript
const html = await searcher.fetchHtml(url);
const { result } = await searcher.processHtmlContent(
  html,
  'What is AI?',
  'Artificial Intelligence is...'
);

if (result.matchScore > 0.8) {
  console.log('Highly relevant:', result.extractedContent);
}
```

---

### countTokens(text, model?)

Count tokens in a text string.

```javascript
const count = searcher.countTokens(text, model);
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `text` | string | Yes | - | Text to count |
| `model` | string | No | `defaultModel` | Model for tokenizer |

#### Returns

```typescript
number
```

#### Example

```javascript
const tokens = searcher.countTokens('Hello, world!');
console.log('Token count:', tokens);
```

---

### callOpenAI(system, user, model?)

Make a direct call to OpenAI.

```javascript
const { content, tokens } = await searcher.callOpenAI(system, user, model);
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `system` | string | Yes | System prompt |
| `user` | string | Yes | User message |
| `model` | string | No | Model to use |

#### Returns

```typescript
Promise<{
  content: string;  // JSON string response
  tokens: number;
}>
```

## Error Handling

All methods can throw errors. Common error types:

```javascript
try {
  const results = await searcher.search(query);
} catch (error) {
  if (error.message.includes('API key')) {
    // Handle missing API key
  } else if (error.message.includes('rate limit')) {
    // Handle rate limiting
  } else if (error.message.includes('SearxNG')) {
    // Handle search API errors
  } else {
    // Handle other errors
  }
}
```

## Next Steps

- [Server API](server.md) - REST API documentation
- [Configuration](configuration.md) - All configuration options
