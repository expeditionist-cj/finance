import { asyncRoutes, constantRoutes } from '@/router';
import { getMenu } from "@/api/user";
import Layout from '@/layout';
import {menuData} from "@/globalVariables/menu";
// 动态路由菜单（后台请求到的路由菜单）


/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

// 递归生成动态路由
const generaMenu = (routes, data) => {

  data.forEach(item => {
    var menu = {
      path: item.path,
      component: item.component == "Layout" ? Layout : () => import(`@/views/${item.component}`),
      redirect: item.redirect,
      // alwaysShow: item.alwaysShow, // will always show the root menu
      name: item.name,
      hidden: item.hidden || false,
      meta: {
        title: item.meta && item.meta.title,
        icon: item.meta && item.meta.icon,
        // roles: ['admin', 'editor'] // you can set roles in root nav
      },
      children: []
    };
    if (item.children && item.children.length) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu);
  });
}
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    // vue-router 动态生产路由
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  /**
   * 动态生产路由
   * @param {*} param0 
   * @param {*} roles 
   */
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = [];

      // 根据角色来过滤菜单
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }

      generaMenu(accessedRoutes, menuData);
      // 固定路由会在动态路由之前先加载
      accessedRoutes.push({ path: '*', redirect: '/404' })
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes)
    })

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
