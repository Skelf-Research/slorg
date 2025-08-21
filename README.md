# Lorg - AI-Powered Search Engine

Lorg (short for "Explore" in Danish) is an intelligent search application that combines the power of Large Language Models (LLMs) with web search capabilities to provide accurate, context-aware answers to user queries.

## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Local Development](#local-development)
  - [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- **LLM-Powered Answers**: Uses OpenAI's GPT models to generate accurate and concise answers to user queries
- **Knowledge Graph Generation**: Creates structured representations of information with entities and relationships
- **Smart Web Search**: Integrates with SearxNG to find relevant web content
- **Content Analysis**: Processes and analyzes web content to extract relevant information
- **Keyword Extraction**: Automatically identifies important keywords for refined searches
- **Token Tracking**: Monitors API usage with token counting
- **Responsive UI**: Built with SvelteKit, TailwindCSS, and DaisyUI for a modern, responsive interface

## How It Works

1. **Query Input**: User enters a search query in the search bar
2. **LLM Processing**: The app sends the query to OpenAI to generate:
   - A concise answer to the query
   - A knowledge graph with entities and relationships
3. **Keyword Extraction**: The app extracts relevant keywords from the knowledge graph
4. **Web Search**: Uses the keywords to search the web via SearxNG
5. **Content Scraping**: Fetches and processes content from relevant search results
6. **Content Analysis**: Analyzes the scraped content to find the most relevant information
7. **Results Display**: Presents the LLM answer, knowledge graph, keywords, and best matching content to the user

## Tech Stack

- **Frontend**: SvelteKit, TailwindCSS, DaisyUI
- **Backend**: SvelteKit server-side routes
- **AI**: OpenAI GPT models
- **Web Search**: SearxNG integration
- **Styling**: TailwindCSS with DaisyUI components
- **Build Tool**: Vite
- **Containerization**: Docker

## Prerequisites

- Node.js (v16 or higher) for local development
- Docker (v20 or higher) for containerized deployment
- OpenAI API key

## Setup

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lorg
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Docker Deployment

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lorg
   ```

2. Create a `.env` file in the root directory with your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. Build the Docker image:
   ```bash
   docker build -t lorg .
   ```

4. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env lorg
   ```

5. Access the application at `http://localhost:3000`

## Project Structure

```
src/
├── lib/
│   ├── api.js          # API functions for backend communication
│   ├── store.js        # Svelte stores for state management
│   └── tokenCounter.js # Token counting utilities
├── routes/
│   ├── api/
│   │   ├── openai/
│   │   │   └── +server.js  # OpenAI API integration
│   │   └── scrape/
│   │       └── +server.js  # Web scraping functionality
│   ├── +layout.svelte      # Main layout component
│   └── +page.svelte        # Main page component
├── app.css                 # Global CSS (Tailwind directives)
└── app.html                # HTML template
```

## Development

To start the development server:

```bash
npm run dev
```

To build the project:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.