<template>
  <div class="task-list-page">
    <div class="page-header">
      <h2>Tasks</h2>
      <base-button variant="primary" @click="showForm = true">
        + New Task
      </base-button>
    </div>

    <!-- Filter tabs -->
    <div class="filter-tabs">
      <button
        v-for="f in filters"
        :key="f.value"
        :class="['filter-btn', { active: currentFilter === f.value }]"
        @click="setFilter(f.value)"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- Search -->
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search tasks..." />
    </div>

    <!-- Task cards -->
    <div class="task-grid">
      <task-card
        v-for="task in displayedTasks"
        :key="task.id"
        :task="task"
        @select="viewTask"
        @toggle="toggleTask"
        @delete="confirmDelete"
      />
    </div>

    <p v-if="displayedTasks.length === 0" class="empty-state">
      No tasks found. Create one to get started!
    </p>

    <!-- Pagination -->
    <pagination-controls
      :total="searchedTasks.length"
      :per-page="pageSize"
      @page-change="handlePageChange"
    />

    <!-- New task modal -->
    <base-modal :visible.sync="showForm" @close="showForm = false">
      <template #title>Create Task</template>
      <task-form
        v-model="newTask"
        @submit="handleCreateTask"
        @cancel="showForm = false"
      />
    </base-modal>

    <!-- Confirm delete dialog -->
    <confirm-dialog
      :visible.sync="showDeleteConfirm"
      title="Delete Task"
      message="Are you sure you want to delete this task? This action cannot be undone."
      @confirm="handleDelete"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TaskCard from '../components/TaskCard.vue'
import TaskForm from '../components/TaskForm.vue'
import BaseModal from '../components/BaseModal.vue'
import BaseButton from '../components/BaseButton.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import PaginationControls from '../components/PaginationControls.vue'

export default {
  name: 'TaskList',
  components: {
    TaskCard,
    TaskForm,
    BaseModal,
    BaseButton,
    ConfirmDialog,
    PaginationControls
  },
  data() {
    return {
      showForm: false,
      showDeleteConfirm: false,
      taskToDelete: null,
      searchQuery: '',
      newTask: {},
      pageSize: 5,
      currentPage: 1,
      filters: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' }
      ]
    }
  },
  computed: {
    ...mapGetters('tasks', ['filteredTasks', 'currentFilter']),
    searchedTasks() {
      if (!this.searchQuery) return this.filteredTasks
      const q = this.searchQuery.toLowerCase()
      return this.filteredTasks.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      )
    },
    displayedTasks() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.searchedTasks.slice(start, start + this.pageSize)
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask', 'deleteTask', 'toggleTask', 'setFilter']),
    viewTask(task) {
      this.$router.push({ name: 'TaskDetail', params: { id: task.id } })
    },
    handleCreateTask(task) {
      this.addTask(task)
      this.showForm = false
      this.newTask = {}
      this.$bus.$emit('toast', { type: 'success', message: 'Task created successfully!' })
    },
    confirmDelete(taskId) {
      this.taskToDelete = taskId
      this.showDeleteConfirm = true
    },
    handleDelete() {
      if (this.taskToDelete) {
        this.deleteTask(this.taskToDelete)
        this.taskToDelete = null
        this.$bus.$emit('toast', { type: 'info', message: 'Task deleted' })
      }
    },
    handlePageChange(page) {
      this.currentPage = page
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.filter-btn {
  padding: 6px 16px;
  border-radius: 20px;
  background: #ecf0f1;
  border: none;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.filter-btn.active {
  background: #3498db;
  color: white;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  max-width: 400px;
}

.task-grid {
  display: grid;
  gap: 12px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
}
</style>
