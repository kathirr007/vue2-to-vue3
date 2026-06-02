# Vue 2 to Vue 3 Migration Challenge

## Overview

This is a **Task Manager** application built with Vue 2 that contains intentional usage of Vue 2 patterns and APIs that are **breaking changes** in Vue 3. The goal is to migrate this app to Vue 3 + Vue Router 4 + Vuex 4 (or Pinia) while maintaining all functionality.

## Vue 2 Patterns Used (Migration Points)

### 1. Global Filters (`src/main.js`, `src/filters.js`)
- `Vue.filter()` global registration
- Template filter syntax: `{{ value | filterName }}`
- **Vue 3:** Filters are removed. Convert to methods, computed properties, or global properties.

### 2. Event Bus (`src/event-bus.js`, multiple components)
- `new Vue()` as event bus
- `Vue.prototype.$bus` global attachment
- `$bus.$on()`, `$bus.$off()`, `$bus.$emit()` usage
- **Vue 3:** Use `mitt` or `tiny-emitter` library, or refactor to props/provide-inject.

### 3. Mixins (`src/mixins/`)
- `validationMixin.js` — form validation logic
- `paginationMixin.js` — pagination logic
- **Vue 3:** Convert to Composition API composables (`useValidation`, `usePagination`).

### 4. Vue.set / Vue.delete (`src/store/modules/tasks.js`, `src/mixins/validationMixin.js`)
- `Vue.set(obj, key, value)` for reactive property addition
- `Vue.delete(obj, key)` for reactive property deletion
- **Vue 3:** No longer needed — Vue 3's reactivity system (Proxy-based) handles this automatically.

### 5. .sync Modifier (`src/App.vue`, `src/components/BaseModal.vue`)
- `:prop.sync="value"` pattern
- `$emit('update:propName')` pattern
- **Vue 3:** Use `v-model:propName` instead.

### 6. $listeners and inheritAttrs (`src/components/BaseButton.vue`, `src/components/BaseModal.vue`)
- `v-on="$listeners"` for transparent wrappers
- `v-bind="$attrs"` + `inheritAttrs: false`
- **Vue 3:** `$listeners` is removed — listeners are part of `$attrs` now.

### 7. Functional Components (`src/components/TaskStats.vue`)
- `functional: true` option
- `<template functional>` syntax
- `props.xxx` access pattern
- **Vue 3:** Functional component syntax is completely different (just a plain function).

### 8. Lifecycle Hook Naming (`multiple components`)
- `beforeDestroy` used throughout
- **Vue 3:** Renamed to `beforeUnmount`.

### 9. Transition Classes (`src/App.vue`, `src/components/NotificationToast.vue`)
- `.v-enter` / `.v-leave` class naming
- `<transition-group>` with `tag` attribute behavior
- **Vue 3:** Renamed to `.v-enter-from` / `.v-leave-from`.

### 10. Vue Router Changes (`src/router/index.js`)
- `new VueRouter()` instantiation
- `mode: 'history'`
- Catch-all route `path: '*'`
- **Vue 3/Router 4:** `createRouter()`, `createWebHistory()`, catch-all is `/:pathMatch(.*)*`.

### 11. Vuex Changes (`src/store/index.js`)
- `Vue.use(Vuex)` plugin registration
- `new Vuex.Store()` instantiation
- **Vue 3/Vuex 4:** `createStore()`, or migrate to Pinia.

### 12. v-model on Components (`src/components/TaskForm.vue`)
- `value` prop + `input` event pattern
- **Vue 3:** `modelValue` prop + `update:modelValue` event.

### 13. $children Access (`src/views/UserProfile.vue`)
- `this.$children` to access child component instances
- **Vue 3:** Removed. Use `$refs` or provide/inject.

### 14. $refs with v-for (`src/views/UserProfile.vue`)
- Dynamic ref naming with v-for: `$refs['name_' + id]`
- Returns array in Vue 2
- **Vue 3:** Ref behavior in v-for changed — use function refs.

### 15. Global Mixin (`src/main.js`)
- `Vue.mixin()` for cross-cutting concerns
- **Vue 3:** Use `app.mixin()` (discouraged) or composables.

### 16. Vue.config.productionTip (`src/main.js`)
- **Vue 3:** Removed entirely.

### 17. Render Function / Mount (`src/main.js`)
- `new Vue({ render: h => h(App) }).$mount('#app')`
- **Vue 3:** `createApp(App).mount('#app')`.

---

## Evaluation Criteria

| Category | Points | What to Look For |
|----------|--------|------------------|
| App boots and runs | 10 | No console errors, all routes work |
| Filters migrated | 10 | All 4 filters converted properly |
| Event bus replaced | 15 | mitt/emitter or refactored away |
| Mixins → Composables | 15 | Clean composable implementations |
| Vue.set/delete removed | 5 | Reactivity works without them |
| .sync → v-model | 10 | All .sync props converted |
| $listeners removed | 5 | Transparent wrappers still work |
| Functional components | 5 | TaskStats renders correctly |
| Lifecycle hooks renamed | 5 | beforeDestroy → beforeUnmount |
| Router migrated | 10 | All routes work with Router 4 |
| Vuex/Pinia migrated | 10 | State management functional |
| **Total** | **100** | |

## Bonus Points

- Convert Options API to Composition API (+20)
- Add TypeScript (+15)
- Replace Vuex with Pinia (+10)
- Add `<script setup>` syntax (+10)

## Getting Started

```bash
npm install
npm run serve
```

## Time Limit

Recommended: **2-4 hours** depending on depth of migration.
