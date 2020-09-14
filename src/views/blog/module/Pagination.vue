<template>
  <div class="pagination">
    <a-pagination v-model="current" :total="total" :pageSize="5" @change="onChange" show-less-items />
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      current: 1
    }
  },
  methods: {
    onChange (page, pageSize) {
      this.$emit('change', page, pageSize)
    }
  }
}
</script>
<style scoped lang="scss">
.pagination {
  text-align: center;
  position: relative;
  z-index: 100;
  &:hover {
    cursor: pointer;
  }
}
</style>