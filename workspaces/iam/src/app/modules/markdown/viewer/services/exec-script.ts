export function evalScript(script) {
  (function (data) {
    window["eval"].call(window, data);
  })(script); // iife to make sure the context is window
}

export function setInnerHtml(elm, html) {
  // https://stackoverflow.com/questions/2592092/executing-script-elements-inserted-with-innerhtml
  elm.innerHTML = html;
  Array.from(elm.querySelectorAll("script")).forEach((oldScript: any) => {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes)
      .forEach((attr: any) => newScript.setAttribute(attr.name, attr.value));
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

export function loadModuleScript(src){
  const script = document.body.querySelector('script[src="'+src+'"]')
  if(script) return script;

  let dyn = document.createElement("script")
  dyn.type = "module"
  dyn.src= src;
  document.body.appendChild(dyn)
}
