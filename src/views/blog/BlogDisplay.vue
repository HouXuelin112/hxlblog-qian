<template>
  <div>
    <Layout theme="light">
      <template #content>
        <BlogContainer></BlogContainer>
      </template>
    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout.vue'
import BlogContainer from './module/BlogContainer.vue'

export default {
  components: {
    Layout,
    BlogContainer
  },
  data () {
    return {
    }
  }
}
</script>