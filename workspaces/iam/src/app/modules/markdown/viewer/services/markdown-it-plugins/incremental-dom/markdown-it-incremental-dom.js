import { renderer } from './mixins/renderer'
import { rules} from './mixins/rules'

export function markdownitIncrementalDOM(md, target, opts = {}) {
  const options = { incrementalizeDefaultRules: true, ...opts }
  const incrementalDOM = !target && window ? window.IncrementalDOM : target
  const mixin = renderer(incrementalDOM)

  Object.defineProperty(md, 'IncrementalDOMRenderer', {
    get() {
      const extendedRenderer = Object.assign(
        Object.create(Object.getPrototypeOf(md.renderer)),
        md.renderer,
        mixin
      )

      if (options.incrementalizeDefaultRules) {
        extendedRenderer.rules = { ...extendedRenderer.rules, ...rules(incrementalDOM) }
      }

      return extendedRenderer
    },
  })

  md.renderToIncrementalDOM = (src, env = {}) =>
    md.IncrementalDOMRenderer.render(md.parse(src, env), md.options, env)

  md.renderInlineToIncrementalDOM = (src, env = {}) =>
    md.IncrementalDOMRenderer.render(md.parseInline(src, env), md.options, env)
}
