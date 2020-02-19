<template>
  <!--业务代码区域-[start] el-autocomplete -->
  <el-form-item
    border
    class="el-form-item-me"
    :class="cssFocus + ' ' + cssRequired"
    :label="formConfig.label"
    :prop="formConfig.prop"
  >
    <el-autocomplete
      class="el-autocomplete-me"
      @focus="onFocus"
      @blur="onBlur"
      @input="handleChange()"
      v-model="formValue"
      :placeholder="formConfig.placeholder"
      :fetch-suggestions="handleFetchSuggestions"
      :trigger-on-focus="formConfig.triggerOnFocus"
      :type="formConfig.type"
      :error="formConfig.error"
      :readonly="formConfig.readonly"
      :disabled="formConfig.disabled"
      :clearable="formConfig.clearable"
      :size="formConfig.size"
      :maxlength="formConfig.maxlength"
      :minlength="formConfig.minlength"
      :showWordLimit="formConfig.showWordLimit"
      :prefixIcon="formConfig.prefixIcon"
      :suffixIcon="formConfig.suffixIcon"
      :rows="formConfig.rows"
      :autosize="formConfig.autosize"
      :autocomplete="formConfig.autocomplete"
      :name="formConfig.name"
      :max="formConfig.max"
      :min="formConfig.min"
      :step="formConfig.step"
      :resize="formConfig.resize"
      :autofocus="formConfig.autofocus"
      :form="formConfig.form"
      :tabindex="formConfig.tabindex"
      :validateEvent="formConfig.validateEvent"
      @select="select"
      @change="change"
      @clear="clear"
    >
      <slot name="prefix"></slot>
      <slot name="suffix"></slot>
    </el-autocomplete>
    <span class="is-required-me">*</span>
    <div class="animate-bar" :class="cssFocus"></div>
  </el-form-item>
  <!--业务代码区域-[end]-->
</template>

<script>
import $common from '../utils/common.js'

export default {
  name: 'autocomplete',
  data() {
    return {
      msg: 'Welcome to meSelect',
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

    'triggerOnFocus',
    'type',
    'error',
    'readonly',
    'disabled',
    'clearable',
    'size',
    'maxlength',
    'minlength',
    'showWordLimit',
    'prefixIcon',
    'suffixIcon',
    'rows',
    'autosize',
    'autocomplete',
    'name',
    'max',
    'min',
    'step',
    'resize',
    'autofocus',
    'form',
    'tabindex',
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

        /**triggerOnFocus：true时，表示获取光标即调用handleFetchSuggestions方法进行远程搜索**/
        triggerOnFocus: $common.useDefined(
          this.triggerOnFocus,
          config.triggerOnFocus,
          false
        ),

        //其他配置属性
        type: $common.useDefined(this.type, config.type, 'text'),
        error: $common.useDefined(this.error, config.error),
        readonly: $common.useDefined(this.readonly, config.readonly, false),
        disabled: $common.useDefined(this.disabled, config.disabled, false),
        clearable: $common.useDefined(this.clearable, config.clearable, false),
        size: $common.useDefined(this.size, config.size),
        maxlength: $common.useDefined(this.maxlength, config.maxlength),
        minlength: $common.useDefined(this.minlength, config.minlength),
        showWordLimit: $common.useDefined(
          this.showWordLimit,
          config.showWordLimit,
          false
        ),
        prefixIcon: $common.useDefined(this.prefixIcon, config.prefixIcon),
        suffixIcon: $common.useDefined(this.suffixIcon, config.suffixIcon),
        rows: $common.useDefined(this.rows, config.rows, 2),
        autosize: $common.useDefined(this.autosize, config.autosize, false),
        autocomplete: $common.useDefined(
          this.autocomplete,
          config.autocomplete,
          'off'
        ),
        name: $common.useDefined(this.name, config.name),
        max: $common.useDefined(this.max, config.max),
        min: $common.useDefined(this.min, config.min),
        step: $common.useDefined(this.step, config.step),
        resize: $common.useDefined(this.resize, config.resize),
        autofocus: $common.useDefined(this.autofocus, config.autofocus, false),
        form: $common.useDefined(this.form, config.form),
        tabindex: $common.useDefined(this.tabindex, config.tabindex),
        validateEvent: $common.useDefined(
          this.validateEvent,
          config.validateEvent,
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
      this.$forceUpdate()
    },
    onFocus(e) {
      this.$emit('focus', e)
      this.formConfig.focus = true
      this.focusTip = true
      setTimeout(() => {
        this.handleChange()
      }, 100)
    },
    onBlur(e) {
      this.$emit('blur', e)
      this.formConfig.focus = false
      this.focusTip = false
      setTimeout(() => {
        this.handleChange()
      }, 100)
    },
    handleFetchSuggestions(queryString, callback) {
      //输入值时触发的事件（如：远程搜索callback返回下拉输入建议）
      this.$emit('fetch-suggestions', queryString, callback)
    },

    /**事件转发 */
    select(e) {
      //选择下拉框中的选项（输入建议项）时触发的事件
      this.$emit('select', e)
    },
    change(e) {
      this.$emit('change', e)
    },
    clear(e) {
      this.handleChange()
      this.$emit('clear', e)
    },

    // eslint-disable-next-line no-unused-vars
    checkError(option) {
      let eg = `
            <el-autocomplete-me  label="姓名" v-model="roleName"></el-autocomplete-me>
            或
            <el-autocomplete-me  :config={label: "姓名"} v-model="roleName"></el-autocomplete-me>
            `
      $common.useDefined(this.label, this.config && this.config.label) ==
      undefined
        ? console.error('[el-autocomplete-me] label参数必传，参数示例: ', eg)
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
