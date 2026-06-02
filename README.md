# Vue 2 to Vue 3 Migration Challenge

A Task Manager application built with Vue 2 designed to evaluate a candidate's ability to migrate from Vue 2 to Vue 3.

## Tech Stack

- **Vue** 2.6
- **Vue Router** 3.x
- **Vuex** 3.x
- **Vue CLI** 5.x

## Getting Started

```bash
npm install
npm run serve
```

The app will be available at `http://localhost:8080`. Use any username/password (min 3 characters each) to log in.

## Project Structure

```
src/
├── main.js                     # App entry — global filters, event bus, mixins
├── App.vue                     # Root component with .sync, transitions
├── event-bus.js                # Event bus (new Vue())
├── filters.js                  # Global filters (currency, capitalize, truncate, dateFormat)
├── mixins/
│   ├── validationMixin.js      # Form validation with Vue.set/Vue.delete
│   └── paginationMixin.js      # Pagination logic
├── store/
│   ├── index.js                # Vuex store with modules
│   └── modules/
│       ├── tasks.js            # Task CRUD with Vue.set/Vue.delete
│       ├── users.js            # User authentication
│       └── notifications.js    # Notification system
├── router/
│   └── index.js                # Vue Router with guards, catch-all route
├── components/
│   ├── AppHeader.vue           # .sync modifier for theme
│   ├── BaseButton.vue          # $listeners, inheritAttrs
│   ├── BaseModal.vue           # $listeners, $attrs, .sync
│   ├── TaskCard.vue            # Template filters, custom option
│   ├── TaskForm.vue            # v-model (value/input), mixins
│   ├── TaskStats.vue           # Functional component
│   ├── NotificationBadge.vue   # Filters in template, beforeDestroy
│   ├── NotificationToast.vue   # Event bus, transition-group
│   ├── ConfirmDialog.vue       # .sync computed wrapper
│   └── PaginationControls.vue  # Mixin consumer
└── views/
    ├── Login.vue               # Event bus emit, validation mixin
    ├── Dashboard.vue           # Event bus listeners, filters
    ├── TaskList.vue            # .sync modals, pagination
    ├── TaskDetail.vue          # beforeRouteEnter, filters, tags
    └── UserProfile.vue         # $children, $refs with v-for
```

## Migration Points

This app intentionally uses **17 Vue 2 patterns** that are breaking changes in Vue 3:

| # | Pattern | Location |
|---|---------|----------|
| 1 | Global filters (`Vue.filter`) | `main.js`, templates |
| 2 | Event bus (`new Vue()`) | `event-bus.js`, multiple components |
| 3 | Mixins | `mixins/` directory |
| 4 | `Vue.set` / `Vue.delete` | Store modules, validation mixin |
| 5 | `.sync` modifier | `App.vue`, `BaseModal.vue` |
| 6 | `$listeners` | `BaseButton.vue`, `BaseModal.vue` |
| 7 | Functional components (`functional: true`) | `TaskStats.vue` |
| 8 | `beforeDestroy` lifecycle hook | Multiple components |
| 9 | Transition class names (`.v-enter`) | CSS transitions |
| 10 | Vue Router 3 API | `router/index.js` |
| 11 | Vuex 3 API (`Vue.use`, `new Vuex.Store`) | `store/index.js` |
| 12 | `v-model` (`value` prop + `input` event) | `TaskForm.vue` |
| 13 | `$children` | `UserProfile.vue` |
| 14 | `$refs` with `v-for` | `UserProfile.vue` |
| 15 | Global mixin (`Vue.mixin`) | `main.js` |
| 16 | `Vue.config.productionTip` | `main.js` |
| 17 | `new Vue().$mount()` | `main.js` |

## Evaluation

See [MIGRATION_CHALLENGE.md](MIGRATION_CHALLENGE.md) for the full scoring rubric (100 base points + 55 bonus).

### Target Stack After Migration

- Vue 3.x
- Vue Router 4.x
- Vuex 4.x or Pinia
- Composition API (bonus)
- TypeScript (bonus)

### Recommended Time

2-4 hours depending on depth of migration.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run serve` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Lint source files |
