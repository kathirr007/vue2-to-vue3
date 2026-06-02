<template>
  <div class="task-form">
    <h2>{{ isEditing ? 'Edit Task' : 'New Task' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group" :class="{ error: hasError('title') }">
        <label>Title</label>
        <input v-model="form.title" placeholder="Task title" />
        <span v-if="hasError('title')" class="error-msg">{{ errors.title }}</span>
      </div>

      <div class="form-group" :class="{ error: hasError('description') }">
        <label>Description</label>
        <textarea v-model="form.description" rows="3" placeholder="Task description"></textarea>
        <span v-if="hasError('description')" class="error-msg">{{ errors.description }}</span>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Priority</label>
          <select v-model="form.priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div class="form-group">
          <label>Assignee</label>
          <select v-model="form.assignee">
            <option value="">Select assignee</option>
            <option v-for="user in users" :key="user.id" :value="user.name.toLowerCase()">
              {{ user.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Tags (comma separated)</label>
        <input v-model="tagInput" placeholder="e.g. bug, urgent, frontend" />
      </div>

      <div class="form-actions">
        <button type="submit" class="primary">{{ isEditing ? 'Update' : 'Create' }}</button>
        <button type="button" class="secondary" @click="$emit('cancel')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import validationMixin from '../mixins/validationMixin'

export default {
  name: 'TaskForm',
  // Mixins (should become composables in Vue 3)
  mixins: [validationMixin],
  props: {
    // v-model usage (multi-root v-model changes in Vue 3)
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        priority: 'medium',
        assignee: '',
        ...this.value
      },
      tagInput: (this.value.tags || []).join(', ')
    }
  },
  computed: {
    ...mapGetters('users', { users: 'allUsers' }),
    isEditing() {
      return !!this.value.id
    }
  },
  watch: {
    // Deep watcher on prop
    value: {
      handler(newVal) {
        this.form = { ...this.form, ...newVal }
        this.tagInput = (newVal.tags || []).join(', ')
      },
      deep: true
    }
  },
  methods: {
    handleSubmit() {
      this.clearErrors()

      const titleValid = this.validateRequired('title', this.form.title)
      const descValid = this.validateMinLength('description', this.form.description, 10)

      if (titleValid && descValid) {
        const task = {
          ...this.form,
          tags: this.tagInput.split(',').map(t => t.trim()).filter(Boolean)
        }
        // v-model emit (pattern changes in Vue 3)
        this.$emit('input', task)
        this.$emit('submit', task)
      }
    }
  }
}
</script>

<style scoped>
.task-form {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.task-form h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-group.error input,
.form-group.error textarea {
  border-color: #e74c3c;
}

.error-msg {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 4px;
  display: block;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
