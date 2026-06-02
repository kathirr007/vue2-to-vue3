<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <task-stats :stats="taskStats" />

    <div class="dashboard-grid">
      <div class="card">
        <h3>Recent Tasks</h3>
        <ul class="recent-list">
          <li v-for="task in recentTasks" :key="task.id">
            <router-link :to="{ name: 'TaskDetail', params: { id: task.id } }">
              {{ task.title | capitalize }}
            </router-link>
            <span class="date">{{ task.createdAt | dateFormat }}</span>
          </li>
        </ul>
      </div>

      <div class="card">
        <h3>Quick Add</h3>
        <form @submit.prevent="quickAdd">
          <input v-model="quickTitle" placeholder="Quick add task..." />
          <base-button type="submit" variant="primary" size="small" style="margin-top: 8px;">
            Add
          </base-button>
        </form>
      </div>

      <div class="card">
        <h3>Activity Feed</h3>
        <div class="activity-feed">
          <div
            v-for="(activity, index) in activityFeed"
            :key="index"
            class="activity-item"
          >
            <span class="activity-dot" :class="activity.type"></span>
            {{ activity.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TaskStats from '../components/TaskStats.vue'
import BaseButton from '../components/BaseButton.vue'

export default {
  name: 'Dashboard',
  components: {
    TaskStats,
    BaseButton
  },
  data() {
    return {
      quickTitle: '',
      activityFeed: []
    }
  },
  computed: {
    ...mapGetters('tasks', ['allTasks', 'taskStats']),
    recentTasks() {
      return [...this.allTasks]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    quickAdd() {
      if (this.quickTitle.trim()) {
        this.addTask({
          title: this.quickTitle,
          description: 'Quick task',
          priority: 'medium',
          assignee: ''
        })
        this.$bus.$emit('toast', { type: 'success', message: 'Task added!' })
        this.quickTitle = ''
        this.activityFeed.unshift({
          type: 'success',
          message: `Task "${this.quickTitle || 'New task'}" created`
        })
      }
    }
  },
  created() {
    // Event bus listener
    this.$bus.$on('task-updated', (task) => {
      this.activityFeed.unshift({
        type: 'info',
        message: `Task "${task.title}" was updated`
      })
    })
  },
  // beforeDestroy (renamed in Vue 3)
  beforeDestroy() {
    this.$bus.$off('task-updated')
  }
}
</script>

<style scoped>
.dashboard h2 {
  margin-bottom: 20px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.card h3 {
  margin-bottom: 15px;
  font-size: 1rem;
}

.recent-list {
  list-style: none;
  padding: 0;
}

.recent-list li {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.recent-list li:last-child {
  border-bottom: none;
}

.recent-list a {
  color: #3498db;
  text-decoration: none;
}

.recent-list .date {
  font-size: 0.8rem;
  color: #999;
}

.activity-feed {
  max-height: 200px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  font-size: 0.85rem;
}

.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.activity-dot.success { background: #27ae60; }
.activity-dot.info { background: #3498db; }
.activity-dot.error { background: #e74c3c; }
</style>
