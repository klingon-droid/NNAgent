@@ .. @@
 /** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
 const sidebars = {
   tutorialSidebar: [
     {
       type: 'category',
       label: 'Getting Started',
       items: ['intro', 'terminal/commands'],
     },
     {
       type: 'category',
       label: 'Features',
       items: ['agents/overview', 'token/overview'],
     },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/overview',
        'integrations/ai-providers',
        'integrations/api',
        'integrations/plugins',
      ],
    },
   ],
+  integrationsSidebar: [
+    {
+      type: 'category',
+      label: 'Integrations',
+      items: [
+        'integrations/overview',
+        'integrations/client-terminal',
+        'integrations/eliza-plugin',
+      ],
+    },
+  ],
 };
 
 module.exports = sidebars;