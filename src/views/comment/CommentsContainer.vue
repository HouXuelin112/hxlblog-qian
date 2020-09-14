<template>
  <div>
    <Layout theme="light">
      <template #content>
        <Comments></Comments>
      </template>
    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout.vue'
import Comments from '@/components/Comments.vue'

export default {
  components: {
    Layout,
    Comments
  },
  data () {
    return {
    }
  }
}
</script>