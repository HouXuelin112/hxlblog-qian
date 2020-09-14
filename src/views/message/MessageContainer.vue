<template>
  <div>
    <Layout theme="light">
      <template #content>
        <a-spin tip="努力加载中..." :spinning="loading" size="large">
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

// const qs = require('qs')
export default {
  components: {
    Layout,
    Comments,
    Reply
  },
  data () {
    return {
      loading: true,
      showReply: false,
      comments: [],
      // websocket
      ws: null,

    }
  },
  computed: {
    messageBtn: function () {
      return this.showReply ? '收起' : '新建留言'
    }
  },
  created () {
    this.initData()
    const that = this
    if (window.WebSocket) {
      that.ws = new WebSocket("ws://localhost:8080/myWS");
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
  beforeDestroy () {
    this.ws.close()
    this.ws = null
  },
  methods: {
    childReply (comment) {
      service.request({
        url: '/message/sendMessage',
        method: 'post',
        data: {
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
        url: '/message/findTreeMessage',
        method: 'get'
      }).then(res => {
        if (res.code === 200) {
          res.result.forEach(msg => {
            msg.likes = parseInt(Math.random(1) * 100)
            msg.dislikes = parseInt(Math.random(1) * 100)
          })
          this.comments = res.result
          this.loading = false
        }
      })
    },
    // 新建的留言
    newMsg (msg) {
      const comment = {
        parentId: 0,
        user: {
          id: 10,
          head: this.comments[0].user.head,
          nickName: this.comments[0].user.nickName
        },
        toUser: {
          id: 2,
        },
        issueDate: new Date(),
        messageContent: msg,
        likes: 0,
        dislikes: 0
      }
      service.request({
        url: '/message/sendMessage',
        method: 'post',
        data: {
          ...comment
        }
      }).then(res => {
        if (res.code === 200) {
          this.$message.success("发送成功")
        }
      })
      // console.log(msg)
      // this.comments.unshift(comment)
    },
    showInput () {
      this.showReply = !this.showReply
    }
  }
}
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
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
