// detect the user use a touchable device
window.addEventListener(
  'touchstart',
  function onFirstTouch() {
    // user device is touchable
    window.USER_IS_TOUCHING = true;
    window.removeEventListener('touchstart', onFirstTouch, false);
  },
  false
);

function md_code_wrapText() {
  const e = event.target.parentElement.parentElement.getElementsByTagName('code')[0];
  if (e.style['white-space'] === 'pre-wrap') {
    e.style['white-space'] = 'pre';
  } else {
    e.style['white-space'] = 'pre-wrap';
  }
}

function md_edit_mouseenter(event) {
  if (window.USER_IS_TOUCHING) event.target.setAttribute('data-mouseenter', Date.now());
}
function md_edit_mouseleave(event) {
  if (window.USER_IS_TOUCHING) event.target.removeAttribute('data-mouseenter');
}
function md_edit_event(target) {
  if (window.USER_IS_TOUCHING) {
    const dateTick = target.getAttribute('data-mouseenter');
    const diff = Date.now() - dateTick;
    // fix for mobile touch(hover is triggered by and before click),
    // because the hover(mouseenter) and click is triggered simultaneously
    if (diff < 200) return;
  }
  const element = target;
  element.dispatchEvent(
    new CustomEvent('edit-it', {
      bubbles: true,
      detail: { sourceLine: JSON.parse(element.getAttribute('data-source-lines')) }
    })
  );
}

function md_footnote_tooltip() {
  const id = event.target.getAttribute('data-id');
  const has = event.target.getElementsByClassName('tooltip');
  if (!has.length) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    event.target.appendChild(tooltip)
    for (const node of document.getElementById(id).children) {
      const e = node.cloneNode(true);
      while (e.lastElementChild && e.lastElementChild.tagName === 'A') {
        e.removeChild(e.lastElementChild);
      }
      e.removeAttribute('id');
      tooltip.appendChild(e);
    }
  }
}

/**
 * edit code on plnkr.co
 * not used yet
 * @param {*} lang
 * @param {*} code
 * @returns
 */
function edit(lang,code) {
  function normalizeHtml(code) {
    let hasDocType = code.match(/^\s*<!doctype/i);

    if (hasDocType) {
      return code;
    }

    let result = code;

    if (!code.match(/<body/i)) {
      result = `<body>\n${result}\n</body>`;
    }

    result = '<!doctype html>\n' + result;

    return result;
  }
  let html;
  if (lang=== 'html') {
    html = normalizeHtml(code);
  } else if(lang === 'js'|| lang === 'javascript') {
    // let codeIndented = code.replace(/^/gim, '    ');
    html = `<!DOCTYPE html>\n<script>\n${code}\n</script>`;
  } else{
    return
  }

  let form = document.createElement('form');
  form.action = "https://plnkr.co/edit/?p=preview";
  form.method = "POST";
  form.target = "_blank";

  document.body.appendChild(form);

  let textarea = document.createElement('textarea');
  textarea.name = "files[index.html]";
  textarea.value = html;
  form.appendChild(textarea);

  let input = document.createElement('input');
  input.name = "description";
  input.value = "Fork from " + window.location;
  form.appendChild(input);

  form.submit();
  form.remove();
}


function postJSFrame() {
  let win = jsFrame.contentWindow;
  if (typeof win.postMessage !== 'function') {
    alert("Sorry, your browser is too old");
    return;
  }
  win.postMessage(runCode, config.lookatCodeUrlBase + '/showjs');
}

function runHTML() {

  let frame;

  if (htmlResult && elem.hasAttribute('data-refresh')) {
    htmlResult.remove();
    htmlResult = null;
  }

  if (!htmlResult) {
    // take from HTML if exists there (in markup when autorun is specified)
    htmlResult = elem.querySelector('.code-result');
  }

  if (!htmlResult) {
    // otherwise create (or recreate if refresh)
    htmlResult = document.createElement('div');
    htmlResult.className = "code-result code-example__result";

    frame = document.createElement('iframe');
    frame.name = elem.id; // for console.log
    frame.className = 'code-result__iframe';

    if (elem.getAttribute('data-demo-height') === "0") {
      // this html has nothing to show
      htmlResult.style.display = 'none';
    } else if (elem.hasAttribute('data-demo-height')) {
      let height = +elem.getAttribute('data-demo-height');
      frame.style.height = height + 'px';
    }
    htmlResult.appendChild(frame);

    elem.appendChild(htmlResult);

  } else {
    frame = htmlResult.querySelector('iframe');
  }

  if (isTrusted && !frame.hasCustomConsoleLog) {
    // iframe may have been generated above OR already put in HTML by autorun
    frame.hasCustomConsoleLog = true;
    let consoleLogNative = frame.contentWindow.console.log.bind(frame.contentWindow.console);

    // bind console.log to the current elem.id
    frame.contentWindow.console.log = function(...args) {
      consoleLogNative(...args);

      let formattedArgs = consoleFormat(args);
      window.postMessage({type: 'console-log', log: formattedArgs, codeBoxId: elem.id}, '*');
    };
  }


  if (isTrusted) {
    let doc = frame.contentDocument || frame.contentWindow.document;

    doc.open();
    // console.log(code)
    doc.write(normalizeHtml(code));
    doc.close();

    if (!elem.hasAttribute('data-demo-height')) {
      resizeOnload.iframe(frame);
    }

    if (!(isFirstRun && elem.hasAttribute('data-autorun'))) {
      if (!isScrolledIntoView(htmlResult)) {
        htmlResult.scrollIntoView(false);
      }
    }

  } else {
    let form = document.createElement('form');
    form.style.display = 'none';
    form.method = 'POST';
    form.enctype = "multipart/form-data";
    form.action = config.lookatCodeUrlBase + "/showhtml";
    form.target = frame.name;

    let textarea = document.createElement('textarea');
    textarea.name = 'code';

    let normalizedCode = normalizeHtml(code);
    if (normalizedCode.includes('console.log')) {
      // insert after <head> or <body>, to ensure that console.log is replaced immediately
      normalizedCode = normalizedCode.replace(/<head>|<body>/im, '$&__LOOKATCODE_SCRIPT__');
    }
    textarea.value = normalizedCode;
    form.appendChild(textarea);

    frame.parentNode.insertBefore(form, frame.nextSibling);
    form.submit();
    form.remove();

    if (!(isFirstRun && elem.hasAttribute('data-autorun'))) {
      frame.onload = function() {

        if (!elem.hasAttribute('data-demo-height')) {
          resizeOnload.iframe(frame);
        }

        if (!isScrolledIntoView(htmlResult)) {
          htmlResult.scrollIntoView(false);
        }
      };
    }
  }

}

// Evaluates a script in a global context
function globalEval(code) {
  let script = document.createElement( "script" );
  script.type = 'module';
  script.text = code;
  document.head.append(script);
  script.remove();
}

this.consoleLog = function(args) {
  // console.info("Codebox consoleLog", args);
  if (!outputBox) {
    outputBox = document.createElement('div');
    outputBox.className = 'codebox__output';

    elem.append(outputBox);

    let label = document.createElement('div');
    label.className = 'codebox__output-label';
    label.innerHTML = t('prism.output');
    outputBox.append(label);
  }

  let logElem = document.createElement('div');
  logElem.className = 'codebox__output-line';
  logElem.innerHTML = args;
  outputBox.append(logElem);
}

function runJS() {

  if (elem.hasAttribute('data-global')) {
    if (!globalFrame) {
      globalFrame = document.createElement('iframe');
      globalFrame.className = 'js-frame';
      globalFrame.style.width = 0;
      globalFrame.style.height = 0;
      globalFrame.style.border = 'none';
      globalFrame.name = 'js-global-frame';
      document.body.appendChild(globalFrame);
    }

    let form = document.createElement('form');
    form.style.display = 'none';
    form.method = 'POST';
    form.enctype = "multipart/form-data";
    form.action = config.lookatCodeUrlBase + "/showhtml";
    form.target = 'js-global-frame';

    let scriptAttrs = elem.hasAttribute('data-module') ? ' type="module"' : '';

    let textarea = document.createElement('textarea');
    textarea.name = 'code';
    textarea.value = normalizeHtml(`<script${scriptAttrs}>\n${runCode}\n</script>`);
    form.appendChild(textarea);

    globalFrame.parentNode.insertBefore(form, globalFrame.nextSibling);
    form.submit();
    form.remove();
  } else if (isTrusted) {

    if (elem.hasAttribute('data-autorun') || elem.hasAttribute('data-module')) {
      // make sure functions from "autorun" go to global scope (eval has its own scope)
      globalEval(runCode);
      return;
    }

    try {
      window["eval"].call(window, runCode);
    } catch (e) {
      alert(e.constructor.name + ": " + e.message);
    }

  } else {

    if (elem.hasAttribute('data-refresh') && jsFrame) {
      jsFrame.remove();
      jsFrame = null;
    }

    if (!jsFrame) {
      // create iframe for js
      jsFrame = document.createElement('iframe');
      jsFrame.className = 'js-frame';
      jsFrame.src = config.lookatCodeUrlBase + '/showjs';
      jsFrame.style.width = 0;
      jsFrame.style.height = 0;
      jsFrame.style.border = 'none';
      jsFrame.onload = function() {
        // error with "null" target if fails to load jsFrame
        postJSFrame();
      };
      document.body.appendChild(jsFrame);
    } else {
      postJSFrame();
    }
  }

}
