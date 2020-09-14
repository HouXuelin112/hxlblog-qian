<template>
  <div class="index-middle">
    <a-divider>
      推荐阅读
    </a-divider>
    <template v-for="(blog,i) in blogs"> <display-blog :key="i" :blog="blog"></display-blog></template>
  </div>
</template>
<script>
import DisplayBlog from "./DisplayBlog.vue";
export default {
  components: {
    DisplayBlog,
  },
  props: {
    blogs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
};
</script>
<style scoped lang="scss">
.index-middle {
  width: 90%;
  margin: 10px auto;
  padding: 10px 10px;
  position: relative;
  z-index: 10;
  background-color: white;
}
</style>
