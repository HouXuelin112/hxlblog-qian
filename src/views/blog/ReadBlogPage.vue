<template>
   <div>
    <Layout theme="light">
      <template #content>
        <a-spin tip="努力加载中..." :spinning="loading" size="large">
        <ReadPageHeader
          v-if="blog"
          :author="blog.admin.nickName"
          :title="blog.title"
          :issueDate="new Date(blog.issueDate)"
        ></ReadPageHeader>
        <a-divider></a-divider>
        <div style="padding: 2px 10px">
          <VueMarkdown :source="value"></VueMarkdown>
        </div>
        <a-divider></a-divider>
        <div class="messageBtn">
          <a-button
            type="primary"
            @click="showInput"
            v-text="messageBtn"
            style="width: 100px"
          ></a-button>
          <!-- <p>往事高低半枕梦，故人南北书数行</p> -->
        </div>
        <transition name="slide-fade">
          <Reply v-if="showReply" @sendMsg="newMsg"></Reply>
        </transition>
        <Comments
          v-for="(comment, i) in comments"
          :comment="comment"
          :key="i"
          @childReply="childReply"
        ></Comments>
        </a-spin>
      </template>
    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout.vue'
import VueMarkdown from 'vue-markdown'
import ReadPageHeader from './module/ReadPageHeader.vue'
import Comments from '@/components/Comments.vue'
import Reply from '@/components/Reply.vue'
import service from '@/utils/requests.js'

function findCommentAndSetChild (comments, obj) {
  for (const i in comments) {
    if (comments[i].id === obj.parentId) {
      comments[i].childMessages = comments[i].childMessages ? [obj, ...comments[i].childMessages] : [obj]
      break
    } else if (comments[i].childMessages && comments[i].childMessages.length > 0) {
      findCommentAndSetChild(comments[i].childMessages, obj)
    }
  }
}

const qs = require('qs')
export default {
  components: {
    Layout,
    VueMarkdown,
    ReadPageHeader,
    Comments,
    Reply
  },
  created () {
    this.initData();
    const that = this
    if (window.WebSocket) {
      that.ws = new WebSocket("ws://localhost:8080/comments");
      that.ws.onopen = function (e) {
        console.log("链接服务器成功", e)
      };
      that.ws.onclose = function (e) {
        console.log("服务器关闭", e)
      };
      that.ws.onerror = function () {
        console.log("服务器出错")
      };
      that.ws.onmessage = function (e) {
        const tempObj = JSON.parse(e.data)
        tempObj.likes = parseInt(Math.random(1) * 100)
        tempObj.dislikes = parseInt(Math.random(1) * 100)
        tempObj.childMessages = []
        if (tempObj.user.$ref) {
          tempObj.user = tempObj.toUser
        }
        if (tempObj.parentId === 0) {
          that.comments = [tempObj, ...that.comments]
        } else {
          findCommentAndSetChild(that.comments, tempObj)
        }
        
      }
    } else {
      this.ws = null
    }
  },
  computed: {
    messageBtn: function () {
      return this.showReply ? '收起' : '写评论'
    }
  },
  data() {
    return {
      loading: true,
      showReply: false,
      comments: [],
      blog: null,
      value: "",
      ws: null
    };
  },
  methods: {
    childReply (comment) {
      comment.commentContent = comment.messageContent
      service.request({
        url: '/comment/leave',
        method: 'post',
        data: {
          blog: {
            id: this.blog ? this.blog.id : 0,
          },
          ...comment
        }
      }).then(res => {
        if (res.code === 200) {
          this.$message.success("发送成功")
        }
      })
    },
    initData () {
      service.request({
        url: '/blog/read',
        method: 'post',
        data: qs.stringify({
          id: this.$route.params.id
        })
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.comments = res.result.comments
          this.comments.forEach(com => {
            com.messageContent = com.commentContent
          })
          this.blog = res.result.blog
          this.value = res.result.content
          this.loading = false
        } else {
          this.$message.error("服务器出错")
        }
      }).catch(err => {
        this.$message.error("请求出错：【" + err + "】")
      })
    },
    onClick() {
      this.$router.go(-1);
    },
    newMsg (msg) {
      const comment = {
        blog: {
          id: this.blog ? this.blog.id : 0,
        },
        parentId: 0,
        user: {
          id: 10
        },
        issueDate: new Date(),
        commentContent: msg,
        toUser: {
          id: 2
        }
      }
      service.request({
        url: '/comment/leave',
        method: 'post',
        data: {
          ...comment
        }
      }).then(res => {
        debugger
        console.log(res)
      }).catch(err => {
        this.$message.error("请求出错：【" + err + "】")
      })
    },
    showInput () {
      this.showReply = !this.showReply
    }
  },
  beforeDestroy () {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
};
</script>
<style scoped>
.messageBtn {
  text-align: center;
  padding: 5px 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>