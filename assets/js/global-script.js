window.addEventListener(
  'touchstart',
  function onFirstTouch() {
    window.USER_IS_TOUCHING = true;
    window.removeEventListener('touchstart', onFirstTouch, false);
  },
  false
);

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

function md_edit_mouseenter() {
  if (window.USER_IS_TOUCHING) event.target.setAttribute('data-mouseenter', Date.now());
}
function md_edit_mouseleave() {
  if (window.USER_IS_TOUCHING) event.target.removeAttribute('data-mouseenter');
}
function md_edit_event(target) {
  if (window.USER_IS_TOUCHING) {
    const dateTick = target.getAttribute('data-mouseenter');
    const diff = Date.now() - dateTick;
    // fix for mobile touch(hover is triggered by and before click),
    // because the hover(mouseenter) and click is triggered simutinously
    if (diff < 200) return;
  }
  const element = target;
  element.dispatchEvent(
    new CustomEvent('edit-it', {
      bubbles: true,
      detail: { element, sourceLine: JSON.parse(element.getAttribute('data-source-lines')) }
    })
  );
}
