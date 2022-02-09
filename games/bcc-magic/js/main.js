/*! bcc-magic v0.3.0 | (c) 2022 Sam Hunter | All Rights Reserved */
!function(){"use strict";var e=function(){function e(){this.colors=[e.RED,e.WHITE,e.BLUE],this.dimensions=3,this.grid=new Array(this.dimensions);for(var t=0;t<this.dimensions;++t)this.grid[t]=new Array(this.dimensions).fill(e.WHITE)}return e.prototype.getGrid=function(){return this.cloneGrid(this.grid)},e.prototype.setGrid=function(e){this.grid=this.cloneGrid(e),this.dimensions=this.grid[0].length},e.prototype.shuffle=function(){for(var e=0;e<this.grid.length;++e)for(var t=0;t<this.grid[e].length;++t)this.grid[e][t]=this.colors[Math.floor(Math.random()*this.colors.length)]},e.prototype.tap=function(e,t){this.tap_one(e,t),this.tap_one(e-1,t),this.tap_one(e,t-1),this.tap_one(e+1,t),this.tap_one(e,t+1)},e.prototype.isSolved=function(){for(var e=this.grid[0][0],t=0;t<this.grid.length;++t)for(var o=0;o<this.grid[t].length;++o)if(this.grid[t][o]!==e)return!1;return!0},e.prototype.cloneGrid=function(e){return JSON.parse(JSON.stringify(e))},e.prototype.advance_color=function(e){var t=(Math.max(0,this.colors.indexOf(e))+1)%this.colors.length;return this.colors[t]},e.prototype.tap_one=function(e,t){e<0||e>=this.dimensions||t<0||t>=this.dimensions||(this.grid[e][t]=this.advance_color(this.grid[e][t]))},e.RED="red",e.WHITE="white",e.BLUE="blue",e}(),t=window.CustomEvent;function o(e,t){var o="on"+t.type.toLowerCase();return"function"==typeof e[o]&&e[o](t),e.dispatchEvent(t)}function i(e){for(;e;){if("dialog"===e.localName)return e;e=e.parentElement?e.parentElement:e.parentNode?e.parentNode.host:null}return null}function n(e){for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;e&&e.blur&&e!==document.body&&e.blur()}function r(e,t){for(var o=0;o<e.length;++o)if(e[o]===t)return!0;return!1}function a(e){return!(!e||!e.hasAttribute("method"))&&"dialog"===e.getAttribute("method").toLowerCase()}function s(e){var t=["button","input","keygen","select","textarea"].map((function(e){return e+":not([disabled])"}));t.push('[tabindex]:not([disabled]):not([tabindex=""])');var o=e.querySelector(t.join(", "));if(!o&&"attachShadow"in Element.prototype)for(var i=e.querySelectorAll("*"),n=0;n<i.length&&!(i[n].tagName&&i[n].shadowRoot&&(o=s(i[n].shadowRoot)));n++);return o}function l(e){return e.isConnected||document.body.contains(e)}function d(e){if(e.submitter)return e.submitter;var t=e.target;if(!(t instanceof HTMLFormElement))return null;var o=h.formSubmitter;if(!o){var i=e.target;o=("getRootNode"in i&&i.getRootNode()||document).activeElement}return o&&o.form===t?o:null}function c(e){if(!e.defaultPrevented){var t=e.target,o=h.imagemapUseValue,n=d(e);null===o&&n&&(o=n.value);var r=i(t);if(r)"dialog"===(n&&n.getAttribute("formmethod")||t.getAttribute("method"))&&(e.preventDefault(),null!=o?r.close(o):r.close())}}function u(e){if(this.dialog_=e,this.replacedStyleTop_=!1,this.openAsModal_=!1,e.hasAttribute("role")||e.setAttribute("role","dialog"),e.show=this.show.bind(this),e.showModal=this.showModal.bind(this),e.close=this.close.bind(this),e.addEventListener("submit",c,!1),"returnValue"in e||(e.returnValue=""),"MutationObserver"in window){new MutationObserver(this.maybeHideModal.bind(this)).observe(e,{attributes:!0,attributeFilter:["open"]})}else{var t,o=!1,i=function(){o?this.downgradeModal():this.maybeHideModal(),o=!1}.bind(this),n=function(n){if(n.target===e){var r="DOMNodeRemoved";o|=n.type.substr(0,r.length)===r,window.clearTimeout(t),t=window.setTimeout(i,0)}};["DOMAttrModified","DOMNodeRemoved","DOMNodeRemovedFromDocument"].forEach((function(t){e.addEventListener(t,n)}))}Object.defineProperty(e,"open",{set:this.setOpen.bind(this),get:e.hasAttribute.bind(e,"open")}),this.backdrop_=document.createElement("div"),this.backdrop_.className="backdrop",this.backdrop_.addEventListener("mouseup",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("mousedown",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("click",this.backdropMouseEvent_.bind(this))}t&&"object"!=typeof t||((t=function(e,t){t=t||{};var o=document.createEvent("CustomEvent");return o.initCustomEvent(e,!!t.bubbles,!!t.cancelable,t.detail||null),o}).prototype=window.Event.prototype),u.prototype={get dialog(){return this.dialog_},maybeHideModal:function(){this.dialog_.hasAttribute("open")&&l(this.dialog_)||this.downgradeModal()},downgradeModal:function(){this.openAsModal_&&(this.openAsModal_=!1,this.dialog_.style.zIndex="",this.replacedStyleTop_&&(this.dialog_.style.top="",this.replacedStyleTop_=!1),this.backdrop_.parentNode&&this.backdrop_.parentNode.removeChild(this.backdrop_),h.dm.removeDialog(this))},setOpen:function(e){e?this.dialog_.hasAttribute("open")||this.dialog_.setAttribute("open",""):(this.dialog_.removeAttribute("open"),this.maybeHideModal())},backdropMouseEvent_:function(e){if(this.dialog_.hasAttribute("tabindex"))this.dialog_.focus();else{var t=document.createElement("div");this.dialog_.insertBefore(t,this.dialog_.firstChild),t.tabIndex=-1,t.focus(),this.dialog_.removeChild(t)}var o=document.createEvent("MouseEvents");o.initMouseEvent(e.type,e.bubbles,e.cancelable,window,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget),this.dialog_.dispatchEvent(o),e.stopPropagation()},focus_:function(){var e=this.dialog_.querySelector("[autofocus]:not([disabled])");!e&&this.dialog_.tabIndex>=0&&(e=this.dialog_),e||(e=s(this.dialog_)),n(document.activeElement),e&&e.focus()},updateZIndex:function(e,t){if(e<t)throw new Error("dialogZ should never be < backdropZ");this.dialog_.style.zIndex=e,this.backdrop_.style.zIndex=t},show:function(){this.dialog_.open||(this.setOpen(!0),this.focus_())},showModal:function(){if(this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally.");if(!l(this.dialog_))throw new Error("Failed to execute 'showModal' on dialog: The element is not in a Document.");if(!h.dm.pushDialog(this))throw new Error("Failed to execute 'showModal' on dialog: There are too many open modal dialogs.");(function(e){for(;e&&e!==document.body;){var t=window.getComputedStyle(e),o=function(e,o){return!(void 0===t[e]||t[e]===o)};if(t.opacity<1||o("zIndex","auto")||o("transform","none")||o("mixBlendMode","normal")||o("filter","none")||o("perspective","none")||"isolate"===t.isolation||"fixed"===t.position||"touch"===t.webkitOverflowScrolling)return!0;e=e.parentElement}return!1})(this.dialog_.parentElement)&&console.warn("A dialog is being shown inside a stacking context. This may cause it to be unusable. For more information, see this link: https://github.com/GoogleChrome/dialog-polyfill/#stacking-context"),this.setOpen(!0),this.openAsModal_=!0,h.needsCentering(this.dialog_)?(h.reposition(this.dialog_),this.replacedStyleTop_=!0):this.replacedStyleTop_=!1,this.dialog_.parentNode.insertBefore(this.backdrop_,this.dialog_.nextSibling),this.focus_()},close:function(e){if(!this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed.");this.setOpen(!1),void 0!==e&&(this.dialog_.returnValue=e);var i=new t("close",{bubbles:!1,cancelable:!1});o(this.dialog_,i)}};var h={reposition:function(e){var t=document.body.scrollTop||document.documentElement.scrollTop,o=t+(window.innerHeight-e.offsetHeight)/2;e.style.top=Math.max(t,o)+"px"},isInlinePositionSetByStylesheet:function(e){for(var t=0;t<document.styleSheets.length;++t){var o=document.styleSheets[t],i=null;try{i=o.cssRules}catch(e){}if(i)for(var n=0;n<i.length;++n){var a=i[n],s=null;try{s=document.querySelectorAll(a.selectorText)}catch(e){}if(s&&r(s,e)){var l=a.style.getPropertyValue("top"),d=a.style.getPropertyValue("bottom");if(l&&"auto"!==l||d&&"auto"!==d)return!0}}}return!1},needsCentering:function(e){return"absolute"===window.getComputedStyle(e).position&&(!("auto"!==e.style.top&&""!==e.style.top||"auto"!==e.style.bottom&&""!==e.style.bottom)&&!h.isInlinePositionSetByStylesheet(e))},forceRegisterDialog:function(e){if((window.HTMLDialogElement||e.showModal)&&console.warn("This browser already supports <dialog>, the polyfill may not work correctly",e),"dialog"!==e.localName)throw new Error("Failed to register dialog: The element is not a dialog.");new u(e)},registerDialog:function(e){e.showModal||h.forceRegisterDialog(e)},DialogManager:function(){this.pendingDialogStack=[];var e=this.checkDOM_.bind(this);this.overlay=document.createElement("div"),this.overlay.className="_dialog_overlay",this.overlay.addEventListener("click",function(t){this.forwardTab_=void 0,t.stopPropagation(),e([])}.bind(this)),this.handleKey_=this.handleKey_.bind(this),this.handleFocus_=this.handleFocus_.bind(this),this.zIndexLow_=1e5,this.zIndexHigh_=100150,this.forwardTab_=void 0,"MutationObserver"in window&&(this.mo_=new MutationObserver((function(t){var o=[];t.forEach((function(e){for(var t,i=0;t=e.removedNodes[i];++i)t instanceof Element&&("dialog"===t.localName&&o.push(t),o=o.concat(t.querySelectorAll("dialog")))})),o.length&&e(o)})))}};if(h.DialogManager.prototype.blockDocument=function(){document.documentElement.addEventListener("focus",this.handleFocus_,!0),document.addEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.observe(document,{childList:!0,subtree:!0})},h.DialogManager.prototype.unblockDocument=function(){document.documentElement.removeEventListener("focus",this.handleFocus_,!0),document.removeEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.disconnect()},h.DialogManager.prototype.updateStacking=function(){for(var e,t=this.zIndexHigh_,o=0;e=this.pendingDialogStack[o];++o)e.updateZIndex(--t,--t),0===o&&(this.overlay.style.zIndex=--t);var i=this.pendingDialogStack[0];i?(i.dialog.parentNode||document.body).appendChild(this.overlay):this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay)},h.DialogManager.prototype.containedByTopDialog_=function(e){for(;e=i(e);){for(var t,o=0;t=this.pendingDialogStack[o];++o)if(t.dialog===e)return 0===o;e=e.parentElement}return!1},h.DialogManager.prototype.handleFocus_=function(e){var t=e.composedPath?e.composedPath()[0]:e.target;if(!this.containedByTopDialog_(t)&&document.activeElement!==document.documentElement&&(e.preventDefault(),e.stopPropagation(),n(t),void 0!==this.forwardTab_)){var o=this.pendingDialogStack[0];return o.dialog.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_PRECEDING&&(this.forwardTab_?o.focus_():t!==document.documentElement&&document.documentElement.focus()),!1}},h.DialogManager.prototype.handleKey_=function(e){if(this.forwardTab_=void 0,27===e.keyCode){e.preventDefault(),e.stopPropagation();var i=new t("cancel",{bubbles:!1,cancelable:!0}),n=this.pendingDialogStack[0];n&&o(n.dialog,i)&&n.dialog.close()}else 9===e.keyCode&&(this.forwardTab_=!e.shiftKey)},h.DialogManager.prototype.checkDOM_=function(e){this.pendingDialogStack.slice().forEach((function(t){-1!==e.indexOf(t.dialog)?t.downgradeModal():t.maybeHideModal()}))},h.DialogManager.prototype.pushDialog=function(e){var t=(this.zIndexHigh_-this.zIndexLow_)/2-1;return!(this.pendingDialogStack.length>=t)&&(1===this.pendingDialogStack.unshift(e)&&this.blockDocument(),this.updateStacking(),!0)},h.DialogManager.prototype.removeDialog=function(e){var t=this.pendingDialogStack.indexOf(e);-1!==t&&(this.pendingDialogStack.splice(t,1),0===this.pendingDialogStack.length&&this.unblockDocument(),this.updateStacking())},h.dm=new h.DialogManager,h.formSubmitter=null,h.imagemapUseValue=null,void 0===window.HTMLDialogElement){var g=document.createElement("form");if(g.setAttribute("method","dialog"),"dialog"!==g.method){var f=Object.getOwnPropertyDescriptor(HTMLFormElement.prototype,"method");if(f){var p=f.get;f.get=function(){return a(this)?"dialog":p.call(this)};var m=f.set;f.set=function(e){return"string"==typeof e&&"dialog"===e.toLowerCase()?this.setAttribute("method",e):m.call(this,e)},Object.defineProperty(HTMLFormElement.prototype,"method",f)}}document.addEventListener("click",(function(e){if(h.formSubmitter=null,h.imagemapUseValue=null,!e.defaultPrevented){var t=e.target;if("composedPath"in e)t=e.composedPath().shift()||t;if(t&&a(t.form)){if(!("submit"===t.type&&["button","input"].indexOf(t.localName)>-1)){if("input"!==t.localName||"image"!==t.type)return;h.imagemapUseValue=e.offsetX+","+e.offsetY}i(t)&&(h.formSubmitter=t)}}}),!1),document.addEventListener("submit",(function(e){var t=e.target;if(!i(t)){var o=d(e);"dialog"===(o&&o.getAttribute("formmethod")||t.getAttribute("method"))&&e.preventDefault()}}));var v=HTMLFormElement.prototype.submit;HTMLFormElement.prototype.submit=function(){if(!a(this))return v.call(this);var e=i(this);e&&e.close()}}var b=window.localStorage,y=document.querySelector("#board").querySelectorAll(".gameboard__button"),_=document.querySelector("#toolbar__newgame"),w=new e;function E(e){for(var t,o,i=0;i<y.length&&!(i>=Math.pow(w.dimensions,2));++i){var n=Math.floor(i/3),r=i%3;y[i].style.backgroundColor=null!==(o=null===(t=null==e?void 0:e[n])||void 0===t?void 0:t[r])&&void 0!==o?o:"white"}}try{"serviceWorker"in navigator&&navigator.serviceWorker.register("js/sw.js",{scope:"./js/"}).then((function(){console.log("Service Worker Registered")}))}catch(e){console.log(e)}document.addEventListener("DOMContentLoaded",(function(){var e,t=JSON.parse(null!==(e=b.getItem("grid"))&&void 0!==e?e:null);t?w.setGrid(t):(w.shuffle(),t=w.getGrid(),b.setItem("grid",JSON.stringify(t))),E(t)}));for(var M=function(e){var t=Math.floor(e/3),o=e%3;y[e].addEventListener("click",(function(e){e.preventDefault(),w.tap(t,o);var i=w.getGrid();return b.setItem("grid",JSON.stringify(i)),E(i),w.isSolved()&&k("You did a thing!").then((function(){w.shuffle();var e=w.getGrid();b.setItem("grid",JSON.stringify(e)),E(e)})).then((function(){return e=0,new Promise((function(t){setTimeout((function(){t()}),e)}));var e})).then((function(){k("Now do it again")})),!0}))},D=0;D<y.length;++D)M(D);function k(e){return new Promise((function(t){var o=document.querySelector("dialog");h.registerDialog(o);var i=o.querySelector(".dialog__content"),n=o.querySelector(".dialog__button");i.innerHTML=e,o.showModal(),n.addEventListener("click",(function(){t()}))}))}null==_||_.addEventListener("click",(function(){Promise.resolve().then((function(){w.shuffle();var e=w.getGrid();E(e),b.setItem("grid",JSON.stringify(e))})).then((function(){return k("Better luck this time!")}))}))}();
//# sourceMappingURL=main.js.map
