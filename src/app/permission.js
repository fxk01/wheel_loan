import router from '@/route/router'
import store from '@/store'
import { getToken } from '@/util/auth'
/**
 *
 *
 * @param {*} roles
 * @param {*} permissionRoles
 * @returns
 */

function hasPermission(roles, permissionRoles) {
  return roles.some(role => permissionRoles.indexOf(role) > 0)
}

const whiteList = [
  '/',
  '/passport',
  '/passport/login',
  '/passport/register',
  '/company',
  '/product',
];

router.beforeEach((to, from, next) => {
  if (getToken('token')) {
    if(to.name === 'result' && (String(to.query['status']) === '3' || String(to.query['status']) === '4' || String(to.query['status']) === '5')) {
      to.meta.title = '提交结果'
    }
    if(to.name === 'enquiry' && String(to.query['status']) === '1') {
      to.meta.title = '提单'
    }
    if (to.path === '/passport/login') {
      // next({ ...to, replace: true })
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        //拉取用户信息
        store.dispatch('getUserInfo').then(res => {
          let roles = res.data['rights_desc'];
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRoutes);
            next({ ...to, replace: true })
          })
          // .catch(err => {
          //   store.dispatch('FedLogOut').then(() => {
          //     next({ path: '/' })
          //   })
          // })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/passport/login', query: { redirect: to.path } })
    }
  }
});