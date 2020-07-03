function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{AFdT:function(e,t,n){"use strict";n.r(t),n.d(t,"CodeExampleModule",(function(){return H}));var i,o=n("ofXK"),s=n("fXoL"),c=n("8j5Y"),r=n("dNgK"),a=n("GoAz"),l=n("7ntQ"),u=n("YtkY"),h=n("jOdJ"),d=n("q/PB"),p=((i=function(){function e(t){_classCallCheck(this,e),this.logger=t,this.prettyPrintOne=Object(a.a)(this.getPrettyPrintOne()).pipe(Object(l.a)())}return _createClass(e,[{key:"getPrettyPrintOne",value:function(){var e=this,t=window.prettyPrintOne;return t?Promise.resolve(t):n.e(6).then(n.t.bind(null,"Ue1H",7)).then((function(){return window.prettyPrintOne}),(function(t){var n="Cannot get prettify.js from server: "+t.message;return e.logger.error(new Error(n)),function(){throw new Error(n)}}))}},{key:"formatCode",value:function(e,t,n){return this.prettyPrintOne.pipe(Object(u.a)((function(i){try{return i(e,t,n)}catch(s){var o="Could not format code that begins '".concat(e.substr(0,50),"...'.");throw console.error(o,s),new Error(o)}})),Object(h.a)())}}]),e}()).\u0275fac=function(e){return new(e||i)(s.ac(d.o))},i.\u0275prov=s.Mb({token:i,factory:i.\u0275fac}),i),f=n("Fa19"),y=["codeContainer"];function g(e,t){if(1&e){var n=s.Xb();s.Wb(0,"button",3),s.ec("click",(function(){return s.vc(n),s.ic().doCopy()})),s.Ec(1,"\n        "),s.Wb(2,"span",4),s.Ec(3,"content_copy"),s.Vb(),s.Ec(4,"\n      "),s.Vb()}if(2&e){var i=s.ic();s.Db("aria-label",i.ariaLabel)}}var C,m=((C=function(){function e(t,n,i,o){_classCallCheck(this,e),this.snackbar=t,this.pretty=n,this.copier=i,this.logger=o,this.ariaLabel="",this.codeFormatted=new s.n}return _createClass(e,[{key:"ngOnChanges",value:function(){this.code&&this.formatDisplayedCode()}},{key:"formatDisplayedCode",value:function(){var e,t,n,i=this,o=(e=this.code,t=Number.MAX_VALUE,(n=e.split("\n")).forEach((function(e){var n=e.search(/\S/);-1!==n&&(t=Math.min(n,t))})),n.map((function(e){return e.substr(t)})).join("\n").trim());this.setCodeHtml(o),this.codeText=this.getCodeText(),this.pretty.formatCode(o,this.language,this.getLinenums(o)).pipe(Object(c.a)((function(){return i.codeFormatted.emit()}))).subscribe((function(e){return i.setCodeHtml(e)}),(function(e){}))}},{key:"showMissingCodeMessage",value:function(){var e=this.path?this.path+(this.region?"#"+this.region:""):"";this.setCodeHtml('<p class="code-missing">The code sample is missing'.concat(e?" for\n"+e:".","</p>"))}},{key:"setCodeHtml",value:function(e){this.codeContainer.nativeElement.innerHTML=e}},{key:"getCodeText",value:function(){return this.codeContainer.nativeElement.textContent}},{key:"doCopy",value:function(){var e=this.codeText;this.copier.copyText(e)?(this.logger.log("Copied code to clipboard:",e),this.snackbar.open("Code Copied","",{duration:800})):(this.logger.error(new Error('ERROR copying code to clipboard: "'.concat(e,'"'))),this.snackbar.open("Copy failed. Please try again!","",{duration:800}))}},{key:"getLinenums",value:function(e){var t="boolean"==typeof this.linenums?this.linenums:"true"===this.linenums||"false"!==this.linenums&&("string"==typeof this.linenums?parseInt(this.linenums,10):this.linenums);return null==t||isNaN(t)?(e.match(/\n/g)||[]).length>10:t}},{key:"code",set:function(e){this._code=e,this._code&&this._code.trim()?this.formatDisplayedCode():this.showMissingCodeMessage()},get:function(){return this._code}},{key:"title",set:function(e){this._title=e,this.ariaLabel=this.title?"Copy code snippet from "+this.title:""},get:function(){return this._title}}]),e}()).\u0275fac=function(e){return new(e||C)(s.Qb(r.c),s.Qb(p),s.Qb(f.a),s.Qb(d.o))},C.\u0275cmp=s.Kb({type:C,selectors:[["iam-code"]],viewQuery:function(e,t){var n;1&e&&s.Ic(y,!0),2&e&&s.sc(n=s.fc())&&(t.codeContainer=n.first)},inputs:{hideCopy:"hideCopy",language:"language",linenums:"linenums",path:"path",region:"region",title:"title"},outputs:{codeFormatted:"codeFormatted"},features:[s.Ab],decls:7,vars:4,consts:[["class","material-icons copy-button no-print","title","Copy code snippet",3,"click",4,"ngIf"],[1,"animated","fadeIn"],["codeContainer",""],["title","Copy code snippet",1,"material-icons","copy-button","no-print",3,"click"],["aria-hidden","true"]],template:function(e,t){1&e&&(s.Wb(0,"pre"),s.Ec(1,"      "),s.Dc(2,g,5,1,"button",0),s.Ec(3,"\n      "),s.Rb(4,"code",1,2),s.Ec(6,"\n    "),s.Vb()),2&e&&(s.Fb("prettyprint lang-",t.language,""),s.Cb(2),s.nc("ngIf",!t.hideCopy))},directives:[o.t],encapsulation:2}),C),b=["content"];function v(e,t){if(1&e&&(s.Wb(0,"header"),s.Ec(1),s.Vb()),2&e){var n=s.ic();s.Cb(1),s.Fc(n.title)}}var k,w,_,E=["*"],O=((_=function(){function e(){_classCallCheck(this,e),this._path="",this.isAvoid=!1}return _createClass(e,[{key:"ngAfterViewInit",value:function(){this.icode.code=this.content.nativeElement.innerHTML}},{key:"title",set:function(e){this._title=e,this.classes={"headed-code":!!this.title,"simple-code":!this.title}},get:function(){return this._title}},{key:"path",set:function(e){this._path=e,this.isAvoid=-1!==this.path.indexOf(".avoid.")},get:function(){return this._path}},{key:"hidecopy",set:function(e){this._hidecopy=null!=e&&""+e!="false"},get:function(){return this._hidecopy}},{key:"hyphenatedHideCopy",set:function(e){this.hidecopy=e}},{key:"capitalizedHideCopy",set:function(e){this.hidecopy=e}}]),e}()).\u0275fac=function(e){return new(e||_)},_.\u0275cmp=s.Kb({type:_,selectors:[["i-code"]],viewQuery:function(e,t){var n;1&e&&(s.Ic(b,!0),s.Ic(m,!0)),2&e&&(s.sc(n=s.fc())&&(t.content=n.first),s.sc(n=s.fc())&&(t.icode=n.first))},hostVars:2,hostBindings:function(e,t){2&e&&s.Gb("avoidFile",t.isAvoid)},inputs:{language:"language",linenums:"linenums",region:"region",title:"title",path:"path",hidecopy:"hidecopy",hyphenatedHideCopy:["hide-copy","hyphenatedHideCopy"],capitalizedHideCopy:["hideCopy","capitalizedHideCopy"]},ngContentSelectors:E,decls:5,vars:8,consts:[[2,"display","none"],["content",""],[4,"ngIf"],[3,"ngClass","language","linenums","path","region","hideCopy","title"]],template:function(e,t){1&e&&(s.mc(),s.Wb(0,"div",0,1),s.lc(2),s.Vb(),s.Dc(3,v,2,1,"header",2),s.Rb(4,"iam-code",3)),2&e&&(s.Cb(3),s.nc("ngIf",t.title),s.Cb(1),s.nc("ngClass",t.classes)("language",t.language)("linenums",t.linenums)("path",t.path)("region",t.region)("hideCopy",t.hidecopy)("title",t.title))},directives:[o.t,m,o.q],encapsulation:2}),_),P=((w=function e(){_classCallCheck(this,e)}).\u0275mod=s.Ob({type:w}),w.\u0275inj=s.Nb({factory:function(e){return new(e||w)},providers:[p,f.a],imports:[[o.c,r.e]]}),w),H=((k=function e(){_classCallCheck(this,e),this.customElementComponent=O}).\u0275mod=s.Ob({type:k}),k.\u0275inj=s.Nb({factory:function(e){return new(e||k)},imports:[[o.c,P]]}),k)}}]);