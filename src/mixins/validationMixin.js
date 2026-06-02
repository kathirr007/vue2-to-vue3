// Mixin pattern (should become composables in Vue 3)
export default {
  data() {
    return {
      errors: {},
      isValid: true
    }
  },
  methods: {
    validateRequired(field, value) {
      if (!value || value.trim() === '') {
        this.$set(this.errors, field, `${field} is required`)
        this.isValid = false
        return false
      }
      this.$delete(this.errors, field)
      return true
    },
    validateMinLength(field, value, min) {
      if (value && value.length < min) {
        this.$set(this.errors, field, `${field} must be at least ${min} characters`)
        this.isValid = false
        return false
      }
      this.$delete(this.errors, field)
      return true
    },
    validateEmail(field, value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (value && !emailRegex.test(value)) {
        this.$set(this.errors, field, `${field} must be a valid email`)
        this.isValid = false
        return false
      }
      this.$delete(this.errors, field)
      return true
    },
    clearErrors() {
      this.errors = {}
      this.isValid = true
    },
    hasError(field) {
      return !!this.errors[field]
    }
  }
}
