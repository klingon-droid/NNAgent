const { execSync } = require('child_process');
const path = require('path');

console.log('Starting build process...');
console.log('Bypassing TypeScript type checking...');

try {
  // Set environment variable to skip TypeScript type checking
  process.env.VITE_SKIP_TS_CHECK = 'true';
  
  // Run Vite build
  execSync('npx vite build', { 
    stdio: 'inherit',
    env: process.env
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 