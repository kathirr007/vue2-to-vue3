<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Task Manager Pro</h1>
      <p class="subtitle">Sign in to continue</p>
      <form @submit.prevent="handleLogin">
        <div class="form-group" :class="{ error: hasError('username') }">
          <label>Username</label>
          <input
            v-model="credentials.username"
            placeholder="Enter username"
            autofocus
          />
          <span v-if="hasError('username')" class="error-msg">{{ errors.username }}</span>
        </div>
        <div class="form-group" :class="{ error: hasError('password') }">
          <label>Password</label>
          <input
            v-model="credentials.password"
            type="password"
            placeholder="Enter password"
          />
          <span v-if="hasError('password')" class="error-msg">{{ errors.password }}</span>
        </div>
        <base-button variant="primary" size="large" style="width: 100%" type="submit">
          Sign In
        </base-button>
      </form>
      <p class="hint">Hint: Use any username/password (min 3 chars each)</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import validationMixin from '../mixins/validationMixin'
import BaseButton from '../components/BaseButton.vue'

export default {
  name: 'Login',
  mixins: [validationMixin],
  components: { BaseButton },
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('users', ['login']),
    async handleLogin() {
      this.clearErrors()

      const userValid = this.validateRequired('username', this.credentials.username) &&
                        this.validateMinLength('username', this.credentials.username, 3)
      const passValid = this.validateRequired('password', this.credentials.password) &&
                        this.validateMinLength('password', this.credentials.password, 3)

      if (userValid && passValid) {
        try {
          await this.login(this.credentials)
          this.$store.dispatch('users/fetchUsers')
          this.$store.dispatch('tasks/fetchTasks')
          this.$bus.$emit('toast', { type: 'success', message: 'Welcome back!' })
          this.$router.push('/')
        } catch (e) {
          this.$bus.$emit('global-error', e)
        }
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.login-card h1 {
  text-align: center;
  margin-bottom: 5px;
}

.subtitle {
  text-align: center;
  color: #999;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.form-group.error input {
  border-color: #e74c3c;
}

.error-msg {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 4px;
}

.hint {
  text-align: center;
  font-size: 0.8rem;
  color: #999;
  margin-top: 20px;
}
</style>
