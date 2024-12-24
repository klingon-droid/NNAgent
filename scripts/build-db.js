import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define directories
const distDir = join(__dirname, '../dist');
const publicDir = join(__dirname, '../public');

// Ensure directories exist
[distDir, publicDir].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

console.log('Build directories created successfully');