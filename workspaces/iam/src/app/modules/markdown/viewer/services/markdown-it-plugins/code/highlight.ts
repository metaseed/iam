// import highlightjs from 'highlight.js/lib/highlight';
import * as prismjs from "prismjs";

// import 'prismjs/components/prism-core';
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-css";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-git";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-makefile";
import "prismjs/components/prism-markdown";
// import 'prismjs/components/prism-php';// have problem
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-lisp";
import "prismjs/components/prism-python";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-vim";
import "prismjs/components/prism-yaml";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-highlight/prism-line-highlight";
import { base64Encode, DocumentRef, Utilities } from "core";
import MarkdownIt from "markdown-it";
import { Injector } from "@angular/core";

export interface ViewerService {
  env: { highlightLineNumbers: any };
  target: HTMLElement;
  markdownIt: MarkdownIt;
}

export const DEFAULT_HIGHLIGHT_FUNCTION = (viewer: ViewerService, injector: Injector) => {
  const docRef = injector.get(DocumentRef);
  const utils = injector.get(Utilities);
  let showCodeLineNumber = false;
  utils.isWideScreen$.subscribe(
    wide => {
      showCodeLineNumber = wide;
      // could not dynamic change line number column html-element, it could not show/hide with class modification, so we just capture
      // the screen size and use it, at code render time, because of idom, it could not rerendered if no changes.
      // docRef.document.querySelectorAll("pre.code-with-line-numbers").forEach(pre => {
      //   pre.classList.toggle("line-numbers", showCodeLineNumber);
      // });
    });

  return (str, lang: string) => {
    const reg = /\s+{[ ,-\d+]+}/;
    lang = lang.replace(reg, "");
    const hlLineNumbers = viewer.env.highlightLineNumbers;
    const language = prismjs.languages[lang];
    if (lang && language) {
      const preNode: HTMLElement = docRef.document.createElement("pre");
      preNode.className =
        (showCodeLineNumber ? "line-numbers" : "") + " language-" + lang + " code-with-line-numbers pointer-events-none";
      const codeNode = docRef.document.createElement("code");
      codeNode.classList.add("inner-code");
      preNode.appendChild(codeNode);
      codeNode.textContent = str;
      if (hlLineNumbers) {
        preNode.setAttribute("data-line", hlLineNumbers);
        codeNode.style["white-space"] = "pre";
      }
      preNode.style.visibility = "collapse";
      viewer.target.appendChild(preNode);

      try {
        prismjs.highlightElement(codeNode);
        // replace all textNode with span, so it could be find with
        // document.elementFromPoint, textNode is not findable.
        //
        // set relative line number.
        let line = 1;
        codeNode.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text:string = (node as any).data;
            const span = document.createElement('span');
            span.append(text);
            span.setAttribute('data-line', line.toString());
            node.replaceWith(span)

            if(text.includes('\n')){
              line += text.split('\n').length-1;
            }
          } else {
            (node as any).setAttribute('data-line', line.toString());
          }
        })

        preNode.style.visibility = "visible";
        viewer.target.removeChild(preNode);
        const r =
          `<div class="markdown-code">
<div class="markdown-code__lang">${lang}</div>
<div class="code-buttons">

<button class="material-icons code-button" title="edit code"
onclick="md_edit_event(event.target.parentElement.parentElement.parentElement)">
edit
</button>

<button class="material-icons code-button" title="line wrap"
onclick="md_code_wrapText()">
wrap_text
</button>

<button class="material-icons code-button no-print"
title="Copy code snippet"
originalstr=${base64Encode(str)}
onclick="document.copier.copyText(this.attributes.originalstr.value,true)">
<span aria-hidden="true">content_copy</span>
</button></div>${preNode.outerHTML}</div>`;

        return r;
      } catch (e) {
        console.error(e);
      }
    }
    return `<pre class="highlight"><code>${viewer.markdownIt.utils.escapeHtml(
      str
    )} </code></pre>`;
  }
}
