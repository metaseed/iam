!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}(self.webpackChunkiam=self.webpackChunkiam||[]).push([["src_app_modules_search_doc-search_module_ts"],{93444:function(e,r,c){c.r(r),c.d(r,{DocSearchModule:function(){return T}});var i,o=c(81392),a=c(30159),s=c(43796),u=c(17215),f=c(21199),l=c(72077),h=((i=function(){function e(n){t(this,e),this.matInput=n}return n(e,[{key:"ngOnInit",value:function(){var t=this;setTimeout(function(){return t.matInput.focus()})}}]),e}()).\u0275fac=function(t){return new(t||i)(u.Y36(l.Nt))},i.\u0275dir=u.lG2({type:i,selectors:[["","matInputAutofocus",""]]}),i),m=function(){var e=function(){function e(){t(this,e),this.search=new u.vpe}return n(e,[{key:"onSearch",value:function(t){this.search.next(t.trim())}}]),e}();return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=u.Xpm({type:e,selectors:[["iam-doc-search-bar"]],outputs:{search:"search"},decls:4,vars:0,consts:[[1,"doc-search"],[1,"search-icon"],["matInput","","matInputAutofocus","","action-bar-flex","","type","text","placeholder","Search...",1,"input-lg","search-input",3,"keyup"]],template:function(t,e){1&t&&(u.TgZ(0,"div",0),u.TgZ(1,"mat-icon",1),u._uU(2,"search"),u.qZA(),u.TgZ(3,"input",2),u.NdJ("keyup",function(t){return e.onSearch(t.target.value)}),u.qZA(),u.qZA())},directives:[f.Hw,l.Nt,h],styles:[".doc-search[_ngcontent-%COMP%]{height:4rem;padding-left:1rem;font-size:1.4rem;display:flex;flex:1;background:white}.doc-search[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin:auto}.doc-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;font-family:RobotoRegular;width:auto;max-width:none;display:inline-block;border:0;padding:.25rem .5rem;margin:0}"]}),e}(),d=c(87517),p=c(73898),g=c(84653),v=c(71076),y=c(37705),w=c(7395),_=c(90953);function b(t,e){if(1&t&&u._UZ(0,"div",2),2&t){var n=e.$implicit,r=u.oxw();u.Q6J("innerHTML",r.getMatches(n),u.oJD)}}var x=function(){var e=function(){function e(n){t(this,e),this.router=n}return n(e,[{key:"onClick",value:function(t){this.router.navigate(["/doc"],{queryParams:{id:this.item.id,title:this.item.title,f:"md"}})}},{key:"getMatches",value:function(t){var e=t.fragment,n="",r=0;return t.matches.forEach(function(t){var c=t.indices;n+=e.substr(r,c[0]-r),n+="<em>".concat(t.text,"</em>"),r=c[1]}),n+=e.substr(r)}}]),e}();return e.\u0275fac=function(t){return new(t||e)(u.Y36(s.F0))},e.\u0275cmp=u.Xpm({type:e,selectors:[["doc-search-item"]],inputs:{item:"item"},decls:9,vars:4,consts:[[1,"title",3,"click"],["class","fragment",3,"innerHTML",4,"ngFor","ngForOf"],[1,"fragment",3,"innerHTML"]],template:function(t,e){1&t&&(u.TgZ(0,"mat-card"),u.TgZ(1,"mat-card-header"),u._UZ(2,"div"),u.TgZ(3,"mat-card-title",0),u.NdJ("click",function(t){return e.onClick(t)}),u._uU(4),u.qZA(),u.TgZ(5,"mat-card-subtitle"),u._uU(6),u.qZA(),u.qZA(),u.TgZ(7,"mat-card-content"),u.YNc(8,b,1,1,"div",1),u.qZA(),u.qZA()),2&t&&(u.xp6(4),u.Oqu(e.item.title),u.xp6(2),u.AsE(" Score: ",e.item.score," Id: ",e.item.id,""),u.xp6(2),u.Q6J("ngForOf",e.item.text_matches))},directives:[_.a8,_.dk,_.n5,_.$j,_.dn,w.sg],styles:[".fragment[_ngcontent-%COMP%]{white-space:pre-wrap}.fragment[_ngcontent-%COMP%]     em{background:yellow}[_nghost-%COMP%]{display:inline-block;max-width:1000px;width:100%;display:flex}mat-card[_ngcontent-%COMP%]{width:100%;margin-top:3px}mat-card[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{cursor:pointer;text-decoration:underline}"]}),e}();function k(t,e){1&t&&u._UZ(0,"doc-search-item",4),2&t&&u.Q6J("item",e.$implicit)}var Z=function(t){return{container:t}},C=function(t){return[t]},M=[{path:"",component:function(){var e=function(){function e(n){t(this,e),this._store=n,this.searchResult$=this._store.select(o.UQ),this.trackByFunc=function(t,e){return e.id}}return n(e,[{key:"ngAfterViewInit",value:function(){var t=this;this.docSearchComponent.search.pipe((0,p.b)(500),(0,g.x)(),(0,d.b)(function(e){""!==e.trim()&&t._store.dispatch(new o.i2({query:e}))})).subscribe()}},{key:"onSearch",value:function(t){}}]),e}();return e.\u0275fac=function(t){return new(t||e)(u.Y36(v.yh))},e.\u0275cmp=u.Xpm({type:e,selectors:[["doc-search-list"]],viewQuery:function(t,e){var n;(1&t&&u.Gf(m,5),2&t)&&(u.iGM(n=u.CRH())&&(e.docSearchComponent=n.first))},decls:5,vars:9,consts:[["clickToggleEnable","false",3,"scrollHide"],[1,"search-result"],["search",""],[3,"item",4,"ngFor","ngForOf","ngForTrackBy"],[3,"item"]],template:function(t,e){if(1&t&&(u._UZ(0,"iam-doc-search-bar",0),u.TgZ(1,"div",1,2),u.YNc(3,k,1,1,"doc-search-item",3),u.ALo(4,"async"),u.qZA()),2&t){var n=u.MAs(2);u.Q6J("scrollHide",u.VKq(7,C,u.VKq(5,Z,n))),u.xp6(3),u.Q6J("ngForOf",u.lcZ(4,3,e.searchResult$))("ngForTrackBy",e.trackByFunc)}},directives:[m,y.M,w.sg,x],pipes:[w.Ov],styles:["[_nghost-%COMP%]{max-width:400px;width:100%}.search-result[_ngcontent-%COMP%]{overflow:auto;display:flex;flex-flow:row wrap;box-sizing:border-box;justify-content:space-around;height:calc(100vh - 50px);margin-bottom:50px}"]}),e}()}],O=function(){var e=function e(){t(this,e)};return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[s.Bz.forChild(M)],s.Bz]}),e}(),A=c(73346),T=function(){var e=function e(){t(this,e)};return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({providers:[a.N],imports:[[o.m8,A.q,O]]}),e}()}}])}();