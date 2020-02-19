<template>
  <el-upload
    class="plupload-file-demo"
    :fileplupload="`${uploadCode}`"
    ref="pluploadfiledemo"
    :file-list="uploadList"
    v-bind="{ ...uploadConfig, ...addConfig }"
    :class="{
      'plupload-disabled': uploadConfig.disabled,
      'show-file-list': isShowList
    }"
  >
    <div v-if="$slots.default" style="text-align: left;">
      <slot name="trigger"></slot>
      <slot></slot>
    </div>
    <div
      v-else
      style="text-align: left;"
      :class="{
        'plupload-default': !size,
        'plupload-medium': size == 'medium',
        'plupload-small': size == 'small',
        'plupload-mini': size == 'mini'
      }"
    >
      <div
        class="plupload-file-view"
        :style="`width:calc(100% - ${fileBtnText.length * 14 + 48}px);`"
      >
        <span
          v-if="uploadList[0]"
          class="plupload-file-item is-select"
          :title="`${uploadList[0].name}`"
          >{{ uploadList[0].name }}</span
        >
        <span v-else slot="trigger" class="plupload-file-item">{{
          placeholder
        }}</span>
        <el-progress
          v-bind="progress"
          class="progress-file-demo"
          v-if="uploadList[0] && isProgress"
        />
        <div class="error-tips" v-if="fileErrorTip.show">{{ errorTip }}</div>
        <div
          class="remobe-file-btn"
          v-if="uploadList[0] && !uploadConfig.disabled"
          @click.stop="remobeFile"
        >
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div
        class="plupload-file-btn"
        v-if="isFileBtn"
        :style="`width:${fileBtnText.length * 14 + 40}px;`"
      >
        <el-button
          :size="size"
          type="primary"
          @click.stop="submit"
          :disabled="uploadConfig.disabled"
          >{{ fileBtnText }}</el-button
        >
      </div>
      <div
        v-if="uploadLoading"
        @click.stop="() => {}"
        class="file-mask-demo"
        v-loading="uploadLoading && isFileMask"
      ></div>
    </div>
  </el-upload>
</template>

<script>
import $common from '../utils/common.js'

export default {
  name: 'elPploadxMe',
  props: {
    multiple: { type: Boolean, default: false },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    name: { type: String, default: 'file' },
    withCredentials: { type: Boolean, default: false },
    showFileList: { type: Boolean, default: true },
    drag: { type: Boolean, default: false },
    accept: { type: String, default: null },
    onPreview: { type: Function, default: () => {} },
    onRemove: { type: Function, default: () => {} },
    onSuccess: { type: Function, default: () => {} },
    onError: { type: Function, default: () => {} },
    onProgress: { type: Function, default: () => {} },
    onChange: { type: Function, default: () => {} },
    beforeUpload: { type: Function, default: () => {} },
    beforeRemove: { type: Function, default: () => {} },
    listType: { type: String, default: 'text' },
    autoUpload: { type: Boolean, default: false },
    fileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    httpRequest: { type: Function, default: null },
    disabled: { type: Boolean, default: false },
    limit: { type: Number, default: null },
    onExceed: { type: Function, default: () => {} },
    isProgress: { type: Boolean, default: true }, // 上传时是否看到滚动条
    isFileMask: { type: Boolean, default: false }, // 上传是否看到 loadign 遮罩层
    isFileBtn: { type: Boolean, default: true },
    fileBtnText: { type: String, default: '点击上传' }, // 按钮文本
    errorTip: { type: String, default: '上传失败，请尝试重试！' },
    placeholder: { type: String, default: '请选取文件' },
    action: { type: String, default: '' },
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    size: { type: String, default: '' }
  },
  data() {
    return {
      uploadCode: `plupload_${new Date().getTime().toString()}_${Math.random()
        .toString()
        .substr(2)}`,
      uploadLoading: false,
      uploadList: [],
      isShowList: true,
      addConfig: {
        action: '',
        data: {}
      },
      // 获取上传文件服务器权限配置
      getCodeUrl: this.action,
      progress: {
        type: 'line',
        percentage: 0,
        'stroke-width': 5,
        'text-inside': false,
        'show-text': '',
        status: null
      },
      fileErrorTip: {
        show: false
      },
      progressOther: {
        timer: null
      }
    }
  },
  watch: {
    'progress.percentage'(val) {
      if (val >= 98) {
        this.handProgress(false)
      }
    },
    fileList: {
      immediate: true,
      handler(val) {
        this.uploadList = val
      }
    },
    uploadList: {
      deep: true,
      handler(val, oldVal) {
        if (val && oldVal && JSON.stringify(val) == JSON.stringify(oldVal)) {
          return
        }
        this.$emit('update:fileList', val)
      }
    }
  },
  computed: {
    uploadConfig() {
      /**
       * multiple 不能修改，暂时只能单个文件
       */
      let config = $common.useDefined(this.config, {})
      // 以单独参数为准，相同键值时将会覆盖 config 对应值
      let newConfig = {
        ...config,
        multiple: false,
        data: {
          type: Object,
          default: () => {
            return {}
          }
        },
        name: this.name,
        'with-credentials': this.withCredentials,
        'show-file-list': true,
        drag: this.drag,
        accept: this.accept,
        'on-preview': this.handlePreview,
        'on-remove': this.handleRemove,
        'on-success': this.uploadSuccess,
        'on-error': this.uploadError,
        'on-progress': this.handFileProgress,
        'on-change': this.handleChange,
        'before-upload': this.handBeforeUpload,
        'before-remove': this.handBeforeRemove,
        'list-type': this.listType,
        'auto-upload': false,
        disabled: this.disabled,
        limit: this.limit,
        'on-exceed': this.onExceed
      }
      if (
        this.httpRequest != 'function' &&
        (!this.action.replace(/ /g, '') ||
          (config.action && !config.action.replace(/ /g, '')))
      ) {
        console.error(`action 为空, 无法获取上传配置`)
      }
      // 已用别的控制， 该处删除
      delete newConfig['file-list']
      delete newConfig.action

      typeof this.httpRequest == 'function' &&
        (newConfig['http-request'] = this.handHttpRequest)
      return newConfig
    }
  },
  mounted() {
    if (!this.$slots.default || (this.$slots.default && !this.showFileList)) {
      this.isShowList = false
    }
  },
  methods: {
    // 手动发起上传操作
    submit() {
      if (this.uploadList.length == 0) {
        try {
          $common.warning('请选取文件')
        } catch (e) {
          console.warn('请选取文件')
        }
        return
      }
      if (this.httpRequest == 'function') {
        this.$refs.pluploadfiledemo.submit()
        return
      }
      if (!this.getCodeUrl.replace(/ /g, '')) {
        try {
          $common.error('action 为空，无法获取上传配置')
        } catch (e) {
          console.error('action 为空，无法获取上传配置')
        }
        return
      }
      let file = this.uploadList[0]
      if (['init', 'success'].indexOf(file.status) > -1) {
        return
      } // 成功和初始化状态实不给再次上传，阻止多次上传
      this.uploadLoading = true
      this.progress.percentage > 0 && this.readyUpload()
      this.handProgress(true)
      this.$http
        .post(this.getCodeUrl, {
          filename: file.name,
          fileSize: file.size
        })
        .then(res => {
          if (!res.data.success || !res.data.result) {
            this.uploadEnd(false)
            this.handError(res, file, this.uploadList)
            return
          }
          this.addConfig.action = res.data.result.host
          this.addConfig.data = {
            name: file.name,
            key: res.data.result.dir,
            policy: res.data.result.policy,
            OSSAccessKeyId: res.data.result.accessid,
            success_action_status: 200,
            signature: res.data.result.signature
          }
          this.$nextTick(() => {
            this.$refs.pluploadfiledemo.submit()
          })
        })
        .catch(e => {
          this.uploadEnd(false)
          this.handError(e, file, this.uploadList)
        })
    },
    handExceed(files, list) {
      this.$nextTick(() => {
        this.onExceed(files, list)
      })
    },
    handHttpRequest() {
      this.$nextTick(() => {
        this.httpRequest()
      })
    },
    handBeforeRemove(file) {
      this.$nextTick(() => {
        this.beforeRemove(file)
      })
    },
    handBeforeUpload(file) {
      this.$nextTick(() => {
        this.beforeUpload(file)
      })
    },
    handFileProgress(event, file, list) {
      this.$nextTick(() => {
        this.onProgress(event, file, list)
      })
    },
    handlePreview(file) {
      this.$nextTick(() => {
        this.onPreview(file)
      })
    },
    // 上传成功时
    uploadSuccess(res, file, list) {
      this.uploadEnd(true)
      this.$nextTick(() => {
        this.onSuccess(res, file, list)
      })
    },
    // 上传失败时
    uploadError(err, file, list) {
      this.uploadEnd(false)
      this.handError(err, file, list)
    },
    handError(err, file, list) {
      this.$nextTick(() => {
        this.onError(err, file, list)
      })
    },
    // 文件变化时
    handleChange(file, list) {
      // 当文件上传失败时， 将状态设置为 准备 状态
      if (file.status == 'ready') {
        this.readyUpload()
      }
      if (file.status == 'fail') {
        file.status = 'ready'
      }
      // 重置为只有一个文件
      this.uploadList = [file]
      this.$nextTick(() => {
        this.onChange(file, list)
        // 是否自动上传
        this.autoUpload && this.submit()
      })
    },
    // 移除时回调
    handleRemove(file, list) {
      this.uploadList = []
      this.$nextTick(() => {
        this.onRemove(file, list)
      })
    },
    // 移除文件
    remobeFile() {
      let demo = document.querySelectorAll(
        `[fileplupload="${this.uploadCode}"].plupload-file-demo .el-upload-list .el-icon-close`
      )
      if (!demo.length) {
        return
      }
      demo[0].click()
      this.readyUpload()
    },
    // 上传结束
    uploadEnd(type) {
      this.uploadLoading = false
      this.progress.percentage = 100
      if (!type) {
        this.fileErrorTip.show = true
        this.progress.status = 'exception'
      } else {
        this.progress.status = 'success'
      }
      this.handProgress(false)
    },
    readyUpload() {
      this.fileErrorTip.show = false
      this.progress.percentage = 0
      this.progress.status = null
    },
    handProgress(type) {
      if (type) {
        this.progressOther.timer = setInterval(() => {
          this.progress.percentage += 1
        }, 100)
      } else {
        clearInterval(this.progressOther.timer)
      }
    }
  }
}
</script>
<style>
.plupload-file-demo {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.plupload-file-demo .el-upload {
  width: 100%;
}
.plupload-file-demo .plupload-file-item {
  display: inline-block;
  min-width: 100px;
  width: 100%;
  margin-bottom: 18px;
  padding: 1px 30px 1px 20px;
  text-align: left;
  color: #c0c4cc;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.plupload-file-demo .plupload-default .plupload-file-item {
  height: 40px;
  line-height: 38px;
}
.plupload-file-demo .plupload-medium .plupload-file-item {
  height: 36px;
  line-height: 34px;
}
.plupload-file-demo .plupload-small .plupload-file-item {
  height: 33px;
  line-height: 30px;
}
.plupload-file-demo .plupload-mini .plupload-file-item {
  height: 28px;
  line-height: 25px;
}
.plupload-file-demo .plupload-file-item.is-select {
  color: #333;
}
.plupload-file-demo .plupload-file-view {
  position: relative;
  display: inline-block;
  min-width: 50%;
  vertical-align: top;
}
.plupload-file-demo .plupload-file-btn {
  display: inline-block;
  max-width: 50%;
  vertical-align: top;
}
.plupload-file-demo.plupload-disabled .el-upload {
  cursor: not-allowed;
}
.plupload-file-demo.plupload-disabled .plupload-file-item {
  background-color: #f2f6fc;
}
.plupload-file-demo .file-mask-demo {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  cursor: default;
  z-index: 100;
}
.plupload-file-demo .progress-file-demo {
  position: absolute;
  bottom: 5px;
  width: 100%;
}
.plupload-file-demo .error-tips {
  position: absolute;
  bottom: -7px;
  padding-left: 15px;
  font-size: 12px;
  color: #f00;
}
.plupload-file-demo .el-upload-list {
  display: none;
}
.plupload-file-demo .remobe-file-btn {
  position: absolute;
  cursor: pointer;
  top: 50%;
  right: 0;
  padding: 5px;
  transform: translate(0, calc(-50% - 10px));
}
.plupload-file-demo.show-file-list .el-upload-list {
  display: block;
}
/* #F2F6FC */
</style>
