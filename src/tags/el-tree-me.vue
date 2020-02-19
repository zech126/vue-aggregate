<template>
  <div id="el-tree-me" style="margin:0; padding:0;">
    <div class="container">
      <div redefine-icon-blue eltreeinput v-if="!hideSearch">
        <el-input v-model="filterText" placeholder="输入关键字">
          <template slot="append">
            <el-button
              class="icon-indigo"
              icon="el-icon-refresh"
              title="刷新"
              @click="handleRefresh"
            ></el-button>
          </template>
        </el-input>
      </div>
      <el-scrollbar redefine overscroll class="treeHeight">
        <el-tree
          redefine
          class="simplicity"
          ref="elTreeMe"
          :data="treeData"
          :props="props"
          :node-key="nodeKey"
          :expand-on-click-node="false"
          :default-expand-all="defaultExpandAll"
          :default-expanded-keys="defaultExpandedKeyArr"
          :filter-node-method="filterNode"
          :check-on-click-node="true"
          @node-click="handleNodeClick"
          @node-expand="removeFocus"
          @node-collapse="removeFocus"
        >
        </el-tree>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import $common from '../utils/common.js'

export default {
  name: 'elTreeMe',
  props: {
    data: {
      //树数据
      type: Array,
      required: true
    },
    props: {
      type: Object,
      default: () => {
        return { children: 'children', label: 'label' }
      }
    },
    value: {
      //选中的对象数据
      type: Object,
      required: true
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    defaultExpandedKeys: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    hideSearch: {
      //是否隐藏搜索框
      type: Boolean,
      default: false
    },
    reClickCancel: {
      //再次点击是否取消选择
      type: Boolean,
      default: false
    },
    openFirstStage: {
      //默认展开第一级
      type: Boolean,
      default: false
    },
    lazyLoad: {
      //是否前端懒加载
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filterText: '',
      defaultExpandedKeyArr: [],
      treeData: []
    }
  },
  watch: {
    filterText(val) {
      this.$refs['elTreeMe'].filter(val)
    },
    data() {
      this.initialization()
    },
    defaultExpandedKeys() {
      this.defaultExpandedKeyArr = $common.copy(this.defaultExpandedKeys)
    }
  },
  created() {
    this.initialization()
  },
  methods: {
    initialization() {
      this.treeData = $common.copy(this.data) //复制树数据
      this.defaultExpandedKeyArr = $common.copy(this.defaultExpandedKeys) //复制默认展开的key
      this.checkExpandeFirst()
      this.setCurrentItem()
    },
    filterNode(value, data) {
      if (value) {
        let labelKey = this.props.label
        return data[labelKey].indexOf(value) !== -1
      } else {
        return true
      }
    },
    handleNodeClick(data, node, v) {
      const labelKey = this.props.label,
        nodeKey = this.nodeKey
      let newValue = {}
      if (this.value[nodeKey] === data[nodeKey] && this.reClickCancel) {
        //再次点击取消选中
        node.isCurrent = false
        node.checked = false
        v.$el.blur()
      } else {
        newValue = {
          [labelKey]: data[labelKey],
          [nodeKey]: data[nodeKey]
        }
      }
      this.$emit('input', newValue)
      this.$emit('node-click', data, node, v)
    },
    handleRefresh() {
      this.initialization()
    },
    checkExpandeFirst() {
      //默认展开第一级别
      let nodeKey = this.nodeKey,
        treeData = this.treeData
      if (treeData[0] && this.openFirstStage) {
        this.defaultExpandedKeyArr.push(treeData[0][nodeKey])
      }
    },
    setCurrentItem() {
      //设置默认选中
      let nodeKey = this.nodeKey,
        item = this.value,
        keyValue = item[nodeKey]
      if (!$common.isEmpty(keyValue)) {
        if (!this.defaultExpandAll) {
          //如果不是全部展开，要展开该item所在的树
          let parentKeyValue = this.getParentKeyValue(keyValue) //获取父级键值
          this.defaultExpandedKeyArr.push(parentKeyValue)
        }
        this.$nextTick(() => {
          //需要树重新渲染成功后再去设置
          this.$refs['elTreeMe'].setCurrentKey(keyValue)
        })
      }
    },
    getParentKeyValue(childrenKeyValue) {
      let nodeKey = this.nodeKey,
        childrenKey = this.props['children'], //prop中children对应的key
        result = '',
        findParentKey = function(array, parentKeyValue) {
          array.forEach(item => {
            if (result == '') {
              if (item[nodeKey] === childrenKeyValue) {
                result = parentKeyValue
              } else {
                if (item[childrenKey]) {
                  findParentKey(item[childrenKey], item[nodeKey])
                }
              }
            }
          })
          // for (let item of array) {
          //   if (item[nodeKey] === childrenKeyValue) {
          //     result = parentKeyValue
          //     return
          //   } else {
          //     if (item[childrenKey]) {
          //       findParentKey(item[childrenKey], item[nodeKey])
          //     }
          //   }
          // }
        }
      findParentKey(this.data)
      return result
    },
    removeFocus(data, node, v) {
      //移除树展开或合并时，会自动有focus状态的样式问题
      const nodeKey = this.nodeKey
      if (this.value[nodeKey] !== data[nodeKey]) {
        v.$el.blur()
      }
    }
  }
}
</script>

<style scoped>
.treeHeight {
  height: 70vh;
}
</style>
