<template>
  <div class="notification-badge" @click="toggleDropdown">
    <span class="bell">&#128276;</span>
    <span v-if="count > 0" class="badge">{{ count }}</span>
    <div v-show="showDropdown" class="dropdown">
      <div class="dropdown-header">
        <span>Notifications</span>
        <button @click.stop="markAllRead">Mark all read</button>
      </div>
      <div v-if="notifications.length === 0" class="empty">
        No notifications
      </div>
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification-item"
        :class="{ unread: !notification.read }"
        @click.stop="markRead(notification.id)"
      >
        <span class="type-badge" :class="notification.type">{{ notification.type }}</span>
        {{ notification.message | truncate(40) }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NotificationBadge',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    ...mapGetters('notifications', {
      notifications: 'allNotifications'
    })
  },
  methods: {
    ...mapActions('notifications', ['markRead', 'markAllRead']),
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    }
  },
  // beforeDestroy (renamed to beforeUnmount in Vue 3)
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown)
  },
  mounted() {
    this.closeDropdown = (e) => {
      if (!this.$el.contains(e.target)) {
        this.showDropdown = false
      }
    }
    document.addEventListener('click', this.closeDropdown)
  }
}
</script>

<style scoped>
.notification-badge {
  position: relative;
  cursor: pointer;
}

.bell {
  font-size: 1.2rem;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  color: #333;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
}

.dropdown-header button {
  font-size: 12px;
  padding: 4px 8px;
}

.notification-item {
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
}

.notification-item.unread {
  background-color: #f0f8ff;
}

.type-badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  text-transform: uppercase;
  margin-right: 5px;
}

.type-badge.error { background: #fde8e8; color: #e74c3c; }
.type-badge.success { background: #e8fde8; color: #27ae60; }
.type-badge.info { background: #e8f0fd; color: #3498db; }

.empty {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>
