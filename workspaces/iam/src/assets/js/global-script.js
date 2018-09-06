function wrap_text(event) {
  const e = event.target.parentElement.parentElement.getElementsByTagName('code')[0];
  if (!e.nowrap) {
    e.style['white-space'] = 'pre';
    e.nowrap = true;
  } else {
    e.style['white-space'] = 'pre-wrap';
    e.nowrap = false;
  }
}

function edit_event(target) {
  const element = target;
  element.dispatchEvent(
    new CustomEvent('edit-it', {
      bubbles: true,
      detail: { element, sourceLine: JSON.parse(element.getAttribute('data-source-lines')) }
    })
  );
}
