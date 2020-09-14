<template>
  <div>
    <a-divider :orientation="orientation" :dashed="true">
      {{ new Date(diary.issueDate) | dateFormatter }}
    </a-divider>
    <div class="content">
        <VueMarkdown :source="content"></VueMarkdown>
    </div>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'

function getDbNumber(num) {
  return num > 9 ? num : '0' + num
}
export default {
  components: {
    VueMarkdown
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    number: {
      type: Number,
      default: 0
    },
    diary: {
      type: Object,
      default: () => {
        return {
          issueDate: new Date(),
          diaryContent: '# title \n'.repeat(20),
          author: 'hxl'
        }
      }
    }
  },
  computed: {
    content: function () {
      return '<center><h1>' + this.diary.title + '</h1></center>\n' + this.diary.diaryContent
    },
    orientation: function() {
      var o = this.number % 2 === 0 ? 'right' : 'left'
      if (this.total % 2 === 0) {
        o = o === 'right' ? 'left' : 'right'
      }
      return o
    },
    textAlign: function() {
      var o = this.number % 2 === 0 ? 'left' : 'right'
      if (this.total % 2 === 0) {
        o = o === 'right' ? 'left' : 'right'
      }
      return o
    }
  },
  filters: {
    dateFormatter: (date) => {
      return date.getFullYear() + '-' + getDbNumber(date.getMonth() + 1) + '-' + getDbNumber(date.getDate())
        + ' ' + getDbNumber(date.getHours()) + ':' + getDbNumber(date.getMinutes()) + ':' + getDbNumber(date.getSeconds())
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.content {
  padding: 5px 10px;
  background-image: linear-gradient(45deg, #dba2a533, #dea3ac6b, #bb157959, #c854304d);
  border-radius: 5px;
  box-shadow: inset 0 0 10px #e3141447;
  overflow: scroll;
  ::v-deep img {
    width: 90%!important;
  }
}
</style>
