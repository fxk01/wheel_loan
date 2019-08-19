import { CHANGE_TITLE, LOGIN_SUCCESS, GENERATE_ROUTES } from './mutation-types'
// import Vue from 'vue'
// import '@/app/storage'
// console.log(Vue.ls)
export default {
  [CHANGE_TITLE](state, titleInfo) {
    state.doctitle = titleInfo.doctitle
  },
  [LOGIN_SUCCESS](state, payload) {
    state.user = payload
  },
  [GENERATE_ROUTES](state, payload) {
    state.asyncRouterMap = payload
  },
}
