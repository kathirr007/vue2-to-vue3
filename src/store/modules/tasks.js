import Vue from 'vue'

const state = {
  tasks: [],
  selectedTask: null,
  filter: 'all'
}

const getters = {
  allTasks: state => state.tasks,
  selectedTask: state => state.selectedTask,
  currentFilter: state => state.filter,
  filteredTasks: state => {
    switch (state.filter) {
      case 'active':
        return state.tasks.filter(t => !t.completed)
      case 'completed':
        return state.tasks.filter(t => t.completed)
      default:
        return state.tasks
    }
  },
  taskStats: state => ({
    total: state.tasks.length,
    completed: state.tasks.filter(t => t.completed).length,
    active: state.tasks.filter(t => !t.completed).length
  })
}

const mutations = {
  SET_TASKS(state, tasks) {
    state.tasks = tasks
  },
  ADD_TASK(state, task) {
    state.tasks.push(task)
  },
  UPDATE_TASK(state, updatedTask) {
    const index = state.tasks.findIndex(t => t.id === updatedTask.id)
    if (index !== -1) {
      // Vue.set for reactivity (not needed in Vue 3)
      Vue.set(state.tasks, index, updatedTask)
    }
  },
  DELETE_TASK(state, taskId) {
    state.tasks = state.tasks.filter(t => t.id !== taskId)
  },
  SET_SELECTED_TASK(state, task) {
    state.selectedTask = task
  },
  SET_FILTER(state, filter) {
    state.filter = filter
  },
  ADD_TAG_TO_TASK(state, { taskId, tag }) {
    const task = state.tasks.find(t => t.id === taskId)
    if (task) {
      // Vue.set for new array item reactivity
      if (!task.tags) {
        Vue.set(task, 'tags', [])
      }
      task.tags.push(tag)
    }
  },
  REMOVE_TAG_FROM_TASK(state, { taskId, tagIndex }) {
    const task = state.tasks.find(t => t.id === taskId)
    if (task && task.tags) {
      // Vue.delete for reactivity
      Vue.delete(task.tags, tagIndex)
    }
  }
}

const actions = {
  fetchTasks({ commit }) {
    // Simulate API call
    const mockTasks = [
      { id: 1, title: 'Set up project structure', description: 'Initialize the Vue project with proper folder structure', completed: true, priority: 'high', assignee: 'alice', createdAt: '2024-01-15', tags: ['setup', 'infrastructure'] },
      { id: 2, title: 'Implement authentication', description: 'Add login and registration functionality with JWT tokens', completed: false, priority: 'high', assignee: 'bob', createdAt: '2024-01-16', tags: ['auth', 'security'] },
      { id: 3, title: 'Design dashboard layout', description: 'Create responsive dashboard with widgets', completed: false, priority: 'medium', assignee: 'alice', createdAt: '2024-01-17', tags: ['ui', 'design'] },
      { id: 4, title: 'Write unit tests', description: 'Add unit tests for core business logic', completed: false, priority: 'low', assignee: 'charlie', createdAt: '2024-01-18', tags: ['testing'] },
      { id: 5, title: 'API integration', description: 'Connect frontend to backend REST API', completed: true, priority: 'high', assignee: 'bob', createdAt: '2024-01-19', tags: ['api', 'integration'] }
    ]
    commit('SET_TASKS', mockTasks)
  },
  addTask({ commit }, task) {
    const newTask = {
      ...task,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
      tags: task.tags || []
    }
    commit('ADD_TASK', newTask)
  },
  updateTask({ commit }, task) {
    commit('UPDATE_TASK', task)
  },
  deleteTask({ commit }, taskId) {
    commit('DELETE_TASK', taskId)
  },
  toggleTask({ commit, state }, taskId) {
    const task = state.tasks.find(t => t.id === taskId)
    if (task) {
      commit('UPDATE_TASK', { ...task, completed: !task.completed })
    }
  },
  setFilter({ commit }, filter) {
    commit('SET_FILTER', filter)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
