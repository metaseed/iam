(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{AFdT:function(t,e,i){"use strict";i.r(e),i.d(e,"CodeExampleModule",(function(){return H}));var n=i("ofXK"),o=i("fXoL"),s=i("q/PB"),r=i("Cfvw"),c=i("w1tV"),a=i("lJxs"),h=i("SxV6");let d=(()=>{class t{constructor(t){this.logger=t,this.prettyPrintOne=Object(r.a)(this.getPrettyPrintOne()).pipe(Object(c.a)())}getPrettyPrintOne(){const t=window.prettyPrintOne;return t?Promise.resolve(t):i.e(6).then(i.t.bind(null,"Ue1H",7)).then(()=>window.prettyPrintOne,t=>{const e="Cannot get prettify.js from server: "+t.message;return this.logger.error(new Error(e)),()=>{throw new Error(e)}})}formatCode(t,e,i){return this.prettyPrintOne.pipe(Object(a.a)(n=>{try{return n(t,e,i)}catch(o){const e=`Could not format code that begins '${t.substr(0,50)}...'.`;throw console.error(e,o),new Error(e)}}),Object(h.a)())}}return t.\u0275fac=function(e){return new(e||t)(o.Zb(s.o))},t.\u0275prov=o.Mb({token:t,factory:t.\u0275fac}),t})();var l=i("Fa19"),p=i("vkgz"),u=i("dNgK");const g=["codeContainer"];function m(t,e){if(1&t){const t=o.Wb();o.Vb(0,"button",3),o.dc("click",(function(){return o.uc(t),o.hc().doCopy()})),o.Dc(1,"\n        "),o.Vb(2,"span",4),o.Dc(3,"content_copy"),o.Ub(),o.Dc(4,"\n      "),o.Ub()}if(2&t){const t=o.hc();o.Db("aria-label",t.ariaLabel)}}let y=(()=>{class t{constructor(t,e,i,n){this.snackbar=t,this.pretty=e,this.copier=i,this.logger=n,this.ariaLabel="",this.codeFormatted=new o.n}set code(t){this._code=t,this._code&&this._code.trim()?this.formatDisplayedCode():this.showMissingCodeMessage()}get code(){return this._code}set title(t){this._title=t,this.ariaLabel=this.title?"Copy code snippet from "+this.title:""}get title(){return this._title}ngOnChanges(){this.code&&this.formatDisplayedCode()}formatDisplayedCode(){const t=function(t){let e=Number.MAX_VALUE;const i=t.split("\n");return i.forEach(t=>{const i=t.search(/\S/);-1!==i&&(e=Math.min(i,e))}),i.map(t=>t.substr(e)).join("\n").trim()}(this.code);this.setCodeHtml(t),this.codeText=this.getCodeText(),this.pretty.formatCode(t,this.language,this.getLinenums(t)).pipe(Object(p.a)(()=>this.codeFormatted.emit())).subscribe(t=>this.setCodeHtml(t),t=>{})}showMissingCodeMessage(){const t=this.path?this.path+(this.region?"#"+this.region:""):"";this.setCodeHtml(`<p class="code-missing">The code sample is missing${t?" for\n"+t:"."}</p>`)}setCodeHtml(t){this.codeContainer.nativeElement.innerHTML=t}getCodeText(){return this.codeContainer.nativeElement.textContent}doCopy(){const t=this.codeText;this.copier.copyText(t)?(this.logger.log("Copied code to clipboard:",t),this.snackbar.open("Code Copied","",{duration:800})):(this.logger.error(new Error(`ERROR copying code to clipboard: "${t}"`)),this.snackbar.open("Copy failed. Please try again!","",{duration:800}))}getLinenums(t){const e="boolean"==typeof this.linenums?this.linenums:"true"===this.linenums||"false"!==this.linenums&&("string"==typeof this.linenums?parseInt(this.linenums,10):this.linenums);return null==e||isNaN(e)?(t.match(/\n/g)||[]).length>10:e}}return t.\u0275fac=function(e){return new(e||t)(o.Qb(u.b),o.Qb(d),o.Qb(l.a),o.Qb(s.o))},t.\u0275cmp=o.Kb({type:t,selectors:[["iam-code"]],viewQuery:function(t,e){var i;1&t&&o.Hc(g,!0),2&t&&o.rc(i=o.ec())&&(e.codeContainer=i.first)},inputs:{hideCopy:"hideCopy",language:"language",linenums:"linenums",path:"path",region:"region",title:"title"},outputs:{codeFormatted:"codeFormatted"},features:[o.Ab],decls:7,vars:4,consts:[["class","material-icons copy-button no-print","title","Copy code snippet",3,"click",4,"ngIf"],[1,"animated","fadeIn"],["codeContainer",""],["title","Copy code snippet",1,"material-icons","copy-button","no-print",3,"click"],["aria-hidden","true"]],template:function(t,e){1&t&&(o.Vb(0,"pre"),o.Dc(1,"      "),o.Cc(2,m,5,1,"button",0),o.Dc(3,"\n      "),o.Rb(4,"code",1,2),o.Dc(6,"\n    "),o.Ub()),2&t&&(o.Fb("prettyprint lang-",e.language,""),o.Cb(2),o.mc("ngIf",!e.hideCopy))},directives:[n.t],encapsulation:2}),t})();const b=["content"];function f(t,e){if(1&t&&(o.Vb(0,"header"),o.Dc(1),o.Ub()),2&t){const t=o.hc();o.Cb(1),o.Ec(t.title)}}const C=["*"];let w=(()=>{class t{constructor(){this._path="",this.isAvoid=!1}set title(t){this._title=t,this.classes={"headed-code":!!this.title,"simple-code":!this.title}}get title(){return this._title}set path(t){this._path=t,this.isAvoid=-1!==this.path.indexOf(".avoid.")}get path(){return this._path}set hidecopy(t){this._hidecopy=null!=t&&""+t!="false"}get hidecopy(){return this._hidecopy}set hyphenatedHideCopy(t){this.hidecopy=t}set capitalizedHideCopy(t){this.hidecopy=t}ngAfterViewInit(){this.icode.code=this.content.nativeElement.innerHTML}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Kb({type:t,selectors:[["i-code"]],viewQuery:function(t,e){var i;1&t&&(o.Hc(b,!0),o.Hc(y,!0)),2&t&&(o.rc(i=o.ec())&&(e.content=i.first),o.rc(i=o.ec())&&(e.icode=i.first))},hostVars:2,hostBindings:function(t,e){2&t&&o.Gb("avoidFile",e.isAvoid)},inputs:{language:"language",linenums:"linenums",region:"region",title:"title",path:"path",hidecopy:"hidecopy",hyphenatedHideCopy:["hide-copy","hyphenatedHideCopy"],capitalizedHideCopy:["hideCopy","capitalizedHideCopy"]},ngContentSelectors:C,decls:5,vars:8,consts:[[2,"display","none"],["content",""],[4,"ngIf"],[3,"ngClass","language","linenums","path","region","hideCopy","title"]],template:function(t,e){1&t&&(o.lc(),o.Vb(0,"div",0,1),o.kc(2),o.Ub(),o.Cc(3,f,2,1,"header",2),o.Rb(4,"iam-code",3)),2&t&&(o.Cb(3),o.mc("ngIf",e.title),o.Cb(1),o.mc("ngClass",e.classes)("language",e.language)("linenums",e.linenums)("path",e.path)("region",e.region)("hideCopy",e.hidecopy)("title",e.title))},directives:[n.t,y,n.q],encapsulation:2}),t})(),v=(()=>{class t{}return t.\u0275mod=o.Ob({type:t}),t.\u0275inj=o.Nb({factory:function(e){return new(e||t)},providers:[d,l.a],imports:[[n.c,u.d]]}),t})(),H=(()=>{class t{constructor(){this.customElementComponent=w}}return t.\u0275mod=o.Ob({type:t}),t.\u0275inj=o.Nb({factory:function(e){return new(e||t)},imports:[[n.c,v]]}),t})()}}]);