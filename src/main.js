import Vue from 'vue'
import App from './App.vue'
import router from './route/router'
import store from './store'
import 'amfe-flexible'
import '@/app/index'
Vue.config.productionTip = false

const MAIN = new Vue({
  router,
  store,
  render: h => h(App),
})
// const initToken = MAIN.$ls.get('user')
// if (initToken != null) {

// }

MAIN.$mount('#root')
