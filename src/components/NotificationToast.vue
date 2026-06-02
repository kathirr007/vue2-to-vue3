<template>
  <!-- transition-group (behavior changes in Vue 3 — no longer renders wrapper) -->
  <transition-group name="toast" tag="div" class="toast-container">
    <div
      v-for="toast in activeToasts"
      :key="toast.id"
      class="toast"
      :class="toast.type"
    >
      <span>{{ toast.message }}</span>
      <button @click="dismiss(toast.id)">&times;</button>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'NotificationToast',
  data() {
    return {
      activeToasts: []
    }
  },
  created() {
    // Event bus usage (needs replacement in Vue 3)
    this.$bus.$on('toast', this.showToast)
  },
  // beforeDestroy (renamed in Vue 3)
  beforeDestroy() {
    this.$bus.$off('toast', this.showToast)
  },
  methods: {
    showToast({ type, message, duration = 3000 }) {
      const id = Date.now()
      this.activeToasts.push({ id, type, message })
      setTimeout(() => {
        this.dismiss(id)
      }, duration)
    },
    dismiss(id) {
      this.activeToasts = this.activeToasts.filter(t => t.id !== id)
    }
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-radius: 6px;
  min-width: 280px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  color: white;
}

.toast.success { background-color: #27ae60; }
.toast.error { background-color: #e74c3c; }
.toast.info { background-color: #3498db; }
.toast.warning { background-color: #f39c12; }

.toast button {
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  padding: 0 5px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
