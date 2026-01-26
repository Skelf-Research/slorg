import express from 'express';
import cors from 'cors';
import LorgSearch from './index.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json to get version
const packageJson = JSON.parse(readFileSync(join(__dirname, '..', '..', 'package.json'), 'utf8'));

function startServer(apiKey, port = 3000) {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  
  // Create searcher instance
  const searcher = new LorgSearch(apiKey);
  
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', version: packageJson.version });
  });
  
  // Search endpoint
  app.post('/search', async (req, res) => {
    try {
      const { query, model, maxResults } = req.body;
      
      if (!query) {
        return res.status(400).json({ error: 'Query is required' });
      }
      
      const searchOptions = {};
      if (model) searchOptions.model = model;
      if (maxResults) searchOptions.maxResults = parseInt(maxResults, 10);
      
      const results = await searcher.search(query, searchOptions);
      res.json(results);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Start server
  const server = app.listen(port, () => {
    console.log(`Lorg server running on port ${port}`);
    console.log(`Health check: http://localhost:${port}/health`);
    console.log(`Search endpoint: http://localhost:${port}/search`);
  });
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });
  
  return server;
}

export default startServer;