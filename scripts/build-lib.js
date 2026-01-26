import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Create dist directory if it doesn't exist
const distDir = join(process.cwd(), 'dist');
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Copy the main library file
copyFileSync(
  join(process.cwd(), 'src', 'lib', 'index.js'),
  join(distDir, 'index.js')
);

// Copy the server file
copyFileSync(
  join(process.cwd(), 'src', 'lib', 'server.js'),
  join(distDir, 'server.js')
);

console.log('Library built successfully!');