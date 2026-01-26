# LORG - LLM-Powered Search Engine

LORG (Answer AI) is an AI-powered search engine that combines Large Language Models with knowledge graph generation to provide accurate, context-aware search results.

## Key Features

- **LLM-Powered Answers**: Get AI-generated answers to your queries using OpenAI models
- **Knowledge Graph Generation**: Automatically creates structured knowledge graphs from queries
- **Multi-Engine Search**: Aggregates results from Google, Yahoo, Bing, and DuckDuckGo via SearxNG
- **Relevance Scoring**: Uses AI to score and rank search results by relevance
- **Multiple Interfaces**: Use as a CLI tool, library, API server, or web application

## Quick Links

<div class="grid cards" markdown>

-   :material-download:{ .lg .middle } **Getting Started**

    ---

    Install LORG and run your first search in minutes

    [:octicons-arrow-right-24: Installation](getting-started/installation.md)

-   :material-console:{ .lg .middle } **CLI Usage**

    ---

    Learn how to use LORG from the command line

    [:octicons-arrow-right-24: CLI Guide](user-guide/cli-usage.md)

-   :material-api:{ .lg .middle } **API Reference**

    ---

    Complete API documentation for developers

    [:octicons-arrow-right-24: API Docs](api-reference/lorg-search.md)

-   :material-cog:{ .lg .middle } **Architecture**

    ---

    Understand how LORG works under the hood

    [:octicons-arrow-right-24: Architecture](architecture/overview.md)

</div>

## How It Works

1. **Query Processing**: Your query is sent to an LLM which generates an initial answer and knowledge graph
2. **Keyword Extraction**: Keywords are extracted from the knowledge graph for web search
3. **Web Search**: Multiple search engines are queried via SearxNG
4. **Content Analysis**: Web pages are fetched and analyzed for relevance using AI
5. **Result Ranking**: Results are scored and ranked by relevance to your query

## Example Usage

=== "CLI"

    ```bash
    lorg "What is quantum computing?"
    ```

=== "Library"

    ```javascript
    import LorgSearch from 'lorg';

    const searcher = new LorgSearch(process.env.OPENAI_API_KEY);
    const results = await searcher.search('What is quantum computing?');
    console.log(results.answer);
    ```

=== "Server"

    ```bash
    lorg server -p 3000

    # Then make requests:
    curl -X POST http://localhost:3000/search \
      -H "Content-Type: application/json" \
      -d '{"query": "What is quantum computing?"}'
    ```

## Requirements

- Node.js 18 or higher
- OpenAI API key
- Internet connection for web search

## License

LORG is released under the MIT License.
