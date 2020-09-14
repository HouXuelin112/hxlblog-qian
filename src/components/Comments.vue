<template>
  <a-comment :class="comment.parentId === 0 ? 'parent-comment' : ''">
    <template slot="actions">
      <span key="comment-basic-like">
        <a-tooltip title="Like">
          <a-icon type="like" :theme="action === 'liked' ? 'filled' : 'outlined'" @click="like" />
        </a-tooltip>
        <span style="padding-left: '8px';cursor: 'auto'">
          {{ comment.likes }}
        </span>
      </span>
      <span key="comment-basic-dislike">
        <a-tooltip title="Dislike">
          <a-icon
            type="dislike"
            :theme="action === 'disliked' ? 'filled' : 'outlined'"
            @click="dislike"
          />
        </a-tooltip>
        <span style="padding-left: '8px';cursor: 'auto'">
          {{ comment.dislikes }}
        </span>
      </span>
      <span key="comment-basic-reply-to" @click="onReply(comment)" ref="replyBtn" v-text="reply"></span>
    </template>
    <a slot="author"> {{ comment.user.nickName }}</a>
    <a-avatar
      slot="avatar"
      :src="'data:image/png;base64,' + comment.user.head"
      :alt="comment.user.nickName"
    />
    <p slot="content">
     <VueMarkdown :source="comment.messageContent"></VueMarkdown>
    </p>
    <a-tooltip slot="datetime" :title="comment.issueDate | dateFormat">
      <span>{{ comment.issueDate | dateFromNow }}</span>
    </a-tooltip>
    <template>
      <transition name="slide-fade">
        <Reply v-if="reply !== '回复'" :comment="comment" @sendMsg="newChildrenMsg"></Reply>
      </transition>
    </template>
    <template v-if="comment.childMessages && comment.childMessages.length > 0">
      <a-collapse :bordered="false">
      <a-collapse-panel key="1" header="子评论">
        <template v-for="(child, i) in comment.childMessages">
          <Comments :key="i" :comment="child" @childReply="childReply"></Comments>
        </template>
      </a-collapse-panel>
      </a-collapse>
    </template>
  </a-comment>
</template>
<script>
import moment from 'moment';
import VueMarkdown from 'vue-markdown'
import Reply from './Reply.vue'

export default {
  name: 'Comments',
  components: {
    VueMarkdown,
    Reply
  },
  props: {
    // 判断是否为message
    message: {
      type: Boolean,
      default: true
    },
    comment: {
      type: Object,
      default: () => {
        return {
          blogId: 0,
          pid: 0,
          id: 1,
          likes: parseInt(Math.random(1) * 100),
          dislikes: parseInt(Math.random(1) * 100),
          user: {
            nickName: 'Hxl',
            avatar: {
              src: '../..',
              alt: 'alt'
            },
          },
          content: '模拟留言'.repeat(20),
          issueDate: new Date(),
          children: [{
            id: 1,
            likes: parseInt(Math.random(1) * 100),
            dislikes: parseInt(Math.random(1) * 100),
            user: {
              nickName: 'Hxl',
              avatar: {
                src: '../..',
                alt: 'alt'
              },
            },
            content: '模拟留言'.repeat(20),
            issueDate: new Date(),
            children: [{
              id: 1,
              likes: 102,
              dislikes: 201,
              user: {
                nickName: 'Hxl',
                avatar: {
                  src: '../..',
                  alt: 'alt'
                },
              },
              content: '模拟留言'.repeat(20),
              issueDate: new Date()
            }],
          },
          {
            id: 1,
            likes: 102,
            dislikes: 201,
            user: {
              nickName: 'Hxl',
              avatar: {
                src: '../..',
                alt: 'alt'
              },
            },
            content: '模拟留言'.repeat(20),
            issueDate: new Date()
          }]
        }
      }
    }
  },
  filters: {
    dateFormat: (value) => {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    dateFromNow: (value) => {
      return moment(value).fromNow()
    }
  },
  created () {
    console.log(this.comment)
    this.comment.messageContent = this.comment.messageContent || ''
    if (!this.comment.likes) {
      this.comment.likes = parseInt(Math.random(1) * 100)
    }
    if (!this.comment.dislikes) {
      this.comment.dislikes = parseInt(Math.random(1) * 100)
    }
  },
  data() {
    return {
      likes: 0,
      dislikes: 0,
      action: null,
      moment,
      reply: '回复'
    };
  },
  methods: {
    childReply (comment) {
      this.$emit('childReply', comment)
    },
    newChildrenMsg (msg) {
      const comment = {
        parentId: this.comment.id,
        user: {
          id: 10,
        },
        toUser: {
          id: this.comment.user.id
        },
        issueDate: new Date(),
        messageContent: msg
      }
      this.$refs.replyBtn.click()
      this.$emit('childReply', comment)
    },
    like() {
      if (this.action === 'disliked') {
        this.comment.dislikes--
      }
      if (this.action !== 'liked') {
        this.comment.likes++
        this.action = 'liked';
      }
    },
    dislike() {
      if (this.action === 'liked') {
        this.comment.likes--
      }
      if (this.action !== 'disliked') {
        this.comment.dislikes++
        this.action = 'disliked';
      }
    },
    onReply (comment) {
      this.reply = this.reply === '回复' ? '收起' : '回复'
      console.log(comment)
      // debugger
    }
  },
};
</script>
<style scoped>
.parent-comment {
  box-shadow: 0 0 2px #7e5656;
  padding: 0 20px 20px 10px;
  margin-bottom: 10px;
}
</style>
<style>
p {
  margin-bottom: 0;
}
.ant-comment-actions {
  margin-top: 0;
}
</style>