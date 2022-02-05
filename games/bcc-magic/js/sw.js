/*! bcc-magic v0.3.0 | (c) 2022 Sam Hunter | All Rights Reserved */
!function(){"use strict";self.addEventListener("install",(function(s){var i,n,e,t=null!==(e=null===(n=null===(i=s.target.serviceWorker)||void 0===i?void 0:i.scriptURL)||void 0===n?void 0:n.replace("/js/sw.js",""))&&void 0!==e?e:"";s.waitUntil(caches.open("bcc-magic").then((function(s){return s.addAll([t+"/index.html",t+"/css/main.css",t+"/js/main.js",t+"/js/sw.js"])})))}))}();
//# sourceMappingURL=sw.js.map
