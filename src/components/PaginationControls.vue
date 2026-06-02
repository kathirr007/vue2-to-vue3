<template>
  <div class="pagination" v-if="totalPages > 1">
    <button
      :disabled="!hasPrevPage"
      @click="prevPage"
      class="secondary"
    >
      &laquo; Prev
    </button>
    <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      :disabled="!hasNextPage"
      @click="nextPage"
      class="secondary"
    >
      Next &raquo;
    </button>
  </div>
</template>

<script>
import paginationMixin from '../mixins/paginationMixin'

export default {
  name: 'PaginationControls',
  mixins: [paginationMixin],
  props: {
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 10
    }
  },
  watch: {
    total: {
      immediate: true,
      handler(val) {
        this.totalItems = val
      }
    },
    perPage: {
      immediate: true,
      handler(val) {
        this.pageSize = val
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  padding: 10px;
}

.page-info {
  font-size: 0.9rem;
  color: #666;
}
</style>
