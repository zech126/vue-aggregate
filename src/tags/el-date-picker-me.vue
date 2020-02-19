<template>
  <!--业务代码区域-[start]-->
  <el-form-item
    border
    class="el-form-item-me"
    :class="cssFocus + ' ' + cssRequired"
    :label="formConfig.label"
    :prop="formConfig.prop"
  >
    <el-date-picker
      class="el-date-picker-me"
      v-model="formValue"
      v-bind="formConfig"
      @focus="onFocus('focus')"
      @blur="onFocus('blur')"
      @input="handleChange()"
      @change="change"
      @clear="clear"
    >
      <slot></slot>
    </el-date-picker>
    <span class="is-required-me">*</span>
    <div class="animate-bar" :class="cssFocus"></div>
  </el-form-item>
  <!--业务代码区域-[end]-->
</template>

<script>
import $common from '../utils/common.js'

export default {
  name: 'meInput',
  data() {
    var config = this.config || {}
    var startClearableText =
      this.startClearableText ||
      '清空' +
        $common.useDefined(
          this.startPlaceholder,
          config['start-placeholder'],
          '开始日期'
        )
    var endClearableText =
      this.endClearableText ||
      '清空' +
        $common.useDefined(
          this.endPlaceholder,
          config['end-placeholder'],
          '结束日期'
        )

    return {
      msg: 'Welcome to meInput',
      formValue: this.propsModelData,
      requiredTip: true, //控制显示必填*号提示
      focusTip: false, //标识当前是否属于focus状态

      myClearableForOne: false,
      defaultPickerOptions: {
        shortcuts: [
          {
            text: startClearableText,
            onClick(picker) {
              // eslint-disable-next-line no-unused-vars
              const start = new Date(picker.value[0])
              const end = new Date(picker.value[1])
              picker.$emit('pick', ['', end])
            }
          },
          {
            text: endClearableText,
            onClick(picker) {
              const start = new Date(picker.value[0])
              // eslint-disable-next-line no-unused-vars
              const end = new Date(picker.value[1])
              picker.$emit('pick', [start, ''])
            }
          }
        ]
      }
    }
  },
  props: [
    'propsModelData',
    'config',
    'prop',
    'label',
    'placeholder',
    //-----

    'clearableForOne', //是否开启可“清除开始日期”和及“清除结束日期”模式
    'startClearableText', //清空开始日期
    'endClearableText', //清空结束日期

    'type',
    'error',
    'readonly',
    'disabled',
    'editable',
    'clearable',
    'size',
    'startPlaceholder',
    'endPlaceholder',
    'format',
    'align',
    'popperClass',
    'pickerOptions',
    'rangeSeparator',
    'defaultValue',
    'defaultTime',
    'valueFormat',
    'unlinkPanels',
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
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.myClearableForOne =
        $common.useDefined(this.clearableForOne, config.clearableForOne) === ''
          ? true
          : $common.useDefined(
              this.clearableForOne,
              config.clearableForOne,
              false
            )

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
          config['start-placeholder'],
          '开始日期'
        ),
        endPlaceholder: $common.useDefined(
          this.endPlaceholder,
          config['end-placeholder'],
          '结束日期'
        ),
        format: $common.useDefined(this.format, config.format, 'yyyy-MM-dd'),
        align: $common.useDefined(this.align, config.align, 'left'),
        popperClass: $common.useDefined(
          this.popperClass,
          config['popper-class']
        ),
        pickerOptions: $common.useDefined(
          this.pickerOptions,
          config['picker-options'],
          this.myClearableForOne && this.defaultPickerOptions //开启可清除时间范围其中一个值模式
        ),
        rangeSeparator: $common.useDefined(
          this.rangeSeparator,
          config['range-separator'],
          '至'
        ),
        defaultValue: $common.useDefined(
          this.defaultValue,
          config['default-value']
        ),
        defaultTime: $common.useDefined(
          this.defaultTime,
          config['default-time']
        ),

        valueFormat: this.myClearableForOne
          ? undefined
          : $common.useDefined(
              this.valueFormat,
              config['value-format'],
              'yyyy-MM-dd'
            ),
        unlinkPanels: $common.useDefined(
          this.unlinkPanels,
          config['unlink-panels'],
          true
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
  mounted() {
    //错误检查
    this.checkError()

    //初始化处理label和placeholder显示
    this.handleChange()
  },
  methods: {
    handleChange() {
      //this.valueFormat
      var config = $common.useDefined(this.config, {})
      this.formConfig.label = $common.useDefined(this.label, config.label)
      this.formConfig.placeholder = $common.useDefined(
        this.placeholder,
        config.placeholder,
        this.label,
        config.label,
        ' '
      )

      try {
        if (this.myClearableForOne) {
          this.formValue[0] =
            new Date(this.formValue[0]) == 'Invalid Date'
              ? ''
              : new Date(this.formValue[0]).Format(
                  this.valueFormat || 'yyyy-MM-dd'
                )
          this.formValue[1] =
            new Date(this.formValue[1]) == 'Invalid Date'
              ? ''
              : new Date(this.formValue[1]).Format(
                  this.valueFormat || 'yyyy-MM-dd'
                )
          if (
            $common.isEmpty(this.formValue[0]) &&
            $common.isEmpty(this.formValue[1])
          ) {
            this.formValue = null
          }
        }
      } catch (error) {}

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
      let eg = `<el-date-picker-me  label="日期" v-model="selDate"></el-date-picker-me>或
				<el-date-picker-me  :config={label: "日期"} v-model="selDate"></el-date-picker-me>
								 `
      $common.useDefined(this.label, this.config && this.config.label) ==
      undefined
        ? console.error('[el-date-picker-me] label参数必传，参数示例: ', eg)
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
/* .el-form-item.is-required.is-no-asterisk > .el-form-item__content > .is-required-me[data-v-3055e358]{
	left:-1px;
} */
.el-form-item-me .el-range-editor {
  border: 0px;
}
/* .el-form-item-me .el-date-picker-me .el-input__inner{
	text-indent: 22px !important;
} */
</style>
