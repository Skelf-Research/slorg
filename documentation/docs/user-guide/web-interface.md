# Web Interface

LORG includes a full-featured web application built with SvelteKit.

## Starting the Web App

### Development Mode

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Mode

Build and preview:

```bash
npm run build
npm run preview
```

## Features

### Search Interface

The main search interface includes:

- **Search Input**: Enter your query in the search box
- **Search Button**: Click or press Enter to search
- **Loading Indicator**: Shows search progress

### Results Display

After searching, you'll see:

1. **LLM Answer**: AI-generated answer to your query
2. **Knowledge Graph**: Structured representation of the query
3. **Extracted Keywords**: Keywords used for web search
4. **Search Results**: Ranked web results with relevance scores
5. **Token Usage**: Total OpenAI tokens consumed

### Search History

The sidebar displays your search history:

- Click any previous query to view it
- History persists during your session

### Responsive Design

The interface adapts to different screen sizes:

- **Desktop**: Full sidebar visible
- **Mobile**: Collapsible sidebar with hamburger menu

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=sk-your-key-here
```

### Theme

The app supports light and dark themes via DaisyUI. The theme is set in `app.html`:

```html
<html lang="en" data-theme="light">
```

Change to `data-theme="dark"` for dark mode.

## Architecture

The web app is structured as:

```
src/web/
├── routes/
│   ├── +page.svelte      # Main search page
│   ├── +layout.svelte    # Layout with sidebar
│   └── api/
│       ├── openai/       # OpenAI API endpoint
│       └── scrape/       # Web scraping endpoint
├── lib/
│   ├── api.js            # Frontend API functions
│   ├── store.js          # Svelte stores
│   └── tokenCounter.js   # Token counting utility
├── app.html              # HTML template
└── app.css               # Tailwind CSS imports
```

## API Routes

### /api/openai

Handles OpenAI operations:

- `generateAnswerAndGraph`: Generate answer and knowledge graph
- `extractKeywords`: Extract search keywords
- `processHtmlContent`: Analyze content relevance

### /api/scrape

Fetches and extracts content from web pages.

## Customization

### Styling

Modify `tailwind.config.js` to customize:

```javascript
export default {
  content: ['./src/web/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      // Add custom colors, fonts, etc.
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Add more themes
  },
}
```

### Components

The UI uses DaisyUI components:

- Cards for result display
- Forms for search input
- Drawer for sidebar navigation
- Alerts for token count display

## Deployment

### Static Hosting

Build for static deployment:

```bash
npm run build
```

Deploy the `.svelte-kit/output` directory.

### Node.js Server

Use the adapter-node for server deployment:

1. Install adapter: `npm install @sveltejs/adapter-node`
2. Update `svelte.config.js`:
   ```javascript
   import adapter from '@sveltejs/adapter-node';
   ```
3. Build and run: `npm run build && node build`

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
```

## Next Steps

- [CLI Usage](cli-usage.md) - Use from command line
- [API Reference](../api-reference/lorg-search.md) - Library API docs
