<template>
  <a-card hoverable class="blog-card" @click="onClick">
    <img
      class="cover"
      slot="cover"
      alt="example"
      :src="blog.cover"
    />
    <a-card-meta :title="blog.title" :description="blog.description">
      <a-avatar
        slot="avatar"
        :src="blog.admin.avatar"
      />
    </a-card-meta>
  </a-card>
</template>
<script>
export default {
  props: {
    blog: {
      type: Object,
      default: () => {}
    },
    cover: {
      type: String,
      default: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    },
    title: {
      type: String,
      default: "title"
    },
    description: {
      type: String,
      default: "description"
    },
    avatar: {
      type: String,
      default: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    },
  },
  methods: {
    onClick () {
      this.$router.push({name: 'readBlog', params: {id: this.blog.id, fileName: this.blog.fileName}})
    }
  }
};
</script>
<style scoped lang="scss">
.blog-card {
  width: 30%;
  display: inline-block;
  position: relative;
  z-index: 10;
  margin: 10px 1.6% 20px;
  &:hover {
    cursor: pointer;
  }
  .cover {
    height: 200px;
    border-bottom: 1px solid #f7e0e0;
  }
}
</style>