<template>
  <!--业务代码区域-[start]-->
  <el-popover
    id="showColumn"
    class="el-show-column-popover-me"
    placement="left"
    width="330"
    trigger="click"
  >
    <el-form :inline="true" class="el-show-column-form-me">
      <el-form-item label="选择需要显示的列:" class="el-show-column-item-me">
        <el-checkbox-group v-model="showColumn">
          <el-checkbox
            style="width:150px; margin:0 5px;"
            :key="item.id"
            v-for="item in tableColumn"
            :label="item.label"
            :disabled="item.required"
            :checked="item.show"
            v-model="item.show"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <p slot="reference" class="el-button pl-15 pr-15 el-show-column-me">
      <!-- 如果slot无传值，则使用默认 -->
      <template v-if="!$slots.default">
        <i class="fa fa-filter primary"></i>
        <span>显示列</span>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </p>
  </el-popover>
  <!--业务代码区域-[end]-->
</template>

<script>
import $common from '../utils/common.js'

export default {
  name: 'showColumn',
  data() {
    return {
      msg: 'Welcome to showColumn ',
      showColumn: [],
      tableColumn: this.propsModelData.map(item => {
        Vue.set(item, 'show', $common.useDefined(item.show, true))
        return item
      })
    }
  },
  props: ['propsModelData'],
  model: {
    prop: 'propsModelData',
    event: 'setModelValue'
  },
  computed: {
    //
  },
  watch: {
    propsModelData(newValue) {
      this.tableColumn = newValue.map(item => {
        Vue.set(item, 'show', $common.useDefined(item.show, true))
        return item
      })
    },
    showColumn: function(newValue) {
      for (let i = 0; i < this.tableColumn.length; i++) {
        if (newValue.indexOf(this.tableColumn[i].label) > -1) {
          this.tableColumn[i].show = true
        } else {
          this.tableColumn[i].show = false
        }
      }
      this.$emit('setModelValue', this.tableColumn)
    }
  },
  created() {
    //
  },
  mounted() {
    //
  },
  methods: {
    //
  },
  components: {
    //
  }
}
</script>

<style scoped>
/** css */
</style>
