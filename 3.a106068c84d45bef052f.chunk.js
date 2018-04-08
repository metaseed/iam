webpackJsonp([3],{cEvs:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("o08n"),i=(n("l45n"),n("147R")),l=n("0BEx"),r=function(){function e(e){this.logger=e,this.prettyPrintOne=Object(i.from)(this.getPrettyPrintOne()).pipe(Object(l.share)())}return e.prototype.getPrettyPrintOne=function(){var e=this,t=window.prettyPrintOne;return t?Promise.resolve(t):n.e(7).then(n.bind(null,"Dmgz")).then(function(){return window.prettyPrintOne},function(t){var n="Cannot get prettify.js from server: "+t.message;return e.logger.error(new Error(n)),function(){throw new Error(n)}})},e.prototype.formatCode=function(e,t,n){return this.prettyPrintOne.pipe(Object(l.map)(function(o){try{return o(e,t,n)}catch(t){var i="Could not format code that begins '"+e.substr(0,50)+"...'.";throw console.error(i,t),new Error(i)}}),Object(l.first)())},e}(),u=function(){function e(){}return e.prototype.createFake=function(e){var t="rtl"===document.documentElement.getAttribute("dir");this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[t?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=e,document.body.appendChild(this.fakeElem),this.fakeElem.select(),this.fakeElem.setSelectionRange(0,this.fakeElem.value.length)},e.prototype.removeFake=function(){this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)},e.prototype.copyText=function(e){try{return this.createFake(e),document.execCommand("copy")}catch(e){return!1}finally{this.removeFake()}},e}(),a=n("7rwB"),c=function(){function e(e,t,n,i){this.snackbar=e,this.pretty=t,this.copier=n,this.logger=i,this.ariaLabel="",this.codeFormatted=new o.EventEmitter}return Object.defineProperty(e.prototype,"code",{get:function(){return this._code},set:function(e){this._code=e,this._code&&this._code.trim()?this.formatDisplayedCode():this.showMissingCodeMessage()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"title",{get:function(){return this._title},set:function(e){this._title=e,this.ariaLabel=this.title?"Copy code snippet from "+this.title:""},enumerable:!0,configurable:!0}),e.prototype.ngOnChanges=function(){this.code&&this.formatDisplayedCode()},e.prototype.formatDisplayedCode=function(){var e,t,n=this,o=(e=Number.MAX_VALUE,(t=this.code.split("\n")).forEach(function(t){var n=t.search(/\S/);-1!==n&&(e=Math.min(n,e))}),t.map(function(t){return t.substr(e)}).join("\n").trim());this.setCodeHtml(o),this.codeText=this.getCodeText(),this.pretty.formatCode(o,this.language,this.getLinenums(o)).pipe(Object(l.tap)(function(){return n.codeFormatted.emit()})).subscribe(function(e){return n.setCodeHtml(e)},function(e){})},e.prototype.showMissingCodeMessage=function(){var e=this.path?this.path+(this.region?"#"+this.region:""):"";this.setCodeHtml('<p class="code-missing">The code sample is missing'+(e?" for\n"+e:".")+"</p>")},e.prototype.setCodeHtml=function(e){this.codeContainer.nativeElement.innerHTML=e},e.prototype.getCodeText=function(){return this.codeContainer.nativeElement.textContent},e.prototype.doCopy=function(){var e=this.codeText;this.copier.copyText(e)?(this.logger.log("Copied code to clipboard:",e),this.snackbar.open("Code Copied","",{duration:800})):(this.logger.error(new Error('ERROR copying code to clipboard: "'+e+'"')),this.snackbar.open("Copy failed. Please try again!","",{duration:800}))},e.prototype.getLinenums=function(e){var t="boolean"==typeof this.linenums?this.linenums:"true"===this.linenums||"false"!==this.linenums&&("string"==typeof this.linenums?parseInt(this.linenums,10):this.linenums);return null==t||isNaN(t)?(e.match(/\n/g)||[]).length>10:t},e}(),d=function(){function e(){this._path="",this.isAvoid=!1}return Object.defineProperty(e.prototype,"title",{get:function(){return this._title},set:function(e){this._title=e,this.classes={"headed-code":!!this.title,"simple-code":!this.title}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"path",{get:function(){return this._path},set:function(e){this._path=e,this.isAvoid=-1!==this.path.indexOf(".avoid.")},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hidecopy",{get:function(){return this._hidecopy},set:function(e){this._hidecopy=null!=e&&""+e!="false"},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hyphenatedHideCopy",{set:function(e){this.hidecopy=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"capitalizedHideCopy",{set:function(e){this.hidecopy=e},enumerable:!0,configurable:!0}),e.prototype.ngAfterViewInit=function(){this.icode.code=this.content.nativeElement.innerHTML},e}(),s=function(){return function(){this.customElementComponent=d}}(),p=n("f4wy"),m=n("X/tL"),f=n("x8Hf"),h=o["\u0275crt"]({encapsulation:2,styles:[],data:{}});function g(e){return o["\u0275vid"](0,[(e()(),o["\u0275eld"](0,0,null,null,4,"button",[["class","material-icons copy-button no-print"],["title","Copy code snippet"]],[[1,"aria-label",0]],[[null,"click"]],function(e,t,n){var o=!0;return"click"===t&&(o=!1!==e.component.doCopy()&&o),o},null,null)),(e()(),o["\u0275ted"](-1,null,["\n        "])),(e()(),o["\u0275eld"](2,0,null,null,1,"span",[["aria-hidden","true"]],null,null,null,null,null)),(e()(),o["\u0275ted"](-1,null,["content_copy"])),(e()(),o["\u0275ted"](-1,null,["\n      "]))],null,function(e,t){e(t,0,0,t.component.ariaLabel)})}function y(e){return o["\u0275vid"](0,[o["\u0275qud"](402653184,1,{codeContainer:0}),(e()(),o["\u0275eld"](1,0,null,null,6,"pre",[],[[8,"className",0]],null,null,null,null)),(e()(),o["\u0275ted"](-1,null,["      "])),(e()(),o["\u0275and"](16777216,null,null,1,null,g)),o["\u0275did"](4,16384,null,0,m.NgIf,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null),(e()(),o["\u0275ted"](-1,null,["\n      "])),(e()(),o["\u0275eld"](6,0,[[1,0],["codeContainer",1]],null,0,"code",[["class","animated fadeIn"]],null,null,null,null,null)),(e()(),o["\u0275ted"](-1,null,["\n    "]))],function(e,t){e(t,4,0,!t.component.hideCopy)},function(e,t){e(t,1,0,o["\u0275inlineInterpolate"](1,"prettyprint lang-",t.component.language,""))})}var b=o["\u0275ccf"]("iam-code",c,function(e){return o["\u0275vid"](0,[(e()(),o["\u0275eld"](0,0,null,null,1,"iam-code",[],null,null,null,y,h)),o["\u0275did"](1,573440,null,0,c,[a.b,r,u,f.a],null,null)],null,null)},{hideCopy:"hideCopy",language:"language",linenums:"linenums",path:"path",region:"region",title:"title"},{codeFormatted:"codeFormatted"},[]),C=o["\u0275crt"]({encapsulation:2,styles:[],data:{}});function v(e){return o["\u0275vid"](0,[(e()(),o["\u0275eld"](0,0,null,null,1,"header",[],null,null,null,null,null)),(e()(),o["\u0275ted"](1,null,["",""]))],null,function(e,t){e(t,1,0,t.component.title)})}function E(e){return o["\u0275vid"](0,[o["\u0275qud"](402653184,1,{content:0}),o["\u0275qud"](402653184,2,{icode:0}),(e()(),o["\u0275eld"](2,0,[[1,0],["content",1]],null,1,"div",[["style","display: none"]],null,null,null,null,null)),o["\u0275ncd"](null,0),(e()(),o["\u0275and"](16777216,null,null,1,null,v)),o["\u0275did"](5,16384,null,0,m.NgIf,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null),(e()(),o["\u0275eld"](6,0,null,null,2,"iam-code",[],null,null,null,y,h)),o["\u0275did"](7,278528,null,0,m.NgClass,[o.IterableDiffers,o.KeyValueDiffers,o.ElementRef,o.Renderer2],{ngClass:[0,"ngClass"]},null),o["\u0275did"](8,573440,[[2,4]],0,c,[a.b,r,u,f.a],{hideCopy:[0,"hideCopy"],language:[1,"language"],linenums:[2,"linenums"],path:[3,"path"],region:[4,"region"],title:[5,"title"]},null)],function(e,t){var n=t.component;e(t,5,0,n.title),e(t,7,0,n.classes),e(t,8,0,n.hidecopy,n.language,n.linenums,n.path,n.region,n.title)},null)}var O=o["\u0275ccf"]("i-code",d,function(e){return o["\u0275vid"](0,[(e()(),o["\u0275eld"](0,0,null,null,1,"i-code",[],[[2,"avoidFile",null]],null,null,E,C)),o["\u0275did"](1,4243456,null,0,d,[],null,null)],null,function(e,t){e(t,0,0,o["\u0275nov"](t,1).isAvoid)})},{language:"language",linenums:"linenums",region:"region",title:"title",path:"path",hidecopy:"hidecopy",hyphenatedHideCopy:"hide-copy",capitalizedHideCopy:"hideCopy"},{},["*"]),k=n("NCST"),N=n("epcu"),_=n("qDAp"),w=n("699a"),T=n("/btu"),M=n("6XTJ"),j=n("I0Gi"),P=n("xZ0A"),R=function(){};n.d(t,"CodeExampleModuleNgFactory",function(){return x});var x=o["\u0275cmf"](s,[],function(e){return o["\u0275mod"]([o["\u0275mpd"](512,o.ComponentFactoryResolver,o["\u0275CodegenComponentFactoryResolver"],[[8,[p.a,p.b,b,O]],[3,o.ComponentFactoryResolver],o.NgModuleRef]),o["\u0275mpd"](4608,m.NgLocalization,m.NgLocaleLocalization,[o.LOCALE_ID,[2,m["\u0275angular_packages_common_common_a"]]]),o["\u0275mpd"](6144,k.b,null,[m.DOCUMENT]),o["\u0275mpd"](4608,k.c,k.c,[[2,k.b]]),o["\u0275mpd"](4608,N.a,N.a,[]),o["\u0275mpd"](5120,_.c,_.a,[[3,_.c],o.NgZone,N.a]),o["\u0275mpd"](5120,_.f,_.e,[[3,_.f],N.a,o.NgZone]),o["\u0275mpd"](4608,w.g,w.g,[_.c,_.f,o.NgZone,m.DOCUMENT]),o["\u0275mpd"](5120,w.c,w.h,[[3,w.c],m.DOCUMENT]),o["\u0275mpd"](4608,w.f,w.f,[_.f,m.DOCUMENT]),o["\u0275mpd"](5120,w.d,w.k,[[3,w.d],m.DOCUMENT]),o["\u0275mpd"](4608,w.a,w.a,[w.g,w.c,o.ComponentFactoryResolver,w.f,w.d,o.ApplicationRef,o.Injector,o.NgZone,m.DOCUMENT]),o["\u0275mpd"](5120,w.i,w.j,[w.a]),o["\u0275mpd"](4608,T.d,T.d,[N.a]),o["\u0275mpd"](135680,T.a,T.a,[T.d,o.NgZone]),o["\u0275mpd"](5120,M.l,M.k,[[3,M.l],[2,M.j],m.DOCUMENT]),o["\u0275mpd"](4608,a.b,a.b,[w.a,M.l,o.Injector,T.a,[3,a.b]]),o["\u0275mpd"](4608,r,r,[f.a]),o["\u0275mpd"](4608,u,u,[]),o["\u0275mpd"](1073742336,m.CommonModule,m.CommonModule,[]),o["\u0275mpd"](1073742336,k.a,k.a,[]),o["\u0275mpd"](1073742336,j.g,j.g,[]),o["\u0275mpd"](1073742336,N.b,N.b,[]),o["\u0275mpd"](1073742336,_.b,_.b,[]),o["\u0275mpd"](1073742336,w.e,w.e,[]),o["\u0275mpd"](256,P.c,!0,[]),o["\u0275mpd"](1073742336,P.e,P.e,[[2,P.c]]),o["\u0275mpd"](1073742336,T.c,T.c,[]),o["\u0275mpd"](1073742336,a.d,a.d,[]),o["\u0275mpd"](1073742336,R,R,[]),o["\u0275mpd"](1073742336,s,s,[])])})}});