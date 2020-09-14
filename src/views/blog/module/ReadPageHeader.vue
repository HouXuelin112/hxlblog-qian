<template>
  <div>
      <h2>{{ title }}</h2>
      <a-space size="large">
        <span>作者: {{ author }}</span>
        <span>发布时间: {{ issueDate | dateFormatter }}</span>
      </a-space>
  </div>  
</template>
<script>
function getDbNumber(num) {
  return num > 9 ? num : '0' + num
}
export default {
  props: {
    title: {
      type: String,
      default: '文章标题'
    },
    author: {
      type: String,
      default: 'HXL'
    },
    issueDate: {
      type: Date,
      default: new Date()
    }
  },
  filters: {
    dateFormatter: (date) => {
      return date.getFullYear() + '-' + getDbNumber(date.getMonth() + 1) + '-' + getDbNumber(date.getDate())
        + ' ' + getDbNumber(date.getHours()) + ':' + getDbNumber(date.getMinutes()) + ':' + getDbNumber(date.getSeconds())
    }
  },
}
</script>
<style scoped>

</style>