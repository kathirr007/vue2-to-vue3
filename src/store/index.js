import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './modules/tasks'
import users from './modules/users'
import notifications from './modules/notifications'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: 'Task Manager Pro',
    isLoading: false,
    theme: 'light'
  },
  getters: {
    appTitle: state => state.appName,
    isLoading: state => state.isLoading,
    currentTheme: state => state.theme
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.isLoading = payload
    },
    SET_THEME(state, theme) {
      state.theme = theme
    }
  },
  actions: {
    toggleTheme({ commit, state }) {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      commit('SET_THEME', newTheme)
    }
  },
  modules: {
    tasks,
    users,
    notifications
  }
})
