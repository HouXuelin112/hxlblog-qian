<template>
  <div class="blog-card" @dblclick="onDbClick">
    <div class="top-flag" v-if="blog.isTop">置顶</div>
    <h3 class="title-box" style="margin-bottom: 0">
      <a-tag color="green" v-if="blog.isOriginal">原创</a-tag>
      <router-link :to="{name: 'readBlog', params: {id: blog.id, filename: blog.filename}}" class="title" v-text="blog.title">模拟标题</router-link>
    </h3>
    <a-divider orientation="right" style="margin: 0">
      <a-space direction="vertical" :size="1">
        <span class="time-date" v-text="issueDate.date">16</span>
        <span class="time-month-year">
          <a-space>
            <span class="month" v-text="issueDate.month">10月</span>
            <span class="year" v-text="issueDate.year">2020</span>
          </a-space>
        </span>
      </a-space>
    </a-divider>
    <div class="content">
      <a-space>
        <router-link :to="{name: 'readBlog', params: {id: blog.id, filename: blog.filename}}">
          <img class="cover" :src="'data:image/png;base64,' + blog.displayImage"/>
        </router-link>
        <span v-text="blog.description">
          {{"这里是一段描述，".repeat(10)}}
        </span>
      </a-space>
    </div>
    <a-divider orientation="left"  style="clear: both">
      <router-link :to="{name: 'readBlog', params: {id: blog.id, filename: blog.filename}}" class="more">阅读更多</router-link>
    </a-divider>
    <footer>
      <div class="footer-tag">
        <a-space size="small">
          <a-icon type="tag" theme="filled"/><span v-text="blog.tag.tagName">标签</span>
        </a-space>
      </div>
      <div class="footer-look">
        <a-space size="middle">
          <span><a-icon type="eye" theme="filled"/><span v-text="blog.visitCount">10</span></span>
          <span><a-icon type="message" theme="filled"/><span v-text="blog.commentsCount">20</span></span>
        </a-space>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  props: {
    blog: {
      type: Object,
      default: () => {
        return {
          isTop: 1,
          isOriginal: 1,
          title: '文章标题',
          id: 1,
          publishDate: new Date('2020-10-16'),
          filename: 'springMvc',
          tag: {
            tagName: 'SPRINGMVC'
          },
          visitCount: 100,
          commentsCount: 1024,
          displayImage: require('../../../assets/logo.png'),
          description: '这是一段描述'.repeat(10)
        }
      }
    }
  },
  data () {
    return {
      // 格式化发布日期
      issueDate: {},
      // 博客内容，根据fileName从后台获取,markdown文件，将之以html放入
      blogContent: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.issueDate = {
        date: this.blog.publishDate ? this.blog.publishDate.getDate() : '16',
        month: this.blog.publishDate ? (this.blog.publishDate.getMonth() + 1) + '月' : '10月',
        year: this.blog.publishDate ? this.blog.publishDate.getFullYear() : '2020'
      }
    })
  },
  methods: {
    onDbClick () {
      this.$router.push({name: 'readBlog', params: {id: this.blog.id, filename: this.blog.filename}})
    }
  }
}
</script>
<style scoped lang="scss">
.blog-card {
  background-color: #f6efef52;
  margin: 10px 10px 20px;
  padding: 10px 30px;
  position: relative;
  border-radius: 5px;
  box-shadow: 0 0 5px grey;
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 10px gray;
  }
  .title {
    color: black;
    &:hover {
      cursor: pointer;
      color: skyblue;
    }
  }
  .top-flag {
    position: absolute;
    height: 15px;
    line-height: 15px;
    text-align: center;
    width: 74px;
    background-color: #ff5722;
    color: #fff;
    transform: rotate(-45deg);
    left: -20px;
    top: 9px;
  }
  .content {
    clear: both;
    padding: 10px 0;
    .cover {
      display: block;
      width: 150px;
      max-height: 200px;
      border: 1px solid #e8e9e7;
      overflow: hidden;
    }
    span {
      display: block;
      text-indent: 26px;
      color: grey;
      font-size: 13px;
      letter-spacing: 2px;
    }
  }
  .time-date {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 30px;
    color: aquamarine;
  }
  .time-month-year {
    color: grey;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  .more {
    font-size: 14px;
    color: black;
    font-weight: bold;
    clear: both;
    &:hover {
      cursor: pointer;
      color: skyblue;
    }
  }
  .footer-tag {
    float: left;
    font-size: 14px;
    span {
      padding: 2px 3px;
      background-color: #f1f2f0;
      color: #787977;
      transition: 1s;
      &:hover {
        background-color: #6bc30d;
        color: white;
      }
    }
  }
  .footer-look {
    float: right;
  }
}
</style>