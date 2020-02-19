<template>
  <!--业务代码区域-[start]-->
  <el-menu-item :index="index" v-if="hasPermission(index)">
    <i style="color:#61A4E4" class="fa fa-futbol-o mr-5"></i>
    <slot></slot>
  </el-menu-item>
  <!--业务代码区域-[end]-->
</template>

<script>
import $common from '../utils/common.js'

export default {
  name: 'meMenuItem',
  data() {
    return {
      msg: 'Welcome to meMenuItem'
    }
  },
  props: ['index'],
  computed: {},
  created() {
    //
  },
  mounted() {
    //
  },
  methods: {
    hasPermission(...index) {
      return $common.hasPermission(...index)
    }
  },
  components: {
    //
  }
}
</script>

<style scoped>
/** css */
</style>
