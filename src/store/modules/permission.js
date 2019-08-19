import { asyncRouterMap } from '@/route/asyncRouterMap'
import { constantRouterMap } from '@/route/constantRouterMap'

/**
 *通过meta.role判断是否与当前用户权限匹配
 *
 * @param {Array} roles
 * @param {Array} route
 * @returns {Boolean}
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 *递归过滤异步路由表，返回符合用户角色权限的路由表
 *
 * @param {Array} asyncRouterMap
 * @param {Array} roles
 * @returns {Array}
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  });
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRoutes: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRoutes = routers;
      state.routers = constantRouterMap.concat(routers)
    },
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      let roles;
      if(data.roles === undefined) {
        roles = ['Customer']
      } else {
        roles = [data.roles];
      }
      return new Promise(resolve => {
        let accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        // console.log(accessedRouters, 'add');
        commit('SET_ROUTERS', accessedRouters);
        resolve()
      })
    },
  },
};

export default permission