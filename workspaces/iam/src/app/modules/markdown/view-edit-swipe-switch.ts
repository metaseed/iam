export const viewSwipeToEditorLine = (e) => {
  let element = e.target as HTMLElement;
  let lines = '';
  let i = 0;
  do {
    lines = element.getAttribute('data-source-lines');
  } while (!lines && !!(element = element.parentElement) && i++ < 4);

  const sourceLine = JSON.parse(lines);

  if (element.tagName === 'CODE') {
    const pre = element.querySelector('pre.code-with-line-numbers') as HTMLElement;
    if (pre) {
      // set to auto to get element from point
      pre.classList.remove('pointer-events-none');
      const swipeStartX = e.center.x - e.deltaX;;
      const swipeStartY = e.center.y - e.deltaY;
      // console.log(swipeStartX, swipeStartY);
      const actionElement = document.elementFromPoint(swipeStartX, swipeStartY);
      // console.log(actionElement);
      // reset to make touch event transparent to parent element
      pre.classList.add('pointer-events-none');

      let actionSpan = null;
      if (actionElement.tagName === 'SPAN') {
        actionSpan = actionElement;
      } else if (actionElement === pre) { // action at blank area
        /// try to find the nearest span
        const code = pre.querySelector('code');
        if (code) {
          let nearestY = Number.MAX_VALUE; // here we just consider nearest Y
          for (let i = 0; i < code.childNodes.length; i++) {
            const child = code.childNodes[i] as HTMLSpanElement;
            if (child.innerHTML.split('\n').join('').trim() === '') {
              // do not consider blank line, because it's bounds is 2 lines.
              continue;
            }
            const bound = child.getBoundingClientRect();
            const absTpBottom = Math.abs(bound.bottom - swipeStartY);

            if (absTpBottom < nearestY) {
              actionSpan = child;
              nearestY = absTpBottom;
            }
          }

        }

      }

      if (actionSpan) {
        // console.log(actionSpan);
        const line = actionSpan.getAttribute('data-line');
        if (line) {
          const dataLine = Number(line);
          sourceLine[0] = sourceLine[0] + dataLine;
        }
      }

    }
  }

  return sourceLine;

}

export const replaceTextWithSpanAndSetRelativeLineNumber = (codeNode: HTMLElement) => {
  let line = 1;
  codeNode.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text: string = (node as any).data;
      const span = document.createElement('span');
      span.append(text);
      span.setAttribute('data-line', line.toString());
      node.replaceWith(span)

      if (text.includes('\n')) {
        line += text.split('\n').length - 1;
      }
    } else {
      (node as any).setAttribute('data-line', line.toString());
    }
  })
}
