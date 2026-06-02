<template>
  <div class="profile-page">
    <h2>User Profile</h2>

    <div class="profile-card" v-if="currentUser">
      <div class="avatar">{{ currentUser.name.charAt(0).toUpperCase() }}</div>
      <div class="profile-info">
        <h3>{{ currentUser.name | capitalize }}</h3>
        <p>{{ currentUser.email }}</p>
        <span class="role-badge">{{ currentUser.role | capitalize }}</span>
      </div>
    </div>

    <div class="settings-section">
      <h3>Preferences</h3>
      <div class="setting-row">
        <label>Display Name</label>
        <input v-model="displayName" @blur="savePreferences" />
      </div>
      <div class="setting-row">
        <label>Email Notifications</label>
        <!-- v-model with value/checked (handling changes in Vue 3) -->
        <input type="checkbox" v-model="preferences.emailNotifications" @change="savePreferences" />
      </div>
      <div class="setting-row">
        <label>Tasks per page</label>
        <!-- v-model with number modifier -->
        <input type="number" v-model.number="preferences.tasksPerPage" min="5" max="50" @change="savePreferences" />
      </div>
    </div>

    <div class="team-section">
      <h3>Team Members</h3>
      <div class="team-list">
        <div v-for="user in allUsers" :key="user.id" class="team-member">
          <div class="member-avatar">{{ user.name.charAt(0) }}</div>
          <div class="member-info">
            <strong>{{ user.name }}</strong>
            <span>{{ user.role | capitalize }}</span>
          </div>
          <!-- $children access pattern (removed in Vue 3) -->
          <base-button
            variant="ghost"
            size="small"
            :ref="`userBtn_${user.id}`"
            @click="showUserTasks(user)"
          >
            View Tasks
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseButton from '../components/BaseButton.vue'

export default {
  name: 'UserProfile',
  components: { BaseButton },
  data() {
    return {
      displayName: '',
      preferences: {
        emailNotifications: true,
        tasksPerPage: 10
      }
    }
  },
  computed: {
    ...mapGetters('users', ['currentUser', 'allUsers'])
  },
  methods: {
    savePreferences() {
      // Simulate saving — uses this.$set pattern
      this.$set(this.preferences, 'lastSaved', new Date().toISOString())
      this.$bus.$emit('toast', { type: 'success', message: 'Preferences saved!' })
    },
    showUserTasks(user) {
      // Accessing $refs (works differently with v-for in Vue 3)
      const btnRef = this.$refs[`userBtn_${user.id}`]
      if (btnRef && btnRef[0]) {
        console.log('Button element:', btnRef[0].$el)
      }
      this.$router.push({ name: 'TaskList', query: { assignee: user.name.toLowerCase() } })
    }
  },
  watch: {
    currentUser: {
      immediate: true,
      handler(user) {
        if (user) {
          this.displayName = user.name
        }
      }
    }
  },
  // Accessing $children (removed in Vue 3)
  mounted() {
    console.log('Profile child components:', this.$children.length)
  }
}
</script>

<style scoped>
.profile-page {
  max-width: 800px;
}

.profile-page h2 {
  margin-bottom: 20px;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 24px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.profile-info h3 {
  margin-bottom: 4px;
}

.profile-info p {
  color: #666;
  font-size: 0.9rem;
}

.role-badge {
  display: inline-block;
  margin-top: 6px;
  padding: 3px 10px;
  background: #e8f0fd;
  color: #3498db;
  border-radius: 12px;
  font-size: 12px;
}

.settings-section,
.team-section {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 24px;
}

.settings-section h3,
.team-section h3 {
  margin-bottom: 16px;
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.setting-row:last-child {
  border-bottom: none;
}

.setting-row input[type="text"],
.setting-row input[type="number"] {
  width: 200px;
}

.team-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.team-member {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 6px;
  background: #f8f9fa;
}

.member-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.member-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.member-info span {
  font-size: 0.8rem;
  color: #666;
}
</style>
