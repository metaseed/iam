"use strict";(self.webpackChunkiam=self.webpackChunkiam||[]).push([["src_app_modules_markdown_viewer_elements_tags_tags_module_ts"],{154:(z,u,s)=>{s.r(u),s.d(u,{TagsModule:()=>_});var h=s(6903),f=s(3885),O=s(6145),m=s(2318),b=s(2950),C=s(3550),d=s(2518),y=s(9926),g=s(2118),I=s(8877),t=s(8079),M=s(3863),P=s(1935),L=s(8513),Z=s(7826),A=s(5068),F=s(7733),R=s(7394),c=s(37),T=s(3784),x=s(3302);const J=["tagInput"],B=["autoCompleteTrigger"];function S(a,r){if(1&a){const e=t.EpF();t.TgZ(0,"mat-chip",11),t.NdJ("removed",function(){const i=t.CHM(e).$implicit;return t.oxw().remove(i)}),t._uU(1),t.TgZ(2,"button",12),t.TgZ(3,"mat-icon"),t._uU(4,"cancel"),t.qZA(),t.qZA(),t.qZA()}if(2&a){const e=r.$implicit,o=t.oxw();let n;t.Udp("color","#"+e.color)("background-color","#"+e.color+"22")("border","1px solid #"+e.color),t.Q6J("title",null!==(n=e.description)&&void 0!==n?n:e.name)("selectable",o.selectable)("removable",o.removable),t.xp6(1),t.hij(" ",e.name," ")}}function k(a,r){if(1&a&&(t.TgZ(0,"mat-option",13),t._uU(1),t.qZA()),2&a){const e=r.$implicit;t.Q6J("value",e),t.xp6(1),t.hij(" ",e.name," ")}}let E=(()=>{class a extends O.z{constructor(e,o,n,i,v){super(e,n),this.store=e,this.dialog=o,this.snackBar=i,this.tagService=v,this.selectable=!1,this.removable=!0,this.addOnBlur=!1,this.tagInputFormControl=new g.NI,this.separatorKeysCodes=[f.K5,f.OC],this._modifyTags=new b.x,this._filteredRepoTags=[],this._modifyTags.pipe((0,C.b)(1800),(0,d.b)(l=>this.source=`tag: [${l.filter(p=>p).map(p=>p.name).join(",")}]`)).subscribe(),e.tags.values$.pipe((0,y.g)(0)).subscribe(l=>{this.allRepoTags=l,this.filteredRepoTags=l}),this.tagInputFormControl.valueChanges.pipe((0,d.b)(l=>{if(!l||"string"!=typeof l)return;const p=l.toLocaleLowerCase();this.allRepoTags&&(this.filteredRepoTags=this.allRepoTags.filter(j=>j.name.toLocaleLowerCase().includes(p)))}),(0,C.b)(1e3),(0,d.b)(l=>{0===this._filteredRepoTags.length&&this.snackBar.open(`can not find tag: ${l}`,"ok")})).subscribe()}get filteredRepoTags(){return this._filteredRepoTags}set filteredRepoTags(e){var o;this._filteredRepoTags=null!==(o=null==e?void 0:e.filter(n=>!this.tagList.some(i=>i.name===n.name)))&&void 0!==o?o:[]}set tags(e){this.tagList=[],e.split(",").map(o=>o.trim()).filter(o=>""!==o).forEach(o=>this.store.tags.getById(o).then(n=>{this.tagList.push(n||{name:o})}))}onShowTagsCloud(e){e.stopImmediatePropagation(),this.dialog.open(I.o)}remove(e){const o=this.tagList.findIndex(n=>n.name===e.name);o>=0&&(this.tagList.splice(o,1),this._modifyTags.next(this.tagList))}drop(e){(0,m.bA)(this.tagList,e.previousIndex,e.currentIndex),this._modifyTags.next(this.tagList)}displayFn(e){return e&&e.name?e.name:""}selected(e){const o=e.option.viewValue.trim();this.tagList.some(n=>n.name===o)?(this.filteredRepoTags=this.allRepoTags,this.autoPanel.openPanel(),this.snackBar.open(`tag ${o} already exist.`,"ok")):this.store.tags.getById(o).then(n=>{n&&(this.tagList.push(n),this._modifyTags.next(this.tagList))}),this.tagInput.nativeElement.value="",this.tagInputFormControl.setValue(null)}onInputEnd(e){const o=(e.value||"").trim();if(o&&!this.allRepoTags.some(n=>n.name===o))return this.snackBar.open(`tag ${o} does not exist, please select from tags list`,"ok"),this.tagInput.nativeElement.value="",this.filteredRepoTags=this.allRepoTags,void this.autoPanel.openPanel()}onTagInputFocus(){this.tagInputFormControl.touched||(this.tagService.getAllTags.next(void 0),this.autoPanel.openPanel())}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(M.G),t.Y36(P.uw),t.Y36(L.d),t.Y36(Z.ux),t.Y36(A.u))},a.\u0275cmp=t.Xpm({type:a,selectors:[["i-tag"]],viewQuery:function(e,o){if(1&e&&(t.Gf(J,5),t.Gf(B,5)),2&e){let n;t.iGM(n=t.CRH())&&(o.tagInput=n.first),t.iGM(n=t.CRH())&&(o.autoPanel=n.first)}},inputs:{tags:"tags"},features:[t.qOj],decls:16,vars:8,consts:[["appearance","none",1,"tags-list"],[1,"label",3,"click"],[2,"width","auto","height","auto"],["aria-label","tags","cdkDropList","","cdkDropListOrientation","horizontal",3,"cdkDropListDropped"],["chipList",""],["class","tag","cdkDrag","",3,"color","background-color","border","title","selectable","removable","removed",4,"ngFor","ngForOf"],["placeholder","add tag...",3,"formControl","matAutocomplete","matChipInputFor","matChipInputSeparatorKeyCodes","matChipInputAddOnBlur","focus","matChipInputTokenEnd"],["autoCompleteTrigger","matAutocompleteTrigger","tagInput",""],["autoActiveFirstOption","",3,"displayWith","optionSelected"],["auto","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],["cdkDrag","",1,"tag",3,"title","selectable","removable","removed"],["matChipRemove","","title","delete this tag",1,"hide-button"],[3,"value"]],template:function(e,o){if(1&e&&(t.TgZ(0,"mat-form-field",0),t.TgZ(1,"label",1),t.NdJ("click",function(i){return o.onShowTagsCloud(i)}),t.TgZ(2,"span"),t._uU(3,"tags"),t.qZA(),t.TgZ(4,"mat-icon",2),t._uU(5,"open_in_new"),t.qZA(),t._uU(6,":"),t.qZA(),t.TgZ(7,"mat-chip-list",3,4),t.NdJ("cdkDropListDropped",function(i){return o.drop(i)}),t.YNc(9,S,5,10,"mat-chip",5),t.TgZ(10,"input",6,7),t.NdJ("focus",function(){return o.onTagInputFocus()})("matChipInputTokenEnd",function(i){return o.onInputEnd(i)}),t.qZA(),t.qZA(),t.TgZ(13,"mat-autocomplete",8,9),t.NdJ("optionSelected",function(i){return o.selected(i)}),t.YNc(15,k,2,2,"mat-option",10),t.qZA(),t.qZA()),2&e){const n=t.MAs(8),i=t.MAs(14);t.xp6(9),t.Q6J("ngForOf",o.tagList),t.xp6(1),t.Q6J("formControl",o.tagInputFormControl)("matAutocomplete",i)("matChipInputFor",n)("matChipInputSeparatorKeyCodes",o.separatorKeysCodes)("matChipInputAddOnBlur",o.addOnBlur),t.xp6(3),t.Q6J("displayWith",o.displayFn),t.xp6(2),t.Q6J("ngForOf",o.filteredRepoTags)}},directives:[F.KE,R.Hw,c.qn,m.Wj,h.sg,g.Fj,T.ZL,c.oH,g.JJ,g.oH,T.XC,c.HS,m.Zt,c.qH,x.ey],styles:[".tags-list[_ngcontent-%COMP%]{width:100%}.tags-list[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{display:inline-flex;pointer-events:auto;position:absolute;top:0;margin-top:-1.6rem;color:#0009;font-size:small;cursor:pointer;line-height:1.5rem}.tags-list[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:small}.tags-list[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]:hover{color:#00f}.tags-list[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%]{font-size:1.4rem;-webkit-text-stroke:.08px black}.tags-list[_ngcontent-%COMP%]   .tag.cdk-drop-list-dragging[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}.tags-list[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%]:hover   .hide-button[_ngcontent-%COMP%]{visibility:visible}.tags-list[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%]   .hide-button[_ngcontent-%COMP%]{visibility:collapse}.tags-list[_ngcontent-%COMP%]   .cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}[_nghost-%COMP%]     .mat-form-field-wrapper{padding-bottom:.5rem}"]}),a})();var D=s(3245);let _=(()=>{class a{constructor(){this.customElementComponent=E}}return a.\u0275fac=function(e){return new(e||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[h.ez,D.B,g.UX]]}),a})()}}]);