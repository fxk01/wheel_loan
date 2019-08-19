import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { constantRouterMap } from './constantRouterMap'

Vue.use(Router);

const router = new Router({
  // base: '/ql', // 基础路径
  mode: 'history', //路由模式
  // base: process.env.BASE_URL, //路径
  routes: constantRouterMap,
});

router.afterEach((to, from) => {
  const tabInfo = {
    name: to.name,
    closable: true,
    path: to.path,
    title: to.meta.title,
    activeName: from.name,
  };
  store.commit('CHANGE_TITLE', tabInfo.title);
  const { cancelRequest = new Map() } = window;

  cancelRequest.forEach((value, key) => {
    if (value.pathname !== window.location.pathname) {
      value.cancel('cancel request');
      cancelRequest.delete(key)
    }
  })
});

export default router