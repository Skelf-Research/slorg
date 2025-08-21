# Lorg

An AI-powered search engine with knowledge graph generation.

## Installation

```bash
npm install -g lorg
```

## Usage

### As a CLI tool

```bash
# Set your OpenAI API key
export OPENAI_API_KEY=your_api_key_here

# Run a search
lorg "What is the capital of France?"

# Or provide the API key directly
lorg -k your_api_key_here "What is the capital of France?"

# Specify a model
lorg -m gpt-4o "What is the capital of France?"

# Limit results
lorg -r 3 "What is the capital of France?"
```

### As a server

```bash
# Start the server
lorg server

# Start the server on a specific port
lorg server -p 8080

# Start the server with API key
lorg server -k your_api_key_here

# Or set the API key as an environment variable
export OPENAI_API_KEY=your_api_key_here
lorg server
```

The server exposes two endpoints:
- `GET /health` - Health check endpoint
- `POST /search` - Search endpoint that accepts JSON with `query`, `model`, and `maxResults` fields

Example server usage:
```bash
curl -X POST http://localhost:3000/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the capital of France?", "model": "gpt-4o", "maxResults": 3}'
```

### As a library

```javascript
import LorgSearch from 'lorg';

const searcher = new LorgSearch('your-openai-api-key');

const results = await searcher.search('What is the capital of France?', {
  model: 'gpt-4o-mini',
  maxResults: 5
});

console.log(results.answer);
console.log(results.knowledgeGraph);
console.log(results.keywords);
console.log(results.results);
```

## Environment Variables

The following environment variables can be used to configure Lorg:

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `OPENAI_BASE_URL` - Custom OpenAI API base URL (optional)
- `LORG_DEFAULT_MODEL` - Default model to use (default: "gpt-4o-mini")
- `LORG_SEARCH_API_URL` - Search API URL (default: "https://search-dev.d736.uk/search")
- `LORG_SEARCH_ENGINES` - Comma-separated list of search engines (default: "google,yahoo,bing,duckduckgo")
- `LORG_SEARCH_LIMIT` - Maximum number of search results (default: "20")
- `PORT` - Port for the server (default: 3000)

## Features

- AI-powered search with natural language understanding
- Knowledge graph generation for search queries
- Keyword extraction for improved search results
- Web content scraping and analysis
- Token usage tracking
- Configurable OpenAI models
- Both CLI and server modes
- Environment variable configuration

## API

### `new LorgSearch(apiKey)`

Create a new LorgSearch instance with your OpenAI API key.

### `search(query, options)`

Perform a search with the given query.

Options:
- `model`: The OpenAI model to use (default: 'gpt-4o-mini')
- `maxResults`: Maximum number of results to return (default: 5)

Returns a Promise that resolves to an object with:
- `answer`: The LLM-generated answer
- `knowledgeGraph`: Structured representation of the query
- `keywords`: Extracted search keywords
- `results`: Array of search results with scores
- `tokenCount`: Total tokens used in the search

## License

MIT