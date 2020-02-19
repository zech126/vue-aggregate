<template>
  <!--业务代码区域-[start]-->

  <el-tooltip
    effect="dark"
    :content="tipsText"
    placement="bottom"
    :disabled="tipsText.length == 0 || other.disabled"
    :open-delay="1000"
  >
    <el-button
      v-bind="buttonConfig"
      @click="click($event)"
      class="custom-button"
      :class="{ 'is-disabled': other.disabled }"
      :title="title"
    >
      <template v-if="isShowText">
        <slot name="prefix"></slot>
        <slot name="suffix"></slot>
        <slot name="prepend"></slot>
        <slot name="append"></slot>
        <slot></slot>
      </template>
    </el-button>
  </el-tooltip>
  <!--业务代码区域-[end]-->
</template>

<script>
import $common from '../utils/common.js'
export default {
  name: 'elButtonIconMe',
  components: {},
  data() {
    return {
      msg: 'Welcome to elButtonIconMe',
      // 存放初始值
      oldConfig: {},
      isShowText: false,
      timeout: null,
      tipsText: '',
      other: {}
    }
  },
  props: [
    'size',
    'type',
    'plain',
    'round',
    'circle',
    'loading',
    'disabled',
    'icon',
    'autofocus',
    'nativeType',
    'config',
    'strLength',
    'title'
  ],
  model: {},
  computed: {
    buttonConfig() {
      let config = $common.useDefined(this.config, {})
      let newConfig = {
        size: $common.useDefined(this.size, config.size, 'medium'),
        // type: $common.useDefined(this.type, config.type, ''),
        type: '',
        plain: $common.useDefined(this.plain, config.plain, false),
        round: $common.useDefined(this.round, config.round, false),
        circle: $common.useDefined(this.circle, config.circle, true),
        loading: $common.useDefined(this.sloadingize, config.loading, false),
        icon: this.isShowText
          ? ''
          : $common.useDefined(this.icon, config.icon, ''),
        autofocus: $common.useDefined(this.autofocus, config.autofocus, false),
        nativeType: $common.useDefined(
          this.nativeType,
          config.nativeType,
          'button'
        ),
        strLength: $common.useDefined(this.strLength, config.strLength, 5),
        title: $common.useDefined(this.title, config.title, ''),
        disabled: $common.useDefined(this.disabled, config.disabled, false)
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.oldConfig = JSON.parse(JSON.stringify(newConfig))
      return newConfig
    }
  },
  watch: {
    buttonConfig: {
      deep: true,
      immediate: true,
      // eslint-disable-next-line no-unused-vars
      handler(val) {
        let config = $common.useDefined(this.config, {})
        this.tipsText =
          this.$slots.default &&
          this.$slots.default[0] &&
          this.$slots.default[0].text
            ? this.$slots.default[0].text
            : ''
        this.other = {
          disabled: $common.useDefined(this.disabled, config.disabled, false)
        }
      }
    }
  },
  mounted() {
    //错误检查
    this.checkError()
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    checkError(option) {
      let eg = `
            <el-button-icon-me  icon="el-icon-edit"></el-button-icon-me>
            或
            <el-button-icon-me  :config={icon: "el-icon-edit"}></el-button-icon-me>
            `
      !this.icon && this.config && !this.config.icon
        ? console.error('[el-button-icon-me] icon 参数必传，参数示例: ', eg)
        : ''
    },
    click(e) {
      if (this.other.disabled) {
        return
      }
      this.$emit('click', e)
    },
    // eslint-disable-next-line no-unused-vars
    mouseenter(e) {
      if (!this.$slots.default) {
        return
      }
      this.timeout = setTimeout(() => {
        this.isShowText = true
        this.$slots.default[0].text = this.$slots.default[0].text
          .trim()
          .substr(0, this.buttonConfig.strLength)
        if (!this.oldConfig.circle) {
          return
        }
        this.buttonConfig.round = true
        this.buttonConfig.circle = false
      }, 1000)
    },
    // eslint-disable-next-line no-unused-vars
    mouseleave(e) {
      this.timeout && clearTimeout(this.timeout)
      if (!this.$slots.default) {
        return
      }
      this.isShowText = false
      if (!this.oldConfig.circle) {
        return
      }
      this.buttonConfig.circle = true
      this.buttonConfig.round = false
    }
  }
}
</script>

<style scoped>
/** css */
.custom-button.el-button {
  padding: 3px;
  background: none;
  border: none;
  color: #409eff;
}
.custom-button.el-button:focus,
.custom-button.el-button:hover {
  color: #409eff;
}
.custom-button.el-button.is-disabled,
.custom-button.el-button.is-disabled:focus,
.custom-button.el-button.is-disabled:hover {
  color: #c0c4cc;
}
</style>
<style>
.custom-button.el-button i {
  font-size: 1.3em;
}
</style>
