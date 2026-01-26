# Installation

This guide covers the different ways to install and set up LORG.

## Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Comes with Node.js
- **OpenAI API Key**: Required for LLM functionality

## Installation Methods

### NPM (Recommended)

Install LORG globally to use the CLI:

```bash
npm install -g lorg
```

Or install locally in your project:

```bash
npm install lorg
```

### From Source

Clone the repository and install dependencies:

```bash
git clone https://github.com/user/lorg.git
cd lorg
npm install
npm run build
```

### Docker

Build and run using Docker:

```bash
docker build -t lorg .
docker run -e OPENAI_API_KEY=your-key -p 3000:3000 lorg
```

## Configuration

### Environment Variables

Set your OpenAI API key:

=== "Linux/macOS"

    ```bash
    export OPENAI_API_KEY=your-api-key-here
    ```

=== "Windows (PowerShell)"

    ```powershell
    $env:OPENAI_API_KEY="your-api-key-here"
    ```

=== "Windows (CMD)"

    ```cmd
    set OPENAI_API_KEY=your-api-key-here
    ```

### Optional Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_BASE_URL` | OpenAI default | Custom OpenAI API endpoint |
| `LORG_DEFAULT_MODEL` | `gpt-4o-mini` | Default model for queries |
| `LORG_SEARCH_API_URL` | `https://search-dev.d736.uk/search` | SearxNG API URL |
| `LORG_SEARCH_ENGINES` | `google,yahoo,bing,duckduckgo` | Search engines to use |
| `LORG_SEARCH_LIMIT` | `20` | Maximum search results |

## Verify Installation

Check that LORG is installed correctly:

```bash
lorg --version
```

Run a test search:

```bash
lorg "Hello, world"
```

## Next Steps

- [Quick Start Guide](quick-start.md) - Run your first search
- [Configuration Guide](configuration.md) - Customize LORG settings
- [CLI Usage](../user-guide/cli-usage.md) - Learn CLI commands
