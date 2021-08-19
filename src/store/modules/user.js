/**
 * 
 * 登录状态控制，存储，更改登录成功的用户状态
 */



import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getUid, setUid, removeUid, getUserName, setUserName, removeUserName, getViewOrg, setViewOrg, removeViewOrg } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  uid: "",
  // sign:"",
  userName: '',
  viewOrg: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  },
  SET_VIEWORG: (state, viewOrg) => {
    state.viewOrg = viewOrg
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  // SET_SIGN:(state, sign) => {
  //   state.sign = sign
  // },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginName: username.trim(), passwd: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token);
        commit('SET_UID', data.uid);
        commit('SET_USERNAME', data.realName);
        commit('SET_VIEWORG', data.viewOrg);
        // commit('SET_SIGN', data.sign);
        setToken(data.token)
        // setSign(data.sign)
        setUid(data.uid)
        setUserName(data.realName)
        setViewOrg(data.viewOrg)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
    // return new Promise((resolve, reject) => {
    //   let { username, password } = userInfo;
    //   if (username == "admin" && password == "111111") {
    //     commit('SET_TOKEN', 'admin-token');
    //     setToken('admin-token')
    //     resolve()
    //   } else {
    //     reject()
    //   }
    // }).catch(error => {
    //   reject(error)
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      //   const { data } = response

      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }

      //   const { roles, name, avatar, introduction } = data

      //   // roles must be a non-empty array
      //   if (!roles || roles.length <= 0) {
      //     reject('getInfo: roles must be a non-null array!')
      //   }

      //   commit('SET_ROLES', roles)
      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   commit('SET_INTRODUCTION', introduction)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
      let data = {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      };
      commit('SET_ROLES', ['admin'])
      commit('SET_NAME', 'zhst')
      commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
      commit('SET_INTRODUCTION', '后台管理')
      resolve(data)

    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   removeToken()
      //   resetRouter()

      //   // reset visited views and cached views
      //   // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      //   dispatch('tagsView/delAllViews', null, { root: true })

      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      commit('SET_TOKEN', '')
      commit('SET_UID', '')
      commit('SET_USERNAME', '')
      commit('SET_VIEWORG', '')
      // commit('SET_SIGN', '')
      commit('SET_ROLES', [])
      removeToken()
      // removeSign()
      removeUid()
      removeUserName()
      removeViewOrg()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_UID', '')
      commit('SET_USERNAME', '')
      commit('SET_VIEWORG', '')
      // commit('SET_SIGN', '')
      commit('SET_ROLES', [])
      removeToken()
      // removeSign()
      removeUid()
      removeUserName()
      removeViewOrg()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
