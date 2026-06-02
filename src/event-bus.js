import Vue from 'vue'

// Event bus pattern (removed in Vue 3 — needs mitt or tiny-emitter)
export const eventBus = new Vue()
