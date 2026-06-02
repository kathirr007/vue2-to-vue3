<template>
  <div
    class="task-card"
    :class="{ completed: task.completed }"
    @click="$emit('select', task)"
  >
    <div class="task-header">
      <h3>{{ task.title | capitalize }}</h3>
      <span class="priority" :class="task.priority">{{ task.priority }}</span>
    </div>
    <p class="description">{{ task.description | truncate(80) }}</p>
    <div class="task-meta">
      <span class="date">{{ task.createdAt | dateFormat }}</span>
      <span class="assignee">{{ task.assignee | capitalize }}</span>
    </div>
    <div class="task-tags" v-if="task.tags && task.tags.length">
      <span v-for="(tag, index) in task.tags" :key="index" class="tag">
        {{ tag }}
      </span>
    </div>
    <div class="task-actions">
      <button class="primary" @click.stop="$emit('toggle', task.id)">
        {{ task.completed ? 'Reopen' : 'Complete' }}
      </button>
      <button class="danger" @click.stop="$emit('delete', task.id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  debugLog: true
}
</script>

<style scoped>
.task-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.1s;
}

.task-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-1px);
}

.task-card.completed {
  opacity: 0.7;
  border-left: 4px solid #27ae60;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.task-header h3 {
  font-size: 1rem;
  margin: 0;
}

.priority {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: bold;
}

.priority.high { background: #fde8e8; color: #e74c3c; }
.priority.medium { background: #fef3e2; color: #f39c12; }
.priority.low { background: #e8fde8; color: #27ae60; }

.description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 8px;
}

.task-tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.tag {
  background: #ecf0f1;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  color: #555;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.task-actions button {
  font-size: 12px;
  padding: 5px 12px;
}
</style>
