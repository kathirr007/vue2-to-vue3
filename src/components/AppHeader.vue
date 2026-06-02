<template>
  <header class="app-header">
    <div class="header-left">
      <h1>{{ title }}</h1>
      <nav>
        <router-link to="/">Dashboard</router-link>
        <router-link to="/tasks">Tasks</router-link>
        <router-link to="/profile">Profile</router-link>
      </nav>
    </div>
    <div class="header-right">
      <notification-badge :count="unreadCount" />
      <button class="secondary" @click="toggleTheme">
        {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
      </button>
      <button class="danger" @click="$emit('logout')">Logout</button>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import NotificationBadge from './NotificationBadge.vue'

export default {
  name: 'AppHeader',
  components: {
    NotificationBadge
  },
  props: {
    title: {
      type: String,
      required: true
    },
    // .sync modifier usage (replaced by v-model:propName in Vue 3)
    theme: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('notifications', ['unreadCount'])
  },
  methods: {
    toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light'
      // .sync modifier emits update:propName
      this.$emit('update:theme', newTheme)
      this.$store.dispatch('toggleTheme')
    }
  }
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 30px;
}

.header-left h1 {
  font-size: 1.3rem;
}

nav {
  display: flex;
  gap: 15px;
}

nav a {
  color: #bdc3c7;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: color 0.2s;
}

nav a:hover,
nav a.router-link-active {
  color: white;
  background-color: rgba(255,255,255,0.1);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
