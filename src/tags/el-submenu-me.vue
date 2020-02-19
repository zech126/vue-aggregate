<template>
  <!--业务代码区域-[start]-->
  <el-submenu :index="index" v-if="ifShow">
    <template v-if="ifShow" slot="title">
      <i style="color:#61A4E4" class="fa fa-window-restore mr-5"></i>
      <slot v-if="ifShow" name="title"></slot>
    </template>
    <slot></slot>
  </el-submenu>
  <!--业务代码区域-[end]-->
</template>

<script>
export default {
  name: 'meSubMenu',
  data() {
    return {
      msg: 'Welcome to meSubMenu',
      ifShow: true
    }
  },
  props: ['index'],
  mounted() {
    //从$slots.default中提取各个slots的innerText值
    //如果innerText不为空则表示有下一级目录含有有权限的菜单
    const defaultSlots = this.$slots.default
    var ifShow = false
    for (let j = 0; j < defaultSlots.length; j++) {
      try {
        let innerText = defaultSlots[j].componentInstance.$el.innerText
        innerText ? (ifShow = true) : ''
      } catch (error) {
        //
      }
    }
    this.ifShow = ifShow
  }
}
</script>

<style scoped>
/** css */
</style>
