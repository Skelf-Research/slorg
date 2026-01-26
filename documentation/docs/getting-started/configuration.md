# Configuration

LORG can be configured through environment variables and runtime options.

## Environment Variables

### Required

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key (required) |

### Optional

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_BASE_URL` | OpenAI default | Custom OpenAI-compatible API endpoint |
| `LORG_DEFAULT_MODEL` | `gpt-4o-mini` | Default model for all operations |
| `LORG_SEARCH_API_URL` | `https://search-dev.d736.uk/search` | SearxNG instance URL |
| `LORG_SEARCH_ENGINES` | `google,yahoo,bing,duckduckgo` | Comma-separated list of engines |
| `LORG_SEARCH_LIMIT` | `20` | Maximum results from search API |
| `PORT` | `3000` | Server port (server mode only) |

## Setting Environment Variables

### Permanent Configuration

=== "Linux/macOS (.bashrc or .zshrc)"

    ```bash
    export OPENAI_API_KEY="sk-..."
    export LORG_DEFAULT_MODEL="gpt-4o"
    export LORG_SEARCH_LIMIT="30"
    ```

=== "Windows (System Environment)"

    1. Open System Properties > Environment Variables
    2. Add new user variables for each setting

### Using .env Files

Create a `.env` file in your project:

```env
OPENAI_API_KEY=sk-your-key-here
LORG_DEFAULT_MODEL=gpt-4o
LORG_SEARCH_LIMIT=30
```

!!! warning "Security"
    Never commit `.env` files to version control. Add `.env` to your `.gitignore`.

## Runtime Options

### CLI Options

```bash
lorg "query" [options]
```

| Option | Description |
|--------|-------------|
| `-k, --api-key <key>` | OpenAI API key (overrides env var) |
| `-m, --model <model>` | Model to use for this search |
| `-r, --results <count>` | Maximum results to return |

### Library Options

```javascript
const results = await searcher.search(query, {
  model: 'gpt-4o',      // Override default model
  maxResults: 10        // Maximum results to process
});
```

### Server Options

```bash
lorg server [options]
```

| Option | Description |
|--------|-------------|
| `-p, --port <port>` | Port to run server on (default: 3000) |
| `-k, --api-key <key>` | OpenAI API key |

## Using Custom OpenAI Endpoints

LORG supports OpenAI-compatible APIs:

```bash
export OPENAI_BASE_URL="https://your-custom-endpoint.com/v1"
export OPENAI_API_KEY="your-custom-key"
```

This works with:

- Azure OpenAI
- Local LLM servers (Ollama, LMStudio)
- Other OpenAI-compatible providers

## Model Selection

Available models depend on your OpenAI account:

| Model | Best For |
|-------|----------|
| `gpt-4o-mini` | Fast, cost-effective searches (default) |
| `gpt-4o` | Higher quality answers |
| `gpt-4-turbo` | Complex queries requiring more context |

## Next Steps

- [CLI Usage](../user-guide/cli-usage.md) - Learn CLI commands
- [Server Mode](../user-guide/server-mode.md) - Run as an API server
