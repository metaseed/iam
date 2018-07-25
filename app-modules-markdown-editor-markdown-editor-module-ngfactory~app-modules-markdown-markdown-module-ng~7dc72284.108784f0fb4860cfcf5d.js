(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"103i":function(t,e,i){"use strict";var n=i("D57K"),o=i("LoAr"),r=function(){function t(){this.initialRatio=.5,this.primaryMinSize=0,this.secondaryMinSize=0,this.separatorThickness=6,this.primaryToggledOff=!1,this.secondaryToggledOff=!1,this.localStorageKey=null,this.notifySizeDidChange=new o.m,this.notifyBeginResizing=new o.m,this.notifyEndedResizing=new o.m,this.dividerSize=8,this.isResizing=!1}return t.prototype.ngAfterViewInit=function(){if(this.checkBothToggledOff(),!this.primaryToggledOff&&!this.secondaryToggledOff){var t=this.initialRatio;if(null!=this.localStorageKey){var e=localStorage.getItem(this.localStorageKey);null!=e&&(t=JSON.parse(e))}var i=t*this.getTotalSize();this.applySizeChange(i)}},t.prototype.ngOnChanges=function(t){if(this.checkBothToggledOff(),t.primaryToggledOff)!0===t.primaryToggledOff.currentValue?(this.primarySizeBeforeTogglingOff=this.getPrimarySize(),this.secondarySizeBeforTogglingOff=this.getSecondarySize(),this.applySizeChange(0)):this.applySizeChange(this.primarySizeBeforeTogglingOff);else if(t.secondaryToggledOff)if(!0===t.secondaryToggledOff.currentValue)this.primarySizeBeforeTogglingOff=this.getPrimarySize(),this.secondarySizeBeforTogglingOff=this.getSecondarySize(),this.applySizeChange(this.getTotalSize());else{var e=this.getAvailableSize()*this.primarySizeBeforeTogglingOff/(this.primarySizeBeforeTogglingOff+this.secondarySizeBeforTogglingOff);this.applySizeChange(e)}},t.prototype.getTotalSize=function(){throw"SplitPaneComponent shouldn't be instantiated. Override this method."},t.prototype.getPrimarySize=function(){throw"SplitPaneComponent shouldn't be instantiated. Override this method."},t.prototype.getSecondarySize=function(){throw"SplitPaneComponent shouldn't be instantiated. Override this method."},t.prototype.dividerPosition=function(t){throw"SplitPaneComponent shouldn't be instantiated. Override this method."},t.prototype.getAvailableSize=function(){return this.getTotalSize()-this.dividerSize},t.prototype.applySizeChange=function(t){var e=this,i=this.checkValidBounds(t,this.primaryMinSize,this.getAvailableSize()-this.secondaryMinSize);this.primaryToggledOff?i=0:this.secondaryToggledOff&&(i=this.getTotalSize()),this.dividerPosition(i),this.getPrimarySize()===i?this.notifySizeDidChange.emit({primary:this.getPrimarySize(),secondary:this.getSecondarySize()}):setTimeout(function(t){return e.notifySizeDidChange.emit({primary:e.getPrimarySize(),secondary:e.getSecondarySize()})},0)},t.prototype.notifyWillChangeSize=function(t){this.isResizing=t,this.notifyBeginResizing.emit()},t.prototype.checkValidBounds=function(t,e,i){return t>=e?t<=i?t:i:e},t.prototype.checkBothToggledOff=function(){if(this.primaryToggledOff&&this.secondaryToggledOff)throw"You cannot toggle off both the primary and secondary component"},t.prototype.stopResizing=function(){if(this.isResizing=!1,this.primaryComponent.nativeElement.style.cursor="auto",this.secondaryComponent.nativeElement.style.cursor="auto",null!=this.localStorageKey){var t=this.getPrimarySize()/this.getTotalSize();localStorage.setItem(this.localStorageKey,JSON.stringify(t))}this.notifyEndedResizing.emit()},t.prototype.onMouseup=function(t){if(this.isResizing)return this.stopResizing(),!1},t}(),s=function(){function t(){}return t.position=function(t){var e=t.nativeElement,i=this.offset(e),n={top:0,left:0},o=this.parentOffsetEl(e);o!==this.document&&((n=this.offset(o)).top+=o.clientTop-o.scrollTop,n.left+=o.clientLeft-o.scrollLeft);var r=e.getBoundingClientRect();return{width:r.width||e.offsetWidth,height:r.height||e.offsetHeight,top:i.top-n.top,left:i.left-n.left}},t.offset=function(t){var e=t.nativeElement,i=e.getBoundingClientRect();return{width:i.width||e.offsetWidth,height:i.height||e.offsetHeight,top:i.top+(this.window.pageYOffset||this.document.documentElement.scrollTop),left:i.left+(this.window.pageXOffset||this.document.documentElement.scrollLeft)}},t.positionElements=function(t,e,i,n){var o,r=t.nativeElement,s=e.nativeElement,a=i.split("-"),u=a[0],c=a[1]||"center",l=n?this.offset(r):this.position(r),f=s.offsetWidth,d=s.offsetHeight,h={center:function(){return l.left+l.width/2-f/2},left:function(){return l.left},right:function(){return l.left+l.width}},p={center:function(){return l.top+l.height/2-d/2},top:function(){return l.top},bottom:function(){return l.top+l.height}};switch(u){case"right":o={top:p[c](),left:h[u]()};break;case"left":o={top:p[c](),left:l.left-f};break;case"bottom":o={top:p[u](),left:h[c]()};break;default:o={top:l.top-d,left:h[c]()}}return o},Object.defineProperty(t,"window",{get:function(){return window},enumerable:!0,configurable:!0}),Object.defineProperty(t,"document",{get:function(){return window.document},enumerable:!0,configurable:!0}),t.getStyle=function(t,e){return t.currentStyle?t.currentStyle[e]:this.window.getComputedStyle?this.window.getComputedStyle(t)[e]:t.style[e]},t.isStaticPositioned=function(t){return"static"===(this.getStyle(t,"position")||"static")},t.parentOffsetEl=function(t){for(var e=t.offsetParent||this.document;e&&e!==this.document&&this.isStaticPositioned(e);)e=e.offsetParent;return e||this.document},t}();i.d(e,"a",function(){return a});var a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(n.c)(e,t),e.prototype.getTotalSize=function(){return this.outerContainer.nativeElement.offsetWidth},e.prototype.getPrimarySize=function(){return this.primaryComponent.nativeElement.offsetWidth},e.prototype.getSecondarySize=function(){return this.secondaryComponent.nativeElement.offsetWidth},e.prototype.dividerPosition=function(t){var e=t/this.getTotalSize()*100;this.primaryToggledOff||(this.primaryComponent.nativeElement.style.width=e+"%"),this.secondaryToggledOff||(this.secondaryComponent.nativeElement.style.width="calc("+(100-e)+"% - "+(this.primaryToggledOff||this.secondaryToggledOff?0:this.separatorThickness)+"px)")},e.prototype.onMousemove=function(t){if(this.isResizing){var e=s.offset(this.primaryComponent);return this.applySizeChange(t.pageX-e.left),!1}},e}(r)},"2tfK":function(t,e,i){"use strict";i.d(e,"a",function(){return u}),i.d(e,"d",function(){return l}),i.d(e,"b",function(){return f}),i.d(e,"c",function(){return d});var n=i("LoAr"),o=(i("5kg2"),i("WT9V")),r=(i("eXL1"),i("C7Lb"),i("LYzL")),s=i("WV+C"),a=(i("abkR"),i("IvSS"),i("Z5FQ")),u=(i("0xYh"),n.Pa({encapsulation:2,styles:[".mat-menu-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;max-height:calc(100vh - 48px);border-radius:2px;outline:0}.mat-menu-panel:not([class*=mat-elevation-z]){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}@media screen and (-ms-high-contrast:active){.mat-menu-panel{outline:solid 1px}}.mat-menu-content:not(:empty){padding-top:8px;padding-bottom:8px}.mat-menu-item{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;max-width:100%;position:relative}.mat-menu-item::-moz-focus-inner{border:0}.mat-menu-item[disabled]{cursor:default}[dir=rtl] .mat-menu-item{text-align:right}.mat-menu-item .mat-icon{margin-right:16px;vertical-align:middle}.mat-menu-item .mat-icon svg{vertical-align:top}[dir=rtl] .mat-menu-item .mat-icon{margin-left:16px;margin-right:0}@media screen and (-ms-high-contrast:active){.mat-menu-item-highlighted,.mat-menu-item.cdk-keyboard-focused,.mat-menu-item.cdk-program-focused{outline:dotted 1px}}.mat-menu-item-submenu-trigger{padding-right:32px}.mat-menu-item-submenu-trigger::after{width:0;height:0;border-style:solid;border-width:5px 0 5px 5px;border-color:transparent transparent transparent currentColor;content:'';display:inline-block;position:absolute;top:50%;right:16px;transform:translateY(-50%)}[dir=rtl] .mat-menu-item-submenu-trigger{padding-right:16px;padding-left:32px}[dir=rtl] .mat-menu-item-submenu-trigger::after{right:auto;left:16px;transform:rotateY(180deg) translateY(-50%)}.mat-menu-panel.ng-animating .mat-menu-item-submenu-trigger{pointer-events:none}button.mat-menu-item{width:100%}.mat-menu-item .mat-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}"],data:{animation:[{type:7,name:"transformMenu",definitions:[{type:0,name:"void",styles:{type:6,styles:{opacity:0,transform:"scale(0.01, 0.01)"},offset:null},options:void 0},{type:1,expr:"void => enter",animation:{type:2,steps:[{type:11,selector:".mat-menu-content",animation:{type:6,styles:{opacity:0},offset:null},options:null},{type:4,styles:{type:6,styles:{opacity:1,transform:"scale(1, 0.5)"},offset:null},timings:"100ms linear"},{type:3,steps:[{type:11,selector:".mat-menu-content",animation:{type:4,styles:{type:6,styles:{opacity:1},offset:null},timings:"400ms cubic-bezier(0.55, 0, 0.55, 0.2)"},options:null},{type:4,styles:{type:6,styles:{transform:"scale(1, 1)"},offset:null},timings:"300ms cubic-bezier(0.25, 0.8, 0.25, 1)"}],options:null}],options:null},options:null},{type:1,expr:"* => void",animation:{type:4,styles:{type:6,styles:{opacity:0},offset:null},timings:"150ms 50ms linear"},options:null}],options:{}},{type:7,name:"fadeInItems",definitions:[{type:0,name:"showing",styles:{type:6,styles:{opacity:1},offset:null},options:void 0},{type:1,expr:"void => *",animation:[{type:6,styles:{opacity:0},offset:null},{type:4,styles:null,timings:"400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)"}],options:null}],options:{}}]}}));function c(t){return n.kb(0,[(t()(),n.Ra(0,0,null,null,3,"div",[["class","mat-menu-panel"],["role","menu"],["tabindex","-1"]],[[24,"@transformMenu",0]],[[null,"keydown"],[null,"click"],[null,"@transformMenu.start"],[null,"@transformMenu.done"]],function(t,e,i){var n=!0,o=t.component;return"keydown"===e&&(n=!1!==o._handleKeydown(i)&&n),"click"===e&&(n=!1!==o.closed.emit("click")&&n),"@transformMenu.start"===e&&(n=0!=(o._isAnimating=!0)&&n),"@transformMenu.done"===e&&(n=!1!==o._onAnimationDone(i)&&n),n},null,null)),n.Qa(1,278528,null,0,o.i,[n.r,n.s,n.k,n.E],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(t()(),n.Ra(2,0,null,null,1,"div",[["class","mat-menu-content"]],null,null,null,null,null)),n.ab(null,0)],function(t,e){t(e,1,0,"mat-menu-panel",e.component._classList)},function(t,e){t(e,0,0,e.component._panelAnimationState)})}function l(t){return n.kb(2,[n.gb(402653184,1,{templateRef:0}),(t()(),n.Ia(0,[[1,2]],null,0,null,c))],null,null)}var f=n.Pa({encapsulation:2,styles:[],data:{}});function d(t){return n.kb(2,[n.ab(null,0),(t()(),n.Ra(1,0,null,null,1,"div",[["class","mat-menu-ripple mat-ripple"],["matRipple",""]],[[2,"mat-ripple-unbounded",null]],null,null,null,null)),n.Qa(2,212992,null,0,r.f,[n.k,n.y,s.a,[2,r.d],[2,a.a]],{disabled:[0,"disabled"],trigger:[1,"trigger"]},null)],function(t,e){var i=e.component;t(e,2,0,i.disableRipple||i.disabled,i._getHostElement())},function(t,e){t(e,1,0,n.bb(e,2).unbounded)})}},"4T9E":function(t,e,i){"use strict";var n;i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o}),i.d(e,"f",function(){return r}),i.d(e,"e",function(){return s}),i.d(e,"c",function(){return a}),i.d(e,"d",function(){return u}),function(t){t.EditMode="[Document] edit mode",t.ViewMode="[Document] view mode",t.ShowPreview="[Document] show preview",t.Refresh="[Document] Refresh",t.HidePreview="[Document] hide preview"}(n||(n={}));var o=function(){return function(){this.type=n.EditMode}}(),r=function(){return function(){this.type=n.ViewMode}}(),s=function(){return function(){this.type=n.ShowPreview}}(),a=function(){return function(){this.type=n.HidePreview}}(),u=function(){return function(){this.type=n.Refresh}}()},"71SZ":function(t,e,i){"use strict";i.d(e,"a",function(){return m});var n=i("q/PB"),o=i("sGad"),r=i("GovN"),s=i("fQLH"),a=i("gQst"),u=i("diMa"),c=i("TY0z"),l=i("was7"),f=i("Jg5f"),d=i("mhnT"),h=i("CxUu"),p=i("AouM"),m=(i("uYpP"),function(){function t(t,e,i){var p=this;this.store=t,this.snackBar=e,this.markdownService=i,this.destroy$=new s.a,this.DocumentMode=l.a,this.docMode$=this.store.pipe(Object(r.E)(o.a)),this.editWithView$=this.store.pipe(Object(r.E)(o.b)),this.defaultTimeoutHandler=function(t){return p.snackBar.open(t.message,"ok",{duration:n.i})},this.isLoadDone$=Object(a.a)(Object(c.o)(c.e.ReadDocument,this.store,n.j,this.defaultTimeoutHandler).pipe(Object(f.a)(function(t){return t.isNotStartStatus()})),Object(c.n)(c.e.Create,this.store).pipe(Object(f.a)(function(t){return t.isNotStartStatus()}))).pipe(Object(d.a)(this.destroy$),Object(h.b)(u.a))}return t.prototype.ngAfterViewInit=function(){var t=this,e=this;this.container=new n.a(this.viewerContainerDiv.nativeElement),this.scrollDown$=this.container.scrollDown$,this.markdownService.viewer$.next(this.container);var i=0;this.isLockScrollWithView$=this.store.pipe(Object(r.E)(o.c)),this.isLockScrollWithView$.pipe(Object(d.a)(this.destroy$)).subscribe(function(e){t.isLockScrollWithView=e}),this.markdownService.editor$.pipe(Object(d.a)(this.destroy$),Object(p.a)(function(t){return t.scrollDown$})).subscribe(function(n){if(t.isLockScrollWithView&&n.event){var o=n.event.target,r=o.scrollTop/(o.scrollHeight-o.clientHeight),s=r-i;i=r;var a=e.viewerContainerDiv.nativeElement;e.viewerContainerDiv.nativeElement.scrollTop+=(a.scrollHeight-a.clientHeight)*s}})},t.prototype.ngOnDestroy=function(){this.destroy$.next()},t}())},DWHh:function(t,e,i){"use strict";i.d(e,"a",function(){return o});var n={notUsed:null};function o(t,e){return void 0===t&&(t=n),t}},Khft:function(t,e,i){"use strict";i.d(e,"b",function(){return s}),i.d(e,"a",function(){return a});var n=i("Kq4L"),o=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r={save:"",lockScrollWithView:!1,editor:void 0,content:void 0};function s(t,e){switch(void 0===t&&(t=r),e.type){case n.a.Save:return o({},t,{save:e.payload});case n.a.LockScrollWithView:return o({},t,{lockScrollWithView:e.payload});default:return t}}var a=function(t){return t.save}},Kq4L:function(t,e,i){"use strict";var n;i.d(e,"a",function(){return n}),i.d(e,"c",function(){return o}),i.d(e,"b",function(){return r}),function(t){t.Save="[Edit] Save",t.LockScrollWithView="[Edit] Lock Scroll With View",t.EditorLoaded="[Edit] Editor Loaded",t.EditorUnloaded="[Edit] Editor Unloaded"}(n||(n={}));var o=function(){return function(t){this.payload=t,this.type=n.Save}}(),r=function(){return function(t){this.payload=t,this.type=n.LockScrollWithView}}()},nJwD:function(t,e,i){"use strict";i.d(e,"a",function(){return g});var n=i("4T9E"),o=i("mhnT"),r=i("Jg5f"),s=i("BUlm"),a=i("fa4O"),u=i("U3QC"),c=i("G2Mx"),l=i("GovN"),f=i("sGad"),d=i("was7"),h=(i("71SZ"),i("fQLH")),p=i("gQst"),m=i("TY0z"),g=(i("ZYfY"),i("uYpP"),function(){function t(t,e,i,a,u,c,m,g){var y=this;this.markdownService=t,this._http=e,this.baseHref=i,this.changeDetecorRef=a,this.route=u,this.router=c,this.store=m,this.utils=g,this.fixEditButton=!1,this.destroy$=new h.a,this.docMode$=this.store.pipe(Object(l.E)(f.a),Object(o.a)(this.destroy$)),this.showEdit$=this.docMode$.pipe(Object(r.a)(function(t){return t===d.a.Edit})),this.isScreenWide$=this.utils.isScreenWide$,this.showView$=Object(p.a)(this.showEdit$.pipe(Object(s.a)(this.isScreenWide$),Object(r.a)(function(t){return t[0]&&!t[1]?(y.store.dispatch(new n.c),!1):(y.store.dispatch(new n.e),!0)})),this.store.select(f.b))}return t.prototype.ngOnInit=function(){this.markdown$=Object(p.a)(this.store.select(m.q).pipe(Object(r.a)(function(t){return t&&t.content?t.content.content:""})),this.markdownService.editorContentChanged$).pipe(Object(a.a)())},t.prototype.ngOnDestroy=function(){this.store.dispatch(new m.k({id:void 0})),this.destroy$.next()},t.prototype.ngAfterViewChecked=function(){this.changeDetecorRef.detectChanges()},t.prototype.ngAfterViewInit=function(){var t=this;this.route.queryParamMap.pipe(Object(u.a)(function(e){if(t.router.url.startsWith("/doc/new")){var i=e.get("f");t.store.dispatch(new m.f({format:i})),t.store.dispatch(new n.b)}else{var o=e.get("title"),r=+e.get("id");i=e.get("f"),t.store.dispatch(new m.h({id:r,title:o,format:i}))}}),Object(c.a)(1)).subscribe()},t.prototype.showDemo=function(){this._http.get(this.baseHref+"assets/markdown.md",{responseType:"text"}).subscribe(function(){})},t}())},sGad:function(t,e,i){"use strict";i.d(e,"a",function(){return u}),i.d(e,"b",function(){return c}),i.d(e,"c",function(){return f});var n=i("was7"),o=i("Khft"),r=(i("DWHh"),i("GovN")),s=Object(r.B)("markdown"),a=Object(r.D)(s,function(t){return t.document}),u=Object(r.D)(a,n.b),c=Object(r.D)(a,n.c),l=Object(r.D)(s,function(t){return t.edit}),f=(Object(r.D)(l,o.a),Object(r.D)(l,function(t){return t.lockScrollWithView}));Object(r.D)(s,function(t){return t.view})},uYpP:function(t,e,i){"use strict";i.d(e,"a",function(){return n});var n=new(i("LoAr").p)("MARKDOWN_SERVICE_TOKEN")},was7:function(t,e,i){"use strict";i.d(e,"a",function(){return r}),i.d(e,"d",function(){return a}),i.d(e,"b",function(){return u}),i.d(e,"c",function(){return c});var n=i("4T9E"),o=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r=function(t){return t[t.View=0]="View",t[t.Edit=1]="Edit",t}({}),s={mode:r.View,showPreview:null};function a(t,e){switch(void 0===t&&(t=s),e.type){case n.a.EditMode:return document.iamMarkdownIsPureViewMode=!1,o({},t,{mode:r.Edit});case n.a.ViewMode:return document.iamMarkdownIsPureViewMode=!0,o({},t,{mode:r.View});case n.a.ShowPreview:return o({},t,{showPreview:!0});case n.a.HidePreview:return o({},t,{showPreview:!1});default:return t}}var u=function(t){return t.mode},c=function(t){return t.showPreview}}}]);