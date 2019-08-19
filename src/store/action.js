import { LOGIN_SUCCESS, GENERATE_ROUTES } from './mutation-types'
import router from '@/route/router'
import api from '@/services'
const { loginUser } = api;
import Vue from 'vue'
import '@/app/storage'
import { asyncRouterMap } from '@/route/asyncRouterMap'

export default {
  async login({ commit }, payload) {
    const { code, data } = await loginUser(payload);
    if (code === 1) {
      commit(LOGIN_SUCCESS, data);
      // const roleRouter = state.asyncRouterMap.filter(item =>
      //   item.meta.roles.includes(data.permissions.role)
      // )
      // let initialRoutes = router.options.routes
      // router.addRoutes(roleRouter)
      // commit(GENERATE_ROUTES, [...initialRoutes, ...roleRouter])
      Vue.ls.set('user', data);
      const redirect = router.history.current.query.redirect;
      if (redirect) {
        router.replace(redirect)
      } else {
        router.replace('/')
      }
    }
  },
  GenerateRoutes({ commit }, payload) {
    const roleRouter = asyncRouterMap.filter(item =>
      item.meta.roles.includes(payload)
    );
    commit(GENERATE_ROUTES, roleRouter)
  },
}