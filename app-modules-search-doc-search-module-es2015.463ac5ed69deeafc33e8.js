(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"2pae":function(t,e,c){"use strict";c.r(e),c.d(e,"DocSearchModule",(function(){return k}));var n=c("btWG"),r=c("pbDB"),a=c("tyNb"),i=c("fXoL"),o=c("NFeN");let s=(()=>{class t{constructor(){this.search=new i.n}ngOnInit(){}onSearch(t){this.search.emit(t.trim())}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Hb({type:t,selectors:[["iam-doc-search-bar"]],outputs:{search:"search"},decls:4,vars:0,consts:[[1,"doc-search"],[1,"search-icon"],["autofocus","","matInput","","action-bar-flex","","type","text","placeholder","Search...",1,"input-lg","search-input",3,"keyup"]],template:function(t,e){1&t&&(i.Tb(0,"div",0),i.Tb(1,"mat-icon",1),i.Ac(2,"search"),i.Sb(),i.Tb(3,"input",2),i.ac("keyup",(function(t){return e.onSearch(t.target.value)})),i.Sb(),i.Sb())},directives:[o.a],styles:[".doc-search[_ngcontent-%COMP%]{height:4rem;padding-left:1rem;font-size:1.4rem;display:flex;flex:1;background:#fff}.doc-search[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin:auto}.doc-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;font-family:RobotoRegular;width:auto;max-width:none;display:inline-block;border:0;padding:.25rem .5rem;margin:0}"]}),t})();var l=c("Kj3r"),u=c("/uUt"),d=c("vkgz"),m=c("kt0X"),h=c("ZqIn"),f=c("ofXK"),b=c("Wp6s");function p(t,e){if(1&t&&i.Ob(0,"div",3),2&t){const t=e.$implicit,c=i.ec();i.jc("innerHTML",c.getMatches(t),i.sc)}}let g=(()=>{class t{constructor(t){this.router=t}onClick(t){this.router.navigate(["/doc"],{queryParams:{id:this.item.id,title:this.item.title,f:"md"}})}getMatches(t){const e=t.fragment;let c="",n=0;return t.matches.forEach(t=>{const r=t.indices;c+=e.substr(n,r[0]-n),c+=`<em>${t.text}</em>`,n=r[1]}),c+=e.substr(n),c}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)(i.Nb(a.f))},t.\u0275cmp=i.Hb({type:t,selectors:[["doc-search-item"]],inputs:{item:"item"},decls:9,vars:3,consts:[[3,"click"],[2,"text-decoration","none"],["class","fragment",3,"innerHTML",4,"ngFor","ngForOf"],[1,"fragment",3,"innerHTML"]],template:function(t,e){1&t&&(i.Tb(0,"mat-card"),i.Tb(1,"mat-card-header",0),i.ac("click",(function(t){return e.onClick(t)})),i.Tb(2,"a",1),i.Tb(3,"mat-card-title"),i.Ac(4),i.Sb(),i.Tb(5,"mat-card-subtitle"),i.Ac(6),i.Sb(),i.Sb(),i.Sb(),i.Tb(7,"mat-card-content"),i.zc(8,p,1,1,"div",2),i.Sb(),i.Sb()),2&t&&(i.Ab(4),i.Bc(e.item.title),i.Ab(2),i.Cc(" ",e.item.score,""),i.Ab(2),i.jc("ngForOf",e.item.text_matches))},directives:[b.a,b.f,b.m,b.l,b.d,f.s],styles:[".fragment[_ngcontent-%COMP%]{white-space:pre-wrap}.fragment[_ngcontent-%COMP%]     em{background:#ff0}[_nghost-%COMP%]{display:inline-block;max-width:1000px;width:100%;display:flex}mat-card[_ngcontent-%COMP%]{width:100%;margin-top:3px}"]}),t})();function y(t,e){1&t&&i.Ob(0,"doc-search-item",4),2&t&&i.jc("item",e.$implicit)}const w=function(t){return{container:t}},O=function(t){return[t]},v=[{path:"",component:(()=>{class t{constructor(t){this._store=t,this.searchResult$=this._store.select(n.selectSearchResultState),this.trackByFunc=(t,e)=>e.id}ngAfterViewInit(){this.docSearchComponent.search.pipe(Object(l.a)(300),Object(u.a)(),Object(d.a)(t=>{""!==t.trim()&&this._store.dispatch(new n.DocumentEffectsSearch({query:t}))})).subscribe()}onSearch(t){}}return t.\u0275fac=function(e){return new(e||t)(i.Nb(m.c))},t.\u0275cmp=i.Hb({type:t,selectors:[["doc-search-list"]],viewQuery:function(t,e){var c;1&t&&i.Ec(s,!0),2&t&&i.oc(c=i.bc())&&(e.docSearchComponent=c.first)},decls:5,vars:9,consts:[["clickToggleEnable","false",3,"scrollHide"],[1,"search-result"],["search",""],[3,"item",4,"ngFor","ngForOf","ngForTrackBy"],[3,"item"]],template:function(t,e){if(1&t&&(i.Ob(0,"iam-doc-search-bar",0),i.Tb(1,"div",1,2),i.zc(3,y,1,1,"doc-search-item",3),i.fc(4,"async"),i.Sb()),2&t){const t=i.pc(2);i.jc("scrollHide",i.mc(7,O,i.mc(5,w,t))),i.Ab(3),i.jc("ngForOf",i.gc(4,3,e.searchResult$))("ngForTrackBy",e.trackByFunc)}},directives:[s,h.a,f.s,g],pipes:[f.b],styles:["[_nghost-%COMP%]{max-width:400px;width:100%}.search-result[_ngcontent-%COMP%]{overflow:auto;display:flex;flex-flow:row wrap;box-sizing:border-box;justify-content:space-around;height:calc(100vh - 50px);margin-bottom:50px}"]}),t})()}];let x=(()=>{class t{}return t.\u0275mod=i.Lb({type:t}),t.\u0275inj=i.Kb({factory:function(e){return new(e||t)},imports:[[a.j.forChild(v)],a.j]}),t})();var S=c("P1ng");let k=(()=>{class t{}return t.\u0275mod=i.Lb({type:t}),t.\u0275inj=i.Kb({factory:function(e){return new(e||t)},providers:[r.a],imports:[[n.SharedModule,S.a,x]]}),t})()}}]);