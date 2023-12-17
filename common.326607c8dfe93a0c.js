"use strict";(self.webpackChunkiam=self.webpackChunkiam||[]).push([["common"],{54196:(F,T,n)=>{n.d(T,{z:()=>f});var t=n(84852),h=n(95281),L=n(3746),a=n(63517);class f{set sourceLines(c){const d=/\[\s*(\d+)\s*,\s*(\d+)\s*\]/.exec(c);d?(this.sourceLineStart=+d[1],this.sourceLineEnd=+d[2]):this.logger.debug(`sourceLines: ${c}`)}constructor(c,d){this._store=c,this.docEditor=d,this.logger=(0,t.Yd)(`${this.constructor.name}`)}get source(){const c=this._store.currentDocContentString$.state,[d,y]=this.getRange(c);return c.substring(d,y)}set source(c){if(this.docEditor.currentEditor)return void this.docEditor.currentEditor.replaceRange(c+"\n",this.sourceLineStart,0,this.sourceLineEnd,0);const y=this._store.currentDocContent$.state.content,w=this._store.currentId_.state,[g,N]=this.getRange(y),O=function B(M,c,d,y){return c<0&&((c+=this.length)<0&&(c=0)),M.slice(0,c)+(y||"")+M.slice(c+d)}(y,g,N-g,c);this._store.docContent.update({id:w,changes:{content:O}}),setTimeout(()=>this._store.upsertDocStatus({isStoreDirty:!0}),w)}getRange(c){if(this.sourceLineStart>=this.sourceLineEnd)throw"DataSourceLines: sourceLineStart should less than sourceLineEnd";let y,w,d=0;for(let g=0;g<c.length;g++)if("\n"===c[g]&&(d++,d===this.sourceLineStart&&(y=g+1),d===this.sourceLineEnd)){w=g;break}if(void 0===y||void 0===w)throw"DataSourceLines: content lenth is less than expected!";return[y,w]}}f.\u0275fac=function(c){return new(c||f)(h.Y36(L.G),h.Y36(a.d))},f.\u0275dir=h.lG2({type:f,inputs:{sourceLines:["data-source-lines","sourceLines"]}})},7851:(F,T,n)=>{n.d(T,{I:()=>U});var t=n(95281),h=n(74785),L=n(61936);class a{constructor(e,o){this.matInput=e,this.elRef=o,this.autofocusSelectValue=!1}ngOnInit(){setTimeout(()=>{if(this.matInput.focus(),this.autofocusSelectValue){const e=this.elRef.nativeElement;e.setSelectionRange(0,e.value.length)}})}}a.\u0275fac=function(e){return new(e||a)(t.Y36(L.Nt),t.Y36(t.SBq))},a.\u0275dir=t.lG2({type:a,selectors:[["","matInputAutofocus",""]],inputs:{autofocusSelectValue:"autofocusSelectValue"}});class f{constructor(){this.search=new t.vpe}onSearch(e){this.search.next(e.trim())}}f.\u0275fac=function(e){return new(e||f)},f.\u0275cmp=t.Xpm({type:f,selectors:[["iam-doc-search-bar"]],outputs:{search:"search"},decls:4,vars:0,consts:[[1,"doc-search"],[1,"search-icon"],["matInput","","matInputAutofocus","","action-bar-flex","","type","text","placeholder","Search...",1,"input-lg","search-input",3,"keyup"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"mat-icon",1),t._uU(2,"search"),t.qZA(),t.TgZ(3,"input",2),t.NdJ("keyup",function(i){return o.onSearch(i.target.value)}),t.qZA()())},dependencies:[h.Hw,a,L.Nt],styles:[".doc-search[_ngcontent-%COMP%]{height:4rem;padding-left:1rem;font-size:1.4rem;display:flex;flex:1;background:white}.doc-search[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin:auto}.doc-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;font-family:RobotoRegular;width:auto;max-width:none;display:inline-block;border:0;padding:.25rem .5rem;margin:0}"]});var B=n(12538),M=n(30504),c=n(48045),d=n(22482),y=n(3746),w=n(17011),g=n(38903);function N(_,e){if(1&_&&t._UZ(0,"div",4),2&_){const o=e.$implicit,m=t.oxw();t.Q6J("innerHTML",m.getMatches(o),t.oJD)}}class O{constructor(){this.onClick=new t.vpe}getMatches(e){const o=e.fragment;let m="",i=0;return e.matches.forEach(b=>{const k=b.indices;m+=o.substr(i,k[0]-i),m+=`<em>${b.text}</em>`,i=k[1]}),m+=o.substr(i),m}}function K(_,e){if(1&_){const o=t.EpF();t.TgZ(0,"doc-search-item",4),t.NdJ("onClick",function(i){t.CHM(o);const b=t.oxw();return t.KtG(b.onClick.emit(i))}),t.qZA()}2&_&&t.Q6J("item",e.$implicit)}O.\u0275fac=function(e){return new(e||O)},O.\u0275cmp=t.Xpm({type:O,selectors:[["doc-search-item"]],inputs:{item:"item"},outputs:{onClick:"onClick"},decls:10,vars:5,consts:[["appearance","outlined"],[3,"click"],[1,"title"],["class","fragment",3,"innerHTML",4,"ngFor","ngForOf"],[1,"fragment",3,"innerHTML"]],template:function(e,o){1&e&&(t.TgZ(0,"mat-card",0)(1,"mat-card-header"),t._UZ(2,"div"),t.TgZ(3,"div",1),t.NdJ("click",function(){return o.onClick.emit(o.item)}),t.TgZ(4,"mat-card-title",2),t._uU(5),t.qZA(),t.TgZ(6,"mat-card-subtitle"),t._uU(7),t.qZA()()(),t.TgZ(8,"mat-card-content"),t.YNc(9,N,1,1,"div",3),t.qZA()()),2&e&&(t.xp6(5),t.Oqu(o.item.title),t.xp6(2),t.lnq(" Score: ",o.item.score," Id: ",o.item.id," source: ",o.item.source," "),t.xp6(2),t.Q6J("ngForOf",o.item.text_matches))},dependencies:[w.sg,g.a8,g.dn,g.dk,g.$j,g.n5],styles:[".fragment[_ngcontent-%COMP%]{white-space:pre-wrap}.fragment[_ngcontent-%COMP%]     em{background:yellow;font-style:normal}[_nghost-%COMP%]{display:inline-block;max-width:1000px;width:100%;display:flex}mat-card[_ngcontent-%COMP%]{width:100%;margin-top:3px}mat-card[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{cursor:pointer;text-decoration:underline}"]});class U{constructor(e,o){this._store=e,this.documentEffects=o,this.onClick=new t.vpe,this.searchResult$=this._store.searchResult_,this.trackByFunc=(m,i)=>i.id}ngAfterViewInit(){this.docSearchComponent.search.pipe((0,M.b)(800),(0,c.x)(),(0,B.b)(e=>{""!==e.trim()&&this.documentEffects.searchDocument_.next({query:e})})).subscribe()}}U.\u0275fac=function(e){return new(e||U)(t.Y36(y.G),t.Y36(d.CL))},U.\u0275cmp=t.Xpm({type:U,selectors:[["doc-search-list"]],viewQuery:function(e,o){if(1&e&&t.Gf(f,5),2&e){let m;t.iGM(m=t.CRH())&&(o.docSearchComponent=m.first)}},outputs:{onClick:"onClick"},decls:5,vars:4,consts:[["clickToggleEnable","false"],[1,"search-result"],["search",""],[3,"item","onClick",4,"ngFor","ngForOf","ngForTrackBy"],[3,"item","onClick"]],template:function(e,o){1&e&&(t._UZ(0,"iam-doc-search-bar",0),t.TgZ(1,"div",1,2),t.YNc(3,K,1,1,"doc-search-item",3),t.ALo(4,"async"),t.qZA()),2&e&&(t.xp6(3),t.Q6J("ngForOf",t.lcZ(4,2,o.searchResult$))("ngForTrackBy",o.trackByFunc))},dependencies:[w.sg,f,O,w.Ov],styles:["[_nghost-%COMP%]{max-width:400px;width:100%}.search-result[_ngcontent-%COMP%]{overflow:auto;display:flex;flex-flow:row wrap;box-sizing:border-box;justify-content:space-around;max-height:calc(100vh - 50px);margin-bottom:50px}"]})},63517:(F,T,n)=>{n.d(T,{d:()=>h});var t=n(95281);class h{}h.\u0275fac=function(a){return new(a||h)},h.\u0275prov=t.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"})},30835:(F,T,n)=>{n.d(T,{Z:()=>c});var t=n(25627),h=n(16402);const c=d=>!(d=>(d=>{const{r:y,g:w,b:g}=h.Z.parse(d),N=.2126*t.Z.channel.toLinear(y)+.7152*t.Z.channel.toLinear(w)+.0722*t.Z.channel.toLinear(g);return t.Z.lang.round(N)})(d)>=.5)(d)},93818:(F,T,n)=>{n.d(T,{a:()=>_,f:()=>K});var t=n(44907),h=n(98876),L=n(44598),a=n(81370),f=n(42265),B=n(47006),M=n(89207),c=n(50997);const d={},w=function(e,o,m,i,b,k){const S=i.select(`[id="${m}"]`);Object.keys(e).forEach(function(v){const s=e[v];let P="default";s.classes.length>0&&(P=s.classes.join(" "));const E=(0,f.m)(s.styles);let p,r=void 0!==s.text?s.text:s.id;if((0,a.j)((0,a.g)().flowchart.htmlLabels)){const $={label:r.replace(/fa[blrs]?:fa-[\w-]+/g,I=>`<i class='${I.replace(":"," ")}'></i>`)};p=(0,M.a)(S,$).node(),p.parentNode.removeChild(p)}else{const $=b.createElementNS("http://www.w3.org/2000/svg","text");$.setAttribute("style",E.labelStyle.replace("color:","fill:"));const I=r.split(a.d.lineBreakRegex);for(const G of I){const R=b.createElementNS("http://www.w3.org/2000/svg","tspan");R.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),R.setAttribute("dy","1em"),R.setAttribute("x","1"),R.textContent=G,$.appendChild(R)}p=$}let C=0,l="";switch(s.type){case"round":C=5,l="rect";break;case"square":case"group":default:l="rect";break;case"diamond":l="question";break;case"hexagon":l="hexagon";break;case"odd":case"odd_right":l="rect_left_inv_arrow";break;case"lean_right":l="lean_right";break;case"lean_left":l="lean_left";break;case"trapezoid":l="trapezoid";break;case"inv_trapezoid":l="inv_trapezoid";break;case"circle":l="circle";break;case"ellipse":l="ellipse";break;case"stadium":l="stadium";break;case"subroutine":l="subroutine";break;case"cylinder":l="cylinder";break;case"doublecircle":l="doublecircle"}o.setNode(s.id,{labelStyle:E.labelStyle,shape:l,labelText:r,rx:C,ry:C,class:P,style:E.style,id:s.id,link:s.link,linkTarget:s.linkTarget,tooltip:k.db.getTooltip(s.id)||"",domId:k.db.lookUpDomId(s.id),haveCallback:s.haveCallback,width:"group"===s.type?500:void 0,dir:s.dir,type:s.type,props:s.props,padding:(0,a.g)().flowchart.padding}),a.l.info("setNode",{labelStyle:E.labelStyle,shape:l,labelText:r,rx:C,ry:C,class:P,style:E.style,id:s.id,domId:k.db.lookUpDomId(s.id),width:"group"===s.type?500:void 0,type:s.type,dir:s.dir,props:s.props,padding:(0,a.g)().flowchart.padding})})},g=function(e,o,m){a.l.info("abc78 edges = ",e);let k,S,i=0,b={};if(void 0!==e.defaultStyle){const u=(0,f.m)(e.defaultStyle);k=u.style,S=u.labelStyle}e.forEach(function(u){i++;var v="L-"+u.start+"-"+u.end;void 0===b[v]?(b[v]=0,a.l.info("abc78 new entry",v,b[v])):(b[v]++,a.l.info("abc78 new entry",v,b[v]));let s=v+"-"+b[v];a.l.info("abc78 new link id to be used is",v,s,b[v]);var P="LS-"+u.start,E="LE-"+u.end;const r={style:"",labelStyle:""};switch(r.minlen=u.length||1,r.arrowhead="arrow_open"===u.type?"none":"normal",r.arrowTypeStart="arrow_open",r.arrowTypeEnd="arrow_open",u.type){case"double_arrow_cross":r.arrowTypeStart="arrow_cross";case"arrow_cross":r.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":r.arrowTypeStart="arrow_point";case"arrow_point":r.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":r.arrowTypeStart="arrow_circle";case"arrow_circle":r.arrowTypeEnd="arrow_circle"}let p="",C="";switch(u.stroke){case"normal":p="fill:none;",void 0!==k&&(p=k),void 0!==S&&(C=S),r.thickness="normal",r.pattern="solid";break;case"dotted":r.thickness="normal",r.pattern="dotted",r.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":r.thickness="thick",r.pattern="solid",r.style="stroke-width: 3.5px;fill:none;";break;case"invisible":r.thickness="invisible",r.pattern="solid",r.style="stroke-width: 0;fill:none;"}if(void 0!==u.style){const l=(0,f.m)(u.style);p=l.style,C=l.labelStyle}r.style=r.style+=p,r.labelStyle=r.labelStyle+=C,r.curve=(0,f.n)(void 0!==u.interpolate?u.interpolate:void 0!==e.defaultInterpolate?e.defaultInterpolate:d.curve,h.c_6),void 0===u.text?void 0!==u.style&&(r.arrowheadStyle="fill: #333"):(r.arrowheadStyle="fill: #333",r.labelpos="c"),r.labelType="text",r.label=u.text.replace(a.d.lineBreakRegex,"\n"),void 0===u.style&&(r.style=r.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),r.labelStyle=r.labelStyle.replace("color:","fill:"),r.id=s,r.classes="flowchart-link "+P+" "+E,o.setEdge(u.start,u.end,r,i)})},K={setConf:function(e){const o=Object.keys(e);for(const m of o)d[m]=e[m]},addVertices:w,addEdges:g,getClasses:function(e,o){a.l.info("Extracting classes"),o.db.clear();try{return o.parse(e),o.db.getClasses()}catch{return}},draw:function(e,o,m,i){a.l.info("Drawing flowchart"),i.db.clear(),L.f.setGen("gen-2"),i.parser.parse(e);let b=i.db.getDirection();void 0===b&&(b="TD");const{securityLevel:k,flowchart:S}=(0,a.g)(),u=S.nodeSpacing||50,v=S.rankSpacing||50;let s;"sandbox"===k&&(s=(0,h.Ys)("#i"+o));const P=(0,h.Ys)("sandbox"===k?s.nodes()[0].contentDocument.body:"body"),E="sandbox"===k?s.nodes()[0].contentDocument:document,r=new t.k({multigraph:!0,compound:!0}).setGraph({rankdir:b,nodesep:u,ranksep:v,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}});let p;const C=i.db.getSubGraphs();a.l.info("Subgraphs - ",C);for(let x=C.length-1;x>=0;x--)p=C[x],a.l.info("Subgraph - ",p),i.db.addVertex(p.id,p.title,"group",void 0,p.classes,p.dir);const l=i.db.getVertices(),$=i.db.getEdges();a.l.info("Edges",$);let I=0;for(I=C.length-1;I>=0;I--){p=C[I],(0,h.td_)("cluster").append("text");for(let x=0;x<p.nodes.length;x++)a.l.info("Setting up subgraphs",p.nodes[x],p.id),r.setParent(p.nodes[x],p.id)}w(l,r,o,P,E,i),g($,r);const G=P.select(`[id="${o}"]`),R=P.select("#"+o+" g");if((0,B.r)(R,r,["point","circle","cross"],"flowchart",o),f.u.insertTitle(G,"flowchartTitleText",S.titleTopMargin,i.db.getDiagramTitle()),(0,c.s)(r,G,S.diagramPadding,S.useMaxWidth),i.db.indexNodes("subGraph"+I),!S.htmlLabels){const x=E.querySelectorAll('[id="'+o+'"] .edgeLabel .label');for(const A of x){const Z=A.getBBox(),D=E.createElementNS("http://www.w3.org/2000/svg","rect");D.setAttribute("rx",0),D.setAttribute("ry",0),D.setAttribute("width",Z.width),D.setAttribute("height",Z.height),A.insertBefore(D,A.firstChild)}}Object.keys(l).forEach(function(x){const A=l[x];if(A.link){const Z=(0,h.Ys)("#"+o+' [id="'+x+'"]');if(Z){const D=E.createElementNS("http://www.w3.org/2000/svg","a");D.setAttributeNS("http://www.w3.org/2000/svg","class",A.classes.join(" ")),D.setAttributeNS("http://www.w3.org/2000/svg","href",A.link),D.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),"sandbox"===k?D.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):A.linkTarget&&D.setAttributeNS("http://www.w3.org/2000/svg","target",A.linkTarget);const W=Z.insert(function(){return D},":first-child"),Y=Z.select(".label-container");Y&&W.append(function(){return Y.node()});const z=Z.select(".label");z&&W.append(function(){return z.node()})}}})}},_=e=>`.label {\n    font-family: ${e.fontFamily};\n    color: ${e.nodeTextColor||e.textColor};\n  }\n  .cluster-label text {\n    fill: ${e.titleColor};\n  }\n  .cluster-label span {\n    color: ${e.titleColor};\n  }\n\n  .label text,span {\n    fill: ${e.nodeTextColor||e.textColor};\n    color: ${e.nodeTextColor||e.textColor};\n  }\n\n  .node rect,\n  .node circle,\n  .node ellipse,\n  .node polygon,\n  .node path {\n    fill: ${e.mainBkg};\n    stroke: ${e.nodeBorder};\n    stroke-width: 1px;\n  }\n\n  .node .label {\n    text-align: center;\n  }\n  .node.clickable {\n    cursor: pointer;\n  }\n\n  .arrowheadPath {\n    fill: ${e.arrowheadColor};\n  }\n\n  .edgePath .path {\n    stroke: ${e.lineColor};\n    stroke-width: 2.0px;\n  }\n\n  .flowchart-link {\n    stroke: ${e.lineColor};\n    fill: none;\n  }\n\n  .edgeLabel {\n    background-color: ${e.edgeLabelBackground};\n    rect {\n      opacity: 0.5;\n      background-color: ${e.edgeLabelBackground};\n      fill: ${e.edgeLabelBackground};\n    }\n    text-align: center;\n  }\n\n  .cluster rect {\n    fill: ${e.clusterBkg};\n    stroke: ${e.clusterBorder};\n    stroke-width: 1px;\n  }\n\n  .cluster text {\n    fill: ${e.titleColor};\n  }\n\n  .cluster span {\n    color: ${e.titleColor};\n  }\n  /* .cluster div {\n    color: ${e.titleColor};\n  } */\n\n  div.mermaidTooltip {\n    position: absolute;\n    text-align: center;\n    max-width: 200px;\n    padding: 2px;\n    font-family: ${e.fontFamily};\n    font-size: 12px;\n    background: ${e.tertiaryColor};\n    border: 1px solid ${e.border2};\n    border-radius: 2px;\n    pointer-events: none;\n    z-index: 100;\n  }\n\n  .flowchartTitleText {\n    text-anchor: middle;\n    font-size: 18px;\n    fill: ${e.textColor};\n  }\n`}}]);