// Mixin pattern (should become composables in Vue 3)
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize)
    },
    paginatedOffset() {
      return (this.currentPage - 1) * this.pageSize
    },
    hasPrevPage() {
      return this.currentPage > 1
    },
    hasNextPage() {
      return this.currentPage < this.totalPages
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        this.$emit('page-change', page)
      }
    },
    nextPage() {
      this.goToPage(this.currentPage + 1)
    },
    prevPage() {
      this.goToPage(this.currentPage - 1)
    },
    resetPagination() {
      this.currentPage = 1
    }
  },
  watch: {
    totalItems() {
      if (this.currentPage > this.totalPages && this.totalPages > 0) {
        this.currentPage = this.totalPages
      }
    }
  }
}
