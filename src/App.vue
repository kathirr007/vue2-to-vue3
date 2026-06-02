<template>
  <div id="app" :class="['app-container', themeClass]">
    <app-header
      v-if="isAuthenticated"
      :title="appTitle"
      :theme.sync="currentTheme"
      @logout="handleLogout"
    />
    <main class="main-content">
      <!-- transition mode (behavior changes in Vue 3) -->
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
    <notification-toast />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppHeader from './components/AppHeader.vue'
import NotificationToast from './components/NotificationToast.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    NotificationToast
  },
  computed: {
    ...mapGetters(['appTitle', 'currentTheme']),
    ...mapGetters('users', ['isAuthenticated']),
    themeClass() {
      return `theme-${this.currentTheme}`
    }
  },
  methods: {
    ...mapActions('users', ['logout']),
    handleLogout() {
      this.logout()
      this.$router.push('/login')
    }
  },
  // beforeDestroy lifecycle hook (renamed in Vue 3)
  beforeDestroy() {
    this.$bus.$off('global-error')
  },
  created() {
    this.$bus.$on('global-error', (error) => {
      this.$store.dispatch('notifications/notify', {
        type: 'error',
        message: error.message
      })
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

.app-container {
  min-height: 100vh;
}

.theme-light {
  background-color: #f5f7fa;
  color: #2c3e50;
}

.theme-dark {
  background-color: #1a1a2e;
  color: #eaeaea;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

button {
  cursor: pointer;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.2s;
}

button.primary {
  background-color: #3498db;
  color: white;
}

button.primary:hover {
  background-color: #2980b9;
}

button.danger {
  background-color: #e74c3c;
  color: white;
}

button.danger:hover {
  background-color: #c0392b;
}

button.secondary {
  background-color: #95a5a6;
  color: white;
}

input, textarea, select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
}

.theme-dark input,
.theme-dark textarea,
.theme-dark select {
  background-color: #2d2d44;
  border-color: #444;
  color: #eaeaea;
}
</style>
