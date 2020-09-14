<template>
  <div>
    <Layout theme="light">
      <template #content>
        <Apply @apply="apply" :tip="tip"></Apply>
        <a-spin tip="努力加载中..." wrapperClassName="wrapClass" :spinning="loading" size="large">
        <template v-for="(flink, i) in flinks">
          <Display :key="i" :flink="flink"></Display>
        </template>
        </a-spin>
      </template>
    </Layout>
  </div>
</template>
<script>
import Display from './module/Display.vue'
import Apply from './module/Apply.vue'
import Layout from '@/components/Layout.vue'
import service from '@/utils/requests.js'
import { notification } from 'ant-design-vue'
export default {
  data () {
    return {
      loading: true,
      flinks: [],
      tip: '操作完成'
    }
  },
  methods: {
    apply (flink) {
      console.log(flink)
      service.request({
        url: '/flink/apply',
        method: 'post',
        data: {
          ...flink
        }
      }).then(res => {
        if (res.code === 200) {
          notification.success({
            message: '提示',
            description: res.result,
            duration: 2,
          })
        } else {
           notification.error({
            message: '提示',
            description: res.result,
            duration: 2,
          })
        }
        this.tip = res.result
      }).catch (err => {
        this.$message.error("请求出错：【" + err + "】")
      })
    }
  },
  created () {
    service.request({
      url: '/flink/findAllFlink',
      method: 'post'
    }).then(res => {
      if (res.code === 200) {
        this.flinks = res.result
      }
      this.loading = false
    }).catch (err => {
      this.$message.error("请求出错：【" + err + "】")
    })
  },
  components: {
    Layout,
    Apply,
    Display
  }
}
</script>
<style scoped>
</style>