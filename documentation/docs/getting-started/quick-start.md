# Quick Start

Get up and running with LORG in 5 minutes.

## Prerequisites

Make sure you have:

- LORG installed (`npm install -g lorg`)
- OpenAI API key set (`export OPENAI_API_KEY=your-key`)

## Your First Search

### Using the CLI

Run a simple search:

```bash
lorg "What is machine learning?"
```

You'll see output like:

```
Searching for: "What is machine learning?"

=== LLM Answer ===
Machine learning is a subset of artificial intelligence that enables
computers to learn and improve from experience without being explicitly
programmed...

=== Knowledge Graph ===
{
  "entities": ["machine learning", "artificial intelligence", "algorithms"],
  "relationships": [...]
}

=== Keywords ===
machine learning, AI, algorithms, neural networks, data science

=== Search Results ===
1. Introduction to Machine Learning
   Score: 0.92
   Source: https://example.com/ml-intro
   Content: Machine learning is a method of data analysis...

Total tokens used: 1523
```

### Using as a Library

```javascript
import LorgSearch from 'lorg';

async function search() {
  const searcher = new LorgSearch(process.env.OPENAI_API_KEY);

  const results = await searcher.search('What is machine learning?', {
    model: 'gpt-4o-mini',
    maxResults: 5
  });

  console.log('Answer:', results.answer);
  console.log('Keywords:', results.keywords);
  console.log('Top result:', results.results[0]);
  console.log('Tokens used:', results.tokenCount);
}

search();
```

### Starting the Server

Start LORG as an API server:

```bash
lorg server -p 3000
```

Make a search request:

```bash
curl -X POST http://localhost:3000/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What is machine learning?"}'
```

## Understanding Results

LORG returns structured results containing:

| Field | Description |
|-------|-------------|
| `answer` | AI-generated answer to your query |
| `knowledgeGraph` | Structured representation of entities and relationships |
| `keywords` | Extracted search keywords |
| `results` | Array of scored search results with extracted content |
| `tokenCount` | Total OpenAI tokens used |

## Next Steps

- [Configuration](configuration.md) - Customize LORG settings
- [CLI Usage](../user-guide/cli-usage.md) - Learn all CLI commands
- [Library Usage](../user-guide/library-usage.md) - Integrate into your code
