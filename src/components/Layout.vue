<template>
<div style="min-width: 1000px">
  <DynamicBackGround></DynamicBackGround>
  <a-layout id="components-layout-demo-top">
    <a-affix :offset-top="0" style="z-index: 100">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        :theme="theme"
        :mode="direction"
        :default-selected-keys="defaultSelectedKey"
        :style="{ lineHeight: '64px' }"
        @select="onSelect"
      >
        <a-menu-item v-for="(nav, index) in navItems" :key="index">
          <a-icon :type="nav.icon" />
          <span class="nav-text">{{ nav.displayExpr }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    </a-affix>
    <a-layout-content style="padding: 0 50px; overflow: auto">
      <!-- <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb> -->
      <div ref="content" :style="{ background: '#fff', padding: '24px', minHeight: '600px', marginTop: '16px', overflow: 'auto' }">
        <slot name="content"></slot>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <!-- <Copyright bgColor="transparent"></Copyright> -->
      Copyright &copy; 2020-2020 Hxl All Rights Reserved
    </a-layout-footer>
  </a-layout>
  <a-back-top></a-back-top>
</div>
</template>
<script>
import DynamicBackGround from '@/components/DynamicBackground.vue'
import { navItems } from '@/components/navitems.js'
export default {
  props: {
    theme: {
      type: String,
      default: 'dark'
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    navItems: {
      type: Array,
      default: () => {
        return navItems
      }
    }
  },
  data () {
    return {
      // 进来的路由携带的key
      defaultSelectedKey: [1]
    }
  },
  created () {
    // 若路由参数中的key有值则为路由中的值否则为[1]
    if (this) {
      switch (this.$route.name) {
        case 'blogDisplay':
          this.defaultSelectedKey = [1]
          break
        case 'message':
          this.defaultSelectedKey = [2]
          break
        case 'diary':
          this.defaultSelectedKey = [3]
          break
        case 'flink':
          this.defaultSelectedKey = [4]
          break
        case 'about':
          this.defaultSelectedKey = [5]
          break
        case 'readBlog':
          this.defaultSelectedKey = []
          break
        default:
          this.defaultSelectedKey = [0]
      }
    }
  },
  methods: {
    getBackTopTarget () {
      return this.$refs.content
    },
    onSelect ({ key }) {
      if (key === 0) {
        this.$router.push("/")
      }
      if (key === 1) {
        this.$router.push("/blog/display")
      }
      if (key === 2) {
        this.$router.push("/message")
      }
      if (key === 3) {
        this.$router.push("/diary")
      }
      if (key === 4) {
        this.$router.push("/flink")
      }
      if (key === 5) {
        this.$router.push("/about")
      }
    }
  },
  components: {
    DynamicBackGround,
  }
}
</script>
<style scoped>
.ant-layout-header {
  background-color: transparent!important;
}
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: url('../assets/logo1.png') center no-repeat;
  background-size: cover;
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
<style>
::-webkit-scrollbar {
width: 0px;
}

::-webkit-scrollbar-track {
background-color: none;
}

::-webkit-scrollbar-thumb {
background-color: none;
}
</style>