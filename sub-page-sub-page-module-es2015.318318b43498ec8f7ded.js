(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{hi3o:function(e,t,n){"use strict";n.r(t),n.d(t,"SubPageModule",(function(){return Z}));var i=n("ofXK"),a=n("kt0X"),o=n("btWG"),s=n("YtkY"),d=n("xVbo"),r=n("fXoL"),c=n("tyNb"),p=n("8LU1"),l=n("ZTXN"),h=n("bwdy"),b=n("0EQZ");let g=0,m=(()=>{class e{constructor(){this._stateChanges=new l.a,this._openCloseAllActions=new l.a,this.id="cdk-accordion-"+g++,this._multi=!1}get multi(){return this._multi}set multi(e){this._multi=Object(p.b)(e)}openAll(){this._openCloseAll(!0)}closeAll(){this._openCloseAll(!1)}ngOnChanges(e){this._stateChanges.next(e)}ngOnDestroy(){this._stateChanges.complete()}_openCloseAll(e){this.multi&&this._openCloseAllActions.next(e)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275dir=r.Lb({type:e,selectors:[["cdk-accordion"],["","cdkAccordion",""]],inputs:{multi:"multi"},exportAs:["cdkAccordion"],features:[r.Ab]}),e})(),u=0,x=(()=>{class e{constructor(e,t,n){this.accordion=e,this._changeDetectorRef=t,this._expansionDispatcher=n,this._openCloseAllSubscription=h.a.EMPTY,this.closed=new r.n,this.opened=new r.n,this.destroyed=new r.n,this.expandedChange=new r.n,this.id="cdk-accordion-child-"+u++,this._expanded=!1,this._disabled=!1,this._removeUniqueSelectionListener=()=>{},this._removeUniqueSelectionListener=n.listen((e,t)=>{this.accordion&&!this.accordion.multi&&this.accordion.id===t&&this.id!==e&&(this.expanded=!1)}),this.accordion&&(this._openCloseAllSubscription=this._subscribeToOpenCloseAllActions())}get expanded(){return this._expanded}set expanded(e){e=Object(p.b)(e),this._expanded!==e&&(this._expanded=e,this.expandedChange.emit(e),e?(this.opened.emit(),this._expansionDispatcher.notify(this.id,this.accordion?this.accordion.id:this.id)):this.closed.emit(),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled}set disabled(e){this._disabled=Object(p.b)(e)}ngOnDestroy(){this.opened.complete(),this.closed.complete(),this.destroyed.emit(),this.destroyed.complete(),this._removeUniqueSelectionListener(),this._openCloseAllSubscription.unsubscribe()}toggle(){this.disabled||(this.expanded=!this.expanded)}close(){this.disabled||(this.expanded=!1)}open(){this.disabled||(this.expanded=!0)}_subscribeToOpenCloseAllActions(){return this.accordion._openCloseAllActions.subscribe(e=>{this.disabled||(this.expanded=e)})}}return e.\u0275fac=function(t){return new(t||e)(r.Qb(m,12),r.Qb(r.h),r.Qb(b.d))},e.\u0275dir=r.Lb({type:e,selectors:[["cdk-accordion-item"],["","cdkAccordionItem",""]],inputs:{expanded:"expanded",disabled:"disabled"},outputs:{closed:"closed",opened:"opened",destroyed:"destroyed",expandedChange:"expandedChange"},exportAs:["cdkAccordionItem"],features:[r.Bb([{provide:m,useValue:void 0}])]}),e})(),f=(()=>{class e{}return e.\u0275mod=r.Ob({type:e}),e.\u0275inj=r.Nb({factory:function(t){return new(t||e)}}),e})();var _=n("+rOU"),O=n("u47x"),y=n("FtGj"),w=n("Ohay"),v=n("jIqt"),C=n("J+dc"),j=n("6Oco"),A=n("g6G6"),S=n("R0Ic"),k=n("R1ws");const E=["body"];function D(e,t){}const P=[[["mat-expansion-panel-header"]],"*",[["mat-action-row"]]],T=["mat-expansion-panel-header","*","mat-action-row"],H=function(e,t){return{collapsedHeight:e,expandedHeight:t}},V=function(e,t){return{value:e,params:t}};function Q(e,t){if(1&e&&r.Rb(0,"span",2),2&e){const e=r.ic();r.nc("@indicatorRotate",e._getExpandedState())}}const I=[[["mat-panel-title"]],[["mat-panel-description"]],"*"],L=["mat-panel-title","mat-panel-description","*"],W=new r.q("MAT_ACCORDION"),R={indicatorRotate:Object(S.m)("indicatorRotate",[Object(S.j)("collapsed, void",Object(S.k)({transform:"rotate(0deg)"})),Object(S.j)("expanded",Object(S.k)({transform:"rotate(180deg)"})),Object(S.l)("expanded <=> collapsed, void => collapsed",Object(S.e)("225ms cubic-bezier(0.4,0.0,0.2,1)"))]),expansionHeaderHeight:Object(S.m)("expansionHeight",[Object(S.j)("collapsed, void",Object(S.k)({height:"{{collapsedHeight}}"}),{params:{collapsedHeight:"48px"}}),Object(S.j)("expanded",Object(S.k)({height:"{{expandedHeight}}"}),{params:{expandedHeight:"64px"}}),Object(S.l)("expanded <=> collapsed, void => collapsed",Object(S.g)([Object(S.h)("@indicatorRotate",Object(S.f)(),{optional:!0}),Object(S.e)("225ms cubic-bezier(0.4,0.0,0.2,1)")]))]),bodyExpansion:Object(S.m)("bodyExpansion",[Object(S.j)("collapsed, void",Object(S.k)({height:"0px",visibility:"hidden"})),Object(S.j)("expanded",Object(S.k)({height:"*",visibility:"visible"})),Object(S.l)("expanded <=> collapsed, void => collapsed",Object(S.e)("225ms cubic-bezier(0.4,0.0,0.2,1)"))])};let N=(()=>{class e{constructor(e){this._template=e}}return e.\u0275fac=function(t){return new(t||e)(r.Qb(r.M))},e.\u0275dir=r.Lb({type:e,selectors:[["ng-template","matExpansionPanelContent",""]]}),e})(),F=0;const M=new r.q("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS");let z=(()=>{class e extends x{constructor(e,t,n,i,a,o,s){super(e,t,n),this._viewContainerRef=i,this._animationMode=o,this._hideToggle=!1,this.afterExpand=new r.n,this.afterCollapse=new r.n,this._inputChanges=new l.a,this._headerId="mat-expansion-panel-header-"+F++,this._bodyAnimationDone=new l.a,this.accordion=e,this._document=a,this._bodyAnimationDone.pipe(Object(w.a)((e,t)=>e.fromState===t.fromState&&e.toState===t.toState)).subscribe(e=>{"void"!==e.fromState&&("expanded"===e.toState?this.afterExpand.emit():"collapsed"===e.toState&&this.afterCollapse.emit())}),s&&(this.hideToggle=s.hideToggle)}get hideToggle(){return this._hideToggle||this.accordion&&this.accordion.hideToggle}set hideToggle(e){this._hideToggle=Object(p.b)(e)}get togglePosition(){return this._togglePosition||this.accordion&&this.accordion.togglePosition}set togglePosition(e){this._togglePosition=e}_hasSpacing(){return!!this.accordion&&this.expanded&&"default"===this.accordion.displayMode}_getExpandedState(){return this.expanded?"expanded":"collapsed"}toggle(){this.expanded=!this.expanded}close(){this.expanded=!1}open(){this.expanded=!0}ngAfterContentInit(){this._lazyContent&&this.opened.pipe(Object(v.a)(null),Object(d.a)(()=>this.expanded&&!this._portal),Object(C.a)(1)).subscribe(()=>{this._portal=new _.i(this._lazyContent._template,this._viewContainerRef)})}ngOnChanges(e){this._inputChanges.next(e)}ngOnDestroy(){super.ngOnDestroy(),this._bodyAnimationDone.complete(),this._inputChanges.complete()}_containsFocus(){if(this._body){const e=this._document.activeElement,t=this._body.nativeElement;return e===t||t.contains(e)}return!1}}return e.\u0275fac=function(t){return new(t||e)(r.Qb(W,12),r.Qb(r.h),r.Qb(b.d),r.Qb(r.P),r.Qb(i.e),r.Qb(k.a,8),r.Qb(M,8))},e.\u0275cmp=r.Kb({type:e,selectors:[["mat-expansion-panel"]],contentQueries:function(e,t,n){var i;1&e&&r.Ib(n,N,!0),2&e&&r.sc(i=r.fc())&&(t._lazyContent=i.first)},viewQuery:function(e,t){var n;1&e&&r.Ic(E,!0),2&e&&r.sc(n=r.fc())&&(t._body=n.first)},hostAttrs:[1,"mat-expansion-panel"],hostVars:6,hostBindings:function(e,t){2&e&&r.Gb("mat-expanded",t.expanded)("_mat-animation-noopable","NoopAnimations"===t._animationMode)("mat-expansion-panel-spacing",t._hasSpacing())},inputs:{disabled:"disabled",expanded:"expanded",hideToggle:"hideToggle",togglePosition:"togglePosition"},outputs:{opened:"opened",closed:"closed",expandedChange:"expandedChange",afterExpand:"afterExpand",afterCollapse:"afterCollapse"},exportAs:["matExpansionPanel"],features:[r.Bb([{provide:W,useValue:void 0}]),r.zb,r.Ab],ngContentSelectors:T,decls:7,vars:4,consts:[["role","region",1,"mat-expansion-panel-content",3,"id"],["body",""],[1,"mat-expansion-panel-body"],[3,"cdkPortalOutlet"]],template:function(e,t){1&e&&(r.mc(P),r.lc(0),r.Wb(1,"div",0,1),r.ec("@bodyExpansion.done",(function(e){return t._bodyAnimationDone.next(e)})),r.Wb(3,"div",2),r.lc(4,1),r.Dc(5,D,0,0,"ng-template",3),r.Vb(),r.lc(6,2),r.Vb()),2&e&&(r.Cb(1),r.nc("@bodyExpansion",t._getExpandedState())("id",t.id),r.Db("aria-labelledby",t._headerId),r.Cb(4),r.nc("cdkPortalOutlet",t._portal))},directives:[_.c],styles:[".mat-expansion-panel{box-sizing:content-box;display:block;margin:0;border-radius:4px;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:4px;border-top-left-radius:4px}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.cdk-high-contrast-active .mat-expansion-panel{outline:solid 1px}.mat-expansion-panel.ng-animate-disabled,.ng-animate-disabled .mat-expansion-panel,.mat-expansion-panel._mat-animation-noopable{transition:none}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.mat-action-row button.mat-button-base,.mat-action-row button.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row button.mat-button-base,[dir=rtl] .mat-action-row button.mat-mdc-button-base{margin-left:0;margin-right:8px}\n"],encapsulation:2,data:{animation:[R.bodyExpansion]},changeDetection:0}),e})(),G=(()=>{class e{constructor(e,t,n,i,a){this.panel=e,this._element=t,this._focusMonitor=n,this._changeDetectorRef=i,this._parentChangeSubscription=h.a.EMPTY,this._animationsDisabled=!0;const o=e.accordion?e.accordion._stateChanges.pipe(Object(d.a)(e=>!(!e.hideToggle&&!e.togglePosition))):j.a;this._parentChangeSubscription=Object(A.a)(e.opened,e.closed,o,e._inputChanges.pipe(Object(d.a)(e=>!!(e.hideToggle||e.disabled||e.togglePosition)))).subscribe(()=>this._changeDetectorRef.markForCheck()),e.closed.pipe(Object(d.a)(()=>e._containsFocus())).subscribe(()=>n.focusVia(t,"program")),n.monitor(t).subscribe(t=>{t&&e.accordion&&e.accordion._handleHeaderFocus(this)}),a&&(this.expandedHeight=a.expandedHeight,this.collapsedHeight=a.collapsedHeight)}_animationStarted(){this._animationsDisabled=!1}get disabled(){return this.panel.disabled}_toggle(){this.disabled||this.panel.toggle()}_isExpanded(){return this.panel.expanded}_getExpandedState(){return this.panel._getExpandedState()}_getPanelId(){return this.panel.id}_getTogglePosition(){return this.panel.togglePosition}_showToggle(){return!this.panel.hideToggle&&!this.panel.disabled}_keydown(e){switch(e.keyCode){case y.j:case y.d:Object(y.o)(e)||(e.preventDefault(),this._toggle());break;default:return void(this.panel.accordion&&this.panel.accordion._handleHeaderKeydown(e))}}focus(e="program",t){this._focusMonitor.focusVia(this._element,e,t)}ngOnDestroy(){this._parentChangeSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._element)}}return e.\u0275fac=function(t){return new(t||e)(r.Qb(z,1),r.Qb(r.l),r.Qb(O.d),r.Qb(r.h),r.Qb(M,8))},e.\u0275cmp=r.Kb({type:e,selectors:[["mat-expansion-panel-header"]],hostAttrs:["role","button",1,"mat-expansion-panel-header","mat-focus-indicator"],hostVars:19,hostBindings:function(e,t){1&e&&(r.Hb("@expansionHeight.start",(function(){return t._animationStarted()})),r.ec("click",(function(){return t._toggle()}))("keydown",(function(e){return t._keydown(e)}))),2&e&&(r.Db("id",t.panel._headerId)("tabindex",t.disabled?-1:0)("aria-controls",t._getPanelId())("aria-expanded",t._isExpanded())("aria-disabled",t.panel.disabled),r.Hc("@.disabled",t._animationsDisabled)("@expansionHeight",r.rc(16,V,t._getExpandedState(),r.rc(13,H,t.collapsedHeight,t.expandedHeight))),r.Gb("mat-expanded",t._isExpanded())("mat-expansion-toggle-indicator-after","after"===t._getTogglePosition())("mat-expansion-toggle-indicator-before","before"===t._getTogglePosition()))},inputs:{expandedHeight:"expandedHeight",collapsedHeight:"collapsedHeight"},ngContentSelectors:L,decls:5,vars:1,consts:[[1,"mat-content"],["class","mat-expansion-indicator",4,"ngIf"],[1,"mat-expansion-indicator"]],template:function(e,t){1&e&&(r.mc(I),r.Wb(0,"span",0),r.lc(1),r.lc(2,1),r.lc(3,2),r.Vb(),r.Dc(4,Q,1,1,"span",1)),2&e&&(r.Cb(4),r.nc("ngIf",t._showToggle()))},directives:[i.t],styles:['.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;position:relative}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;margin-right:16px}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header-description{flex-grow:2}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}\n'],encapsulation:2,data:{animation:[R.indicatorRotate,R.expansionHeaderHeight]},changeDetection:0}),e})(),q=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275dir=r.Lb({type:e,selectors:[["mat-panel-description"]],hostAttrs:[1,"mat-expansion-panel-header-description"]}),e})(),K=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275dir=r.Lb({type:e,selectors:[["mat-panel-title"]],hostAttrs:[1,"mat-expansion-panel-header-title"]}),e})(),U=(()=>{class e{}return e.\u0275mod=r.Ob({type:e}),e.\u0275inj=r.Nb({factory:function(t){return new(t||e)},imports:[[i.c,f,_.h]]}),e})();function X(e,t){if(1&e){const e=r.Xb();r.Wb(0,"div",3),r.ec("click",(function(){r.vc(e);const n=t.$implicit;return r.ic().onShow(n)})),r.Wb(1,"section"),r.Ec(2),r.Vb(),r.Wb(3,"p"),r.Ec(4),r.Vb(),r.Wb(5,"p",4),r.Wb(6,"span",5),r.Ec(7),r.Vb(),r.Wb(8,"span",6),r.Ec(9),r.Vb(),r.Wb(10,"span",7),r.Ec(11),r.Vb(),r.Vb(),r.Vb()}if(2&e){const e=t.$implicit;r.Cb(2),r.Fc(e.title),r.Cb(2),r.Fc(e.summary),r.Cb(3),r.Gc(" v",e.version," "),r.Cb(2),r.Gc("",null==e.createDate?null:e.createDate.toLocaleDateString()," - "),r.Cb(2),r.Gc(" ",e.updateDate.toLocaleDateString(),"")}}let B=(()=>{class e{constructor(e,t){this.router=e,this.store=t,this.panelOpenState=!1,this.hasOpened=!1,this.onPanelOpen=e=>{this.panelOpenState=!0,this.hasOpened||(this.hasOpened=!0,this.pageList$=this.store.pipe(Object(a.k)(Object(o.t)(this.ids)),Object(s.a)(e=>[...e.map(e=>null==e?void 0:e.metaData).filter(e=>!!e)]),Object(d.a)(e=>!!(null==e?void 0:e.length))),this.store.dispatch(new o.i({ids:this.ids})))},this.ids=new Array}set pages(e){const t=e.split(" ").map(e=>+e);this.ids=t,this.panelOpenState&&(this.hasOpened=!1,this.onPanelOpen(void 0))}ngOnInit(){}onShow(e){this.router.navigate(["/doc"],{queryParams:{id:e.id,title:e.title,f:e.format||"md"}})}}return e.\u0275fac=function(t){return new(t||e)(r.Qb(c.f),r.Qb(a.c))},e.\u0275cmp=r.Kb({type:e,selectors:[["i-subpage"]],inputs:{pages:"pages"},decls:9,vars:4,consts:[[2,"background-color","transparent","box-shadow","none",3,"opened","closed"],[1,"card-container"],["class","docs-card",3,"click",4,"ngFor","ngForOf"],[1,"docs-card",3,"click"],[1,"meta-version-date","card-footer"],[1,"meta-version"],[1,"meta-date",2,"margin-left","10px"],[1,"meta-date"]],template:function(e,t){1&e&&(r.Wb(0,"mat-expansion-panel",0),r.ec("opened",(function(e){return t.onPanelOpen(e)}))("closed",(function(){return t.panelOpenState=!1})),r.Wb(1,"mat-expansion-panel-header"),r.Wb(2,"mat-panel-title"),r.Ec(3),r.Vb(),r.Wb(4,"mat-panel-description"),r.Ec(5," Subpages of this document "),r.Vb(),r.Vb(),r.Wb(6,"div",1),r.Dc(7,X,12,5,"div",2),r.jc(8,"async"),r.Vb(),r.Vb()),2&e&&(r.Cb(3),r.Gc(" Subpages(",t.ids.length,") "),r.Cb(4),r.nc("ngForOf",r.kc(8,2,t.pageList$)))},directives:[z,G,K,q,i.s],pipes:[i.b],styles:[""]}),e})();var Y=n("NFeN"),$=n("bTqV"),J=n("dNgK");let Z=(()=>{class e{constructor(){this.customElementComponent=B}}return e.\u0275mod=r.Ob({type:e}),e.\u0275inj=r.Nb({factory:function(t){return new(t||e)},imports:[[i.c,J.e,Y.b,$.c,U]]}),e})()}}]);