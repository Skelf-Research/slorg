# LORG

### The Search Engine That Thinks Before It Searches

[![npm version](https://img.shields.io/npm/v/lorg.svg)](https://www.npmjs.com/package/lorg)
[![npm downloads](https://img.shields.io/npm/dm/lorg.svg)](https://www.npmjs.com/package/lorg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/lorg.svg)](https://nodejs.org)
[![Documentation](https://img.shields.io/badge/docs-online-blue.svg)](https://docs.skelfresearch.com/slorg)
[![GitHub stars](https://img.shields.io/github/stars/skelf-research/slorg.svg?style=social)](https://github.com/skelf-research/slorg)

---

**LORG** is an AI-powered search engine that combines Large Language Models with knowledge graph generation to deliver precise, context-aware answers. Unlike traditional search, LORG *understands* your query, builds a knowledge graph, and intelligently scores web results for relevance.

> Stop searching. Start finding.

## Why LORG?

- **AI-First Search** - Generates answers using GPT models before searching the web
- **Knowledge Graphs** - Automatically extracts entities and relationships from queries
- **Smart Ranking** - Uses AI to score results by actual relevance, not just keywords
- **Multi-Engine** - Aggregates results from Google, Bing, Yahoo & DuckDuckGo
- **Flexible** - Use as CLI, REST API, Node.js library, or full web app

## Quick Start

```bash
# Install globally
npm install -g lorg

# Set your OpenAI API key
export OPENAI_API_KEY=sk-your-key-here

# Search!
lorg "What causes the northern lights?"
```

**Output:**
```
Searching for: "What causes the northern lights?"

=== LLM Answer ===
The northern lights (aurora borealis) are caused by charged particles
from the sun colliding with gases in Earth's atmosphere...

=== Knowledge Graph ===
{ entities: ["aurora", "solar wind", "magnetosphere", ...] }

=== Search Results ===
1. Aurora Borealis Explained (Score: 0.94)
   Source: https://science.nasa.gov/aurora

Total tokens used: 1,247
```

## Installation

```bash
# Global (for CLI)
npm install -g lorg

# Local (for library use)
npm install lorg
```

**Requirements:** Node.js 18+ and an [OpenAI API key](https://platform.openai.com/api-keys)

## Usage

### Command Line

```bash
# Basic search
lorg "How do black holes form?"

# Use GPT-4 for higher quality
lorg -m gpt-4o "Explain quantum entanglement"

# Limit to 3 results
lorg -r 3 "Best practices for React hooks"
```

### REST API Server

```bash
# Start the server
lorg server -p 3000

# Query via curl
curl -X POST http://localhost:3000/search \
  -H "Content-Type: application/json" \
  -d '{"query": "How does CRISPR work?"}'
```

### Node.js Library

```javascript
import LorgSearch from 'lorg';

const lorg = new LorgSearch(process.env.OPENAI_API_KEY);

const results = await lorg.search('What is quantum computing?', {
  model: 'gpt-4o-mini',
  maxResults: 5
});

console.log(results.answer);        // AI-generated answer
console.log(results.knowledgeGraph); // Extracted entities & relationships
console.log(results.keywords);       // Search keywords
console.log(results.results);        // Ranked web results
console.log(results.tokenCount);     // Tokens consumed
```

## How It Works

```
Query → LLM Answer → Knowledge Graph → Keywords → Web Search → AI Ranking → Results
```

1. **Answer Generation** - GPT generates an initial answer and knowledge graph
2. **Keyword Extraction** - AI extracts optimal search terms from the graph
3. **Multi-Engine Search** - Queries Google, Bing, Yahoo & DuckDuckGo via SearxNG
4. **Content Analysis** - Fetches pages and extracts relevant content
5. **Relevance Scoring** - AI scores each result (0-1) for query relevance
6. **Result Ranking** - Returns top results sorted by relevance score

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `OPENAI_API_KEY` | - | Your OpenAI API key (required) |
| `OPENAI_BASE_URL` | OpenAI | Custom OpenAI-compatible endpoint |
| `LORG_DEFAULT_MODEL` | `gpt-4o-mini` | Default model for all operations |
| `LORG_SEARCH_ENGINES` | `google,bing,yahoo,duckduckgo` | Search engines to use |
| `LORG_SEARCH_LIMIT` | `20` | Max results from search API |

## API Reference

### `new LorgSearch(apiKey?)`

Create a new LORG instance. Falls back to `OPENAI_API_KEY` env var.

### `search(query, options?)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `model` | string | `gpt-4o-mini` | OpenAI model to use |
| `maxResults` | number | `5` | Maximum results to return |

**Returns:**

```typescript
{
  answer: string;           // AI-generated answer
  knowledgeGraph: object;   // Entities and relationships
  keywords: string[];       // Extracted search keywords
  results: Array<{
    title: string;
    source: string;
    score: number;          // 0-1 relevance score
    content: string;
  }>;
  tokenCount: number;       // Total tokens used
}
```

## Documentation

Full documentation available at **[docs.skelfresearch.com/slorg](https://docs.skelfresearch.com/slorg)**

- [Getting Started](https://docs.skelfresearch.com/slorg/getting-started/installation/)
- [CLI Reference](https://docs.skelfresearch.com/slorg/user-guide/cli-usage/)
- [API Documentation](https://docs.skelfresearch.com/slorg/api-reference/lorg-search/)
- [Architecture](https://docs.skelfresearch.com/slorg/architecture/overview/)

## Use Cases

- **Research Assistants** - Get accurate answers with sources
- **Content Discovery** - Find relevant articles ranked by AI
- **RAG Pipelines** - High-quality retrieval for LLM applications
- **Knowledge Base Search** - Semantic search over web content
- **Fact Checking** - Verify claims with scored sources

## Contributing

Contributions are welcome! Please see our [GitHub repository](https://github.com/skelf-research/slorg).

```bash
git clone https://github.com/skelf-research/slorg.git
cd slorg
npm install
npm run dev
```

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  <b>Built with AI, for AI-powered applications</b><br>
  <a href="https://github.com/skelf-research/slorg">GitHub</a> ·
  <a href="https://docs.skelfresearch.com/slorg">Documentation</a> ·
  <a href="https://www.npmjs.com/package/lorg">npm</a>
</p>
