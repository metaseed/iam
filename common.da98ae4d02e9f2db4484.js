(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{G5Nz:function(t,e,i){"use strict";i.d(e,"a",function(){return p});var n=i("ny24"),o=i("9dfq"),s=i("p0Sj"),r=i("K9Ia"),c=i("KQya"),l=i("dzgT"),a=(i("javO"),i("q/PB"),i("vGXY")),p=function(){function t(t,e,i,n,o){var s=this;this.bm=t,this.scrollService=e,this.tocService=i,this.elementRef=n,this.location=o,this.activeIndex=null,this.type="None",this.show=!0,this.isCollapsed=!0,this.isEmbedded=!1,this.onDestroy=new r.a,this.primaryMax=4,t.observe([a.b.Small,a.b.XSmall]).subscribe(function(t){t.matches?(s.show=!1,s.isSmallScreen=!0):(s.show=!0,s.isSmallScreen=!1)}),this.isEmbedded=-1!==n.nativeElement.className.indexOf("embedded")}return t.prepareTitleAndToc=function(t,e,i,n){var o=t.querySelector("h1"),s=!!o&&!/no-?toc/i.test(o.className),r=t.querySelector("i-toc.embedded");return s&&!r?o.insertAdjacentHTML("afterend","<i-toc></i-toc>"):!s&&r&&r.remove(),function(){i.reset(),o&&s&&i.genToc(t,e)}},t.prototype.ngOnInit=function(){var t=this;this.tocService.tocList.pipe(Object(n.a)(this.onDestroy),Object(o.a)(c.a)).subscribe(function(e){var i,n=(i=function(t){return"h1"!==t.level},e.reduce(function(t,e){return i(e)?t+1:t},0));t.type=n>0?t.isEmbedded?n>t.primaryMax?"EmbeddedExpandable":"EmbeddedSimple":"Floating":"None",t.tocList=e})},t.prototype.ngAfterViewInit=function(){var t=this;this.isEmbedded||Object(l.b)(this.tocService.activeItemIndex.pipe(Object(o.a)(c.a)),this.items.changes.pipe(Object(s.a)(this.items))).pipe(Object(n.a)(this.onDestroy)).subscribe(function(e){var i=e[0],n=e[1];if(t.activeIndex=i,!(null===i||i>=n.length)){var o=n.toArray()[i].nativeElement,s=o.offsetParent;if(s){var r=o.getBoundingClientRect(),c=s.getBoundingClientRect();r.top>=c.top&&r.bottom<=c.bottom||(s.scrollTop+=r.top-c.top-s.clientHeight/2)}}})},t.prototype.ngOnDestroy=function(){this.onDestroy.next()},t.prototype.toggle=function(t){void 0===t&&(t=!0),this.isCollapsed=!this.isCollapsed,t&&this.isCollapsed&&this.toTop()},t.prototype.onClick=function(t){this.elementRef.nativeElement.contains(t.target)||(this.show=!1)},t.prototype.navigate=function(t){this.isSmallScreen&&(this.show=!1)},t.prototype.toTop=function(){this.scrollService.scrollToTop()},t.prototype.toggleToc=function(){this.show=!this.show},t}()},javO:function(t,e,i){"use strict";i.d(e,"a",function(){return o});var n=i("S5bw"),o=(i("q/PB"),function(){function t(t,e,i){this.document=t,this.domSanitizer=e,this.scrollSpyService=i,this.tocList=new n.a(1),this.activeItemIndex=new n.a(1),this.activeElement$=new n.a(1),this.scrollSpyToken=null,this.isScrollUp=!1}return t.prototype.genToc=function(t,e){var i=this;if(void 0===e&&(e=""),this.resetScrollSpyInfo(),t){var n=this.findTocHeadings(t),o=new Map,s=n.map(function(t){return{content:i.extractHeadingSafeHtml(t),href:e+"#"+i.getId(t,o),level:t.tagName.toLowerCase(),title:(t.textContent||"").trim()}});this.tocList.next(s),this.scrollSpyToken=this.scrollSpyService.spyOn(n,t,60),this.scrollSpyToken.activeScrollElement$.subscribe(function(t){i.activeItemIndex.next(t&&t.index),i.activeElement$.next(t&&t.element)}),this.scrollSpyToken.isScrollDown$.subscribe(function(t){i.isScrollUp=!t.isDown})}else this.tocList.next([])},t.prototype.reset=function(){this.resetScrollSpyInfo(),this.tocList.next([])},t.prototype.extractHeadingSafeHtml=function(t){var e=this.document.createElement("div");e.innerHTML=t.innerHTML;for(var i=e.querySelectorAll("a"),n=0;n<i.length;n++){var o=i[n];if(!o.classList.contains("deep-link")&&!o.classList.contains("edit-it"))for(var s=o.parentNode;o.childNodes.length;)s.insertBefore(o.childNodes[0],o);o.remove()}return this.domSanitizer.bypassSecurityTrustHtml(e.innerHTML.trim())},t.prototype.findTocHeadings=function(t){var e=t.querySelectorAll("h1,h2,h3");return Array.prototype.filter.call(e,function(t){return!/(?:no-toc|notoc)/i.test(t.className)})},t.prototype.resetScrollSpyInfo=function(){this.scrollSpyToken&&(this.scrollSpyToken.unspy(),this.scrollSpyToken=null),this.activeItemIndex.next(null),this.activeElement$.next(null)},t.prototype.getId=function(t,e){var i=t.id;return i?n(i):(i=n(i=(t.textContent||"").trim().toLowerCase().replace(/\W+/g,"-")),t.id=i),i;function n(t){var i=(e.get(t)||0)+1;return e.set(t,i),1===i?t:t+"-"+i}},t}())}}]);