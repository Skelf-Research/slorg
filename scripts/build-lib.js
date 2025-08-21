import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Create dist directory if it doesn't exist
const distDir = join(process.cwd(), 'dist');
if (!existsSync(distDir)) {
  mkdirSync(distDir);
}

// Copy the main library file
copyFileSync(
  join(process.cwd(), 'lib', 'index.js'),
  join(distDir, 'index.js')
);

console.log('Library built successfully!');