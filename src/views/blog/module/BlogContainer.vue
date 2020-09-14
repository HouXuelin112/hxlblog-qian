<template>
<a-spin tip="努力加载中..." :spinning="loading" size="large">
  <div style="clear: both" ref="blogContainer" @mousewheel="onScroll">
      <div class="left-blog-container">
        <template v-for="(blog, i) in blogs">
          <blog-card :key="i" :blog="blog"></blog-card>
        </template>
        <pagination :total="total" @change="onChange"></pagination>
      </div>
      
      <div class="right-aside-box" ref="rightSideBox">
        <AsideFilter
          :tags="tags"
          :hotTop10Blogs="hotTop10Blogs"
          :top10Blogs="top10Blogs"
          :recentVisitors="recentVisitors"
          @tagClick="tagClick"
          @search="search"
        ></AsideFilter>
      </div>
  </div>
</a-spin>
</template>
<script>
import service from '@/utils/requests.js'
import BlogCard from './BlogCard.vue'
// 侧边栏
import AsideFilter from './AsideFilter.vue'
import pagination from './Pagination.vue'
const qs = require('qs')
export default {
  components: {
    BlogCard,
    AsideFilter,
    pagination
  },
  data () {
    return {
      loading: true,
      total: 0,
      blogs: [],
      current: 1,
      tags: [],
      hotTop10Blogs: [],
      top10Blogs: [],
      recentVisitors: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    search (value) {
      service.request({
        url: '/getTips',
        method: 'post',
        data: qs.stringify({
          text: value
        })
      }).then(res => {
        this.blogs = res
      })
    },
    tagClick (tag) {
      if (!tag.id) {
        return 0
      }
      service.request({
        url: '/blog/findBlogsByTagId',
        method: 'post',
        data: qs.stringify({
          tagId: tag.id
        })
      }).then(res => {
        if (res.code === 200) {
          this.blogs = res.result
        }
      })
    },
    onChange (page, pageSize) {
      this.getData(page, pageSize)
    },
    getData (pageId, pageSize) {
      service.request({
        url: '/blog/findAllBlogsAndTags',
        method: 'post',
        data: qs.stringify({
          pageId: pageId || 1,
          pageSize: pageSize || 5
        })
      }).then(res => {
        if (res.code === 200) {
          this.total = res.result.count
          this.blogs = res.result.pageBlogs
          if (!pageId) {
            this.tags = res.result.tags
            this.hotTop10Blogs = res.result.hotTop10Blogs
            this.top10Blogs = res.result.top10Blogs
            this.recentVisitors = res.result.recentVisitors
          }
          this.loading = false
        } else {
          this.$message.error('出错了')
        }
      }).catch (err => {
        this.$message.error('请求服务器出错：【' + err + '】')
      })
    },
    getAsideFixTarget () {
      return this.$refs.blogContainer
    },
     onScroll (e) {
      //  debugger
       console.log(this.$refs.rightSideBox.offsetTop, e.pageY)
      console.log(e)
    }
  }
}
</script>
<style scoped lang="scss">
.left-blog-container {
  width: 75%;
  float: left;
  padding: 5px;
}
.right-aside-box {
  width: 25%;
  float: right;
  padding: 5px;
}
</style>