(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"4T9E":function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"g",(function(){return r})),n.d(e,"f",(function(){return c})),n.d(e,"d",(function(){return s})),n.d(e,"e",(function(){return a})),n.d(e,"b",(function(){return d}));var i=function(t){return t.EditMode="[Document] edit mode",t.ViewMode="[Document] view mode",t.ShowPreview="[Document] show preview",t.Refresh="[Document] Refresh",t.HidePreview="[Document] hide preview",t.EditIt="[Document] edit it",t}({});class o{constructor(){this.type=i.EditMode}}class r{constructor(){this.type=i.ViewMode}}class c{constructor(){this.type=i.ShowPreview}}class s{constructor(){this.type=i.HidePreview}}class a{constructor(){this.type=i.Refresh}}class d{constructor(t){this.payload=t,this.type=i.EditIt}}},"71SZ":function(t,e,n){"use strict";n.d(e,"a",(function(){return y}));var i=n("q/PB"),o=n("sGad"),r=n("kt0X"),c=n("ZTXN"),s=n("g6G6"),a=n("Efrr"),d=n("btWG"),l=n("was7"),u=n("kuMc"),h=n("YtkY"),w=n("A2S1"),p=n("TLy2"),f=n("uYpP"),b=n("fXoL"),v=n("dNgK"),m=n("ofXK");const g=["viewContainerDiv"];function O(t,e){if(1&t&&b.Rb(0,"ms-reading-position-indicator",7),2&t){b.ic();const t=b.tc(8);b.nc("element",t)}}const k=function(t){return{container$:t}},j=function(t){return[t]};let y=(()=>{class t{constructor(t,e,n,p,f,b){this.store=t,this.snackBar=e,this.markdownService=n,this.ngZone=p,this._docRef=f,this._location=b,this.destroy$=new c.a,this.DocumentMode=l.a,this.docMode$=this.store.pipe(Object(r.k)(o.h)),this.editWithView$=this.store.pipe(Object(r.k)(o.i)),this.defaultTimeoutHandler=t=>this.snackBar.open(t.message,"ok",{duration:i.p}),this.isScrollDown$=this.store.select(o.k).pipe(Object(u.a)(this.destroy$)).subscribe(t=>{const e=t.isScrollDown;null!==e&&this.viewerContainerDiv&&(e?this.viewerContainerDiv.nativeElement.scrollTop+=50:this.viewerContainerDiv.nativeElement.scrollTop-=50)}),this.isLoadDone$=Object(s.a)(Object(d.u)(this.store,d.c.ReadDocument,i.r,this.defaultTimeoutHandler).pipe(Object(h.a)(t=>t.isNotStartStatus())),Object(d.r)(this.store,d.c.Create).pipe(Object(h.a)(t=>t.isNotStartStatus()))).pipe(Object(u.a)(this.destroy$),Object(w.b)(a.a))}ngAfterViewInit(){const t=this;this.container=new i.e(this.viewerContainerDiv.nativeElement,void 0,void 0,this.ngZone),this.viewerContainerDiv.nativeElement.focus(),this.scrollDown$=this.container.scrollDown$,this.markdownService.viewer$.next(this.container),setTimeout(t=>this.scroll(),500);let e=0;this.isLockScrollWithView$=this.store.pipe(Object(r.k)(o.j)),this.isLockScrollWithView$.pipe(Object(u.a)(this.destroy$)).subscribe(t=>{this.isLockScrollWithView=t}),this.markdownService.editor$.pipe(Object(u.a)(this.destroy$),Object(p.a)(t=>t.scrollDown$)).subscribe(n=>{if(this.isLockScrollWithView&&n.event){const i=n.event.target,o=i.scrollTop/(i.scrollHeight-i.clientHeight),r=o-e;e=o;const c=t.viewerContainerDiv.nativeElement;t.viewerContainerDiv.nativeElement.scrollTop+=(c.scrollHeight-c.clientHeight)*r}}),this.viewerContainerDiv.nativeElement.addEventListener("edit-it",t=>{this.store.dispatch(new o.a(t.detail))})}scroll(){const t=this.getCurrentHash();if(t){const e=this._docRef.document.getElementById(t);if(!e)return;e.scrollIntoView(),this.viewerContainerDiv.nativeElement.scrollTop=e.offsetTop-64}}getCurrentHash(){return decodeURIComponent(this._location.hash.replace(/^#/,""))}ngOnDestroy(){this.destroy$.next()}swipe(t){let e=t.target,n="",i=0;do{n=e.getAttribute("data-source-lines"),e=e.parentElement}while(!n&&e&&i++<4);this.store.dispatch(new o.a({sourceLine:JSON.parse(n)}))}swipeLeft(t){this.swipe(t)}swipeRight(t){this.swipe(t)}}return t.\u0275fac=function(e){return new(e||t)(b.Qb(r.c),b.Qb(v.c),b.Qb(f.a),b.Qb(b.z),b.Qb(i.n),b.Qb(m.D))},t.\u0275cmp=b.Kb({type:t,selectors:[["markdown-viewer-container"]],viewQuery:function(t,e){var n;1&t&&b.Ic(g,!0),2&t&&b.sc(n=b.fc())&&(e.viewerContainerDiv=n.first)},inputs:{markdown$:"markdown$",hideToolbar:"hideToolbar"},decls:11,vars:17,consts:[[3,"scrollHide","hide"],[3,"element",4,"ngIf"],[3,"isRunning"],[2,"position","relative","height","100%"],[1,"viewer-container"],["viewContainerDiv",""],[1,"markdown-viewer",3,"model","swipeleft","swiperight"],[3,"element"]],template:function(t,e){if(1&t&&(b.Rb(0,"ms-viewer-toolbar",0),b.jc(1,"async"),b.Dc(2,O,1,1,"ms-reading-position-indicator",1),b.jc(3,"async"),b.Rb(4,"sk-three-bounce",2),b.jc(5,"async"),b.Wb(6,"div",3),b.Wb(7,"div",4,5),b.Wb(9,"markdown-viewer",6),b.ec("swipeleft",(function(t){return e.swipeLeft(t)}))("swiperight",(function(t){return e.swipeRight(t)})),b.jc(10,"async"),b.Vb(),b.Vb(),b.Vb()),2&t){var n;const t=null==(n=b.kc(3,7,e.scrollDown$))?null:n.isDown;b.nc("scrollHide",b.qc(15,j,b.qc(13,k,e.markdownService.viewer$)))("hide",b.kc(1,5,e.docMode$)!==e.DocumentMode.View),b.Cb(2),b.nc("ngIf",t),b.Cb(2),b.nc("isRunning",!b.kc(5,9,e.isLoadDone$)),b.Cb(5),b.nc("model",b.kc(10,11,e.markdown$))}},styles:[".viewer-container[_ngcontent-%COMP%]{overflow-y:auto;overflow-x:auto;padding:0 3px;height:100%}@media (min-width:960px){.viewer-container[_ngcontent-%COMP%]{padding:0 16px}}.markdown-viewer[_ngcontent-%COMP%]{max-width:1000px;margin:auto}.markdown-viewer[_ngcontent-%COMP%]:focus{outline:none}"]}),t})()},Kq4L:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"b",(function(){return r}));var i=function(t){return t.Save="[Edit] Save",t.LockScrollWithView="[Edit] Lock Scroll With View",t.EditorLoaded="[Edit] Editor Loaded",t.EditorUnloaded="[Edit] Editor Unloaded",t}({});class o{constructor(t){this.payload=t,this.type=i.Save}}class r{constructor(t){this.payload=t,this.type=i.LockScrollWithView}}},fnmL:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var i=n("FU6l"),o=n("HM3f"),r=n("GoAz");function c(...t){let e=null;return"function"==typeof t[t.length-1]&&(e=t.pop()),1===t.length&&Object(i.a)(t[0])&&(t=t[0].slice()),n=>n.lift.call(Object(r.a)([n,...t]),new o.a(e))}},nJwD:function(t,e,n){"use strict";n.d(e,"a",(function(){return D}));var i=n("4T9E"),o=n("ofXK"),r=n("kuMc"),c=n("YtkY"),s=n("fnmL"),a=n("xVbo"),d=n("8j5Y"),l=n("q/PB"),u=n("kt0X"),h=n("sGad"),w=n("was7"),p=n("71SZ"),f=n("ZTXN"),b=n("g6G6"),v=n("btWG"),m=n("uYpP"),g=n("fXoL"),O=n("tk/3"),k=n("tyNb"),j=n("ZYfY"),y=n("103i");const C=["viewerDiv"],M=["editorDiv"];let D=(()=>{class t{constructor(t,e,n,o,a,d,l,p){this.markdownService=t,this._http=e,this.baseHref=n,this.changeDetecorRef=o,this.route=a,this.router=d,this.store=l,this.utils=p,this.fixEditButton=!1,this.destroy$=new f.a,this.docMode$=this.store.pipe(Object(u.k)(h.h),Object(r.a)(this.destroy$)),this.showEdit$=this.docMode$.pipe(Object(c.a)(t=>t===w.a.Edit)),this.isScreenWide$=this.utils.isScreenWide$,this.showView$=Object(b.a)(this.showEdit$.pipe(Object(s.a)(this.isScreenWide$),Object(c.a)(([t,e])=>t&&!e?(this.store.dispatch(new i.d),!1):(this.store.dispatch(new i.f),!0))),this.store.select(h.i))}ngOnInit(){this.router.routerState.root.firstChild.queryParams.subscribe(t=>{console.log(t)}),this.markdown$=Object(b.a)(this.store.select(v.A).pipe(Object(a.a)(t=>t&&!t.isUpdateMeta),Object(c.a)(t=>t&&t.content?t.content.content:"")),this.markdownService.editorContentChanged$).pipe(Object(l.z)(80,1e3))}ngOnDestroy(){this.store.dispatch(new v.m({id:void 0})),this.destroy$.next()}ngAfterViewChecked(){this.changeDetecorRef.detectChanges()}ngAfterViewInit(){this.router.routerState.root.firstChild.queryParams.pipe(Object(d.a)(t=>{this.router.url.startsWith("/doc/new")?(this.store.dispatch(new v.d({format:t.f})),this.store.dispatch(new i.c)):this.store.dispatch(new v.f({id:+t.id,title:t.title,format:t.f}))})).subscribe()}showDemo(){this._http.get(this.baseHref+"assets/markdown.md",{responseType:"text"}).subscribe(()=>{})}}return t.\u0275fac=function(e){return new(e||t)(g.Qb(m.a),g.Qb(O.b),g.Qb(o.a),g.Qb(g.h),g.Qb(k.a),g.Qb(k.f),g.Qb(u.c),g.Qb(j.a))},t.\u0275cmp=g.Kb({type:t,selectors:[["ms-markdown"]],viewQuery:function(t,e){var n;1&t&&(g.Ic(p.a,!0),g.Ic(C,!0),g.Ic(M,!0)),2&t&&(g.sc(n=g.fc())&&(e.viewer=n.first),g.sc(n=g.fc())&&(e.viewerDiv=n.first),g.sc(n=g.fc())&&(e.editorDiv=n.first))},decls:10,vars:9,consts:[[1,"markdown-container"],["primary-component-minsize","100","secondary-component-minsize","100","local-storage-key","iam-md-split-pane","primary-component-initialratio","0.5",3,"primary-component-toggled-off","secondary-component-toggled-off"],[1,"split-pane-content-primary"],["editorDiv",""],[1,"split-pane-content-secondary"],["viewerDiv",""],[3,"markdown$"]],template:function(t,e){1&t&&(g.Wb(0,"div",0),g.Wb(1,"vertical-split-pane",1),g.jc(2,"async"),g.jc(3,"async"),g.Wb(4,"div",2,3),g.Rb(6,"router-outlet"),g.Vb(),g.Wb(7,"div",4,5),g.Rb(9,"markdown-viewer-container",6),g.Vb(),g.Vb(),g.Vb()),2&t&&(g.Gb("fullscreen",e.isFullScreen),g.Cb(1),g.nc("primary-component-toggled-off",!g.kc(2,5,e.showEdit$))("secondary-component-toggled-off",!g.kc(3,7,e.showView$)),g.Cb(8),g.nc("markdown$",e.markdown$))},directives:[y.a,k.k,p.a],pipes:[o.b],styles:['.markdown-container[_ngcontent-%COMP%]   .md-footer[_ngcontent-%COMP%]{padding:2px;background-color:#f0f0f0;border-top:1px solid rgba(0,0,0,.1)}.markdown-container.fullscreen[_ngcontent-%COMP%]{margin:0;position:fixed;border:0;top:0;left:0;width:100%;height:100%;z-index:99999999}.split-pane-content-secondary[_ngcontent-%COMP%]{height:100%}.markdown-container.fullscreen[_ngcontent-%COMP%]   .md-editor-panel[_ngcontent-%COMP%], .markdown-container.fullscreen[_ngcontent-%COMP%]   .md-view-panel[_ngcontent-%COMP%]{height:calc(100vh - 40px)!important}.markdown-container[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%] > .btn[_ngcontent-%COMP%]:first-child:before{content:" ";background-color:#a9a9a9;width:1px;height:24px;left:-9px;top:2px;position:absolute}.markdown-container[_ngcontent-%COMP%]{height:100vh;overflow:hidden}.markdown-container[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn-group.hide-split[_ngcontent-%COMP%] > .btn[_ngcontent-%COMP%]:first-child:before{display:none}.markdown-container[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{margin-bottom:0}.markdown-container[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%]{display:flex}.markdown-container[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{flex:1 1 0;width:0;min-height:200px}']}),t})()},sGad:function(t,e,n){"use strict";n.d(e,"h",(function(){return p})),n.d(e,"i",(function(){return f})),n.d(e,"g",(function(){return b})),n.d(e,"j",(function(){return m})),n.d(e,"k",(function(){return g})),n.d(e,"b",(function(){return O.c})),n.d(e,"c",(function(){return O.g})),n.d(e,"a",(function(){return O.b})),n.d(e,"d",(function(){return r})),n.d(e,"f",(function(){return l})),n.d(e,"e",(function(){return u}));var i=n("kt0X"),o=function(t){return t.Scroll="[View] Scroll",t}({});class r{constructor(t){this.payload=t,this.type=o.Scroll}}const c={isScrollDown:null};var s=n("was7"),a=n("Kq4L");const d={save:"",lockScrollWithView:!1,editor:void 0,content:void 0},l="markdown",u={document:s.e,edit:function(t=d,e){switch(e.type){case a.a.Save:return Object.assign(Object.assign({},t),{save:e.payload});case a.a.LockScrollWithView:return Object.assign(Object.assign({},t),{lockScrollWithView:e.payload});default:return t}},view:function(t=c,e){switch(e.type){case o.Scroll:return Object.assign(Object.assign({},t),{isScrollDown:e.payload.isScrollDown});default:return t}}},h=Object(i.i)(l),w=Object(i.j)(h,t=>t.document),p=Object(i.j)(w,s.c),f=Object(i.j)(w,s.d),b=Object(i.j)(w,s.b),v=Object(i.j)(h,t=>t.edit),m=(Object(i.j)(v,t=>t.save),Object(i.j)(v,t=>t.lockScrollWithView)),g=Object(i.j)(h,t=>t.view);Object(i.j)(g,t=>t.isScrollDown);var O=n("4T9E")},uYpP:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));const i=new(n("fXoL").q)("MARKDOWN_SERVICE_TOKEN")},was7:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"e",(function(){return c})),n.d(e,"c",(function(){return s})),n.d(e,"d",(function(){return a})),n.d(e,"b",(function(){return d}));var i=n("4T9E"),o=function(t){return t[t.View=0]="View",t[t.Edit=1]="Edit",t}({});const r={mode:o.View,showPreview:null};function c(t=r,e){switch(e.type){case i.a.EditMode:return document.iamMarkdownIsPureViewMode=!1,Object.assign(Object.assign({},t),{mode:o.Edit});case i.a.ViewMode:return document.iamMarkdownIsPureViewMode=!0,Object.assign(Object.assign({},t),{mode:o.View});case i.a.ShowPreview:return Object.assign(Object.assign({},t),{showPreview:!0});case i.a.HidePreview:return Object.assign(Object.assign({},t),{showPreview:!1});case i.a.EditIt:return Object.assign(Object.assign({},t),{editIt:e.payload});default:return t}}const s=t=>t.mode,a=t=>t.showPreview,d=t=>t.editIt}}]);