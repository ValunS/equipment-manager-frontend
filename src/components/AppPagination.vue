/* eslint-disable vue/multi-word-component-names */
<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="onPageChange(currentPage - 1)"
        >
          <span aria-hidden="true">«</span>
        </a>
      </li>

      <li
        v-for="page in pageNumbers"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="onPageChange(page)">
          {{ page }}
        </a>
      </li>

      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="onPageChange(currentPage + 1)"
        >
          <span aria-hidden="true">»</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pageNumbers() {
      const delta = 2;
      const range = [];
      for (
        let i = Math.max(2, this.currentPage - delta);
        i <= Math.min(this.totalPages - 1, this.currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (this.currentPage - delta > 2) {
        range.unshift("...");
      }
      if (this.currentPage + delta < this.totalPages - 1) {
        range.push("...");
      }

      range.unshift(1);
      if (this.totalPages > 1) {
        range.push(this.totalPages);
      }

      return range;
    },
  },
  methods: {
    onPageChange(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit("page-changed", page);
      }
    },
  },
};
</script>
