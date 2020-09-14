<template>
  <div>
    <Layout theme="light">
      <template #content>
        <wxlogin :scope="wxLogin.scope" :appid="wxLogin.appid" :redirect_uri="wxLogin.redirect_uri" :state="wxLogin.state"></wxlogin>
      </template>
    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout.vue'
import wxlogin from 'vue-wxlogin'
export default {
  components: {
    Layout,
    wxlogin
  },
  data () {
    return {
      wxLogin: {
        scope: 'snsapi_login',
        appid: 'wx7287a60bb700fd21',
        redirect_uri: window.encodeURIComponent('http://www.txjava.cn/user/wxLogin'),
        state: 'dfg',
      }
    }
  },
  created () {
  }
}
</script>