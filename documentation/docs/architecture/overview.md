# Architecture Overview

LORG is a hybrid package that combines multiple components to deliver AI-powered search capabilities.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        LORG System                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │   CLI    │    │  Server  │    │  Library │    │ Web App  │  │
│  │          │    │          │    │          │    │          │  │
│  │bin/lorg  │    │ Express  │    │LorgSearch│    │ SvelteKit│  │
│  └────┬─────┘    └────┬─────┘    └────┬─────┘    └────┬─────┘  │
│       │               │               │               │         │
│       └───────────────┴───────────────┴───────────────┘         │
│                           │                                     │
│                    ┌──────┴──────┐                              │
│                    │ Core Engine │                              │
│                    │ (LorgSearch)│                              │
│                    └──────┬──────┘                              │
│                           │                                     │
│           ┌───────────────┼───────────────┐                     │
│           ▼               ▼               ▼                     │
│     ┌──────────┐    ┌──────────┐    ┌──────────┐               │
│     │ OpenAI   │    │ SearxNG  │    │ Web      │               │
│     │ API      │    │ API      │    │ Scraper  │               │
│     └──────────┘    └──────────┘    └──────────┘               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Components

### Core Engine (LorgSearch)

The central component that orchestrates all search operations:

- **Location**: `src/lib/index.js`
- **Purpose**: Main class for AI-powered search
- **Responsibilities**:
  - OpenAI API integration
  - Knowledge graph generation
  - Keyword extraction
  - Search result processing
  - Token counting

### CLI Interface

Command-line interface for direct searches:

- **Location**: `src/cli/lorg.js`
- **Entry Point**: `bin/lorg.js`
- **Features**:
  - Search queries from terminal
  - Server mode launcher
  - Configurable options

### Express Server

REST API server for programmatic access:

- **Location**: `src/lib/server.js`
- **Endpoints**: `/health`, `/search`
- **Features**:
  - CORS support
  - JSON API
  - Graceful shutdown

### Web Application

Full-featured SvelteKit application:

- **Location**: `src/web/`
- **Features**:
  - Interactive search UI
  - Search history
  - Real-time results
  - Responsive design

## External Services

### OpenAI API

Used for AI operations:

- Answer generation
- Knowledge graph creation
- Keyword extraction
- Content relevance scoring

### SearxNG

Meta-search engine for web search:

- Aggregates multiple search engines
- Returns structured results
- Privacy-focused

### Web Scraper

Extracts content from web pages:

- Uses JSDOM for parsing
- Extracts text content
- Handles various HTML structures

## Directory Structure

```
slorg/
├── src/
│   ├── lib/              # NPM library source
│   │   ├── index.js      # LorgSearch class
│   │   └── server.js     # Express server
│   ├── cli/              # CLI source
│   │   └── lorg.js       # CLI implementation
│   └── web/              # SvelteKit app
│       ├── lib/          # Frontend utilities
│       ├── routes/       # Pages and API routes
│       ├── app.html      # HTML template
│       └── app.css       # Styles
├── bin/
│   └── lorg.js           # CLI entry point
├── dist/                 # Built library
├── tests/                # Test files
├── documentation/        # MkDocs documentation
└── scripts/              # Build scripts
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Core Engine | Node.js, ES Modules |
| AI | OpenAI API, tiktoken |
| CLI | Commander.js |
| Server | Express.js, CORS |
| Web App | SvelteKit, Vite |
| Styling | Tailwind CSS, DaisyUI |
| Scraping | JSDOM |
| Search | SearxNG API |

## Next Steps

- [Data Flow](data-flow.md) - How data flows through the system
- [Components](components.md) - Detailed component documentation
