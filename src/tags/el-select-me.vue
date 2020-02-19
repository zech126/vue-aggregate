<template>
  <!--业务代码区域-[start]-->
  <el-form-item
    border
    class="el-form-item-me"
    :class="cssFocus + ' ' + cssRequired"
    :label="formConfig.label"
    :prop="formConfig.prop"
  >
    <el-select
      class="el-select-me"
      @focus="onFocus('focus')"
      @blur="onFocus('blur')"
      @input="handleChange()"
      v-model="formValue"
      :placeholder="formConfig.placeholder"
      :multiple="formConfig.multiple"
      :disabled="formConfig.disabled"
      :valueKey="formConfig.valueKey"
      :size="formConfig.size"
      :clearable="formConfig.clearable"
      :collapseTags="formConfig.collapseTags"
      :multipleLimit="formConfig.multipleLimit"
      :name="formConfig.name"
      :autocomplete="formConfig.autocomplete"
      :filterable="formConfig.filterable"
      :allowCreate="formConfig.allowCreate"
      :filterMethod="formConfig.filterMethod"
      :remote="formConfig.remote"
      :remoteMethod="formConfig.remoteMethod"
      :loading="formConfig.loading"
      :loadingText="formConfig.loadingText"
      :noMatchText="formConfig.noMatchText"
      :noDataText="formConfig.noDataText"
      :popperClass="formConfig.popperClass"
      :reserveKeyword="formConfig.reserveKeyword"
      :defaultFirstOption="formConfig.defaultFirstOption"
      :popperAppendToBody="formConfig.popperAppendToBody"
      :automaticDropdown="formConfig.automaticDropdown"
      @change="change"
      @visible-change="visibleChange"
      @remove-tag="removeTag"
      @clear="clear"
    >
      <slot name="prefix"></slot>
      <slot name="empty"></slot>
      <slot></slot>
      <el-option
        :key="item[formConfig.props.label]"
        v-for="item in formConfig.option"
        :label="item[formConfig.props.label]"
        :value="item[formConfig.props.value]"
      ></el-option>
    </el-select>
    <span class="is-required-me">*</span>
    <div class="animate-bar" :class="cssFocus"></div>
  </el-form-item>
  <!--业务代码区域-[end]-->
</template>

<script>
import $common from '../utils/common.js'

export default {
  name: 'meSelect',
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
    'option',
    'props',
    'focus',
    'placeholder',

    'clearable',
    'filterable',
    'multiple',
    'disabled',
    'valueKey',
    'size',
    'collapseTags',
    'multipleLimit',
    'name',
    'autocomplete',
    'allowCreate',
    'filterMethod',
    'remote',
    'remoteMethod',
    'loading',
    'loadingText',
    'noMatchText',
    'noDataText',
    'popperClass',
    'reserveKeyword',
    'defaultFirstOption',
    'popperAppendToBody',
    'automaticDropdown'
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
        option: $common.useDefined(this.option, config.option),
        props: $common.useDefined(this.props, config.props), //用于下拉选项
        focus: $common.useDefined(config.focus, false),
        placeholder: $common.useDefined(
          this.placeholder,
          config.placeholder,
          this.label,
          config.label,
          ' '
        ),

        //其他配置属性
        clearable: $common.useDefined(this.clearable, config.clearable, true),
        filterable: $common.useDefined(
          this.filterable,
          config.filterable,
          true
        ),

        multiple: $common.useDefined(this.multiple, config.multiple, false),
        disabled: $common.useDefined(this.disabled, config.disabled, false),
        valueKey: $common
          .useDefined(this.valueKey, config.valueKey, this.formValue, '')
          .toString(),
        size: $common.useDefined(this.size, config.size),
        collapseTags: $common.useDefined(
          this.collapseTags,
          config.collapseTags,
          false
        ),
        multipleLimit: $common.useDefined(
          this.multipleLimit,
          config.multipleLimit,
          0
        ),
        name: $common.useDefined(this.name, config.name),
        autocomplete: $common.useDefined(
          this.autocomplete,
          config.autocomplete,
          'off'
        ),
        allowCreate: $common.useDefined(
          this.allowCreate,
          config.allowCreate,
          false
        ),
        filterMethod: $common.useDefined(
          this.filterMethod,
          config.filterMethod
        ),
        remote: $common.useDefined(this.remote, config.remote, false),
        remoteMethod: $common.useDefined(
          this.remoteMethod,
          config.remoteMethod
        ),
        loading: $common.useDefined(this.loading, config.loading, false),
        loadingText: $common.useDefined(
          this.loadingText,
          config.loadingText,
          '加载中'
        ),
        noMatchText: $common.useDefined(
          this.noMatchText,
          config.noMatchText,
          '无匹配数据'
        ),
        noDataText: $common.useDefined(
          this.noDataText,
          config.noDataText,
          '无数据'
        ),
        popperClass: $common.useDefined(this.popperClass, config.popperClass),
        reserveKeyword: $common.useDefined(
          this.reserveKeyword,
          config.reserveKeyword,
          false
        ),
        defaultFirstOption: $common.useDefined(
          this.defaultFirstOption,
          config.defaultFirstOption,
          false
        ),
        popperAppendToBody: $common.useDefined(
          this.popperAppendToBody,
          config.popperAppendToBody,
          true
        ),
        automaticDropdown: $common.useDefined(
          this.automaticDropdown,
          config.automaticDropdown,
          false
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
    setTimeout(() => {
      this.handleChange()
    }, 200) //二次修正处理
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
    onFocus(type) {
      if (type == 'focus') {
        this.formConfig.focus = true
        this.$emit('focus')
      } else {
        this.formConfig.focus = false
        this.$emit('blur')
      }
      this.focusTip = this.formConfig.focus
      setTimeout(() => {
        this.handleChange()
      }, 100)
    },

    /**事件转发 */
    change(item) {
      this.$emit('change', item)
    },
    visibleChange(item) {
      this.onFocus(item ? 'focus' : 'blur')
      this.$emit('visible-change', item)
    },
    removeTag(item) {
      this.$emit('remove-tag', item)
    },
    clear() {
      this.handleChange()
      this.$emit('clear')
    },

    // eslint-disable-next-line no-unused-vars
    checkError(option) {
      let eg = `
            <el-select-me  label="选择类型" v-model="roleType">
                <el-option label="类型1" value="1"></el-option>
                <el-option label="类型2" value="2"></el-option>
            </el-select-me>
            或
            <el-select-me  :config="config" v-model="roleType">
                <el-option label="类型1" value="1"></el-option>
                <el-option label="类型2" value="2"></el-option>
            </el-select-me>
            this.config = {
                label: "选择类型",
                option:[{ id:"1", text:"类型1" }, { id:"2", text:"类型2" }],
                props:{ value:'id', label:'text' }
            }
            `
      $common.useDefined(this.label, this.config && this.config.label) ==
      undefined
        ? console.error('[el-select-me] label参数必传，参数示例: ', eg)
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
