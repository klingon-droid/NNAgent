@@ .. @@
       /** @type {import('@docusaurus/preset-classic').Options} */
       ({
         docs: {
           sidebarPath: require.resolve('./sidebars.js'),
           editUrl: 'https://github.com/symbaiex/docs/tree/main/',
+          docLayoutComponent: '@theme/DocLayout',
+          docItemComponent: '@theme/DocItem',
         },
         blog: false,
         theme: {
           customCss: require.resolve('./src/css/custom.css'),
         },
       }),
     ],
   ],
 
   themeConfig:
     /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
     ({
       navbar: {
         title: 'SYMBaiEX',
         logo: {
           alt: 'SYMBaiEX Logo',
           src: 'img/logo.svg',
         },
         items: [
           {
             type: 'docSidebar',
             sidebarId: 'tutorialSidebar',
             position: 'left',
             label: 'Documentation',
           },
+          {
+            type: 'docSidebar',
+            sidebarId: 'integrationsSidebar',
+            position: 'left',
+            label: 'Integrations',
+          },
           {
             href: 'https://github.com/symbaiex/docs',
             label: 'GitHub',
             position: 'right',
           },
         ],
       },