# Server Mode

Run LORG as a REST API server to integrate with other applications.

## Starting the Server

```bash
lorg server
```

With options:

```bash
lorg server -p 8080 -k sk-your-api-key
```

## Server Output

```
Lorg server running on port 3000
Health check: http://localhost:3000/health
Search endpoint: http://localhost:3000/search
```

## API Endpoints

### Health Check

Check if the server is running:

```http
GET /health
```

**Response:**

```json
{
  "status": "ok",
  "version": "1.0.1"
}
```

### Search

Perform an AI-powered search:

```http
POST /search
Content-Type: application/json

{
  "query": "What is machine learning?",
  "model": "gpt-4o-mini",
  "maxResults": 5
}
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `query` | string | Yes | - | Search query |
| `model` | string | No | `gpt-4o-mini` | OpenAI model |
| `maxResults` | number | No | `5` | Max results |

**Response:**

```json
{
  "answer": "Machine learning is a subset of AI...",
  "knowledgeGraph": {
    "entities": ["machine learning", "AI", "algorithms"],
    "relationships": [...]
  },
  "keywords": ["machine learning", "AI", "algorithms"],
  "results": [
    {
      "answer": "...",
      "source": "https://example.com",
      "score": 0.95,
      "content": "...",
      "title": "Introduction to ML"
    }
  ],
  "tokenCount": 1523
}
```

## Usage Examples

### cURL

```bash
# Health check
curl http://localhost:3000/health

# Search
curl -X POST http://localhost:3000/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What is quantum computing?"}'
```

### JavaScript (fetch)

```javascript
const response = await fetch('http://localhost:3000/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'What is quantum computing?',
    maxResults: 5
  })
});

const results = await response.json();
console.log(results.answer);
```

### Python (requests)

```python
import requests

response = requests.post(
    'http://localhost:3000/search',
    json={
        'query': 'What is quantum computing?',
        'maxResults': 5
    }
)

results = response.json()
print(results['answer'])
```

## Error Responses

### Missing Query

```json
{
  "error": "Query is required"
}
```

**Status Code:** 400

### Server Error

```json
{
  "error": "Error message details"
}
```

**Status Code:** 500

## Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npx", "lorg", "server"]
```

Build and run:

```bash
docker build -t lorg-server .
docker run -e OPENAI_API_KEY=sk-your-key -p 3000:3000 lorg-server
```

### Process Manager (PM2)

```bash
npm install -g pm2
pm2 start "lorg server" --name lorg-api
pm2 save
```

### Systemd Service

Create `/etc/systemd/system/lorg.service`:

```ini
[Unit]
Description=LORG Search API
After=network.target

[Service]
Type=simple
User=lorg
Environment=OPENAI_API_KEY=sk-your-key
ExecStart=/usr/bin/npx lorg server -p 3000
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable lorg
sudo systemctl start lorg
```

## CORS

The server has CORS enabled by default, allowing requests from any origin.

## Graceful Shutdown

The server handles `SIGINT` (Ctrl+C) gracefully:

```
^C
Shutting down server...
Server closed.
```

## Next Steps

- [Library Usage](library-usage.md) - Use programmatically
- [API Reference](../api-reference/server.md) - Complete API docs
