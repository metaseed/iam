(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"4T9E":function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"g",(function(){return c})),n.d(e,"f",(function(){return s})),n.d(e,"d",(function(){return r})),n.d(e,"e",(function(){return a})),n.d(e,"b",(function(){return l}));var i=function(t){return t.EditMode="[Document] edit mode",t.ViewMode="[Document] view mode",t.ShowPreview="[Document] show preview",t.Refresh="[Document] Refresh",t.HidePreview="[Document] hide preview",t.EditIt="[Document] edit it",t}({});class o{constructor(){this.type=i.EditMode}}class c{constructor(){this.type=i.ViewMode}}class s{constructor(){this.type=i.ShowPreview}}class r{constructor(){this.type=i.HidePreview}}class a{constructor(){this.type=i.Refresh}}class l{constructor(t){this.payload=t,this.type=i.EditIt}}},"71SZ":function(t,e,n){"use strict";n.d(e,"a",(function(){return C}));var i=n("q/PB"),o=n("sGad"),c=n("kt0X"),s=n("ZTXN"),r=n("g6G6"),a=n("Efrr"),l=n("btWG"),d=n("was7"),h=n("kuMc"),u=n("YtkY"),p=n("A2S1"),b=n("TLy2"),f=n("uYpP"),m=n("fXoL"),w=n("dNgK"),g=n("ofXK");const v=["viewContainerDiv"];function y(t,e){if(1&t&&m.Rb(0,"ms-reading-position-indicator",7),2&t){m.hc();const t=m.sc(8);m.mc("element",t)}}const O=function(t){return{container$:t}},k=function(t){return[t]};let C=(()=>{class t{constructor(t,e,n,b,f,m){this.store=t,this.snackBar=e,this.markdownService=n,this.ngZone=b,this._docRef=f,this._location=m,this.destroy$=new s.a,this.DocumentMode=d.a,this.docMode$=this.store.pipe(Object(c.k)(o.h)),this.editWithView$=this.store.pipe(Object(c.k)(o.i)),this.defaultTimeoutHandler=t=>this.snackBar.open(t.message,"ok",{duration:i.p}),this.isScrollDown$=this.store.select(o.k).pipe(Object(h.a)(this.destroy$)).subscribe(t=>{const e=t.isScrollDown;null!==e&&this.viewerContainerDiv&&(e?this.viewerContainerDiv.nativeElement.scrollTop+=50:this.viewerContainerDiv.nativeElement.scrollTop-=50)}),this.isLoadDone$=Object(r.a)(Object(l.q)(this.store,l.c.ReadDocument,i.r,this.defaultTimeoutHandler).pipe(Object(u.a)(t=>t.isNotStartStatus())),Object(l.p)(this.store,l.c.Create).pipe(Object(u.a)(t=>t.isNotStartStatus()))).pipe(Object(h.a)(this.destroy$),Object(p.b)(a.a))}ngAfterViewInit(){const t=this;this.container=new i.e(this.viewerContainerDiv.nativeElement,void 0,void 0,this.ngZone),this.viewerContainerDiv.nativeElement.focus(),this.scrollDown$=this.container.scrollDown$,this.markdownService.viewer$.next(this.container),setTimeout(t=>this.scroll(),500);let e=0;this.isLockScrollWithView$=this.store.pipe(Object(c.k)(o.j)),this.isLockScrollWithView$.pipe(Object(h.a)(this.destroy$)).subscribe(t=>{this.isLockScrollWithView=t}),this.markdownService.editor$.pipe(Object(h.a)(this.destroy$),Object(b.a)(t=>t.scrollDown$)).subscribe(n=>{if(this.isLockScrollWithView&&n.event){const i=n.event.target,o=i.scrollTop/(i.scrollHeight-i.clientHeight),c=o-e;e=o;const s=t.viewerContainerDiv.nativeElement;t.viewerContainerDiv.nativeElement.scrollTop+=(s.scrollHeight-s.clientHeight)*c}}),this.viewerContainerDiv.nativeElement.addEventListener("edit-it",t=>{this.store.dispatch(new o.a(t.detail))})}scroll(){const t=this.getCurrentHash();if(t){const e=this._docRef.document.getElementById(t);if(!e)return;e.scrollIntoView(),this.viewerContainerDiv.nativeElement.scrollTop=e.offsetTop-64}}getCurrentHash(){return decodeURIComponent(this._location.hash.replace(/^#/,""))}ngOnDestroy(){this.destroy$.next()}swipe(t){let e=t.target,n="",i=0;do{n=e.getAttribute("data-source-lines"),e=e.parentElement}while(!n&&e&&i++<4);this.store.dispatch(new o.a({sourceLine:JSON.parse(n)}))}swipeLeft(t){this.swipe(t)}swipeRight(t){this.swipe(t)}}return t.\u0275fac=function(e){return new(e||t)(m.Qb(c.c),m.Qb(w.c),m.Qb(f.a),m.Qb(m.z),m.Qb(i.n),m.Qb(g.D))},t.\u0275cmp=m.Kb({type:t,selectors:[["markdown-viewer-container"]],viewQuery:function(t,e){var n;1&t&&m.Hc(v,!0),2&t&&m.rc(n=m.ec())&&(e.viewerContainerDiv=n.first)},inputs:{markdown$:"markdown$",hideToolbar:"hideToolbar"},decls:11,vars:17,consts:[[3,"scrollHide","hide"],[3,"element",4,"ngIf"],[3,"isRunning"],[2,"position","relative","height","100%"],[1,"viewer-container"],["viewContainerDiv",""],[1,"markdown-viewer",3,"model","swipeleft","swiperight"],[3,"element"]],template:function(t,e){if(1&t&&(m.Rb(0,"ms-viewer-toolbar",0),m.ic(1,"async"),m.Cc(2,y,1,1,"ms-reading-position-indicator",1),m.ic(3,"async"),m.Rb(4,"sk-three-bounce",2),m.ic(5,"async"),m.Vb(6,"div",3),m.Vb(7,"div",4,5),m.Vb(9,"markdown-viewer",6),m.dc("swipeleft",(function(t){return e.swipeLeft(t)}))("swiperight",(function(t){return e.swipeRight(t)})),m.ic(10,"async"),m.Ub(),m.Ub(),m.Ub()),2&t){var n;const t=null==(n=m.jc(3,7,e.scrollDown$))?null:n.isDown;m.mc("scrollHide",m.pc(15,k,m.pc(13,O,e.markdownService.viewer$)))("hide",m.jc(1,5,e.docMode$)!==e.DocumentMode.View),m.Cb(2),m.mc("ngIf",t),m.Cb(2),m.mc("isRunning",!m.jc(5,9,e.isLoadDone$)),m.Cb(5),m.mc("model",m.jc(10,11,e.markdown$))}},styles:[".viewer-container[_ngcontent-%COMP%]{overflow-y:auto;overflow-x:auto;padding:0 3px;height:100%}@media (min-width:960px){.viewer-container[_ngcontent-%COMP%]{padding:0 16px}}.markdown-viewer[_ngcontent-%COMP%]{max-width:1000px;margin:auto}.markdown-viewer[_ngcontent-%COMP%]:focus{outline:none}"]}),t})()},G5Nz:function(t,e,n){"use strict";n.d(e,"a",(function(){return S}));var i=n("kuMc"),o=n("yCv1"),c=n("jIqt"),s=n("ZTXN"),r=n("vT4p"),a=n("HM3f"),l=n("0MNC"),d=n("fXoL"),h=n("q/PB"),u=n("javO"),p=n("ofXK"),b=n("NFeN");const f=["tocItem"];function m(t,e){1&t&&(d.Vb(0,"div",10),d.Dc(1,"Contents"),d.Ub())}function w(t,e){if(1&t){const t=d.Wb();d.Vb(0,"button",11),d.dc("click",(function(){return d.uc(t),d.hc(3).toggle(!1)})),d.Dc(1," Contents "),d.Rb(2,"mat-icon",12),d.Ub()}if(2&t){const t=d.hc(3);d.Db("aria-pressed",!t.isCollapsed),d.Cb(2),d.Gb("collapsed",t.isCollapsed)}}function g(t,e){if(1&t){const t=d.Wb();d.Vb(0,"li",14,15),d.Vb(2,"div",16),d.dc("click",(function(){d.uc(t);const e=d.hc().$implicit;return d.hc(3).navigate(e.href)})),d.Rb(3,"a",17),d.Ub(),d.Ub()}if(2&t){const t=d.hc(),e=t.$implicit,n=t.index,i=d.hc(3);d.Eb(e.level),d.Gb("secondary","EmbeddedExpandable"===i.type&&n>=i.primaryMax)("active",n===i.activeIndex),d.nc("title",e.title),d.Cb(3),d.mc("href",e.href,d.wc)("innerHTML",e.content,d.vc)}}function v(t,e){if(1&t&&(d.Tb(0),d.Cc(1,g,4,10,"li",13),d.Sb()),2&t){const t=e.$implicit,n=d.hc(3);d.Cb(1),d.mc("ngIf","Floating"===n.type||"h1"!==t.level)}}function y(t,e){if(1&t){const t=d.Wb();d.Vb(0,"button",18),d.dc("click",(function(){return d.uc(t),d.hc(3).toggle()})),d.Ub()}if(2&t){const t=d.hc(3);d.Gb("collapsed",t.isCollapsed),d.Db("aria-pressed",!t.isCollapsed)}}function O(t,e){if(1&t&&(d.Vb(0,"div",4),d.Cc(1,m,2,0,"div",5),d.Cc(2,w,3,3,"button",6),d.Vb(3,"ul",7),d.Cc(4,v,2,1,"ng-container",8),d.Ub(),d.Cc(5,y,1,3,"button",9),d.Ub()),2&t){const t=d.hc(2);d.Gb("collapsed",t.isCollapsed),d.Cb(1),d.mc("ngIf","EmbeddedSimple"===t.type),d.Cb(1),d.mc("ngIf","EmbeddedExpandable"===t.type),d.Cb(1),d.Gb("embedded","Floating"!==t.type),d.Cb(1),d.mc("ngForOf",t.tocList),d.Cb(1),d.mc("ngIf","EmbeddedExpandable"===t.type)}}function k(t,e){if(1&t&&(d.Vb(0,"div",2),d.Cc(1,O,6,8,"div",3),d.Ub()),2&t){const t=d.hc();d.Cb(1),d.mc("ngIf","None"!==t.type)}}function C(t,e){if(1&t){const t=d.Wb();d.Vb(0,"button",19),d.dc("click",(function(){return d.uc(t),d.hc().toggleToc()})),d.Dc(1," TOC\n"),d.Ub()}}let S=(()=>{class t{constructor(t,e,n,i,o){this.bm=t,this.scrollService=e,this.tocService=n,this.elementRef=i,this.location=o,this.activeIndex=null,this.type="None",this.show=!0,this.isCollapsed=!0,this.isEmbedded=!1,this.onDestroy=new s.a,this.primaryMax=4,t.observe([l.b.Small,l.b.XSmall]).subscribe(t=>{t.matches?(this.show=!1,this.isSmallScreen=!0):(this.show=!0,this.isSmallScreen=!1)}),this.isEmbedded=-1!==i.nativeElement.className.indexOf("embedded")}static prepareTitleAndToc(t,e,n,i){const o=t.querySelector("h1"),c=!!o&&!/no-?toc/i.test(o.className),s=t.querySelector("i-toc.embedded");return c&&!s?o.insertAdjacentHTML("afterend","<i-toc></i-toc>"):!c&&s&&s.remove(),()=>{n.reset();o&&c&&n.genToc(t,e)}}ngOnInit(){this.tocService.tocList.pipe(Object(i.a)(this.onDestroy),Object(o.a)(r.a)).subscribe(t=>{const e=(n=t=>"h1"!==t.level,t.reduce((t,e)=>n(e)?t+1:t,0));var n;this.type=e>0?this.isEmbedded?e>this.primaryMax?"EmbeddedExpandable":"EmbeddedSimple":"Floating":"None",this.tocList=t})}ngAfterViewInit(){this.isEmbedded||Object(a.b)(this.tocService.activeItemIndex$.pipe(Object(o.a)(r.a)),this.items.changes.pipe(Object(c.a)(this.items))).pipe(Object(i.a)(this.onDestroy)).subscribe(([t,e])=>{if(this.activeIndex=t,null==t||t>=e.length)return;const n=e.toArray()[t].nativeElement,i=n.offsetParent;if(!i)return;const o=n.getBoundingClientRect(),c=i.getBoundingClientRect();o.top>=c.top&&o.bottom<=c.bottom||(i.scrollTop+=o.top-(c.top+i.clientHeight/2))})}ngOnDestroy(){this.onDestroy.next()}toggle(t=!0){this.isCollapsed=!this.isCollapsed,t&&this.isCollapsed&&this.toTop()}onClick(t){this.elementRef.nativeElement.contains(t.target)||(this.show=!1)}navigate(t){this.isSmallScreen&&(this.show=!1)}toTop(){this.scrollService.scrollToTop()}toggleToc(){this.show=!this.show}}return t.\u0275fac=function(e){return new(e||t)(d.Qb(l.a),d.Qb(h.t),d.Qb(u.a),d.Qb(d.l),d.Qb(p.n))},t.\u0275cmp=d.Kb({type:t,selectors:[["i-toc"]],viewQuery:function(t,e){var n;1&t&&d.Hc(f,!0),2&t&&d.rc(n=d.ec())&&(e.items=n)},hostBindings:function(t,e){1&t&&d.dc("click",(function(t){return e.onClick(t)}),!1,d.tc)},decls:2,vars:2,consts:[["class","toc-container no-print",4,"ngIf"],["style","color:#ffffffcc;background-color: #c1c1c1aa;cursor:pointer;z-index:100;position:fixed;right:6px;bottom:30px;",3,"click",4,"ngIf"],[1,"toc-container","no-print"],["class","toc-inner no-print",3,"collapsed",4,"ngIf"],[1,"toc-inner","no-print"],["class","toc-heading embedded",4,"ngIf"],["type","button","class","toc-heading embedded secondary","title","Expand/collapse contents","aria-label","Expand/collapse contents",3,"click",4,"ngIf"],[1,"toc-list"],[4,"ngFor","ngForOf"],["type","button","class","toc-more-items embedded material-icons","title","Expand/collapse contents","aria-label","Expand/collapse contents",3,"collapsed","click",4,"ngIf"],[1,"toc-heading","embedded"],["type","button","title","Expand/collapse contents","aria-label","Expand/collapse contents",1,"toc-heading","embedded","secondary",3,"click"],["svgIcon","keyboard_arrow_right",1,"rotating-icon"],[3,"title","class","secondary","active",4,"ngIf"],[3,"title"],["tocItem",""],[2,"display","inline-block",3,"click"],[3,"href","innerHTML"],["type","button","title","Expand/collapse contents","aria-label","Expand/collapse contents",1,"toc-more-items","embedded","material-icons",3,"click"],[2,"color","#ffffffcc","background-color","#c1c1c1aa","cursor","pointer","z-index","100","position","fixed","right","6px","bottom","30px",3,"click"]],template:function(t,e){1&t&&(d.Cc(0,k,2,1,"div",0),d.Cc(1,C,2,0,"button",1)),2&t&&(d.mc("ngIf",e.show),d.Cb(1),d.mc("ngIf",e.tocService.isScrollUp))},directives:[p.t,p.s,b.a],encapsulation:2}),t})()},Kq4L:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"b",(function(){return c}));var i=function(t){return t.Save="[Edit] Save",t.LockScrollWithView="[Edit] Lock Scroll With View",t.EditorLoaded="[Edit] Editor Loaded",t.EditorUnloaded="[Edit] Editor Unloaded",t}({});class o{constructor(t){this.payload=t,this.type=i.Save}}class c{constructor(t){this.payload=t,this.type=i.LockScrollWithView}}},fnmL:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var i=n("FU6l"),o=n("HM3f"),c=n("GoAz");function s(...t){let e=null;return"function"==typeof t[t.length-1]&&(e=t.pop()),1===t.length&&Object(i.a)(t[0])&&(t=t[0].slice()),n=>n.lift.call(Object(c.a)([n,...t]),new o.a(e))}},javO:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var i=n("QQZH"),o=n("ofXK"),c=n("fXoL"),s=n("jhN1"),r=n("q/PB");let a=(()=>{class t{constructor(t,e,n){this.document=t,this.domSanitizer=e,this.scrollSpyService=n,this.tocList=new i.a(1),this.activeItemIndex$=new i.a(1),this.activeElement$=new i.a(1),this.scrollSpyToken=null,this.isScrollUp=!1}genToc(t,e=""){if(this.resetScrollSpyInfo(),!t)return void this.tocList.next([]);const n=this.findTocHeadings(t),i=new Map,o=n.map(t=>({content:this.extractHeadingSafeHtml(t),href:`${e}#${this.getId(t,i)}`,level:t.tagName.toLowerCase(),title:(t.textContent||"").trim()}));this.tocList.next(o),this.scrollSpyToken=this.scrollSpyService.spyOn(n,t,60),this.scrollSpyToken.activeScrollElement$.subscribe(t=>{this.activeItemIndex$.next(null==t?void 0:t.index),this.activeElement$.next(null==t?void 0:t.element)}),this.scrollSpyToken.isScrollDown$.subscribe(t=>{this.isScrollUp=!t.isDown})}reset(){this.resetScrollSpyInfo(),this.tocList.next([])}extractHeadingSafeHtml(t){const e=this.document.createElement("div");e.innerHTML=t.innerHTML;const n=e.querySelectorAll("a");for(let i=0;i<n.length;i++){const t=n[i];if(!t.classList.contains("deep-link")&&!t.classList.contains("edit-it")){const e=t.parentNode;for(;t.childNodes.length;)e.insertBefore(t.childNodes[0],t)}t.remove()}return this.domSanitizer.bypassSecurityTrustHtml(e.innerHTML.trim())}findTocHeadings(t){const e=t.querySelectorAll("h1,h2,h3");return Array.prototype.filter.call(e,t=>!/(?:no-toc|notoc)/i.test(t.className))}resetScrollSpyInfo(){this.scrollSpyToken&&(this.scrollSpyToken.unSpy(),this.scrollSpyToken=null),this.activeItemIndex$.next(null),this.activeElement$.next(null)}getId(t,e){let n=t.id;return n?i(n):(n=(t.textContent||"").trim().toLowerCase().replace(/\W+/g,"-"),n=i(n),t.id=n),n;function i(t){const n=(e.get(t)||0)+1;return e.set(t,n),1===n?t:`${t}-${n}`}}}return t.\u0275fac=function(e){return new(e||t)(c.Zb(o.e),c.Zb(s.b),c.Zb(r.u))},t.\u0275prov=c.Mb({token:t,factory:t.\u0275fac}),t})()},nJwD:function(t,e,n){"use strict";n.d(e,"a",(function(){return x}));var i=n("4T9E"),o=n("ofXK"),c=n("kuMc"),s=n("YtkY"),r=n("fnmL"),a=n("xVbo"),l=n("8j5Y"),d=n("J+dc"),h=n("q/PB"),u=n("kt0X"),p=n("sGad"),b=n("was7"),f=n("71SZ"),m=n("ZTXN"),w=n("g6G6"),g=n("btWG"),v=n("uYpP"),y=n("fXoL"),O=n("tk/3"),k=n("tyNb"),C=n("ZYfY"),S=n("103i");const j=["viewerDiv"],E=["editorDiv"];let x=(()=>{class t{constructor(t,e,n,o,a,l,d,h){this.markdownService=t,this._http=e,this.baseHref=n,this.changeDetecorRef=o,this.route=a,this.router=l,this.store=d,this.utils=h,this.fixEditButton=!1,this.destroy$=new m.a,this.docMode$=this.store.pipe(Object(u.k)(p.h),Object(c.a)(this.destroy$)),this.showEdit$=this.docMode$.pipe(Object(s.a)(t=>t===b.a.Edit)),this.isScreenWide$=this.utils.isScreenWide$,this.showView$=Object(w.a)(this.showEdit$.pipe(Object(r.a)(this.isScreenWide$),Object(s.a)(([t,e])=>t&&!e?(this.store.dispatch(new i.d),!1):(this.store.dispatch(new i.f),!0))),this.store.select(p.i))}ngOnInit(){this.markdown$=Object(w.a)(this.store.select(g.w).pipe(Object(a.a)(t=>t&&!t.isUpdateMeta),Object(s.a)(t=>t&&t.content?t.content.content:"")),this.markdownService.editorContentChanged$).pipe(Object(h.z)(80,1e3))}ngOnDestroy(){this.store.dispatch(new g.k({id:void 0})),this.destroy$.next()}ngAfterViewChecked(){this.changeDetecorRef.detectChanges()}ngAfterViewInit(){this.route.queryParamMap.pipe(Object(l.a)(t=>{if(this.router.url.startsWith("/doc/new")){const e=t.get("f");this.store.dispatch(new g.d({format:e})),this.store.dispatch(new i.c)}else{const e=t.get("title"),n=+t.get("id"),i=t.get("f");this.store.dispatch(new g.f({id:n,title:e,format:i}))}}),Object(d.a)(1)).subscribe()}showDemo(){this._http.get(this.baseHref+"assets/markdown.md",{responseType:"text"}).subscribe(()=>{})}}return t.\u0275fac=function(e){return new(e||t)(y.Qb(v.a),y.Qb(O.b),y.Qb(o.a),y.Qb(y.h),y.Qb(k.a),y.Qb(k.f),y.Qb(u.c),y.Qb(C.a))},t.\u0275cmp=y.Kb({type:t,selectors:[["ms-markdown"]],viewQuery:function(t,e){var n;1&t&&(y.Hc(f.a,!0),y.Hc(j,!0),y.Hc(E,!0)),2&t&&(y.rc(n=y.ec())&&(e.viewer=n.first),y.rc(n=y.ec())&&(e.viewerDiv=n.first),y.rc(n=y.ec())&&(e.editorDiv=n.first))},decls:10,vars:9,consts:[[1,"markdown-container"],["primary-component-minsize","100","secondary-component-minsize","100","local-storage-key","iam-md-split-pane","primary-component-initialratio","0.5",3,"primary-component-toggled-off","secondary-component-toggled-off"],[1,"split-pane-content-primary"],["editorDiv",""],[1,"split-pane-content-secondary"],["viewerDiv",""],[3,"markdown$"]],template:function(t,e){1&t&&(y.Vb(0,"div",0),y.Vb(1,"vertical-split-pane",1),y.ic(2,"async"),y.ic(3,"async"),y.Vb(4,"div",2,3),y.Rb(6,"router-outlet"),y.Ub(),y.Vb(7,"div",4,5),y.Rb(9,"markdown-viewer-container",6),y.Ub(),y.Ub(),y.Ub()),2&t&&(y.Gb("fullscreen",e.isFullScreen),y.Cb(1),y.mc("primary-component-toggled-off",!y.jc(2,5,e.showEdit$))("secondary-component-toggled-off",!y.jc(3,7,e.showView$)),y.Cb(8),y.mc("markdown$",e.markdown$))},directives:[S.a,k.k,f.a],pipes:[o.b],styles:['.markdown-container[_ngcontent-%COMP%]   .md-footer[_ngcontent-%COMP%]{padding:2px;background-color:#f0f0f0;border-top:1px solid rgba(0,0,0,.1)}.markdown-container.fullscreen[_ngcontent-%COMP%]{margin:0;position:fixed;border:0;top:0;left:0;width:100%;height:100%;z-index:99999999}.split-pane-content-secondary[_ngcontent-%COMP%]{height:100%}.markdown-container.fullscreen[_ngcontent-%COMP%]   .md-editor-panel[_ngcontent-%COMP%], .markdown-container.fullscreen[_ngcontent-%COMP%]   .md-view-panel[_ngcontent-%COMP%]{height:calc(100vh - 40px)!important}.markdown-container[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%] > .btn[_ngcontent-%COMP%]:first-child:before{content:" ";background-color:#a9a9a9;width:1px;height:24px;left:-9px;top:2px;position:absolute}.markdown-container[_ngcontent-%COMP%]{height:100vh;overflow:hidden}.markdown-container[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn-group.hide-split[_ngcontent-%COMP%] > .btn[_ngcontent-%COMP%]:first-child:before{display:none}.markdown-container[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{margin-bottom:0}.markdown-container[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%]{display:flex}.markdown-container[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{flex:1 1 0;width:0;min-height:200px}']}),t})()},sGad:function(t,e,n){"use strict";n.d(e,"h",(function(){return b})),n.d(e,"i",(function(){return f})),n.d(e,"g",(function(){return m})),n.d(e,"j",(function(){return g})),n.d(e,"k",(function(){return v})),n.d(e,"b",(function(){return y.c})),n.d(e,"c",(function(){return y.g})),n.d(e,"a",(function(){return y.b})),n.d(e,"d",(function(){return c})),n.d(e,"f",(function(){return d})),n.d(e,"e",(function(){return h}));var i=n("kt0X"),o=function(t){return t.Scroll="[View] Scroll",t}({});class c{constructor(t){this.payload=t,this.type=o.Scroll}}const s={isScrollDown:null};var r=n("was7"),a=n("Kq4L");const l={save:"",lockScrollWithView:!1,editor:void 0,content:void 0},d="markdown",h={document:r.e,edit:function(t=l,e){switch(e.type){case a.a.Save:return Object.assign(Object.assign({},t),{save:e.payload});case a.a.LockScrollWithView:return Object.assign(Object.assign({},t),{lockScrollWithView:e.payload});default:return t}},view:function(t=s,e){switch(e.type){case o.Scroll:return Object.assign(Object.assign({},t),{isScrollDown:e.payload.isScrollDown});default:return t}}},u=Object(i.i)(d),p=Object(i.j)(u,t=>t.document),b=Object(i.j)(p,r.c),f=Object(i.j)(p,r.d),m=Object(i.j)(p,r.b),w=Object(i.j)(u,t=>t.edit),g=(Object(i.j)(w,t=>t.save),Object(i.j)(w,t=>t.lockScrollWithView)),v=Object(i.j)(u,t=>t.view);Object(i.j)(v,t=>t.isScrollDown);var y=n("4T9E")},uYpP:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));const i=new(n("fXoL").q)("MARKDOWN_SERVICE_TOKEN")},was7:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"e",(function(){return s})),n.d(e,"c",(function(){return r})),n.d(e,"d",(function(){return a})),n.d(e,"b",(function(){return l}));var i=n("4T9E"),o=function(t){return t[t.View=0]="View",t[t.Edit=1]="Edit",t}({});const c={mode:o.View,showPreview:null};function s(t=c,e){switch(e.type){case i.a.EditMode:return document.iamMarkdownIsPureViewMode=!1,Object.assign(Object.assign({},t),{mode:o.Edit});case i.a.ViewMode:return document.iamMarkdownIsPureViewMode=!0,Object.assign(Object.assign({},t),{mode:o.View});case i.a.ShowPreview:return Object.assign(Object.assign({},t),{showPreview:!0});case i.a.HidePreview:return Object.assign(Object.assign({},t),{showPreview:!1});case i.a.EditIt:return Object.assign(Object.assign({},t),{editIt:e.payload});default:return t}}const r=t=>t.mode,a=t=>t.showPreview,l=t=>t.editIt}}]);