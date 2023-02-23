"use strict";(self.webpackChunkiam=self.webpackChunkiam||[]).push([["common"],{4196:(L,C,c)=>{c.d(C,{z:()=>l});var t=c(4852),u=c(5281),g=c(3746),p=c(1956);class l{constructor(o,r){this._store=o,this.docEditor=r,this.logger=(0,t.Yd)(`${this.constructor.name}`)}set sourceLines(o){const r=/\[\s*(\d+)\s*,\s*(\d+)\s*\]/.exec(o);r?(this.sourceLineStart=+r[1],this.sourceLineEnd=+r[2]):this.logger.debug(`sourceLines: ${o}`)}get source(){const o=this._store.currentDocContentString$.state,[r,d]=this.getRange(o);return o.substring(r,d)}set source(o){if(this.docEditor.currentEditor)return void this.docEditor.currentEditor.replaceRange(o+"\n",this.sourceLineStart,0,this.sourceLineEnd,0);const d=this._store.currentDocContent$.state.content,h=this._store.currentId_.state,[i,y]=this.getRange(d),f=function D(_,o,r,d){return o<0&&((o+=this.length)<0&&(o=0)),_.slice(0,o)+(d||"")+_.slice(o+r)}(d,i,y-i,o);this._store.docContent.update({id:h,changes:{content:f}}),setTimeout(()=>this._store.upsertDocStatus({isStoreDirty:!0}),h)}getRange(o){if(this.sourceLineStart>=this.sourceLineEnd)throw"DataSourceLines: sourceLineStart should less than sourceLineEnd";let d,h,r=0;for(let i=0;i<o.length;i++)if("\n"===o[i]&&(r++,r===this.sourceLineStart&&(d=i+1),r===this.sourceLineEnd)){h=i;break}if(void 0===d||void 0===h)throw"DataSourceLines: content lenth is less than expected!";return[d,h]}}l.\u0275fac=function(o){return new(o||l)(u.Y36(g.G),u.Y36(p.d))},l.\u0275dir=u.lG2({type:l,inputs:{sourceLines:["data-source-lines","sourceLines"]}})},7851:(L,C,c)=>{c.d(C,{I:()=>S});var t=c(5281),u=c(4785),g=c(1938);class p{constructor(e,n){this.matInput=e,this.elRef=n,this.autofocusSelectValue=!1}ngOnInit(){setTimeout(()=>{if(this.matInput.focus(),this.autofocusSelectValue){const e=this.elRef.nativeElement;e.setSelectionRange(0,e.value.length)}})}}p.\u0275fac=function(e){return new(e||p)(t.Y36(g.Nt),t.Y36(t.SBq))},p.\u0275dir=t.lG2({type:p,selectors:[["","matInputAutofocus",""]],inputs:{autofocusSelectValue:"autofocusSelectValue"}});class l{constructor(){this.search=new t.vpe}onSearch(e){this.search.next(e.trim())}}l.\u0275fac=function(e){return new(e||l)},l.\u0275cmp=t.Xpm({type:l,selectors:[["iam-doc-search-bar"]],outputs:{search:"search"},decls:4,vars:0,consts:[[1,"doc-search"],[1,"search-icon"],["matInput","","matInputAutofocus","","action-bar-flex","","type","text","placeholder","Search...",1,"input-lg","search-input",3,"keyup"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"mat-icon",1),t._uU(2,"search"),t.qZA(),t.TgZ(3,"input",2),t.NdJ("keyup",function(m){return n.onSearch(m.target.value)}),t.qZA()())},dependencies:[u.Hw,p,g.Nt],styles:[".doc-search[_ngcontent-%COMP%]{height:4rem;padding-left:1rem;font-size:1.4rem;display:flex;flex:1;background:white}.doc-search[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin:auto}.doc-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;font-family:RobotoRegular;width:auto;max-width:none;display:inline-block;border:0;padding:.25rem .5rem;margin:0}"]});var D=c(2538),_=c(504),o=c(8045),r=c(2482),d=c(3746),h=c(7011),i=c(8903);function y(s,e){if(1&s&&t._UZ(0,"div",3),2&s){const n=e.$implicit,a=t.oxw();t.Q6J("innerHTML",a.getMatches(n),t.oJD)}}class f{constructor(){this.onClick=new t.vpe}getMatches(e){const n=e.fragment;let a="",m=0;return e.matches.forEach(v=>{const E=v.indices;a+=n.substr(m,E[0]-m),a+=`<em>${v.text}</em>`,m=E[1]}),a+=n.substr(m),a}}function M(s,e){if(1&s){const n=t.EpF();t.TgZ(0,"doc-search-item",4),t.NdJ("onClick",function(m){t.CHM(n);const v=t.oxw();return t.KtG(v.onClick.emit(m))}),t.qZA()}2&s&&t.Q6J("item",e.$implicit)}f.\u0275fac=function(e){return new(e||f)},f.\u0275cmp=t.Xpm({type:f,selectors:[["doc-search-item"]],inputs:{item:"item"},outputs:{onClick:"onClick"},decls:9,vars:5,consts:[["appearance","outlined"],[1,"title",3,"click"],["class","fragment",3,"innerHTML",4,"ngFor","ngForOf"],[1,"fragment",3,"innerHTML"]],template:function(e,n){1&e&&(t.TgZ(0,"mat-card",0)(1,"mat-card-header"),t._UZ(2,"div"),t.TgZ(3,"mat-card-title",1),t.NdJ("click",function(){return n.onClick.emit(n.item)}),t._uU(4),t.qZA(),t.TgZ(5,"mat-card-subtitle"),t._uU(6),t.qZA()(),t.TgZ(7,"mat-card-content"),t.YNc(8,y,1,1,"div",2),t.qZA()()),2&e&&(t.xp6(4),t.Oqu(n.item.title),t.xp6(2),t.lnq(" Score: ",n.item.score," Id: ",n.item.id," source: ",n.item.source,""),t.xp6(2),t.Q6J("ngForOf",n.item.text_matches))},dependencies:[h.sg,i.a8,i.dn,i.dk,i.$j,i.n5],styles:[".fragment[_ngcontent-%COMP%]{white-space:pre-wrap}.fragment[_ngcontent-%COMP%]     em{background:yellow;font-style:normal}[_nghost-%COMP%]{display:inline-block;max-width:1000px;width:100%;display:flex}mat-card[_ngcontent-%COMP%]{width:100%;margin-top:3px}mat-card[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{cursor:pointer;text-decoration:underline}"]});class S{constructor(e,n){this._store=e,this.documentEffects=n,this.onClick=new t.vpe,this.searchResult$=this._store.searchResult_,this.trackByFunc=(a,m)=>m.id}ngAfterViewInit(){this.docSearchComponent.search.pipe((0,_.b)(800),(0,o.x)(),(0,D.b)(e=>{""!==e.trim()&&this.documentEffects.searchDocument_.next({query:e})})).subscribe()}}S.\u0275fac=function(e){return new(e||S)(t.Y36(d.G),t.Y36(r.CL))},S.\u0275cmp=t.Xpm({type:S,selectors:[["doc-search-list"]],viewQuery:function(e,n){if(1&e&&t.Gf(l,5),2&e){let a;t.iGM(a=t.CRH())&&(n.docSearchComponent=a.first)}},outputs:{onClick:"onClick"},decls:5,vars:4,consts:[["clickToggleEnable","false"],[1,"search-result"],["search",""],[3,"item","onClick",4,"ngFor","ngForOf","ngForTrackBy"],[3,"item","onClick"]],template:function(e,n){1&e&&(t._UZ(0,"iam-doc-search-bar",0),t.TgZ(1,"div",1,2),t.YNc(3,M,1,1,"doc-search-item",3),t.ALo(4,"async"),t.qZA()),2&e&&(t.xp6(3),t.Q6J("ngForOf",t.lcZ(4,2,n.searchResult$))("ngForTrackBy",n.trackByFunc))},dependencies:[h.sg,l,f,h.Ov],styles:["[_nghost-%COMP%]{max-width:400px;width:100%}.search-result[_ngcontent-%COMP%]{overflow:auto;display:flex;flex-flow:row wrap;box-sizing:border-box;justify-content:space-around;max-height:calc(100vh - 50px);margin-bottom:50px}"]})},1956:(L,C,c)=>{c.d(C,{d:()=>u});var t=c(5281);class u{}u.\u0275fac=function(p){return new(p||u)},u.\u0275prov=t.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"})}}]);