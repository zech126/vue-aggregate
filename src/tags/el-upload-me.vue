<template>
  <div id="el-upload-me">
    <el-upload
      class="el-upload-me"
      :class="uploadClass"
      ref="el-upload-me"
      :file-list="uploadFileList"
      :action="uploadAction"
      :data="upAddData"
      :headers="$common.useDefined(this.headers, uploadAuthorization)"
      :multiple="uploadMultiple"
      :name="name"
      :with-credentials="withCredentials"
      :show-file-list="uploadShowFileList"
      :drag="drag"
      :accept="uploadAccept"
      :on-preview="onPreview"
      :on-remove="handleRemove"
      :on-success="handleOnSuccess"
      :on-error="handleOnError"
      :on-progress="handleProgress"
      :on-change="handleOnChange"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :list-type="listType"
      :auto-upload="$common.useDefined(this.autoUpload, false)"
      :http-request="httpRequest"
      :disabled="$common.useDefined(this.disabled, false)"
      :limit="uploadLimit"
      :on-exceed="handleOnExceed"
    >
      <!-- 计算right的值 -->
      <div class="before" :style="right">
        <slot name="before"></slot>
      </div>

      <!-- single模式，按钮下显示进度条 -->
      <div
        ref="trigger"
        class="pr inline-block"
        v-if="!$slots.trigger && this.uploadSingle"
      >
        <el-button slot="trigger" v-bind="uploadButtonBind">
          {{ uploadButtonText }}
          <el-tooltip v-if="positionTip == 'absolute'" placement="bottom">
            <div slot="content">{{ tip }}</div>
            <i class="el-icon-warning warning"></i>
          </el-tooltip>
        </el-button>
        <el-progress
          class="uploadProgress"
          :text-inside="true"
          :stroke-width="12"
          v-show="showProgress"
          :percentage="percentage"
          :status="progressStatus"
        ></el-progress>
      </div>

      <!-- multiple模式，多个附件上传 -->
      <el-button
        v-if="!$slots.trigger && this.uploadMultiple"
        slot="trigger"
        v-bind="uploadButtonBind"
      >
        {{ uploadButtonText }}
        <el-tooltip v-if="positionTip == 'absolute'" placement="bottom">
          <div slot="content">{{ tip }}</div>
          <i class="el-icon-warning warning"></i>
        </el-tooltip>
      </el-button>

      <!-- 默认模式（表单模式） -->
      <div
        ref="trigger"
        v-if="!$slots.trigger && !this.uploadMultiple && !this.uploadSingle"
        slot="trigger"
        @click.stop="handleClickFile($event)"
      >
        <el-input
          class="chooseFile"
          placeholder="请选择文件"
          readonly
          :disabled="$common.useDefined(this.disabled, false)"
          v-model="inputText"
        >
          <i
            v-if="inputText && uploadInputBind.clearable"
            slot="suffix"
            class="el-icon-circle-close el-input__icon"
            @click.stop="clearFiles()"
          >
          </i>
          <template slot="append">
            <el-button
              class="primary-important uploadButton"
              v-bind="uploadButtonBind"
            >
              {{ uploadButtonText }}
              <el-tooltip v-if="positionTip == 'absolute'" placement="bottom">
                <div slot="content">{{ tip }}</div>
                <i class="el-icon-warning warning"></i>
              </el-tooltip>
            </el-button>
            <slot name="append"></slot>
          </template>
        </el-input>
        <el-progress
          class="uploadProgress"
          :text-inside="true"
          :stroke-width="12"
          v-show="showProgress"
          :percentage="percentage"
          :status="progressStatus"
        ></el-progress>
      </div>

      <slot name="trigger"></slot>
      <slot></slot>

      <!-- 上传文件格式大小提示 -->
      <template v-if="positionTip == 'absolute'">
        <!--  -->
      </template>
      <el-tooltip v-else-if="positionTip == 'relative'" placement="bottom">
        <div slot="content">{{ tip }}</div>
        <i
          @click.stop
          class="ml--3 el-icon-warning warning el-upload-tip-me"
        ></i>
      </el-tooltip>
      <slot v-else class="el-upload-tip-me" name="tip"></slot>

      <slot name="after"></slot>
    </el-upload>
  </div>
</template>

<script>
import $common from '../utils/common.js'

export default {
  name: 'el-upload-me',
  data() {
    return {
      msg: 'Welcome el-upload-me',
      uploadFileList: [], //待上传文件列表
      fileData: { success: [], error: [] }, //上传文件列表信息
      fileCount: 0, //附件个数计算
      right: 'right:135px;', //计算调整before插槽的right
      inputText: '',
      percentage: 0,
      showProgress: false,
      progressStatus: 'success',
      onSubmitCallback: function() {}, //submit回调
      bigFileData: {},
      upAddData: {},
      getCodeUrl: '',
      uploadAction: ''
    }
  },
  computed: {
    uploadAuthorization() {
      return { Authorization: this.$store.state.$authorization }
    },
    uploadButtonText() {
      return $common.useDefined(this.buttonText, '上传附件')
    },
    uploadButtonBind() {
      return {
        type: $common.useDefined(this.buttonType, 'primary'), //新增属性，按钮type
        icon: $common.useDefined(this.buttonIcon, 'fa fa-cloud-upload mr-5'), //新增属性，按钮图标
        size: this.buttonSize, //新增属性，按钮尺寸
        plain: this.buttonPlain, //新增属性，按钮是否朴素按钮,false
        circle: this.buttonCircle, //新增属性，按钮是否圆形按钮,false
        loading: this.buttonLoading, //新增属性，按钮是否加载中状态,false
        disabled: this.buttonDisabled //新增属性，按钮是否禁用状态,false
      }
    },
    uploadInputBind() {
      return {
        clearable: $common.useDefined(this.inputClearable, true) //新增属性，input框是否可清空
      }
    },
    uploadClass() {
      if (this.uploadSingle) {
        return $common.useDefined(this.className, 'pr inline-block')
      } else {
        return $common.useDefined(this.className, 'pr mb-15 wd100 textRight')
      }
    },
    uploadSingle() {
      return $common.propNoFalse(this.single)
    },
    uploadMultiple() {
      return this.uploadSingle ? false : $common.propNoFalse(this.multiple)
    },
    uploadMaxSize() {
      return $common.useDefined(this.maxSize, 10 * 1048576) //1048576=1MB
    },
    uploadAccept() {
      let def =
        '.png,.jpg,.jpeg,.gif,.pdf,.txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.xml,.rar,.zip,.7z'
      return $common.useDefined(this.accept, def)
    },
    uploadLimit() {
      //单个文件上传模式，则limit=2以便实现先第二个时，覆盖第一个
      return !this.uploadMultiple ? 2 : $common.useDefined(this.limit, 9)
    },
    uploadShowFileList() {
      //单上文件上传模式，则showFileList=false，在input中显示
      return !this.uploadMultiple
        ? false
        : $common.useDefined(this.showFileList, true)
    },
    tip() {
      // eslint-disable-next-line no-useless-escape
      let def = this.uploadAccept.replace(/ */gi, '').replace(/\,/gi, '、')
      return `只能上传${def}文件，且不超过${$common.getFileSize(
        this.uploadMaxSize
      )}`
    },
    //
    uploadBigFile() {
      let newData = $common.useDefined(this.data, {})
      if ($common.useDefined(this.isBigFile, false)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.getCodeUrl = this.handlerUrl()
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.uploadAction = 'await'
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.bigFileData = newData
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.upAddData = {}
        return true
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.getCodeUrl = ''
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.uploadAction = this.handlerUrl()
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.bigFileData = {}
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.upAddData = newData
      return false
    }
  },
  props: [
    'class-name', //新增属性，给组件添加class,默认class='el-upload-me pr mb-15 wd100 textRight'
    'handleError', //新增属性，默认由组件统一错误提示,false则不提示
    'max-size', //新增属性，文件大小限制
    'position-tip', //新增属性，值absolute或relative，控制显示提示及位置
    'require', //新增属性，附件是否为空

    'button-text', //新增属性，按钮文本
    'button-icon', //新增属性，按钮图标
    'button-type', //新增属性，按钮文本
    'button-size', //新增属性，按钮尺寸
    'button-plain', //新增属性，按钮是否朴素按钮,false
    'button-circle', //新增属性，按钮是否圆形按钮,false
    'button-loading', //新增属性，按钮是否加载中状态,false
    'button-disabled', //新增属性，按钮是否禁用状态,false

    'input-clearable', //新增属性，(默认模式)input框是否可清空，true

    'data', //保存的业务参数，如业务ID等，使用方法和el-upload一致
    'single', //single模式进度条是绝对定位在按钮下方，设置single后multiple会属性会失效
    'multiple', //默认控制只能单个文件上传,添加multiple切换为多个文件上传模式，
    'action', //必传属性，组件内会自动补充$common.getDomain()，使用方法和el-upload一致
    'fileList', //文件列表信息，初始化传值[],或[{name:'123.pdf'}，{name:'456.txt'}]，使用方法和el-upload一致

    'headers',
    'name',
    'with-credentials',
    'show-file-list',
    'drag',
    'accept', //文件类型限制，使用方法和el-upload一致
    'on-preview',
    'on-remove',
    'on-success',
    'on-error',
    'on-complete', //新增的方法，所有文件处理完成后回调
    'on-progress',
    'on-change',
    'before-upload',
    'before-remove',
    'list-type',
    'auto-upload',
    'http-request',
    'disabled',
    'limit',
    'on-exceed',
    'is-big-file' // 新增属性，是否大文件上传(注意：大文件上传暂时只支持单个文件)
  ],
  watch: {
    // eslint-disable-next-line no-unused-vars
    uploadFileList: function(nVal, oVal) {
      this.updateArry(this.fileList, nVal)
    },
    // eslint-disable-next-line no-unused-vars
    fileCount: function(nVal, oVal) {
      if (nVal <= 0) {
        //全部文件已上传完成
        this.handleOnComplete()
      }
    }
  },
  created() {},
  mounted() {
    var propFileList = []
    try {
      if (this.fileList[0].name) {
        propFileList = this.fileList.map(item => {
          item.status = 'init'
          return item
        })
      }
    } catch (error) {
      //
    }

    if (!this.uploadMultiple) {
      //如果是单个模式，则只取this.fileList最后一个值
      if (propFileList.length > 0) {
        this.uploadFileList = [propFileList.pop()]
      }
    } else {
      this.uploadFileList = propFileList
    }
    this.inputText = this.uploadFileList[0] && this.uploadFileList[0].name

    const me = this
    this.$nextTick(() => {
      me.handleRight() //计算并调整before插槽的位置
      setTimeout(() => {
        me.handleRight()
      }, 1000)
    })
  },
  methods: {
    handlerUrl() {
      if (
        (this.action + '').startsWith('http:') ||
        (this.action + '').startsWith('https:')
      ) {
        return this.action
      } else {
        //如果是相对路径，则补充完整
        return (
          ($common.getDomain() + '/' + this.action)
            .replace(/\/+/gi, '/')
            // eslint-disable-next-line no-useless-escape
            .replace(/\:\/+/gi, '://')
        )
      }
    },
    clearFiles(type) {
      if ($common.propNoFalse(this.disabled)) {
        return false
      }
      if (type !== 0) {
        this.inputText = ''
        this.handleRemove(this.uploadFileList[0], this.uploadFileList)
      }
      this.$nextTick(() => {
        this.fileCount = 0
        // this.uploadFileList = []
        type === 0 ? this.handlerUploadFileList() : (this.uploadFileList = [])
        this.fileData = { success: [], error: [] }
      })
    },
    handlerUploadFileList() {
      // 当文件上传失败时， 将状态设置为 准备 状态
      this.uploadFileList = this.uploadFileList.filter(item => {
        item.status == 'fail' && (item.status = 'ready')
        return item.status == 'ready'
      })
    },
    abort(file) {
      this.$refs['el-upload-me'].abort(file)
    },
    submit(callback) {
      this.fileCount = this.uploadFileList.length
      let uploadBigFile = this.uploadBigFile
      this.$nextTick(() => {
        if (this.uploadFileList.length == 0) {
          if ($common.propNoFalse(this.require)) {
            $common.error('上传附件不能为空')
            callback && callback()
            return false
          }
          const formData = new FormData()
          Object.keys(this.upAddData).forEach(key => {
            formData.append(key, this.upAddData[key])
          })
          if (uploadBigFile) {
            // eslint-disable-next-line no-undef
            this.onSuccess && this.onSuccess(response, {}, [])
            this.onComplete && this.onComplete({ success: [], error: [] })
            // eslint-disable-next-line no-undef
            callback && callback(response)
          } else {
            this.$http
              .post(this.uploadAction, formData, {
                handleError: this.handleError
              })
              .then(response => {
                this.onSuccess && this.onSuccess(response, {}, [])
                this.onComplete && this.onComplete({ success: [], error: [] })
                callback && callback(response)
              })
              .catch(err => {
                this.onError && this.onError(err, {}, [])
                callback && callback(err)
              })
          }
        } else {
          let tool = {
            submitFile: () => {
              this.$nextTick(() => {
                this.$refs['el-upload-me'].submit()
                // 调用原生el-upload的.submit()方法时，把callback注入到onSubmitCallback中，与on-compelted同时回调
                callback && (this.onSubmitCallback = callback)
              })
            }
          }
          uploadBigFile
            ? this.handlerBigUpload({
                success: tool.submitFile,
                fail: () => {}
              })
            : tool.submitFile()
        }
      })
      if (this.uploadSingle && this.showProgress === false) {
        this.progressStatus = 'success'
        this.showProgress = true
      }
    },
    handlerBigUpload(option) {
      let file = this.uploadFileList[0]
      // eslint-disable-next-line no-unused-vars
      let addConfig = {}
      this.$http
        .post(this.getCodeUrl, {
          ...this.bigFileData,
          filename: file.name,
          fileSize: file.size
        })
        .then(res => {
          if (!res.data.success || !res.data.result) {
            option.fail && option.fail(res)
            return
          }
          this.uploadAction = res.data.result.host
          this.upAddData = {
            ...this.upAddData,
            name: file.name,
            key: res.data.result.dir,
            policy: res.data.result.policy,
            OSSAccessKeyId: res.data.result.accessid,
            success_action_status: 200,
            signature: res.data.result.signature
          }
          this.$nextTick(() => {
            option.success && option.success(res)
          })
        })
        .catch(e => {
          option.fail && option.fail(e)
        })
    },
    handleProgress(event, file, fileList) {
      this.onProgress && this.onProgress(event, file, fileList)
      if (this.showProgress === false) {
        this.progressStatus = 'success'
        this.showProgress = true
      }
      this.percentage = Math.floor(file.percentage)
    },
    handleOnComplete() {
      this.onComplete && this.onComplete(this.fileData)
      this.onSubmitCallback && this.onSubmitCallback(this.fileData)
      this.clearFiles(0)

      setTimeout(() => {
        this.showProgress = false
      }, 2000)
    },
    handleOnSuccess(response, file, fileList) {
      this.onSuccess && this.onSuccess(response, file, fileList)
      this.fileData.success.push({
        data: this.upAddData,
        file: file,
        result: response
      })
      this.fileCount--
    },
    handleOnError(err, file, fileList) {
      this.onError && this.onError(err, file, fileList)
      this.fileData.error.push({
        data: this.upAddData,
        file: file,
        result: err
      })
      this.fileCount--

      //默认由组件统一做错误提示
      if (this.handleError !== false) {
        this.progressStatus = 'exception'
        var errorMsg = ''
        try {
          errorMsg = $common.toObject(err.message).reason || '请重新添加上传'
        } catch (error) {
          errorMsg = '请重新添加上传'
        }
        $common.error({
          title: file.name,
          message: '[上传失败]：' + errorMsg
        })
      }
    },
    handleOnChange(file, fileList) {
      fileList = fileList.filter(item => {
        return item.status !== 'init'
      })
      if (!this.uploadMultiple || this.uploadBigFile) {
        //如果是单个模式，则只取fileList最后一个值
        fileList = [file]
      }

      //过滤处理重复文件
      let myFileList = $common.distinctArryObject([...fileList, file], 'name')
      //过滤处理超大文件
      var nFiles = []
      for (let i = 0; i < myFileList.length; i++) {
        if (myFileList[i].size > this.uploadMaxSize) {
          //1048576 1MB
          $common.error({
            title: myFileList[i].name,
            message: `单个文件大小应<=${$common.getFileSize(
              this.uploadMaxSize
            )}`
          })
        } else {
          nFiles.push(myFileList[i])
        }
      }
      this.uploadFileList = nFiles
      this.onChange && this.onChange(file, nFiles)
      this.inputText = this.uploadFileList[0].name
    },
    handleRemove(file, fileList) {
      this.uploadFileList = fileList
      this.onRemove && this.onRemove(file, fileList)
    },
    handleOnExceed(files, fileList) {
      if (!this.onExceed) {
        $common.error({
          title: '单次上传文件数量超出限制',
          message: `单次上传文件数量应<=${this.uploadLimit}`
        })
      } else {
        this.onExceed(files, fileList)
      }
    },
    handleRight() {
      //计算调整before插槽的right
      try {
        let offsetWidth =
          this.$refs['el-upload-me'].offsetWidth ||
          this.$refs['el-upload-me'].$el.offsetWidth
        let offsetLeft =
          this.$refs['trigger'].offsetLeft ||
          this.$refs['trigger'].$el.offsetLeft
        let right = offsetWidth - offsetLeft
        right > 0 ? (this.right = `right:${right}px;`) : ''
      } catch (error) {
        //
      }
    },
    handleClickFile({ target: { tagName } }) {
      if (tagName == 'INPUT') {
        if (this.uploadFileList.length == 0) {
          this.$refs['el-upload-me'].$refs['upload-inner'].$el.click()
        } else {
          this.$emit('input-click', this.uploadFileList[0], this.uploadFileList)
        }
      } else {
        this.$refs['el-upload-me'].$refs['upload-inner'].$el.click()
      }
    },
    updateArry(oArr, nArr) {
      //数组浅拷贝方式赋值，保持引用
      if (!(oArr instanceof Array) || !(nArr instanceof Array)) {
        return false
      }
      oArr = $common.useDefined(oArr, [])
      //清空原数组
      let oLen = oArr.length
      for (let i = 0; i < oLen; i++) {
        oArr.shift()
      }
      //重新赋值
      for (let i = 0; i < nArr.length; i++) {
        oArr.push(nArr[i])
      }
    }
  }
}
</script>
<style>
#el-upload-me .before {
  position: absolute;
  top: 0;
  right: 135px;
}

#el-upload-me .el-upload-dialog-Form {
  position: relative;
  width: 100%;
  text-align: right;
}
#el-upload-me .el-upload-dialog-Form > .el-upload {
  width: 100%;
}
#el-upload-me .el-upload-dialog-Form > .el-upload .el-input.el-input--suffix {
  margin-right: 0;
}

#el-upload-me
  .el-upload-dialog-Form
  > .el-upload
  .el-input.el-input--suffix
  .el-input__icon.el-input__validateIcon {
  /* 表单中使用时，默认去掉校验结果的小图标 */
  display: none;
}

#el-upload-me .el-upload-dialog-Form .el-input-group__append {
  border: none !important;
  outline: none !important;
  border-top: 8px solid #ffffff !important;
  /* border-left: 5px solid #ffffff !important; */
  border-right: 5px solid #ffffff !important;
  border-bottom: 8px solid #ffffff !important;
  border-radius: 0px;
  background: #fff;
}
#el-upload-me .chooseFile:not(.is-disabled) .el-input__inner {
  cursor: pointer;
}

#el-upload-me .chooseFile:not(.is-disabled) .el-input__inner:hover {
  color: rgb(38, 128, 235);
}

.uploadProgress {
  position: absolute;
  left: 0;
  bottom: -13px;
  width: 100%;
  z-index: 1100;
}
</style>
