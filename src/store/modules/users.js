const state = {
  currentUser: null,
  users: []
}

const getters = {
  currentUser: state => state.currentUser,
  allUsers: state => state.users,
  isAuthenticated: state => !!state.currentUser
}

const mutations = {
  SET_CURRENT_USER(state, user) {
    state.currentUser = user
  },
  SET_USERS(state, users) {
    state.users = users
  }
}

const actions = {
  login({ commit }, credentials) {
    // Simulate login
    const user = {
      id: 1,
      name: credentials.username,
      email: `${credentials.username}@example.com`,
      role: 'admin'
    }
    commit('SET_CURRENT_USER', user)
    return user
  },
  logout({ commit }) {
    commit('SET_CURRENT_USER', null)
  },
  fetchUsers({ commit }) {
    const mockUsers = [
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'developer' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'designer' }
    ]
    commit('SET_USERS', mockUsers)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
