"use strict";(self.webpackChunkiam=self.webpackChunkiam||[]).push([["common"],{6145:(E,C,c)=>{c.d(C,{z:()=>_});var t=c(2),g=c(8079),h=c(3863),S=c(8513);let _=(()=>{class m{constructor(r,s){this._store=r,this.docEditor=s,this.logger=(0,t.Yd)(`${this.constructor.name}`)}set sourceLines(r){const s=/\[\s*(\d+)\s*,\s*(\d+)\s*\]/.exec(r);s?(this.sourceLineStart=+s[1],this.sourceLineEnd=+s[2]):this.logger.debug(`sourceLines: ${r}`)}get source(){const r=this._store.currentDocContentString$.state,[s,a]=this.getRange(r);return r.substring(s,a)}set source(r){if(this.docEditor.currentEditor)return void this.docEditor.currentEditor.replaceRange(r+"\n",this.sourceLineStart,0,this.sourceLineEnd,0);const a=this._store.currentDocContent$.state.content,u=this._store.currentId_.state,[p,v]=this.getRange(a),y=function(m,d,r,s){return d<0&&(d+=this.length)<0&&(d=0),m.slice(0,d)+(s||"")+m.slice(d+r)}(a,p,v-p,r);this._store.docContent.update({id:u,changes:{content:y}}),setTimeout(()=>this._store.updateDocStatus({isEditorDirty:!0}))}getRange(r){if(this.sourceLineStart>=this.sourceLineEnd)throw"DataSourceLines: sourceLineStart should less than sourceLineEnd";let a,u,s=0;for(let p=0;p<r.length;p++)if("\n"===r[p]&&(s++,s===this.sourceLineStart&&(a=p+1),s===this.sourceLineEnd)){u=p;break}if(void 0===a||void 0===u)throw"DataSourceLines: content lenth is less than expected!";return[a,u]}}return m.\u0275fac=function(r){return new(r||m)(g.Y36(h.G),g.Y36(S.d))},m.\u0275dir=g.lG2({type:m,inputs:{sourceLines:["data-source-lines","sourceLines"]}}),m})()},1180:(E,C,c)=>{c.d(C,{I:()=>M});var t=c(8079),g=c(7394),h=c(6134);let S=(()=>{class n{constructor(e,o){this.matInput=e,this.elRef=o,this.autofocusSelectValue=!1}ngOnInit(){setTimeout(()=>{if(this.matInput.focus(),this.autofocusSelectValue){const e=this.elRef.nativeElement;e.setSelectionRange(0,e.value.length)}})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(h.Nt),t.Y36(t.SBq))},n.\u0275dir=t.lG2({type:n,selectors:[["","matInputAutofocus",""]],inputs:{autofocusSelectValue:"autofocusSelectValue"}}),n})(),_=(()=>{class n{constructor(){this.search=new t.vpe}onSearch(e){this.search.next(e.trim())}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["iam-doc-search-bar"]],outputs:{search:"search"},decls:4,vars:0,consts:[[1,"doc-search"],[1,"search-icon"],["matInput","","matInputAutofocus","","action-bar-flex","","type","text","placeholder","Search...",1,"input-lg","search-input",3,"keyup"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"mat-icon",1),t._uU(2,"search"),t.qZA(),t.TgZ(3,"input",2),t.NdJ("keyup",function(f){return o.onSearch(f.target.value)}),t.qZA(),t.qZA())},directives:[g.Hw,h.Nt,S],styles:[".doc-search[_ngcontent-%COMP%]{height:4rem;padding-left:1rem;font-size:1.4rem;display:flex;flex:1;background:white}.doc-search[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin:auto}.doc-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;font-family:RobotoRegular;width:auto;max-width:none;display:inline-block;border:0;padding:.25rem .5rem;margin:0}"]}),n})();var D=c(2518),m=c(3550),d=c(878),r=c(6251),s=c(3863),a=c(6903),u=c(7468);function p(n,i){if(1&n&&t._UZ(0,"div",2),2&n){const e=i.$implicit,o=t.oxw();t.Q6J("innerHTML",o.getMatches(e),t.oJD)}}let v=(()=>{class n{constructor(){this.onClick=new t.vpe}getMatches(e){const o=e.fragment;let l="",f=0;return e.matches.forEach(L=>{const T=L.indices;l+=o.substr(f,T[0]-f),l+=`<em>${L.text}</em>`,f=T[1]}),l+=o.substr(f),l}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["doc-search-item"]],inputs:{item:"item"},outputs:{onClick:"onClick"},decls:9,vars:4,consts:[[1,"title",3,"click"],["class","fragment",3,"innerHTML",4,"ngFor","ngForOf"],[1,"fragment",3,"innerHTML"]],template:function(e,o){1&e&&(t.TgZ(0,"mat-card"),t.TgZ(1,"mat-card-header"),t._UZ(2,"div"),t.TgZ(3,"mat-card-title",0),t.NdJ("click",function(){return o.onClick.emit(o.item)}),t._uU(4),t.qZA(),t.TgZ(5,"mat-card-subtitle"),t._uU(6),t.qZA(),t.qZA(),t.TgZ(7,"mat-card-content"),t.YNc(8,p,1,1,"div",1),t.qZA(),t.qZA()),2&e&&(t.xp6(4),t.Oqu(o.item.title),t.xp6(2),t.AsE(" Score: ",o.item.score," Id: ",o.item.id,""),t.xp6(2),t.Q6J("ngForOf",o.item.text_matches))},directives:[u.a8,u.dk,u.n5,u.$j,u.dn,a.sg],styles:[".fragment[_ngcontent-%COMP%]{white-space:pre-wrap}.fragment[_ngcontent-%COMP%]     em{background:yellow;font-style:normal}[_nghost-%COMP%]{display:inline-block;max-width:1000px;width:100%;display:flex}mat-card[_ngcontent-%COMP%]{width:100%;margin-top:3px}mat-card[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{cursor:pointer;text-decoration:underline}"]}),n})();function y(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"doc-search-item",4),t.NdJ("onClick",function(l){return t.CHM(e),t.oxw().onClick.emit(l)}),t.qZA()}2&n&&t.Q6J("item",i.$implicit)}let M=(()=>{class n{constructor(e,o){this._store=e,this.documentEffects=o,this.onClick=new t.vpe,this.searchResult$=this._store.searchResult_,this.trackByFunc=(l,f)=>f.id}ngAfterViewInit(){this.docSearchComponent.search.pipe((0,m.b)(800),(0,d.x)(),(0,D.b)(e=>{""!==e.trim()&&this.documentEffects.searchDocument_.next({query:e})})).subscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(s.G),t.Y36(r.CL))},n.\u0275cmp=t.Xpm({type:n,selectors:[["doc-search-list"]],viewQuery:function(e,o){if(1&e&&t.Gf(_,5),2&e){let l;t.iGM(l=t.CRH())&&(o.docSearchComponent=l.first)}},outputs:{onClick:"onClick"},decls:5,vars:4,consts:[["clickToggleEnable","false"],[1,"search-result"],["search",""],[3,"item","onClick",4,"ngFor","ngForOf","ngForTrackBy"],[3,"item","onClick"]],template:function(e,o){1&e&&(t._UZ(0,"iam-doc-search-bar",0),t.TgZ(1,"div",1,2),t.YNc(3,y,1,1,"doc-search-item",3),t.ALo(4,"async"),t.qZA()),2&e&&(t.xp6(3),t.Q6J("ngForOf",t.lcZ(4,2,o.searchResult$))("ngForTrackBy",o.trackByFunc))},directives:[_,a.sg,v],pipes:[a.Ov],styles:["[_nghost-%COMP%]{max-width:400px;width:100%}.search-result[_ngcontent-%COMP%]{overflow:auto;display:flex;flex-flow:row wrap;box-sizing:border-box;justify-content:space-around;max-height:calc(100vh - 50px);margin-bottom:50px}"]}),n})()},8513:(E,C,c)=>{c.d(C,{d:()=>g});var t=c(8079);let g=(()=>{class h{}return h.\u0275fac=function(_){return new(_||h)},h.\u0275prov=t.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"}),h})()}}]);