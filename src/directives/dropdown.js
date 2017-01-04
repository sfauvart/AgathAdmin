import Load from './utils/load'

export default {
  bind (el, binding, vnode) {
    Load.call(vnode.context, () => {
      const params = binding.value || {}

      el.setAttribute('data-activates', params.activates)
      /* eslint-disable no-undef */
      // $(el).dropdown(params)
    })
  }
}
