import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { eventBus } from './event-bus'
import { currency, capitalize, truncate, dateFormat } from './filters'

// Global filters (removed in Vue 3)
Vue.filter('currency', currency)
Vue.filter('capitalize', capitalize)
Vue.filter('truncate', truncate)
Vue.filter('dateFormat', dateFormat)

// Global event bus attached to prototype (removed in Vue 3)
Vue.prototype.$bus = eventBus

// Global mixin (discouraged in Vue 3)
Vue.mixin({
  created() {
    if (this.$options.debugLog) {
      console.log(`[Debug] ${this.$options.name || 'Anonymous'} component created`)
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
