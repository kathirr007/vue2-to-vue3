<template>
  <div class="task-detail" v-if="task">
    <div class="detail-header">
      <button class="secondary" @click="$router.back()">&#8592; Back</button>
      <h2>{{ task.title | capitalize }}</h2>
    </div>

    <div class="detail-card">
      <div class="detail-row">
        <strong>Status:</strong>
        <span :class="['status', task.completed ? 'done' : 'active']">
          {{ task.completed ? 'Completed' : 'In Progress' }}
        </span>
      </div>
      <div class="detail-row">
        <strong>Priority:</strong>
        <span class="priority" :class="task.priority">{{ task.priority | capitalize }}</span>
      </div>
      <div class="detail-row">
        <strong>Assignee:</strong>
        {{ task.assignee | capitalize }}
      </div>
      <div class="detail-row">
        <strong>Created:</strong>
        {{ task.createdAt | dateFormat }}
      </div>
      <div class="detail-row">
        <strong>Description:</strong>
        <p>{{ task.description }}</p>
      </div>
      <div class="detail-row" v-if="task.tags && task.tags.length">
        <strong>Tags:</strong>
        <div class="tags">
          <span v-for="(tag, i) in task.tags" :key="i" class="tag">
            {{ tag }}
            <button class="remove-tag" @click="removeTag(i)">&times;</button>
          </span>
          <input
            v-model="newTag"
            placeholder="Add tag..."
            @keyup.enter="addTag"
            class="tag-input"
          />
        </div>
      </div>

      <div class="detail-actions">
        <base-button variant="primary" @click="showEditModal = true">Edit</base-button>
        <base-button
          :variant="task.completed ? 'secondary' : 'primary'"
          @click="handleToggle"
        >
          {{ task.completed ? 'Reopen' : 'Mark Complete' }}
        </base-button>
        <base-button variant="danger" @click="handleDelete">Delete</base-button>
      </div>
    </div>

    <!-- Edit modal -->
    <base-modal :visible.sync="showEditModal">
      <template #title>Edit Task</template>
      <task-form :value="task" @submit="handleUpdate" @cancel="showEditModal = false" />
    </base-modal>
  </div>
  <div v-else class="not-found">
    <p>Task not found.</p>
    <router-link to="/tasks">Back to Tasks</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseButton from '../components/BaseButton.vue'
import BaseModal from '../components/BaseModal.vue'
import TaskForm from '../components/TaskForm.vue'

export default {
  name: 'TaskDetail',
  components: {
    BaseButton,
    BaseModal,
    TaskForm
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      showEditModal: false,
      newTag: ''
    }
  },
  computed: {
    ...mapGetters('tasks', ['allTasks']),
    task() {
      return this.allTasks.find(t => t.id === Number(this.id))
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask', 'toggleTask']),
    handleToggle() {
      this.toggleTask(this.task.id)
      this.$bus.$emit('task-updated', this.task)
      this.$bus.$emit('toast', {
        type: 'success',
        message: `Task ${this.task.completed ? 'reopened' : 'completed'}!`
      })
    },
    handleUpdate(updatedTask) {
      this.updateTask({ ...updatedTask, id: this.task.id })
      this.showEditModal = false
      this.$bus.$emit('task-updated', updatedTask)
      this.$bus.$emit('toast', { type: 'success', message: 'Task updated!' })
    },
    handleDelete() {
      this.deleteTask(this.task.id)
      this.$bus.$emit('toast', { type: 'info', message: 'Task deleted' })
      this.$router.push('/tasks')
    },
    addTag() {
      if (this.newTag.trim()) {
        this.$store.commit('tasks/ADD_TAG_TO_TASK', {
          taskId: this.task.id,
          tag: this.newTag.trim()
        })
        this.newTag = ''
      }
    },
    removeTag(index) {
      this.$store.commit('tasks/REMOVE_TAG_FROM_TASK', {
        taskId: this.task.id,
        tagIndex: index
      })
    }
  },
  // Multi-root template (not allowed in Vue 2 without a wrapper —
  // but this uses v-if/v-else which is fine. In Vue 3, multi-root is allowed)
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.task) {
        vm.$bus.$emit('toast', { type: 'error', message: 'Task not found' })
      }
    })
  }
}
</script>

<style scoped>
.task-detail {
  max-width: 800px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.detail-card {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.detail-row {
  margin-bottom: 16px;
}

.detail-row strong {
  display: inline-block;
  min-width: 100px;
}

.status {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
}

.status.done { background: #e8fde8; color: #27ae60; }
.status.active { background: #e8f0fd; color: #3498db; }

.priority {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
}

.priority.high { background: #fde8e8; color: #e74c3c; }
.priority.medium { background: #fef3e2; color: #f39c12; }
.priority.low { background: #e8fde8; color: #27ae60; }

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.tag {
  background: #ecf0f1;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.remove-tag {
  background: none;
  border: none;
  color: #999;
  font-size: 14px;
  padding: 0 2px;
  cursor: pointer;
}

.tag-input {
  width: 120px;
  padding: 4px 8px;
  font-size: 12px;
}

.detail-actions {
  display: flex;
  gap: 10px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.not-found a {
  color: #3498db;
}
</style>
