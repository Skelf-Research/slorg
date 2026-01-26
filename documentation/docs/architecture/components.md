# Components

Detailed documentation of LORG's components.

## Core Library

### LorgSearch Class

**File**: `src/lib/index.js`

The main class that provides all search functionality.

```javascript
class LorgSearch {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
    this.defaultModel = process.env.LORG_DEFAULT_MODEL || "gpt-4o-mini";
    this.searchApiUrl = process.env.LORG_SEARCH_API_URL;
    this.searchEngines = process.env.LORG_SEARCH_ENGINES;
    this.searchLimit = process.env.LORG_SEARCH_LIMIT;
  }

  // Core methods
  async search(query, options) { ... }
  async generateAnswerAndGraph(query) { ... }
  async extractKeywords(graph) { ... }
  async searchSearxNG(keywords) { ... }
  async fetchHtml(url) { ... }
  async processHtmlContent(html, query, answer) { ... }

  // Utility methods
  countTokens(text, model) { ... }
  async callOpenAI(system, user, model) { ... }
}
```

**Dependencies**:
- `openai`: OpenAI API client
- `jsdom`: HTML parsing
- `tiktoken`: Token counting

### Express Server

**File**: `src/lib/server.js`

REST API server for remote access.

```javascript
function startServer(apiKey, port = 3000) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const searcher = new LorgSearch(apiKey);

  app.get('/health', (req, res) => { ... });
  app.post('/search', async (req, res) => { ... });

  return app.listen(port);
}
```

**Endpoints**:
- `GET /health`: Health check
- `POST /search`: Search endpoint

---

## CLI Component

### CLI Entry Point

**File**: `bin/lorg.js`

Thin wrapper that loads the CLI module.

```javascript
#!/usr/bin/env node
import '../src/cli/lorg.js';
```

### CLI Implementation

**File**: `src/cli/lorg.js`

Command-line interface using Commander.js.

```javascript
import { Command } from 'commander';
import LorgSearch from '../lib/index.js';
import startServer from '../lib/server.js';

const program = new Command();

program
  .name('lorg')
  .description('AI-powered search engine')
  .version(packageJson.version);

// Search command (default)
program
  .argument('[query]')
  .option('-k, --api-key <key>')
  .option('-m, --model <model>')
  .option('-r, --results <count>')
  .action(async (query, options) => { ... });

// Server command
program
  .command('server')
  .option('-p, --port <port>')
  .option('-k, --api-key <key>')
  .action((options) => { ... });

program.parse();
```

---

## Web Application

### SvelteKit Structure

**Directory**: `src/web/`

```
src/web/
├── routes/
│   ├── +page.svelte       # Main search page
│   ├── +layout.svelte     # App layout
│   └── api/
│       ├── openai/        # OpenAI proxy
│       └── scrape/        # Web scraper
├── lib/
│   ├── api.js             # API functions
│   ├── store.js           # State management
│   └── tokenCounter.js    # Token utility
├── app.html               # HTML template
└── app.css                # Tailwind imports
```

### Main Page

**File**: `src/web/routes/+page.svelte`

```svelte
<script>
  import { searchQuery, searchResults, isLoading } from '$lib/store';
  import { generateAnswerAndGraph, searchSearxNG } from '$lib/api';

  async function handleSubmit() {
    $isLoading = true;
    // ... search logic
    $isLoading = false;
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input bind:value={query} />
  <button type="submit">Search</button>
</form>

{#if $searchResults.length > 0}
  <!-- Display results -->
{/if}
```

### State Management

**File**: `src/web/lib/store.js`

```javascript
import { writable } from 'svelte/store';

export const searchQuery = writable('');
export const searchResults = writable([]);
export const isLoading = writable(false);
export const isSidebarOpen = writable(false);
export const searchHistory = writable([]);
export const tokenCount = writable(0);
```

### API Functions

**File**: `src/web/lib/api.js`

```javascript
export async function generateAnswerAndGraph(query) {
  const response = await fetch('/api/openai', {
    method: 'POST',
    body: JSON.stringify({ action: 'generateAnswerAndGraph', payload: query })
  });
  return response.json();
}

export async function searchSearxNG(keywords) {
  const response = await fetch('https://search-api.example.com/search', {
    method: 'POST',
    body: new URLSearchParams({ q: keywords })
  });
  return response.json();
}
```

### API Routes

**OpenAI Proxy**: `src/web/routes/api/openai/+server.js`

Handles OpenAI operations server-side to protect API key.

**Scraper**: `src/web/routes/api/scrape/+server.js`

Fetches and parses web pages server-side.

---

## Build System

### Build Script

**File**: `scripts/build-lib.js`

```javascript
import { copyFileSync, mkdirSync } from 'fs';

// Create dist directory
mkdirSync('dist', { recursive: true });

// Copy library files
copyFileSync('src/lib/index.js', 'dist/index.js');
copyFileSync('src/lib/server.js', 'dist/server.js');
```

### Package Configuration

**File**: `package.json`

```json
{
  "main": "dist/index.js",
  "bin": { "lorg": "bin/lorg.js" },
  "files": ["dist/", "bin/", "README.md"],
  "exports": {
    ".": "./dist/index.js",
    "./server": "./dist/server.js"
  }
}
```

---

## Configuration Files

### SvelteKit

**File**: `svelte.config.js`

```javascript
export default {
  kit: {
    adapter: adapter(),
    files: {
      lib: 'src/web/lib',
      routes: 'src/web/routes',
      appTemplate: 'src/web/app.html'
    }
  }
};
```

### Tailwind

**File**: `tailwind.config.js`

```javascript
export default {
  content: ['./src/web/**/*.{html,js,svelte,ts}'],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"]
  }
};
```

---

## Component Interactions

```
┌─────────────────────────────────────────────┐
│                   User                       │
└───────────────┬─────────────────────────────┘
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
┌───────┐  ┌────────┐  ┌─────────┐
│  CLI  │  │ Server │  │ Web App │
└───┬───┘  └───┬────┘  └────┬────┘
    │          │            │
    └──────────┼────────────┘
               ▼
        ┌──────────────┐
        │  LorgSearch  │
        └──────┬───────┘
               │
    ┌──────────┼──────────┐
    ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│ OpenAI │ │SearxNG │ │ JSDOM  │
└────────┘ └────────┘ └────────┘
```

## Next Steps

- [Overview](overview.md) - System architecture
- [Data Flow](data-flow.md) - How data flows
