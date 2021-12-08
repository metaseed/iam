"use strict";(self.webpackChunkiam=self.webpackChunkiam||[]).push([["src_app_modules_markdown_viewer_elements_code_code-example_module_ts"],{1289:(L,c,r)=>{r.r(c),r.d(c,{CodeExampleModule:()=>O});var a=r(6903),t=r(8079),C=r(2518),g=r(7826),f=r(3495),y=r(5142),v=r(6681),E=r(794),d=r(2);let p=(()=>{class n{constructor(e){this.logger=e,this.prettyPrintOne=(0,f.D)(this.getPrettyPrintOne()).pipe((0,y.B)())}getPrettyPrintOne(){const e=window.prettyPrintOne;return e?Promise.resolve(e):r.e("src_assets_js_prettify_js").then(r.t.bind(r,307,23)).then(()=>window.prettyPrintOne,o=>{const s=`Cannot get prettify.js from server: ${o.message}`;return this.logger.error(new Error(s)),()=>{throw new Error(s)}})}formatCode(e,o,s){return this.prettyPrintOne.pipe((0,v.U)(l=>{try{return l(e,o,s)}catch(Z){const u=`Could not format code that begins '${e.substr(0,50)}...'.`;throw console.error(u,Z),new Error(u)}}),(0,E.P)())}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(d.$V))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})();var h=r(8283);const x=["codeContainer"];function T(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",3),t.NdJ("click",function(){return t.CHM(e),t.oxw().doCopy()}),t._uU(1,"\n        "),t.TgZ(2,"span",4),t._uU(3,"content_copy"),t.qZA(),t._uU(4,"\n      "),t.qZA()}if(2&n){const e=t.oxw();t.uIk("aria-label",e.ariaLabel)}}let m=(()=>{class n{constructor(e,o,s,l){this.snackbar=e,this.pretty=o,this.copier=s,this.logger=l,this.ariaLabel="",this.codeFormatted=new t.vpe}set code(e){this._code=e,this._code&&this._code.trim()?this.formatDisplayedCode():this.showMissingCodeMessage()}get code(){return this._code}set title(e){this._title=e,this.ariaLabel=this.title?`Copy code snippet from ${this.title}`:""}get title(){return this._title}ngOnChanges(){this.code&&this.formatDisplayedCode()}formatDisplayedCode(){const e=function(n){let i=Number.MAX_VALUE;const e=n.split("\n");return e.forEach(o=>{const s=o.search(/\S/);-1!==s&&(i=Math.min(s,i))}),e.map(o=>o.substr(i)).join("\n").trim()}(this.code);this.setCodeHtml(e),this.codeText=this.getCodeText(),this.pretty.formatCode(e,this.language,this.getLinenums(e)).pipe((0,C.b)(()=>this.codeFormatted.emit())).subscribe(o=>this.setCodeHtml(o),o=>{})}showMissingCodeMessage(){const e=this.path?this.path+(this.region?"#"+this.region:""):"";this.setCodeHtml(`<p class="code-missing">The code sample is missing${e?` for\n${e}`:"."}</p>`)}setCodeHtml(e){this.codeContainer.nativeElement.innerHTML=e}getCodeText(){return this.codeContainer.nativeElement.textContent}doCopy(){const e=this.codeText;this.copier.copyText(e)?(this.logger.log("Copied code to clipboard:",e),this.snackbar.open("Code Copied","",{duration:800})):(this.logger.error(new Error(`ERROR copying code to clipboard: "${e}"`)),this.snackbar.open("Copy failed. Please try again!","",{duration:800}))}getLinenums(e){const o="boolean"==typeof this.linenums?this.linenums:"true"===this.linenums||"false"!==this.linenums&&("string"==typeof this.linenums?parseInt(this.linenums,10):this.linenums);return null==o||isNaN(o)?(e.match(/\n/g)||[]).length>10:o}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(g.ux),t.Y36(p),t.Y36(h.u),t.Y36(d.$V))},n.\u0275cmp=t.Xpm({type:n,selectors:[["iam-code"]],viewQuery:function(e,o){if(1&e&&t.Gf(x,5),2&e){let s;t.iGM(s=t.CRH())&&(o.codeContainer=s.first)}},inputs:{hideCopy:"hideCopy",language:"language",linenums:"linenums",path:"path",region:"region",title:"title"},outputs:{codeFormatted:"codeFormatted"},features:[t.TTD],decls:7,vars:4,consts:[["class","material-icons copy-button no-print","title","Copy code snippet",3,"click",4,"ngIf"],[1,"animated","fadeIn"],["codeContainer",""],["title","Copy code snippet",1,"material-icons","copy-button","no-print",3,"click"],["aria-hidden","true"]],template:function(e,o){1&e&&(t.TgZ(0,"pre"),t._uU(1,"      "),t.YNc(2,T,5,1,"button",0),t._uU(3,"\n      "),t._UZ(4,"code",1,2),t._uU(6,"\n    "),t.qZA()),2&e&&(t.Gre("prettyprint lang-",o.language,""),t.xp6(2),t.Q6J("ngIf",!o.hideCopy))},directives:[a.O5],encapsulation:2}),n})();const P=["content"];function A(n,i){if(1&n&&(t.TgZ(0,"header"),t._uU(1),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Oqu(e.title)}}const F=["*"];let U=(()=>{class n{constructor(){this._path="",this.isAvoid=!1}set title(e){this._title=e,this.classes={"headed-code":!!this.title,"simple-code":!this.title}}get title(){return this._title}set path(e){this._path=e,this.isAvoid=-1!==this.path.indexOf(".avoid.")}get path(){return this._path}set hidecopy(e){this._hidecopy=null!=e&&"false"!=`${e}`}get hidecopy(){return this._hidecopy}set hyphenatedHideCopy(e){this.hidecopy=e}set capitalizedHideCopy(e){this.hidecopy=e}ngAfterViewInit(){this.icode.code=this.content.nativeElement.innerHTML}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["i-code"]],viewQuery:function(e,o){if(1&e&&(t.Gf(P,5),t.Gf(m,5)),2&e){let s;t.iGM(s=t.CRH())&&(o.content=s.first),t.iGM(s=t.CRH())&&(o.icode=s.first)}},hostVars:2,hostBindings:function(e,o){2&e&&t.ekj("avoidFile",o.isAvoid)},inputs:{language:"language",linenums:"linenums",region:"region",title:"title",path:"path",hidecopy:"hidecopy",hyphenatedHideCopy:["hide-copy","hyphenatedHideCopy"],capitalizedHideCopy:["hideCopy","capitalizedHideCopy"]},ngContentSelectors:F,decls:5,vars:8,consts:[[2,"display","none"],["content",""],[4,"ngIf"],[3,"ngClass","language","linenums","path","region","hideCopy","title"]],template:function(e,o){1&e&&(t.F$t(),t.TgZ(0,"div",0,1),t.Hsn(2),t.qZA(),t.YNc(3,A,2,1,"header",2),t._UZ(4,"iam-code",3)),2&e&&(t.xp6(3),t.Q6J("ngIf",o.title),t.xp6(1),t.Q6J("ngClass",o.classes)("language",o.language)("linenums",o.linenums)("path",o.path)("region",o.region)("hideCopy",o.hidecopy)("title",o.title))},directives:[a.O5,m,a.mk],encapsulation:2}),n})();var b=r(3245);let w=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[p,h.u],imports:[[a.ez,b.q]]}),n})(),O=(()=>{class n{constructor(){this.customElementComponent=U}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[a.ez,w]]}),n})()}}]);