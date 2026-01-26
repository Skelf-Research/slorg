# Server API

REST API documentation for LORG server mode.

## Starting the Server

```bash
lorg server -p 3000
```

Or programmatically:

```javascript
import startServer from 'lorg/server';

startServer(process.env.OPENAI_API_KEY, 3000);
```

## Base URL

```
http://localhost:3000
```

## Endpoints

### GET /health

Health check endpoint.

#### Request

```http
GET /health HTTP/1.1
Host: localhost:3000
```

#### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "ok",
  "version": "1.0.1"
}
```

---

### POST /search

Perform an AI-powered search.

#### Request

```http
POST /search HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "query": "What is machine learning?",
  "model": "gpt-4o-mini",
  "maxResults": 5
}
```

#### Request Body

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `query` | string | Yes | - | Search query |
| `model` | string | No | `gpt-4o-mini` | OpenAI model |
| `maxResults` | number | No | `5` | Max results to return |

#### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "answer": "Machine learning is a subset of artificial intelligence...",
  "knowledgeGraph": {
    "entities": ["machine learning", "AI", "algorithms"],
    "relationships": [
      {
        "from": "machine learning",
        "to": "AI",
        "type": "subset_of"
      }
    ]
  },
  "keywords": ["machine learning", "AI", "algorithms", "neural networks"],
  "results": [
    {
      "answer": "Machine learning is...",
      "source": "https://example.com/ml-intro",
      "score": 0.95,
      "content": "Machine learning is a method of data analysis...",
      "title": "Introduction to Machine Learning"
    }
  ],
  "tokenCount": 1523
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `answer` | string | AI-generated answer |
| `knowledgeGraph` | object | Structured knowledge representation |
| `keywords` | string[] | Extracted search keywords |
| `results` | array | Scored search results |
| `results[].answer` | string | Answer context |
| `results[].source` | string | Source URL |
| `results[].score` | number | Relevance score (0-1) |
| `results[].content` | string | Extracted content |
| `results[].title` | string | Page title |
| `tokenCount` | number | Total tokens used |

---

## Error Responses

### 400 Bad Request

Missing required parameter.

```json
{
  "error": "Query is required"
}
```

### 500 Internal Server Error

Server or API error.

```json
{
  "error": "OpenAI API error: Rate limit exceeded"
}
```

## Usage Examples

### cURL

```bash
# Health check
curl http://localhost:3000/health

# Basic search
curl -X POST http://localhost:3000/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What is quantum computing?"}'

# Search with options
curl -X POST http://localhost:3000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Explain blockchain",
    "model": "gpt-4o",
    "maxResults": 10
  }'
```

### JavaScript

```javascript
// Using fetch
async function search(query) {
  const response = await fetch('http://localhost:3000/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, maxResults: 5 })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

const results = await search('What is AI?');
console.log(results.answer);
```

### Python

```python
import requests

def search(query, model="gpt-4o-mini", max_results=5):
    response = requests.post(
        'http://localhost:3000/search',
        json={
            'query': query,
            'model': model,
            'maxResults': max_results
        }
    )
    response.raise_for_status()
    return response.json()

results = search('What is machine learning?')
print(results['answer'])
```

### HTTPie

```bash
# Health check
http GET localhost:3000/health

# Search
http POST localhost:3000/search \
  query="What is AI?" \
  maxResults:=5
```

## Server Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | - | OpenAI API key (required) |
| `OPENAI_BASE_URL` | OpenAI default | Custom API endpoint |
| `LORG_DEFAULT_MODEL` | `gpt-4o-mini` | Default model |
| `PORT` | `3000` | Server port |

### CLI Options

```bash
lorg server [options]
```

| Option | Default | Description |
|--------|---------|-------------|
| `-p, --port` | `3000` | Server port |
| `-k, --api-key` | `$OPENAI_API_KEY` | OpenAI API key |

## CORS

CORS is enabled for all origins by default.

## Graceful Shutdown

The server handles SIGINT gracefully:

```
^C
Shutting down server...
Server closed.
```

## Next Steps

- [LorgSearch Class](lorg-search.md) - Library API
- [Configuration](configuration.md) - All options
