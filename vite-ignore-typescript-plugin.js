// vite-ignore-typescript-plugin.js
module.exports = function ignoreTypeScriptPlugin() {
  return {
    name: 'vite-plugin-ignore-typescript-errors',
    
    // This hook runs before the build starts
    buildStart() {
      console.log('Ignoring TypeScript errors during build...');
    },
    
    // This hook transforms each module
    transform(code, id) {
      // Only process TypeScript files
      if (id.endsWith('.ts') || id.endsWith('.tsx')) {
        // Return the code as-is without type checking
        return {
          code,
          map: null
        };
      }
      return null;
    },
    
    // This hook handles errors during the build
    handleHotUpdate({ file }) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        return [];
      }
    }
  };
} 