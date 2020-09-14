<template>
  <div>
    <Layout theme="light">
      <template #content>
        <a-spin tip="努力加载中..." :spinning="loading" size="large">
        <DiaryTimeline :diarys="diarys"></DiaryTimeline>
        </a-spin>
      </template>
    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout.vue'
import DiaryTimeline from './module/DiaryTimeline.vue'
import service from '@/utils/requests.js'
export default {
  components: {
    DiaryTimeline,
    Layout
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      service.request({
        url: '/diary/findAllDiary',
        method: 'post'
      }).then(res => {
        if (res.code === 200) {
          this.diarys = res.result
        }
        this.loading = false
      }).catch (err => {
        this.$message.error("请求出错：【" + err + "】")
      })
    }
  },
  data () {
    return {
      loading: true,
      diarys: []
    }
  }
}
</script>