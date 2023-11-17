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
import { replaceTextWithSpanAndSetRelativeLineNumber } from "app/modules/markdown/view-edit-swipe-switch";
import { consoleProxy, scopedEval } from "./script-run";

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
    lang = prismjs.languages[lang] ? lang: 'js';
    // although the language is not in the language list, we try to use js language as a fallback
    if (lang) {
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
        replaceTextWithSpanAndSetRelativeLineNumber(codeNode);

        preNode.style.visibility = "visible";
        viewer.target.removeChild(preNode);
        const r =
          `<div class="markdown-code">
<div class="markdown-code__lang">${lang}</div>
<div class="code-buttons">

<button class="material-icons code-button code-run-button" style="visibility:collapse;" title="line wrap">
play_arrow
</button>

<button class="material-icons code-button" title="edit code"
onclick="md_edit_event(event.target.parentElement.parentElement.parentElement)">
edit
</button>

<button class="material-icons code-button code-wrap-button" title="line wrap">
wrap_text
</button>

<button class="material-icons code-button no-print code-copy-button" title="copy code">
content_copy
</button>

<button class="material-icons code-button fullscreen-button" title="full screen">
fullscreen
</button>
</div>${preNode.outerHTML}<div class="code-console" style="border-top: 1px solid lightgray;"></div>
<img src onerror="event.target.parentElement.dispatchEvent(new CustomEvent('code-fence-loaded', { bubbles: true}));"></img>
</div>`;
        // img is the last element, so it will be loaded last, when we dispatch code-fence-loaded event, all sibling elements are loaded
        // event.target.remove();  should not be added this to img err handler, because it will trigger the connectedCallback every time the source code is edited, which will add click event handler several times to every button. note: because of incremental dom, the buttons would not be rerendered.
        // we could use this mechanism to implement the update lifetime hook. just add another img and remove itself in the err handler.

        return r;
      } catch (e) {
        console.error(e);
      }
    }
    return `<pre class="highlight"><code>${viewer.markdownIt.utils.escapeHtml(
      str
    )} </code></pre>`;
  }
};

export function codeFenceConnectedCallback(codeDiv: HTMLElement) {
  function fullscreenHandler(event: CustomEvent) {
    const fullscreenButton = event.target as HTMLElement;
    const textNode = fullscreenButton.firstChild as Text;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      textNode.data = 'fullscreen'
    }
    else {
      const outerPre = fullscreenButton.parentElement.parentElement.parentElement.parentElement;
      outerPre.requestFullscreen();
      textNode.data = 'fullscreen_exit'
    }
  }

  function md_code_wrapText(event: Event) {
    const codeWrapButton = event.target as HTMLElement;
    const codeNode = codeWrapButton.parentElement.parentElement.getElementsByTagName('code')[0];
    if (codeNode.style['white-space'] === 'pre-wrap') {
      codeNode.style['white-space'] = 'pre';
    } else {
      codeNode.style['white-space'] = 'pre-wrap';
    }
  }

  function copyCode(event: Event) {
    const copyButton = event.target as HTMLElement;
    const codeNode = copyButton.parentElement.parentElement.getElementsByTagName('code')[0];
    const text = codeNode.textContent;
    navigator.clipboard.writeText(text)
    // .then(() => console.log('code copied'))'));
  }

  const fullscreenButton = codeDiv.querySelector('.fullscreen-button');
  fullscreenButton.addEventListener('click', fullscreenHandler);

  const codeWrapButton = codeDiv.querySelector('.code-wrap-button');
  codeWrapButton.addEventListener('click', md_code_wrapText);

  const codeCopyButton = codeDiv.querySelector('.code-copy-button');
  codeCopyButton.addEventListener('click', copyCode);

  const innerCode = codeDiv.querySelector('.inner-code');
  const isJs = innerCode.classList.contains('language-js');
  const codeConsole = codeDiv.querySelector('.code-console') as HTMLElement;
  const codeRunButton = codeDiv.querySelector('.code-run-button') as HTMLElement;
  if (isJs) {
    codeRunButton.style.visibility = ''; // remove the hidden style
    codeRunButton.addEventListener('click', event => runCode(event, codeConsole));
  }

};

const dataForConsoleProxy = { consoleUI: null };
const console = consoleProxy(dataForConsoleProxy);
const docScope = {};
function runCode(event, codeConsole: HTMLElement) {
  dataForConsoleProxy.consoleUI = codeConsole;
  const codeWrapButton = event.target as HTMLElement;
  const code = codeWrapButton.parentElement.parentElement.getElementsByTagName('code')[0];
  const codeStr = code.textContent; // span's content would come in here.
  scopedEval(codeStr, { console, docScope });
}


