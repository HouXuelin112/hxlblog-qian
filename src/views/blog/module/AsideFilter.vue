<template>
  <div style="padding: 10px 0px;" @scroll="onScroll" @mousewheel="onScroll">
    <a-space size="large" direction="vertical">
      <SearchAndTags :tags="tags" @tagClick="tagClick" @search="search"></SearchAndTags>
      <ListTemplate :items="hotTop10Blogs"></ListTemplate>
      <ListTemplate title="置顶推荐" :items="top10Blogs"></ListTemplate>
      <RecentGuest :recentVisitors="recentVisitors"></RecentGuest>
    </a-space>
  </div>
</template>
<script>
import SearchAndTags from './filter/SearchAndTags.vue'
import ListTemplate from './filter/ListTemplate.vue'
import RecentGuest from './RecentGuest.vue'

export default {
  components: {
    SearchAndTags,
    ListTemplate,
    RecentGuest
  },
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    hotTop10Blogs: {
      type: Array,
      default: () => []
    },
    top10Blogs: {
      type: Array,
      default: () => []
    },
    recentVisitors: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    tagClick (tag) {
      this.$emit('tagClick', tag)
    },
    search (value) {
      this.$emit('search', value)
    },
    onScroll (e) {
      console.log(e)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
