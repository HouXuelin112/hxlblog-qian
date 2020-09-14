<template>
  <div>
    <main-menu :menuItems="menuItems" @menuSelected="onMenuSelected"></main-menu>
    <DynamicBackGround></DynamicBackGround>
    <Top></Top>
    <a-spin tip="努力加载中..." wrapperClassName="wrapClass" :spinning="loading" size="large">
    <Middle :blogs="blogs"></Middle>
    </a-spin>
    <Bottom></Bottom>
    <copy-right></copy-right>
  </div>
</template>
<script>
import Top from './Top.vue'
import Middle from './Middle.vue'
import Bottom from './Bottom.vue'
import DynamicBackGround from '@/components/DynamicBackground.vue'
import CopyRight from '@/components/CopyRight.vue'
import MainMenu from '@/components/index/MainMenu.vue'
import service from '@/utils/requests.js'

export default {
  name: 'Index',
  components: {
    Top,
    Middle,
    Bottom,
    DynamicBackGround,
    CopyRight,
    MainMenu
  },
  data () {
    return {
      loading: true,
      blogs: [],
      menuItems: [
        {
          key: "index",
          icon: "home",
          displayExpr: "主页"
        },
        {
          key: "blog",
          icon: "book",
          displayExpr: "博文"
        },
        {
          key: "message",
          icon: "mail",
          displayExpr: "留言"
        },
        {
          key: "diary",
          icon: "file-text",
          displayExpr: "日记"
        },
        {
          key: "flink",
          icon: "usergroup-add",
          displayExpr: "友链"
        },
        {
          key: "about",
          icon: "user",
          displayExpr: "关于"
        }
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      service.request({
        url: '/blog/findHot6Blogs',
        methods: 'Get'
      }).then(res => {
        const picPreffix = 'data:image/png;base64,'
        if (res.code === 200) {
            res.result.forEach(blog => {
            blog.admin.avatar = picPreffix + blog.admin.head
            blog.cover = picPreffix + blog.displayImage
            this.blogs.push(blog)
          })
        }
        this.loading = false
      })
    },
    onMenuSelected (e) {
      if (e.key === 'blog') {
        this.$router.push({path: "/blog/display", query: {key: 1}})
      }
      if (e.key === 'message') {
        this.$router.push({path: "/message", query: {key: 2}})
      }
      if (e.key === 'diary') {
        this.$router.push({path: "/diary", query: {key: 3}})
      }
      if (e.key === 'flink') {
        this.$router.push({path: "/flink", query: {key: 4}})
      }
      if (e.key === 'about') {
        this.$router.push({path: "/about", query: {key: 5}})
      }
    }
  }
}
</script>