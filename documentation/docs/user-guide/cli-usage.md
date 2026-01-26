# CLI Usage

LORG provides a powerful command-line interface for AI-powered searches.

## Basic Usage

```bash
lorg "your search query"
```

## Commands

### Search (Default)

Run a search query:

```bash
lorg "What is quantum computing?"
```

With options:

```bash
lorg "What is quantum computing?" -m gpt-4o -r 10
```

### Server Mode

Start LORG as an API server:

```bash
lorg server
```

With custom port:

```bash
lorg server -p 8080
```

### Help

Display help information:

```bash
lorg --help
```

## Options

### Global Options

| Option | Short | Description |
|--------|-------|-------------|
| `--version` | `-V` | Display version number |
| `--help` | `-h` | Display help information |

### Search Options

| Option | Short | Default | Description |
|--------|-------|---------|-------------|
| `--api-key` | `-k` | `$OPENAI_API_KEY` | OpenAI API key |
| `--model` | `-m` | `gpt-4o-mini` | Model to use |
| `--results` | `-r` | `5` | Max results to return |

### Server Options

| Option | Short | Default | Description |
|--------|-------|---------|-------------|
| `--port` | `-p` | `3000` | Server port |
| `--api-key` | `-k` | `$OPENAI_API_KEY` | OpenAI API key |

## Examples

### Basic Search

```bash
lorg "How does photosynthesis work?"
```

### Search with Custom Model

```bash
lorg "Explain blockchain technology" -m gpt-4o
```

### Search with More Results

```bash
lorg "Best programming languages 2024" -r 10
```

### Using API Key Directly

```bash
lorg "What is machine learning?" -k sk-your-key-here
```

### Start Server on Custom Port

```bash
lorg server -p 8080 -k sk-your-key-here
```

## Output Format

The CLI outputs structured results:

```
Searching for: "your query"

=== LLM Answer ===
[AI-generated answer to your query]

=== Knowledge Graph ===
{
  "entities": [...],
  "relationships": [...]
}

=== Keywords ===
keyword1, keyword2, keyword3

=== Search Results ===
1. Result Title
   Score: 0.95
   Source: https://example.com
   Content: Extracted content preview...

Total tokens used: 1234
```

## Error Handling

### Missing API Key

```
Error: OpenAI API key is required. Please provide it with -k option
or set OPENAI_API_KEY environment variable.
```

**Solution**: Set your API key:
```bash
export OPENAI_API_KEY=sk-your-key
```

### No Query Provided

```
Error: Query is required in CLI mode
```

**Solution**: Provide a search query:
```bash
lorg "your search query"
```

## Tips

1. **Quote your queries**: Use quotes for multi-word queries
   ```bash
   lorg "how to learn programming"
   ```

2. **Use specific queries**: More specific queries yield better results
   ```bash
   # Better
   lorg "Python async await tutorial for beginners"

   # Less specific
   lorg "Python tutorial"
   ```

3. **Adjust result count**: Use fewer results for faster searches
   ```bash
   lorg "quick question" -r 3
   ```

## Next Steps

- [Server Mode](server-mode.md) - Run as an API server
- [Library Usage](library-usage.md) - Use in your code
