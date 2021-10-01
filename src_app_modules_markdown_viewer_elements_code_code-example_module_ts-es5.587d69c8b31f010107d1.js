!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function n(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}(self.webpackChunkiam=self.webpackChunkiam||[]).push([["src_app_modules_markdown_viewer_elements_code_code-example_module_ts"],{74791:function(e,i,o){o.r(i),o.d(i,{CodeExampleModule:function(){return H}});var r,s=o(7395),a=o(17215),c=o(87517),u=o(79659),l=o(75997),p=o(6028),h=o(19078),d=o(62987),f=o(37340),g=((r=function(){function e(n){t(this,e),this.logger=n,this.prettyPrintOne=(0,l.Dp)(this.getPrettyPrintOne()).pipe((0,p.B)())}return n(e,[{key:"getPrettyPrintOne",value:function(){var t=this,e=window.prettyPrintOne;return e?Promise.resolve(e):o.e("src_assets_js_prettify_js").then(o.t.bind(o,64263,23)).then(function(){return window.prettyPrintOne},function(e){var n="Cannot get prettify.js from server: ".concat(e.message);return t.logger.error(new Error(n)),function(){throw new Error(n)}})}},{key:"formatCode",value:function(t,e,n){return this.prettyPrintOne.pipe((0,h.U)(function(i){try{return i(t,e,n)}catch(r){var o="Could not format code that begins '".concat(t.substr(0,50),"...'.");throw console.error(o,r),new Error(o)}}),(0,d.P)())}}]),e}()).\u0275fac=function(t){return new(t||r)(a.LFG(f.Yd))},r.\u0275prov=a.Yz7({token:r,factory:r.\u0275fac}),r),y=o(81494),m=["codeContainer"];function v(t,e){if(1&t){var n=a.EpF();a.TgZ(0,"button",3),a.NdJ("click",function(){return a.CHM(n),a.oxw().doCopy()}),a._uU(1,"\n        "),a.TgZ(2,"span",4),a._uU(3,"content_copy"),a.qZA(),a._uU(4,"\n      "),a.qZA()}if(2&t){var i=a.oxw();a.uIk("aria-label",i.ariaLabel)}}var C=function(){var e=function(){function e(n,i,o,r){t(this,e),this.snackbar=n,this.pretty=i,this.copier=o,this.logger=r,this.ariaLabel="",this.codeFormatted=new a.vpe}return n(e,[{key:"code",get:function(){return this._code},set:function(t){this._code=t,this._code&&this._code.trim()?this.formatDisplayedCode():this.showMissingCodeMessage()}},{key:"title",get:function(){return this._title},set:function(t){this._title=t,this.ariaLabel=this.title?"Copy code snippet from ".concat(this.title):""}},{key:"ngOnChanges",value:function(){this.code&&this.formatDisplayedCode()}},{key:"formatDisplayedCode",value:function(){var t=this,e=function(t){var e=Number.MAX_VALUE,n=t.split("\n");return n.forEach(function(t){var n=t.search(/\S/);-1!==n&&(e=Math.min(n,e))}),n.map(function(t){return t.substr(e)}).join("\n").trim()}(this.code);this.setCodeHtml(e),this.codeText=this.getCodeText(),this.pretty.formatCode(e,this.language,this.getLinenums(e)).pipe((0,c.b)(function(){return t.codeFormatted.emit()})).subscribe(function(e){return t.setCodeHtml(e)},function(t){})}},{key:"showMissingCodeMessage",value:function(){var t=this.path?this.path+(this.region?"#"+this.region:""):"";this.setCodeHtml('<p class="code-missing">The code sample is missing'.concat(t?" for\n".concat(t):".","</p>"))}},{key:"setCodeHtml",value:function(t){this.codeContainer.nativeElement.innerHTML=t}},{key:"getCodeText",value:function(){return this.codeContainer.nativeElement.textContent}},{key:"doCopy",value:function(){var t=this.codeText;this.copier.copyText(t)?(this.logger.log("Copied code to clipboard:",t),this.snackbar.open("Code Copied","",{duration:800})):(this.logger.error(new Error('ERROR copying code to clipboard: "'.concat(t,'"'))),this.snackbar.open("Copy failed. Please try again!","",{duration:800}))}},{key:"getLinenums",value:function(t){var e="boolean"==typeof this.linenums?this.linenums:"true"===this.linenums||"false"!==this.linenums&&("string"==typeof this.linenums?parseInt(this.linenums,10):this.linenums);return null==e||isNaN(e)?(t.match(/\n/g)||[]).length>10:e}}]),e}();return e.\u0275fac=function(t){return new(t||e)(a.Y36(u.ux),a.Y36(g),a.Y36(y.u),a.Y36(f.Yd))},e.\u0275cmp=a.Xpm({type:e,selectors:[["iam-code"]],viewQuery:function(t,e){var n;(1&t&&a.Gf(m,5),2&t)&&(a.iGM(n=a.CRH())&&(e.codeContainer=n.first))},inputs:{hideCopy:"hideCopy",language:"language",linenums:"linenums",path:"path",region:"region",title:"title"},outputs:{codeFormatted:"codeFormatted"},features:[a.TTD],decls:7,vars:4,consts:[["class","material-icons copy-button no-print","title","Copy code snippet",3,"click",4,"ngIf"],[1,"animated","fadeIn"],["codeContainer",""],["title","Copy code snippet",1,"material-icons","copy-button","no-print",3,"click"],["aria-hidden","true"]],template:function(t,e){1&t&&(a.TgZ(0,"pre"),a._uU(1,"      "),a.YNc(2,v,5,1,"button",0),a._uU(3,"\n      "),a._UZ(4,"code",1,2),a._uU(6,"\n    "),a.qZA()),2&t&&(a.Gre("prettyprint lang-",e.language,""),a.xp6(2),a.Q6J("ngIf",!e.hideCopy))},directives:[s.O5],encapsulation:2}),e}(),_=["content"];function k(t,e){if(1&t&&(a.TgZ(0,"header"),a._uU(1),a.qZA()),2&t){var n=a.oxw();a.xp6(1),a.Oqu(n.title)}}var w=["*"],b=function(){var e=function(){function e(){t(this,e),this._path="",this.isAvoid=!1}return n(e,[{key:"title",get:function(){return this._title},set:function(t){this._title=t,this.classes={"headed-code":!!this.title,"simple-code":!this.title}}},{key:"path",get:function(){return this._path},set:function(t){this._path=t,this.isAvoid=-1!==this.path.indexOf(".avoid.")}},{key:"hidecopy",get:function(){return this._hidecopy},set:function(t){this._hidecopy=null!=t&&"false"!="".concat(t)}},{key:"hyphenatedHideCopy",set:function(t){this.hidecopy=t}},{key:"capitalizedHideCopy",set:function(t){this.hidecopy=t}},{key:"ngAfterViewInit",value:function(){this.icode.code=this.content.nativeElement.innerHTML}}]),e}();return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Xpm({type:e,selectors:[["i-code"]],viewQuery:function(t,e){var n;(1&t&&(a.Gf(_,5),a.Gf(C,5)),2&t)&&(a.iGM(n=a.CRH())&&(e.content=n.first),a.iGM(n=a.CRH())&&(e.icode=n.first))},hostVars:2,hostBindings:function(t,e){2&t&&a.ekj("avoidFile",e.isAvoid)},inputs:{language:"language",linenums:"linenums",region:"region",title:"title",path:"path",hidecopy:"hidecopy",hyphenatedHideCopy:["hide-copy","hyphenatedHideCopy"],capitalizedHideCopy:["hideCopy","capitalizedHideCopy"]},ngContentSelectors:w,decls:5,vars:8,consts:[[2,"display","none"],["content",""],[4,"ngIf"],[3,"ngClass","language","linenums","path","region","hideCopy","title"]],template:function(t,e){1&t&&(a.F$t(),a.TgZ(0,"div",0,1),a.Hsn(2),a.qZA(),a.YNc(3,k,2,1,"header",2),a._UZ(4,"iam-code",3)),2&t&&(a.xp6(3),a.Q6J("ngIf",e.title),a.xp6(1),a.Q6J("ngClass",e.classes)("language",e.language)("linenums",e.linenums)("path",e.path)("region",e.region)("hideCopy",e.hidecopy)("title",e.title))},directives:[s.O5,C,s.mk],encapsulation:2}),e}(),x=function(){var e=function e(){t(this,e)};return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({providers:[g,y.u],imports:[[s.ez,u.ZX]]}),e}(),H=function(){var e=function e(){t(this,e),this.customElementComponent=b};return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[s.ez,x]]}),e}()}}])}();