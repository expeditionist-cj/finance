import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme, // 主题颜色
  showSettings: showSettings, // 是否显示setting
  tagsView: tagsView, //  
  fixedHeader: fixedHeader, // 固定头部
  sidebarLogo: sidebarLogo // 侧边栏显示
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

// 异步mutations
const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

