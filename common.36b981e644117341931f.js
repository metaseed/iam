(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"2Q+G":function(t,e,n){"use strict";n.d(e,"a",function(){return a}),n.d(e,"d",function(){return l}),n.d(e,"b",function(){return d}),n.d(e,"c",function(){return p});var i=n("CcnG"),o=(n("mVsa"),n("Ip0R")),r=(n("eDkP"),n("Fzqc"),n("Wf4p")),s=n("dWZg"),c=(n("4c35"),n("qAlS"),n("wFw1")),a=(n("lLAP"),i.Pa({encapsulation:2,styles:[".mat-menu-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;max-height:calc(100vh - 48px);border-radius:2px;outline:0}.mat-menu-panel:not([class*=mat-elevation-z]){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}@media screen and (-ms-high-contrast:active){.mat-menu-panel{outline:solid 1px}}.mat-menu-content:not(:empty){padding-top:8px;padding-bottom:8px}.mat-menu-item{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;max-width:100%;position:relative}.mat-menu-item::-moz-focus-inner{border:0}.mat-menu-item[disabled]{cursor:default}[dir=rtl] .mat-menu-item{text-align:right}.mat-menu-item .mat-icon{margin-right:16px;vertical-align:middle}.mat-menu-item .mat-icon svg{vertical-align:top}[dir=rtl] .mat-menu-item .mat-icon{margin-left:16px;margin-right:0}@media screen and (-ms-high-contrast:active){.mat-menu-item-highlighted,.mat-menu-item.cdk-keyboard-focused,.mat-menu-item.cdk-program-focused{outline:dotted 1px}}.mat-menu-item-submenu-trigger{padding-right:32px}.mat-menu-item-submenu-trigger::after{width:0;height:0;border-style:solid;border-width:5px 0 5px 5px;border-color:transparent transparent transparent currentColor;content:'';display:inline-block;position:absolute;top:50%;right:16px;transform:translateY(-50%)}[dir=rtl] .mat-menu-item-submenu-trigger{padding-right:16px;padding-left:32px}[dir=rtl] .mat-menu-item-submenu-trigger::after{right:auto;left:16px;transform:rotateY(180deg) translateY(-50%)}.mat-menu-panel.ng-animating .mat-menu-item-submenu-trigger{pointer-events:none}button.mat-menu-item{width:100%}.mat-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}"],data:{animation:[{type:7,name:"transformMenu",definitions:[{type:0,name:"void",styles:{type:6,styles:{opacity:0,transform:"scale(0.01, 0.01)"},offset:null},options:void 0},{type:1,expr:"void => enter",animation:{type:2,steps:[{type:11,selector:".mat-menu-content",animation:{type:6,styles:{opacity:0},offset:null},options:null},{type:4,styles:{type:6,styles:{opacity:1,transform:"scale(1, 0.5)"},offset:null},timings:"100ms linear"},{type:3,steps:[{type:11,selector:".mat-menu-content",animation:{type:4,styles:{type:6,styles:{opacity:1},offset:null},timings:"400ms cubic-bezier(0.55, 0, 0.55, 0.2)"},options:null},{type:4,styles:{type:6,styles:{transform:"scale(1, 1)"},offset:null},timings:"300ms cubic-bezier(0.25, 0.8, 0.25, 1)"}],options:null}],options:null},options:null},{type:1,expr:"* => void",animation:{type:4,styles:{type:6,styles:{opacity:0},offset:null},timings:"150ms 50ms linear"},options:null}],options:{}},{type:7,name:"fadeInItems",definitions:[{type:0,name:"showing",styles:{type:6,styles:{opacity:1},offset:null},options:void 0},{type:1,expr:"void => *",animation:[{type:6,styles:{opacity:0},offset:null},{type:4,styles:null,timings:"400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)"}],options:null}],options:{}}]}}));function u(t){return i.kb(0,[(t()(),i.Ra(0,0,null,null,3,"div",[["class","mat-menu-panel"],["role","menu"],["tabindex","-1"]],[[24,"@transformMenu",0]],[[null,"keydown"],[null,"click"],[null,"@transformMenu.start"],[null,"@transformMenu.done"]],function(t,e,n){var i=!0,o=t.component;return"keydown"===e&&(i=!1!==o._handleKeydown(n)&&i),"click"===e&&(i=!1!==o.closed.emit("click")&&i),"@transformMenu.start"===e&&(i=0!=(o._isAnimating=!0)&&i),"@transformMenu.done"===e&&(i=!1!==o._onAnimationDone(n)&&i),i},null,null)),i.Qa(1,278528,null,0,o.i,[i.r,i.s,i.k,i.E],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(t()(),i.Ra(2,0,null,null,1,"div",[["class","mat-menu-content"]],null,null,null,null,null)),i.ab(null,0)],function(t,e){t(e,1,0,"mat-menu-panel",e.component._classList)},function(t,e){t(e,0,0,e.component._panelAnimationState)})}function l(t){return i.kb(2,[i.gb(402653184,1,{templateRef:0}),(t()(),i.Ia(0,[[1,2]],null,0,null,u))],null,null)}var d=i.Pa({encapsulation:2,styles:[],data:{}});function p(t){return i.kb(2,[i.ab(null,0),(t()(),i.Ra(1,0,null,null,1,"div",[["class","mat-menu-ripple mat-ripple"],["matRipple",""]],[[2,"mat-ripple-unbounded",null]],null,null,null,null)),i.Qa(2,212992,null,0,r.f,[i.k,i.y,s.a,[2,r.d],[2,c.a]],{disabled:[0,"disabled"],trigger:[1,"trigger"]},null)],function(t,e){var n=e.component;t(e,2,0,n.disableRipple||n.disabled,n._getHostElement())},function(t,e){t(e,1,0,i.bb(e,2).unbounded)})}},"4T9E":function(t,e,n){"use strict";var i;n.d(e,"a",function(){return i}),n.d(e,"c",function(){return o}),n.d(e,"g",function(){return r}),n.d(e,"f",function(){return s}),n.d(e,"d",function(){return c}),n.d(e,"e",function(){return a}),n.d(e,"b",function(){return u}),function(t){t.EditMode="[Document] edit mode",t.ViewMode="[Document] view mode",t.ShowPreview="[Document] show preview",t.Refresh="[Document] Refresh",t.HidePreview="[Document] hide preview",t.EditIt="[Document] edit it"}(i||(i={}));var o=function(){return function(){this.type=i.EditMode}}(),r=function(){return function(){this.type=i.ViewMode}}(),s=function(){return function(){this.type=i.ShowPreview}}(),c=function(){return function(){this.type=i.HidePreview}}(),a=function(){return function(){this.type=i.Refresh}}(),u=function(){return function(t){this.payload=t,this.type=i.EditIt}}()},"71SZ":function(t,e,n){"use strict";n.d(e,"a",function(){return m});var i=n("q/PB"),o=n("sGad"),r=n("yGQT"),s=n("K9Ia"),c=n("p0ib"),a=n("T1DM"),u=n("btWG"),l=n("was7"),d=n("67Y/"),p=n("ny24"),f=n("mZXl"),h=n("15JJ"),m=(n("uYpP"),function(){function t(t,e,n,h,m,v){var y=this;this.store=t,this.snackBar=e,this.markdownService=n,this.ngZone=h,this._docRef=m,this._location=v,this.destroy$=new s.a,this.DocumentMode=l.a,this.docMode$=this.store.pipe(Object(r.E)(o.d)),this.editWithView$=this.store.pipe(Object(r.E)(o.e)),this.defaultTimeoutHandler=function(t){return y.snackBar.open(t.message,"ok",{duration:i.i})},this.isLoadDone$=Object(c.a)(Object(u.l)(this.store,u.b.ReadDocument,i.j,this.defaultTimeoutHandler).pipe(Object(d.a)(function(t){return t.isNotStartStatus()})),Object(u.j)(this.store,u.b.Create).pipe(Object(d.a)(function(t){return t.isNotStartStatus()}))).pipe(Object(p.a)(this.destroy$),Object(f.b)(a.a))}return t.prototype.ngAfterViewInit=function(){var t=this,e=this;this.container=new i.a(this.viewerContainerDiv.nativeElement,void 0,void 0,this.ngZone),this.viewerContainerDiv.nativeElement.focus(),this.scrollDown$=this.container.scrollDown$,this.markdownService.viewer$.next(this.container),setTimeout(function(e){return t.scroll()},500);var n=0;this.isLockScrollWithView$=this.store.pipe(Object(r.E)(o.f)),this.isLockScrollWithView$.pipe(Object(p.a)(this.destroy$)).subscribe(function(e){t.isLockScrollWithView=e}),this.markdownService.editor$.pipe(Object(p.a)(this.destroy$),Object(h.a)(function(t){return t.scrollDown$})).subscribe(function(i){if(t.isLockScrollWithView&&i.event){var o=i.event.target,r=o.scrollTop/(o.scrollHeight-o.clientHeight),s=r-n;n=r;var c=e.viewerContainerDiv.nativeElement;e.viewerContainerDiv.nativeElement.scrollTop+=(c.scrollHeight-c.clientHeight)*s}}),this.viewerContainerDiv.nativeElement.addEventListener("edit-it",function(e){t.store.dispatch(new o.a(e.detail))})},t.prototype.scroll=function(){var t=this.getCurrentHash();if(t){var e=this._docRef.document.getElementById(t);e.scrollIntoView(),this.viewerContainerDiv.nativeElement.scrollTop=e.offsetTop-64}},t.prototype.getCurrentHash=function(){return decodeURIComponent(this._location.hash.replace(/^#/,""))},t.prototype.ngOnDestroy=function(){this.destroy$.next()},t}())},DWHh:function(t,e,n){"use strict";n.d(e,"a",function(){return o});var i={notUsed:null};function o(t,e){return void 0===t&&(t=i),t}},G5Nz:function(t,e,n){"use strict";n.d(e,"a",function(){return l});var i=n("ny24"),o=n("9dfq"),r=n("p0Sj"),s=n("K9Ia"),c=n("KQya"),a=n("dzgT"),u=(n("javO"),n("q/PB"),n("vGXY")),l=function(){function t(t,e,n,i,o){var r=this;this.bm=t,this.scrollService=e,this.tocService=n,this.elementRef=i,this.location=o,this.activeIndex=null,this.type="None",this.show=!0,this.isCollapsed=!0,this.isEmbedded=!1,this.onDestroy=new s.a,this.primaryMax=4,t.observe([u.b.Small,u.b.XSmall]).subscribe(function(t){t.matches?(r.show=!1,r.isSmallScreen=!0):(r.show=!0,r.isSmallScreen=!1)}),this.isEmbedded=-1!==i.nativeElement.className.indexOf("embedded")}return t.prepareTitleAndToc=function(t,e,n,i){var o=t.querySelector("h1"),r=!!o&&!/no-?toc/i.test(o.className),s=t.querySelector("i-toc.embedded");return r&&!s?o.insertAdjacentHTML("afterend","<i-toc></i-toc>"):!r&&s&&s.remove(),function(){n.reset(),o&&r&&n.genToc(t,e)}},t.prototype.ngOnInit=function(){var t=this;this.tocService.tocList.pipe(Object(i.a)(this.onDestroy),Object(o.a)(c.a)).subscribe(function(e){var n,i=(n=function(t){return"h1"!==t.level},e.reduce(function(t,e){return n(e)?t+1:t},0));t.type=i>0?t.isEmbedded?i>t.primaryMax?"EmbeddedExpandable":"EmbeddedSimple":"Floating":"None",t.tocList=e})},t.prototype.ngAfterViewInit=function(){var t=this;this.isEmbedded||Object(a.b)(this.tocService.activeItemIndex.pipe(Object(o.a)(c.a)),this.items.changes.pipe(Object(r.a)(this.items))).pipe(Object(i.a)(this.onDestroy)).subscribe(function(e){var n=e[0],i=e[1];if(t.activeIndex=n,!(null===n||n>=i.length)){var o=i.toArray()[n].nativeElement,r=o.offsetParent;if(r){var s=o.getBoundingClientRect(),c=r.getBoundingClientRect();s.top>=c.top&&s.bottom<=c.bottom||(r.scrollTop+=s.top-c.top-r.clientHeight/2)}}})},t.prototype.ngOnDestroy=function(){this.onDestroy.next()},t.prototype.toggle=function(t){void 0===t&&(t=!0),this.isCollapsed=!this.isCollapsed,t&&this.isCollapsed&&this.toTop()},t.prototype.onClick=function(t){this.elementRef.nativeElement.contains(t.target)||(this.show=!1)},t.prototype.navigate=function(t){this.isSmallScreen&&(this.show=!1)},t.prototype.toTop=function(){this.scrollService.scrollToTop()},t.prototype.toggleToc=function(){this.show=!this.show},t}()},Khft:function(t,e,n){"use strict";n.d(e,"b",function(){return s}),n.d(e,"a",function(){return c});var i=n("Kq4L"),o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r={save:"",lockScrollWithView:!1,editor:void 0,content:void 0};function s(t,e){switch(void 0===t&&(t=r),e.type){case i.a.Save:return o({},t,{save:e.payload});case i.a.LockScrollWithView:return o({},t,{lockScrollWithView:e.payload});default:return t}}var c=function(t){return t.save}},Kq4L:function(t,e,n){"use strict";var i;n.d(e,"a",function(){return i}),n.d(e,"c",function(){return o}),n.d(e,"b",function(){return r}),function(t){t.Save="[Edit] Save",t.LockScrollWithView="[Edit] Lock Scroll With View",t.EditorLoaded="[Edit] Editor Loaded",t.EditorUnloaded="[Edit] Editor Unloaded"}(i||(i={}));var o=function(){return function(t){this.payload=t,this.type=i.Save}}(),r=function(){return function(t){this.payload=t,this.type=i.LockScrollWithView}}()},javO:function(t,e,n){"use strict";n.d(e,"a",function(){return o});var i=n("S5bw"),o=(n("q/PB"),function(){function t(t,e,n){this.document=t,this.domSanitizer=e,this.scrollSpyService=n,this.tocList=new i.a(1),this.activeItemIndex=new i.a(1),this.activeElement$=new i.a(1),this.scrollSpyToken=null,this.isScrollUp=!1}return t.prototype.genToc=function(t,e){var n=this;if(void 0===e&&(e=""),this.resetScrollSpyInfo(),t){var i=this.findTocHeadings(t),o=new Map,r=i.map(function(t){return{content:n.extractHeadingSafeHtml(t),href:e+"#"+n.getId(t,o),level:t.tagName.toLowerCase(),title:(t.textContent||"").trim()}});this.tocList.next(r),this.scrollSpyToken=this.scrollSpyService.spyOn(i,t,60),this.scrollSpyToken.activeScrollElement$.subscribe(function(t){n.activeItemIndex.next(t&&t.index),n.activeElement$.next(t&&t.element)}),this.scrollSpyToken.isScrollDown$.subscribe(function(t){n.isScrollUp=!t.isDown})}else this.tocList.next([])},t.prototype.reset=function(){this.resetScrollSpyInfo(),this.tocList.next([])},t.prototype.extractHeadingSafeHtml=function(t){var e=this.document.createElement("div");e.innerHTML=t.innerHTML;for(var n=e.querySelectorAll("a"),i=0;i<n.length;i++){var o=n[i];if(!o.classList.contains("deep-link")&&!o.classList.contains("edit-it"))for(var r=o.parentNode;o.childNodes.length;)r.insertBefore(o.childNodes[0],o);o.remove()}return this.domSanitizer.bypassSecurityTrustHtml(e.innerHTML.trim())},t.prototype.findTocHeadings=function(t){var e=t.querySelectorAll("h1,h2,h3");return Array.prototype.filter.call(e,function(t){return!/(?:no-toc|notoc)/i.test(t.className)})},t.prototype.resetScrollSpyInfo=function(){this.scrollSpyToken&&(this.scrollSpyToken.unspy(),this.scrollSpyToken=null),this.activeItemIndex.next(null),this.activeElement$.next(null)},t.prototype.getId=function(t,e){var n=t.id;return n?i(n):(n=i(n=(t.textContent||"").trim().toLowerCase().replace(/\W+/g,"-")),t.id=n),n;function i(t){var n=(e.get(t)||0)+1;return e.set(t,n),1===n?t:t+"-"+n}},t}())},nJwD:function(t,e,n){"use strict";n.d(e,"a",function(){return v});var i=n("4T9E"),o=n("ny24"),r=n("67Y/"),s=n("x1Tk"),c=n("xMyE"),a=n("t9fZ"),u=n("q/PB"),l=n("yGQT"),d=n("sGad"),p=n("was7"),f=(n("71SZ"),n("K9Ia")),h=n("p0ib"),m=n("btWG"),v=(n("ZYfY"),n("uYpP"),function(){function t(t,e,n,c,a,u,m,v){var y=this;this.markdownService=t,this._http=e,this.baseHref=n,this.changeDetecorRef=c,this.route=a,this.router=u,this.store=m,this.utils=v,this.fixEditButton=!1,this.destroy$=new f.a,this.docMode$=this.store.pipe(Object(l.E)(d.d),Object(o.a)(this.destroy$)),this.showEdit$=this.docMode$.pipe(Object(r.a)(function(t){return t===p.a.Edit})),this.isScreenWide$=this.utils.isScreenWide$,this.showView$=Object(h.a)(this.showEdit$.pipe(Object(s.a)(this.isScreenWide$),Object(r.a)(function(t){return t[0]&&!t[1]?(y.store.dispatch(new i.d),!1):(y.store.dispatch(new i.f),!0)})),this.store.select(d.e))}return t.prototype.ngOnInit=function(){this.markdown$=Object(h.a)(this.store.select(m.n).pipe(Object(r.a)(function(t){return t&&t.content?t.content.content:""})),this.markdownService.editorContentChanged$).pipe(Object(u.l)(80,1e3))},t.prototype.ngOnDestroy=function(){this.store.dispatch(new m.i({id:void 0})),this.destroy$.next()},t.prototype.ngAfterViewChecked=function(){this.changeDetecorRef.detectChanges()},t.prototype.ngAfterViewInit=function(){var t=this;this.route.queryParamMap.pipe(Object(c.a)(function(e){if(t.router.url.startsWith("/doc/new")){var n=e.get("f");t.store.dispatch(new m.c({format:n})),t.store.dispatch(new i.c)}else{var o=e.get("title"),r=+e.get("id");n=e.get("f"),t.store.dispatch(new m.e({id:r,title:o,format:n}))}}),Object(a.a)(1)).subscribe()},t.prototype.showDemo=function(){this._http.get(this.baseHref+"assets/markdown.md",{responseType:"text"}).subscribe(function(){})},t}())},sGad:function(t,e,n){"use strict";var i,o=n("yGQT"),r=n("DWHh"),s=n("was7"),c=n("Khft"),a={document:s.e,edit:c.b,view:r.a},u=Object(o.B)("markdown"),l=Object(o.D)(u,function(t){return t.document}),d=Object(o.D)(l,s.c),p=Object(o.D)(l,s.d),f=Object(o.D)(l,s.b),h=Object(o.D)(u,function(t){return t.edit}),m=Object(o.D)(h,c.a),v=Object(o.D)(h,function(t){return t.lockScrollWithView}),y=Object(o.D)(u,function(t){return t.view}),b=n("4T9E");!function(t){t.NotUsed="[View] Scroll Down"}(i||(i={}));var w=function(){return function(t){this.payload=t,this.type=i.NotUsed}}(),g=n("Kq4L");n.d(e,!1,function(){return u}),n.d(e,!1,function(){return l}),n.d(e,"d",function(){return d}),n.d(e,"e",function(){return p}),n.d(e,"c",function(){return f}),n.d(e,!1,function(){return h}),n.d(e,!1,function(){return m}),n.d(e,"f",function(){return v}),n.d(e,!1,function(){return y}),n.d(e,!1,function(){return b.a}),n.d(e,"b",function(){return b.c}),n.d(e,!1,function(){return b.g}),n.d(e,!1,function(){return b.f}),n.d(e,!1,function(){return b.d}),n.d(e,!1,function(){return b.e}),n.d(e,"a",function(){return b.b}),n.d(e,!1,function(){return g.a}),n.d(e,!1,function(){return g.c}),n.d(e,!1,function(){return g.b}),n.d(e,!1,function(){return i}),n.d(e,!1,function(){return w}),n.d(e,!1,function(){return"markdown"}),n.d(e,!1,function(){return a})},uYpP:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i=new(n("CcnG").p)("MARKDOWN_SERVICE_TOKEN")},was7:function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"e",function(){return c}),n.d(e,"c",function(){return a}),n.d(e,"d",function(){return u}),n.d(e,"b",function(){return l});var i=n("4T9E"),o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r=function(t){return t[t.View=0]="View",t[t.Edit=1]="Edit",t}({}),s={mode:r.View,showPreview:null};function c(t,e){switch(void 0===t&&(t=s),e.type){case i.a.EditMode:return document.iamMarkdownIsPureViewMode=!1,o({},t,{mode:r.Edit});case i.a.ViewMode:return document.iamMarkdownIsPureViewMode=!0,o({},t,{mode:r.View});case i.a.ShowPreview:return o({},t,{showPreview:!0});case i.a.HidePreview:return o({},t,{showPreview:!1});case i.a.EditIt:return o({},t,{editIt:e.payload});default:return t}}var a=function(t){return t.mode},u=function(t){return t.showPreview},l=function(t){return t.editIt}}}]);