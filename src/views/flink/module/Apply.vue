<template>
  <div class="apply-container">
    <a-steps :current="current">
      <a-step name="说明">
        <a-icon slot="icon" type="file-text" />
      </a-step>
      <a-step name="填写">
        <a-icon slot="icon" type="edit" />
      </a-step>
      <a-step name="完成">
        <a-icon slot="icon" type="check-circle" />
      </a-step>
    </a-steps>
    <div class="illusion" v-if="current === 0">
      <div class="text">
        <p>这一块是申请友链的注意事项</p>
        啥也不说，申请就完事了
      </div>
      <div class="btn-box"><a-button @click="next(1)" type="primary">下一步</a-button></div>
    </div>
    <div class="illusion" v-if="current === 1">
       <a-form-model :model="flink" :label-col="{span: 6}" :wrapper-col="{span: 14}">
        <a-form-model-item label="网站名称" :rules="[{required: true, message: '必填项', trigger: 'change'}]">
          <a-input v-model="flink.name" />
        </a-form-model-item>
        <a-form-model-item label="网站addr" :rules="[{required: true, message: '必填项', trigger: 'change'}]">
          <a-input v-model="flink.addr" />
        </a-form-model-item>
        <a-form-model-item label="网站描述">
          <a-input v-model="flink.description" />
        </a-form-model-item>
       </a-form-model>
       <a-row>
        <a-col :span="6" style="text-align: right">
          网站图标：
        </a-col>
        <a-col :span="14" style="text-align: left">
          <a-upload
            accept=".jpg,.svg,.gif,.png,jpeg"
            :fileList="fileList"
            list-type="picture-card"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length === 0">
              <a-icon type="plus" size="large" />
            </div>
          </a-upload>
        </a-col>
      </a-row>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
      <div class="btn-box">
        <a-space>
          <a-button @click="previous(0)" type="primary">上一步</a-button>
          <a-button @click="next(2)" type="primary" :disabled="nextAble">提交</a-button>
        </a-space>
      </div>
    </div>
    <div class="finish" v-if="current === 2">
      <div class="text">
        {{ tip }}
      </div>
      <div class="btn-box">
        <a-button type="primary" @click="reEdit"><a-icon type="redo" size="large" />继续申请</a-button>
      </div>
    </div>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  props: {
    tip: {
      type: String,
      default: '提示文字'
    }
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      current: 0,
      flink: {
        name: '',
        addr: '',
        description: '',
        icon: ''
      },
      fileList: []
    };
  },
  computed: {
    nextAble: function () {
      var flag = false
      if (this.flink.name === '') {
        flag = true
      }
      /* eslint-disabled */
      const reg = new RegExp("([hH][tT]{2}[pP]://|[hH][tT]{2}[pP][sS]://|www.)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+")
      if (!reg.test(this.flink.addr)) {
        flag = true
      }
      return flag
    }
  },
  methods: {
    initData () {
      this.previewVisible = false
      this.previewImage = ''
      this.current = 0
      this.flink =  {
        name: '',
        addr: '',
        description: '',
        icon: ''
      }
      this.fileList = []
    },
    reEdit () {
      this.initData()
      this.current = 1
    },
    next (num) {
      this.current =  num
      if (num === 2) {
        this.$emit('apply', this.flink)
      }
    },
    previous (num) {
      this.current = num
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.addr && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.addr || file.preview;
      this.previewVisible = true;
    },
    async handleChange({ fileList }) {
      this.fileList = fileList;
      if (fileList.length > 0) {
        this.flink.icon = await getBase64(fileList[0].originFileObj)
      } else {
        this.flink.icon = ''
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.apply-container {
  background-color: #ffffff;
  width: 90%;
  margin: 10px auto;
  padding: 5px 15px;
  box-shadow: inset 0 0 5px #f1dbdb;
  .illusion {
    .text {
      width: 70%;
      height: 100px;
    }
  }
  .finish {
    .text {
      height: 200px;
      text-align: center;
    }
  }
  .btn-box {
    text-align: center;
    margin: 10px 0;
  }
}
</style>
