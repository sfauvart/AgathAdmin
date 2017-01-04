function Progress (options) {
  this.configure(options || {})
}

Progress.install = function (Vue, options) {
  if (this.installed) return
  this.installed = true

  let state = {
    inProgress: false
  }

  Vue.prototype.$mprogress = state

  Vue.mixin({
    beforeCreate () {
      Vue.util.defineReactive(this, '$mprogess', state)

      const http = Vue.http
      if (http) {
        http.interceptors.push((request, next) => {
          // const showProgressBar = 'showProgressBar' in request ? request.showProgressBar : true
          // if (showProgressBar) {
          state.inProgress = true
          // }

          next(response => {
            // if (!showProgressBar) return response
            setTimeout(() => {
              state.inProgress = false
            }, 500)
          })
        })
      }
    }
  })
}

export default Progress
