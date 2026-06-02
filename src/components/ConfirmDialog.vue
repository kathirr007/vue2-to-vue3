<template>
  <base-modal :visible.sync="isVisible" @close="handleCancel">
    <template #title>{{ title }}</template>
    <p>{{ message }}</p>
    <template #footer>
      <base-button variant="secondary" @click="handleCancel">Cancel</base-button>
      <base-button :variant="confirmVariant" @click="handleConfirm">{{ confirmText }}</base-button>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

export default {
  name: 'ConfirmDialog',
  components: {
    BaseModal,
    BaseButton
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Confirm Action'
    },
    message: {
      type: String,
      default: 'Are you sure?'
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    confirmVariant: {
      type: String,
      default: 'danger'
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm')
      this.$emit('update:visible', false)
    },
    handleCancel() {
      this.$emit('cancel')
      this.$emit('update:visible', false)
    }
  }
}
</script>
