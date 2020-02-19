<template>
  <div id="slideButton">
    <div class="wrapper" @click="handleClick">
      <span class="text">{{ showContent ? extendText : hideText }}</span>
      <div :class="showContent ? 'hide-dot' : 'ext-dot'"></div>
    </div>
  </div>
</template>

<script>
// import $common from '../utils/common.js'

export default {
  name: 'el-fold-me',
  props: {
    /* 收起时显示的文字 */
    hideText: {
      type: String,
      default: '展开查询条件'
    },
    /* 展开时显示的文字 */
    extendText: {
      type: String,
      default: '收起查询条件'
    },
    /* 初始时是否展示 |默认false */
    show: {
      type: Boolean,
      default: false
    },
    /* 调整bar的位置 |  {top:"20px"} */
    barStyle: {
      type: Object
    }
  },
  data() {
    return { showContent: false }
  },
  watch: {
    show: {
      immediate: true,
      handler(v) {
        this.showContent = v
      }
    },
    barStyle(v) {
      if (v) {
        this.$nextTick(() => {
          for (let key in v)
            document.getElementById('slideButton').style[key] = v[key]
        })
      }
    }
  },
  methods: {
    handleClick() {
      this.showContent = !this.showContent
      this.$emit('slide-click', this.showContent)
    }
  }
}
</script>
<style scoped>
#slideButton {
  position: absolute;
  left: 50%;
  bottom: -30px;
  transform: translateX(-50%);
  width: 150px;
  height: 20px;
  background: tomato;
}

#slideButton .wrapper {
  cursor: pointer;
  border-bottom: 100px solid rgb(243, 243, 243);
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  width: 100%;
  margin-left: -50px;
}

#slideButton .wrapper .text,
#slideButton .wrapper .dot {
  position: absolute;
}
#slideButton .wrapper .text {
  left: 35px;
  color: rgb(70, 82, 102);
  font-family: Source Han Sans SC, PingFangSC-Light, helvetica neue,
    hiragino sans gb, arial, microsoft yahei ui, microsoft yahei, simsun,
    sans-serif;
  font-size: 14px;
}
#slideButton .wrapper .ext-dot {
  position: absolute;
  top: 8px;
  left: 20px;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
  border-color: rgb(160, 160, 160) transparent transparent transparent;
}
#slideButton .wrapper .hide-dot {
  position: absolute;
  top: 3px;
  left: 20px;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent rgb(160, 160, 160) transparent;
}
</style>
