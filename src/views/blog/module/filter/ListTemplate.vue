<template>
  <div class="hot-article">
    <h3 class="title"><b>{{ title }}</b></h3>
    <a-list>
      <a-list-item class="items" v-for="(item, i) in items" :key="i" @click="onClick(item)">
        {{ item.title }}
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '热门推荐'
    },
    items: {
      type: Array,
      default: () => {
        const items = []
        for (let i = 0; i < 9; i++) {
          const item = {
            title: 'item' + i,
            id: i
          }
          items.push(item)
        }
        return items
      }
    }
  },
  methods: {
    onClick (item) {
      this.$router.push({name: 'readBlog', params: {id: item.id, filename: item.filename}})
    }
  }
}
</script>
<style scoped lang="scss">
.hot-article {
  box-shadow: 0 0 5px grey;
  background: whitesmoke;
  opacity: .6;
  font-size: 16px;
  color: black;
  .title {
    background-color: rgba(17, 16, 16, .38);
    padding: 3px;
    border-bottom: 2px solid white;
  }
  .items {
    text-indent: 20px;
    &:hover {
      background-color: bisque;
      opacity: .6;
      border-right: 5px solid grey;
    }
  }
}
</style>