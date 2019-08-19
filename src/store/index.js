import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import order from './modules/order'
import getters from './getters'
import permission from './modules/permission'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    order,
  },
  getters,
})