import Vue from 'vue'

const state = {
  notifications: [],
  nextId: 1
}

const getters = {
  allNotifications: state => state.notifications,
  unreadCount: state => state.notifications.filter(n => !n.read).length
}

const mutations = {
  ADD_NOTIFICATION(state, notification) {
    state.notifications.unshift({
      ...notification,
      id: state.nextId++,
      read: false,
      createdAt: new Date().toISOString()
    })
  },
  MARK_READ(state, notificationId) {
    const notification = state.notifications.find(n => n.id === notificationId)
    if (notification) {
      // Vue.set for reactivity on existing object property change
      Vue.set(notification, 'read', true)
    }
  },
  MARK_ALL_READ(state) {
    state.notifications.forEach(n => {
      Vue.set(n, 'read', true)
    })
  },
  REMOVE_NOTIFICATION(state, notificationId) {
    state.notifications = state.notifications.filter(n => n.id !== notificationId)
  }
}

const actions = {
  notify({ commit }, { type, message }) {
    commit('ADD_NOTIFICATION', { type, message })
  },
  markRead({ commit }, notificationId) {
    commit('MARK_READ', notificationId)
  },
  markAllRead({ commit }) {
    commit('MARK_ALL_READ')
  },
  dismiss({ commit }, notificationId) {
    commit('REMOVE_NOTIFICATION', notificationId)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
