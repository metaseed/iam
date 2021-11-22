"use strict";(self.webpackChunkiam=self.webpackChunkiam||[]).push([["src_app_modules_markdown_viewer_elements_version_version_module_ts"],{1454:(J,f,n)=>{n.r(f),n.d(f,{VersionModule:()=>_});var u=n(6903),Z=n(3245),g=n(3196),H=n(2265),m=n(7992),v=n(4992),t=n(8079),T=n(8453);let y=(()=>{class o{constructor(e){this.githubStorage=e}getHistory(e,s){return this.githubStorage.init().pipe((0,v.w)(r=>r.listCommits({path:`documents/${e}.${s}`})))}getHistoryVersion(e,s,r){return this.githubStorage.init().pipe((0,v.w)(a=>a.getContents(`documents/${e}.${s}`,r)))}}return o.\u0275fac=function(e){return new(e||o)(t.LFG(T.SS))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac}),o})();var D=n(3863),x=n(4060),S=n(675),C=n(3937),A=n(3302);function V(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"a",2),t.NdJ("click",function(){const a=t.CHM(e).$implicit;return t.oxw().openLink(a)}),t.TgZ(1,"span",3),t._uU(2),t.qZA(),t.TgZ(3,"div",4),t.TgZ(4,"span"),t._uU(5),t.qZA(),t.TgZ(6,"span",5),t._uU(7),t.qZA(),t.qZA(),t.qZA()}if(2&o){const e=i.$implicit;t.xp6(2),t.Oqu(e.commit.message),t.xp6(3),t.Oqu(e.commit.committer.date),t.xp6(2),t.AsE(" ",e.commit.author.name," <",e.commit.author.email,">")}}let F=(()=>{class o{constructor(e,s,r,a){this.data=e,this.service=s,this.docStore=r,this.router=a;const{id:l,format:d}=this.data;s.getHistory(l,d).subscribe(c=>{this.docHistory_all=c,this.docHistory=this.docHistory_filtered=c.filter(p=>/, change:.*/.test(p.commit.message))})}showAllOrFiltered(e){this.docHistory=e.checked?this.docHistory_all:this.docHistory_filtered}openLink(e){this.selectedCommit=e;const s=e.sha,{id:r,format:a}=this.data;this.service.getHistoryVersion(r,a,s).subscribe(l=>{const d=new H.Sb(m.Mx,l.content,s);this.docStore.docContent.upsert(d);const c=Object.assign({},this.docStore.docMeta.currentEntity$.state);c.id=m.Mx,this.docStore.docMeta.upsert(c),this.docStore.docStatus.upsert({id:m.Mx,isEditable:!1}),this.router.navigate(["/doc"],{queryParams:{id:m.Mx,f:a||"md"}})})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(g.OG),t.Y36(y),t.Y36(D.G),t.Y36(x.F0))},o.\u0275cmp=t.Xpm({type:o,selectors:[["document-history-list"]],features:[t._Bn([y])],decls:4,vars:1,consts:[[3,"change"],["mat-list-item","",3,"click",4,"ngFor","ngForOf"],["mat-list-item","",3,"click"],["mat-line",""],["mat-line","",2,"display","flex","justify-content","space-between","color","slategray","font-style","italic","font-size","smaller"],[2,"font-size","smaller"]],template:function(e,s){1&e&&(t.TgZ(0,"mat-slide-toggle",0),t.NdJ("change",function(a){return s.showAllOrFiltered(a)}),t._uU(1,"all"),t.qZA(),t.TgZ(2,"mat-nav-list"),t.YNc(3,V,8,4,"a",1),t.qZA()),2&e&&(t.xp6(3),t.Q6J("ngForOf",s.docHistory))},directives:[S.Rr,C.Hk,u.sg,C.Tg,A.X2],encapsulation:2}),o})();var M=n(7394);function w(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"a",4),t.NdJ("click",function(){return t.CHM(e),t.oxw().onShowVersions()}),t.TgZ(1,"span"),t._uU(2),t.qZA(),t.TgZ(3,"mat-icon",5),t._uU(4,"open_in_new"),t.qZA(),t.qZA()}if(2&o){const e=t.oxw();t.xp6(2),t.hij("\xa0v",e.version,"")}}function L(o,i){if(1&o&&(t.TgZ(0,"span",6),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Oqu(e.createDate)}}function Y(o,i){if(1&o&&(t.TgZ(0,"span",6),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.hij(" - ",e.updateDate,"")}}function O(o,i){if(1&o&&(t.TgZ(0,"span",7),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.hij("\xa0 (id:",e.id,")")}}let U=(()=>{class o{constructor(e,s){this.bottomSheet=e,this.router=s,this.version="",this.createDate="",this.updateDate="",this.id="",this.format=""}ngOnInit(){const e=this.router.parseUrl(this.router.url).queryParams;this.id=e.id,this.format=e.f}onShowVersions(){this.bottomSheet.open(F,{data:{id:this.id,format:this.format}}).afterDismissed().subscribe()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(g.ch),t.Y36(x.F0))},o.\u0275cmp=t.Xpm({type:o,selectors:[["i-version"]],inputs:{version:"version",createDate:"createDate",updateDate:"updateDate"},decls:5,vars:4,consts:[[1,"meta-version-date"],["class","meta-version","aria-label","show document history versions",3,"click",4,"ngIf"],["class","meta-date",4,"ngIf"],["class","meta-id",4,"ngIf"],["aria-label","show document history versions",1,"meta-version",3,"click"],[2,"font-size","small"],[1,"meta-date"],[1,"meta-id"]],template:function(e,s){1&e&&(t.TgZ(0,"div",0),t.YNc(1,w,5,1,"a",1),t.YNc(2,L,2,1,"span",2),t.YNc(3,Y,2,1,"span",2),t.YNc(4,O,2,1,"span",3),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngIf",s.version),t.xp6(1),t.Q6J("ngIf",s.createDate),t.xp6(1),t.Q6J("ngIf",s.updateDate),t.xp6(1),t.Q6J("ngIf",s.id))},directives:[u.O5,M.Hw],encapsulation:2}),o})(),_=(()=>{class o{constructor(){this.customElementComponent=U}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({providers:[],imports:[[u.ez,Z.B]]}),o})()}}]);