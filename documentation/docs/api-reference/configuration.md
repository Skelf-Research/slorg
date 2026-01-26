# Configuration Options

Complete reference for all LORG configuration options.

## Environment Variables

### Required

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key |

### OpenAI Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | - | OpenAI API key (required) |
| `OPENAI_BASE_URL` | `https://api.openai.com/v1` | Custom OpenAI-compatible endpoint |

### LORG Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `LORG_DEFAULT_MODEL` | `gpt-4o-mini` | Default model for all operations |
| `LORG_SEARCH_API_URL` | `https://search-dev.d736.uk/search` | SearxNG API URL |
| `LORG_SEARCH_ENGINES` | `google,yahoo,bing,duckduckgo` | Search engines to use |
| `LORG_SEARCH_LIMIT` | `20` | Maximum results from search API |

### Server Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port (server mode only) |

## CLI Options

### Global Options

| Option | Short | Description |
|--------|-------|-------------|
| `--version` | `-V` | Display version |
| `--help` | `-h` | Display help |

### Search Command Options

```bash
lorg [query] [options]
```

| Option | Short | Default | Description |
|--------|-------|---------|-------------|
| `--api-key` | `-k` | `$OPENAI_API_KEY` | OpenAI API key |
| `--model` | `-m` | `gpt-4o-mini` | Model to use |
| `--results` | `-r` | `5` | Max results |

### Server Command Options

```bash
lorg server [options]
```

| Option | Short | Default | Description |
|--------|-------|---------|-------------|
| `--port` | `-p` | `3000` | Server port |
| `--api-key` | `-k` | `$OPENAI_API_KEY` | OpenAI API key |

## Library Options

### Constructor

```javascript
new LorgSearch(apiKey?)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `apiKey` | string | `$OPENAI_API_KEY` | OpenAI API key |

### search() Options

```javascript
searcher.search(query, options?)
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `model` | string | `gpt-4o-mini` | OpenAI model |
| `maxResults` | number | `5` | Max results to process |

## Supported Models

LORG supports any OpenAI-compatible model:

| Model | Description | Best For |
|-------|-------------|----------|
| `gpt-4o-mini` | Fast, cost-effective | Default, most searches |
| `gpt-4o` | High quality | Complex queries |
| `gpt-4-turbo` | Large context | Long documents |
| `gpt-3.5-turbo` | Legacy, fast | Simple queries |

## Search Engines

Available SearxNG engines:

| Engine | Description |
|--------|-------------|
| `google` | Google Search |
| `bing` | Microsoft Bing |
| `yahoo` | Yahoo Search |
| `duckduckgo` | DuckDuckGo |
| `wikipedia` | Wikipedia |
| `arxiv` | arXiv papers |

Configure with:

```bash
export LORG_SEARCH_ENGINES="google,bing,duckduckgo"
```

## Custom OpenAI Endpoints

### Azure OpenAI

```bash
export OPENAI_BASE_URL="https://your-resource.openai.azure.com"
export OPENAI_API_KEY="your-azure-key"
```

### Local LLM (Ollama)

```bash
export OPENAI_BASE_URL="http://localhost:11434/v1"
export OPENAI_API_KEY="ollama"
export LORG_DEFAULT_MODEL="llama2"
```

### LM Studio

```bash
export OPENAI_BASE_URL="http://localhost:1234/v1"
export OPENAI_API_KEY="lm-studio"
```

## Configuration Examples

### Development Setup

```bash
# .env file
OPENAI_API_KEY=sk-dev-key
LORG_DEFAULT_MODEL=gpt-4o-mini
LORG_SEARCH_LIMIT=10
```

### Production Setup

```bash
# Environment variables
export OPENAI_API_KEY=sk-prod-key
export LORG_DEFAULT_MODEL=gpt-4o
export LORG_SEARCH_ENGINES=google,bing
export LORG_SEARCH_LIMIT=30
export PORT=8080
```

### High-Quality Mode

```bash
lorg "complex query" -m gpt-4o -r 15
```

### Fast Mode

```bash
lorg "simple query" -m gpt-4o-mini -r 3
```

## Configuration Precedence

Options are applied in this order (later overrides earlier):

1. Environment variables
2. Constructor parameters
3. Method options
4. CLI arguments

Example:

```javascript
// LORG_DEFAULT_MODEL=gpt-4o-mini in environment

const searcher = new LorgSearch();
// Uses gpt-4o-mini from env

const results = await searcher.search('query', { model: 'gpt-4o' });
// Uses gpt-4o from options (overrides env)
```

## Next Steps

- [LorgSearch Class](lorg-search.md) - API reference
- [Architecture](../architecture/overview.md) - How LORG works
