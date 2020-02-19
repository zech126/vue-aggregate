<template>
  <!--业务代码区域-[start]-->
  <el-form-item
    border
    class="el-form-item-me"
    :class="cssFocus + ' ' + cssRequired"
    :label="formConfig.label"
    :prop="formConfig.prop"
  >
    <el-time-picker
      class="el-time-picker-me"
      v-model="formValue"
      v-bind="formConfig"
      @focus="onFocus('focus')"
      @blur="onFocus('blur')"
      @input="handleChange()"
      @change="change"
      @clear="clear"
    >
      <slot name="prefix"></slot>
      <slot name="suffix"></slot>
      <slot name="prepend"></slot>
      <slot name="append"></slot>
      <slot></slot>
    </el-time-picker>
    <span class="is-required-me">*</span>
    <div class="animate-bar" :class="formConfig.focus ? 'active' : ''"></div>
  </el-form-item>
  <!--业务代码区域-[end]-->
</template>

<script>
import $common from '../utils/common.js'

export default {
  name: 'meInput',
  data() {
    return {
      msg: 'Welcome to meInput',
      formValue: this.propsModelData,
      requiredTip: true, //控制显示必填*号提示
      focusTip: false //标识当前是否属于focus状态
    }
  },
  props: [
    'propsModelData',
    'config',
    'prop',
    'label',
    'placeholder',
    //-----
    'type',
    'error',
    'readonly',
    'disabled',
    'editable',
    'clearable',
    'size',
    'startPlaceholder',
    'endPlaceholder',
    'isRange',
    'arrowControl',
    'align',
    'popperClass',
    'pickerOptions',
    'rangeSeparator',
    'defaultValue',
    'valueFormat',
    'showWordLimit',
    'prefixIcon',
    'suffixIcon',
    'name',
    'resize',
    'validateEvent'
  ],
  model: {
    prop: 'propsModelData',
    event: 'setModelValue'
  },
  computed: {
    cssFocus() {
      return this.focusTip ? 'active' : ''
    },
    cssRequired() {
      return this.requiredTip ? '' : 'is-no-asterisk'
    },
    formConfig() {
      var config = $common.useDefined(this.config, {})
      return {
        //必需属性
        prop: $common.useDefined(this.prop, config.prop), //用于表单校验
        label: $common.useDefined(this.label, config.label),
        placeholder: $common.useDefined(
          this.placeholder,
          config.placeholder,
          this.label,
          config.label,
          ' '
        ),
        focus: $common.useDefined(config.focus, false),

        //其他配置属性
        type: $common.useDefined(this.type, config.type, 'text'),
        error: $common.useDefined(this.error, config.error),
        readonly: $common.useDefined(this.readonly, config.readonly, false),
        disabled: $common.useDefined(this.disabled, config.disabled, false),
        editable: $common.useDefined(this.editable, config.editable, true),
        clearable: $common.useDefined(this.clearable, config.clearable, true),
        size: $common.useDefined(this.size, config.size),
        startPlaceholder: $common.useDefined(
          this.startPlaceholder,
          config['start-placeholder']
        ),
        endPlaceholder: $common.useDefined(
          this.endPlaceholder,
          config['end-placeholder']
        ),
        isRange: $common.useDefined(this.isRange, config['is-range'], false),
        arrowControl: $common.useDefined(
          this.arrowControl,
          config['arrow-control'],
          false
        ),

        align: $common.useDefined(this.align, config.align, 'left'),
        popperClass: $common.useDefined(
          this.popperClass,
          config['popper-class']
        ),
        pickerOptions: $common.useDefined(
          this.pickerOptions,
          config['picker-options'],
          {}
        ),
        rangeSeparator: $common.useDefined(
          this.rangeSeparator,
          config['range-separator'],
          '-'
        ),
        defaultValue: $common.useDefined(
          this.defaultValue,
          config['default-value']
        ),

        valueFormat: $common.useDefined(
          this.valueFormat,
          config['value-format']
        ),
        prefixIcon: $common.useDefined(this.prefixIcon, config.prefixIcon),
        suffixIcon: $common.useDefined(this.suffixIcon, config.suffixIcon),
        name: $common.useDefined(this.name, config.name),
        validateEvent: $common.useDefined(
          this.validateEvent,
          config['validate-event'],
          true
        )
      }
    }
  },
  watch: {
    propsModelData(val) {
      this.formValue = val
      this.handleChange()
    },
    // eslint-disable-next-line no-unused-vars
    config(val) {
      this.handleChange()
    },
    // eslint-disable-next-line no-unused-vars
    formConfig(val) {
      this.handleChange()
    }
  },
  created() {
    //
  },
  mounted() {
    //错误检查
    this.checkError()

    //初始化处理label和placeholder显示
    this.handleChange()
  },
  methods: {
    handleChange() {
      var config = $common.useDefined(this.config, {})
      this.formConfig.label = $common.useDefined(this.label, config.label)
      this.formConfig.placeholder = $common.useDefined(
        this.placeholder,
        config.placeholder,
        this.label,
        config.label,
        ' '
      )
      if (!this.formConfig.focus && $common.isEmpty(this.formValue)) {
        this.formConfig.label = ' '
        this.requiredTip = false
      } else {
        this.formConfig.placeholder = ''
        this.requiredTip = true
      }

      this.focusTip = this.formConfig.focus
      this.$emit('setModelValue', this.formValue)
      //强制更新数据绑定
      this.$forceUpdate()
    },
    onFocus(type) {
      this.formConfig.focus = type == 'focus' ? true : false
      this.focusTip = this.formConfig.focus
      setTimeout(() => {
        this.handleChange()
      }, 100)
    },

    /**事件转发 */
    change(item) {
      this.$emit('change', item)
    },
    clear() {
      this.handleChange()
      this.$emit('clear')
    },

    // eslint-disable-next-line no-unused-vars
    checkError(option) {
      let eg = `<el-time-picker-me  label="名称" v-model="roleName"></el-time-picker-me>或 <el-time-picker-me  :config={label: "名称"} v-model="roleName"></el-time-picker-me> `
      $common.useDefined(this.label, this.config && this.config.label) ==
      undefined
        ? console.error('[el-time-picker-me] label参数必传，参数示例: ', eg)
        : ''
    }
  },
  components: {
    //
  }
}
</script>

<style scoped>
/** css */
.el-form-item:not(.is-required) > .el-form-item__content > .is-required-me {
  display: none;
}
.el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__content
  > .is-required-me {
  display: none;
}
.el-form-item.is-required.is-no-asterisk
  > .el-form-item__content
  > .is-required-me {
  display: block;
  left: 5px;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  -webkit-transition: all 0.3s;
  height: 100%;
  color: rgb(223, 29, 29);
  text-align: center;
}
</style>
