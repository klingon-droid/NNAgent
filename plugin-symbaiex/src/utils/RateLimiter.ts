@@ .. @@
   private readonly maxRequests: number;
   private readonly windowMs: number;
   private readonly storageKey: string;
+  private readonly prefix = 'symx_';
 
   constructor(config: RateLimiterConfig, storageKey?: string) {
     this.maxRequests = config.maxRequests;
     this.windowMs = config.windowMs;
-    this.storageKey = storageKey || 'rate_limit_requests';
+    this.storageKey = `${this.prefix}${storageKey || 'rate_limit_requests'}`;
     this.loadFromStorage();
   }
@@ .. @@
   private saveToStorage(): void {
     try {
       localStorage.setItem(this.storageKey, JSON.stringify(this.requests));
     } catch (error) {
       console.error('Failed to save rate limit data:', error);
     }
   }
+
+  clear(): void {
+    this.requests = [];
+    localStorage.removeItem(this.storageKey);
+  }
 }