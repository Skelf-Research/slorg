#!/usr/bin/env node

import { Command } from 'commander';
import LorgSearch from '../lib/index.js';
import startServer from '../lib/server.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json to get version
const packageJson = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

const program = new Command();

program
  .name('lorg')
  .description('AI-powered search engine with knowledge graph generation')
  .version(packageJson.version);

// CLI mode
program
  .argument('[query]', 'search query (if provided, runs in CLI mode)')
  .option('-k, --api-key <key>', 'OpenAI API key')
  .option('-m, --model <model>', 'OpenAI model to use')
  .option('-r, --results <count>', 'Maximum number of results to return')
  .action(async (query, options) => {
    // CLI mode
    if (!query) {
      console.error('Error: Query is required in CLI mode');
      program.help();
      return;
    }
    
    const apiKey = options.apiKey || process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('Error: OpenAI API key is required. Please provide it with -k option or set OPENAI_API_KEY environment variable.');
      process.exit(1);
    }
    
    const maxResults = options.results ? parseInt(options.results, 10) : undefined;
    
    try {
      const searcher = new LorgSearch(apiKey);
      console.log(`Searching for: "${query}"\n`);
      
      const searchOptions = {};
      if (options.model) searchOptions.model = options.model;
      if (maxResults) searchOptions.maxResults = maxResults;
      
      const results = await searcher.search(query, searchOptions);
      
      console.log('=== LLM Answer ===');
      console.log(results.answer);
      console.log();
      
      console.log('=== Knowledge Graph ===');
      console.log(JSON.stringify(results.knowledgeGraph, null, 2));
      console.log();
      
      console.log('=== Keywords ===');
      if (results.keywords.length > 0) {
        console.log(results.keywords.join(', '));
      } else {
        console.log('No keywords extracted');
      }
      console.log();
      
      console.log('=== Search Results ===');
      if (results.results.length > 0) {
        results.results.forEach((result, index) => {
          console.log(`${index + 1}. ${result.title || 'Untitled'}`);
          console.log(`   Score: ${result.score.toFixed(2)}`);
          console.log(`   Source: ${result.source}`);
          console.log(`   Content: ${result.content.substring(0, 200)}${result.content.length > 200 ? '...' : ''}`);
          console.log();
        });
      } else {
        console.log('No results found');
      }
      
      console.log(`Total tokens used: ${results.tokenCount}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

// Server command
program
  .command('server')
  .description('Start the Lorg search server')
  .option('-p, --port <port>', 'Port to run the server on', '3000')
  .option('-k, --api-key <key>', 'OpenAI API key')
  .action((options) => {
    const apiKey = options.apiKey || process.env.OPENAI_API_KEY;
    const port = parseInt(options.port, 10);
    
    if (!apiKey) {
      console.error('Error: OpenAI API key is required. Please provide it with -k option or set OPENAI_API_KEY environment variable.');
      process.exit(1);
    }
    
    startServer(apiKey, port);
  });

program.parse();