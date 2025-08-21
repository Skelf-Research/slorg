# AI Search App

An intelligent search application that combines the power of Large Language Models (LLMs) with web search capabilities to provide accurate, context-aware answers to user queries.

## Table of Contents

- [Power & Utility](#power--utility)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup Options](#setup-options)
  - [Option 1: Local Development](#option-1-local-development)
  - [Option 2: Docker Deployment (Recommended for Production)](#option-2-docker-deployment-recommended-for-production)
  - [Docker Compose (Alternative)](#docker-compose-alternative)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Power & Utility

The AI Search App revolutionizes how we interact with information by combining cutting-edge AI with intelligent web search:

- **AI-Powered Precision**: Instead of traditional keyword matching, our app understands context and intent to deliver precise answers
- **Knowledge Synthesis**: Goes beyond simple search results by creating structured knowledge graphs that show relationships between concepts
- **Intelligent Content Analysis**: Automatically identifies and extracts the most relevant information from web pages
- **Smart Keyword Discovery**: Extracts essential keywords to refine searches and find better results
- **Multi-Source Verification**: Cross-references multiple sources to ensure accuracy and comprehensiveness
- **Token Efficiency**: Tracks and optimizes API usage to minimize costs while maximizing value
- **Beautiful, Responsive Interface**: Clean, modern UI that works seamlessly on all devices

Whether you're a researcher, student, professional, or curious individual, this app transforms how you discover, understand, and utilize information from across the web.

- **AI-Powered Precision**: Instead of traditional keyword matching, our app understands context and intent to deliver precise answers
- **Knowledge Synthesis**: Goes beyond simple search results by creating structured knowledge graphs that show relationships between concepts
- **Intelligent Content Analysis**: Automatically identifies and extracts the most relevant information from web pages
- **Smart Keyword Discovery**: Extracts essential keywords to refine searches and find better results
- **Multi-Source Verification**: Cross-references multiple sources to ensure accuracy and comprehensiveness
- **Token Efficiency**: Tracks and optimizes API usage to minimize costs while maximizing value
- **Beautiful, Responsive Interface**: Clean, modern UI that works seamlessly on all devices

Whether you're a researcher, student, professional, or curious individual, this app transforms how you discover, understand, and utilize information from across the web.

## Features

- **LLM-Powered Answers**: Uses OpenAI's GPT models to generate accurate and concise answers to user queries
- **Knowledge Graph Generation**: Creates structured representations of information with entities and relationships
- **Smart Web Search**: Integrates with SearxNG to find relevant web content
- **Content Analysis**: Processes and analyzes web content to extract relevant information
- **Keyword Extraction**: Automatically identifies important keywords for refined searches
- **Token Tracking**: Monitors API usage with token counting
- **Responsive UI**: Built with SvelteKit, TailwindCSS, and DaisyUI for a modern, responsive interface

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

## Setup Options

### Option 1: Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-search-app
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

### Option 2: Docker Deployment (Recommended for Production)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-search-app
   ```

2. Create a `.env` file in the root directory with your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. Build the Docker image:
   ```bash
   docker build -t ai-search-app .
   ```

4. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env ai-search-app
   ```

5. Access the application at `http://localhost:3000`

### Docker Compose (Alternative)

Create a `docker-compose.yml` file:
```yaml
version: '3.8'
services:
  ai-search-app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
```

Then run:
```bash
docker-compose up
```

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

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

For Docker deployment, you can also pass the environment variables directly:
```bash
docker run -p 3000:3000 -e OPENAI_API_KEY=your_openai_api_key_here ai-search-app
```

### Tailwind & DaisyUI

The project uses TailwindCSS for styling and DaisyUI for pre-built components. Configuration can be found in:
- `tailwind.config.js`
- `postcss.config.js`

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

## Deployment

### Deploy with Docker

The easiest way to deploy this application is using Docker:

1. Build the Docker image:
   ```bash
   docker build -t ai-search-app .
   ```

2. Run the container:
   ```bash
   docker run -d -p 3000:3000 --name ai-search-app --env-file .env ai-search-app
   ```

3. The application will be available at `http://your-server-ip:3000`

### Deploy to Cloud Providers

This application can be deployed to any cloud provider that supports Node.js or Docker containers:
- AWS ECS, Heroku, Google Cloud Run, Azure Container Instances, etc.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.