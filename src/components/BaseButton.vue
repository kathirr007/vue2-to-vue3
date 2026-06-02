<template>
  <!-- $listeners usage for transparent wrapper (removed in Vue 3) -->
  <button
    class="base-button"
    :class="[variant, size, { loading }]"
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="loading || disabled"
  >
    <span v-if="loading" class="spinner"></span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  // In Vue 3, $attrs includes listeners, inheritAttrs works differently
  inheritAttrs: false,
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: v => ['primary', 'secondary', 'danger', 'ghost'].includes(v)
    },
    size: {
      type: String,
      default: 'medium',
      validator: v => ['small', 'medium', 'large'].includes(v)
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.base-button.small { padding: 4px 10px; font-size: 12px; }
.base-button.medium { padding: 8px 16px; font-size: 14px; }
.base-button.large { padding: 12px 24px; font-size: 16px; }

.base-button.primary { background: #3498db; color: white; }
.base-button.primary:hover { background: #2980b9; }
.base-button.secondary { background: #95a5a6; color: white; }
.base-button.danger { background: #e74c3c; color: white; }
.base-button.ghost { background: transparent; color: #3498db; border: 1px solid #3498db; }

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-button.loading {
  pointer-events: none;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
