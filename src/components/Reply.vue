<template>
  <div class="reply">
    <div>
      <div contenteditable="true" class="textarea" ref="textArea" @input="inputText" @click="getRange" @blur="getRange"></div>
    </div>
    <div class="toolbar clearfix">
      <div class="left-tools">
        <a-popover title="表情" trigger="hover" placement="bottom">
          <template slot="content">
            <div style="width: 300px">
              <img
                class="face"
                v-for="(face, i) in faces"
                :src="face.url"
                :key="i"
                @click="insertFace($event)"
              />
            </div>
          </template>
          <a-button
            type="default"
            style="border:none"
            shape="round"
            icon="smile"
          />
        </a-popover>
        <a-tooltip placement="top">
          <template slot="title">
            <span>点击添加图片</span>
          </template>
          <a-button shape="round" style="border:none" icon="file-image" />
        </a-tooltip>
      </div>
      <div class="right-send">
        <a-button type="primary" @click="sendMsg">发送</a-button>
      </div>
    </div>
  </div>
</template>
<script>
import { notification } from 'ant-design-vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => {
        return {
          pid: 0,
        };
      },
    },
  },
  computed: {
    placeholder: function() {
      return this.comment.pid === 0
        ? "请输入新留言"
        : "回复【" + this.comment.user.nickName + "】:";
    },
  },
  data() {
    return {
      // 留言的内容
      message: "",
      faces: this.getFaces(),
      range: undefined
    };
  },
  mounted () {
    // 挂载完成自动聚焦
    this.$refs.textArea.focus()
  },
  methods: {
    // 获取表情
    getFaces() {
      const faces = [];
      for (let i = 0; i < 72; i++) {
        const faceUrl = require("../assets/face/" + i + ".gif");
        faces.push({ url: faceUrl });
      }
      return faces;
    },
    sendMsg() {
      if (this.$refs.textArea.innerHTML.trim() === '' ) {
        notification.warning({
          message: '内容为空',
          description: '留言信息不能为空',
          duration: 2
        })
        return 0
      }
      this.$emit('sendMsg', this.$refs.textArea.innerHTML)
      this.$refs.textArea.innerHTML = ''
      this.range = undefined
    },
    getRange () {
      this.range = window.getSelection().getRangeAt(0)
    },
    inputText () {
      this.getRange()
    },
    insertFace(ele) {
      if (this.range) {
        const span = document.createElement('span');
        span.innerHTML = ele.target.outerHTML
        this.range.insertNode(span);
        this.range.collapse(false)
        this.getRange()
      }
    },
  },
};
</script>
<style scoped lang="scss">
.reply {
  margin: 5px 0 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px gray;
  .textarea {
    text-indent: 2px;
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100px;
    padding: 10px;
    overflow: auto;
    border-bottom: 1.5px dotted antiquewhite;
    &:focus {
      outline: none;
    }
  }
  .toolbar {
    padding: 5px 5px 5px 0;
    .left-tools {
      float: left;
      .face {
        display: inline-block;
        width: 30px;
        height: 30px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .right-send {
      float: right;
    }
  }
}
</style>
<style>
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>
