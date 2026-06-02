<template functional>
  <!-- Functional component via template (syntax removed in Vue 3) -->
  <div class="task-stats">
    <div class="stat">
      <span class="stat-value">{{ props.stats.total }}</span>
      <span class="stat-label">Total</span>
    </div>
    <div class="stat">
      <span class="stat-value">{{ props.stats.active }}</span>
      <span class="stat-label">Active</span>
    </div>
    <div class="stat">
      <span class="stat-value">{{ props.stats.completed }}</span>
      <span class="stat-label">Done</span>
    </div>
    <div class="stat">
      <span class="stat-value">{{ props.stats.total > 0 ? Math.round((props.stats.completed / props.stats.total) * 100) : 0 }}%</span>
      <span class="stat-label">Progress</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskStats',
  // functional: true (removed in Vue 3)
  functional: true,
  props: {
    stats: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.task-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e0e0e0;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
}

.stat-label {
  display: block;
  font-size: 0.85rem;
  color: #999;
  margin-top: 4px;
}
</style>
