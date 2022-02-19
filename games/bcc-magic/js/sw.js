/*! bcc-magic v0.5.0 | (c) 2022 Sam Hunter | All Rights Reserved */
!function(){"use strict";self.addEventListener("install",(function(s){var e,i,n,t=null!==(n=null===(i=null===(e=s.target.serviceWorker)||void 0===e?void 0:e.scriptURL)||void 0===i?void 0:i.replace("/js/sw.js",""))&&void 0!==n?n:"";s.waitUntil(caches.open("bcc-magic").then((function(s){return s.addAll([t+"/",t+"/index.html",t+"/css/main.css",t+"/js/main.js",t+"/js/sw.js",t+"/svg/refresh.svg",t+"/svg/restart.svg"])})))}))}();
//# sourceMappingURL=sw.js.map
