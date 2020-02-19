<template>
  <!--业务代码区域-[start]-->
  <elx-editable-column
    class="elx-editable-column-me"
    :prop="tableColumn.prop"
    :label="tableColumn.label"
    v-if="tableColumn.show"
    :type="tableColumn.type"
    :index="tableColumn.index"
    :columnKey="tableColumn.columnKey"
    :width="tableColumn.width"
    :minWidth="tableColumn.minWidth"
    :renderHeader="tableColumn.renderHeader"
    :sortable="tableColumn.sortable"
    :sortMethod="tableColumn.sortMethod"
    :sortBy="tableColumn.sortBy"
    :sortOrders="tableColumn.sortOrders"
    :resizable="tableColumn.resizable"
    :formatter="tableColumn.formatter"
    :showOverflowTooltip="tableColumn.showOverflowTooltip"
    :align="tableColumn.align"
    :headerAlign="tableColumn.headerAlign"
    :className="tableColumn.className"
    :labelClassName="tableColumn.labelClassName"
    :selectable="tableColumn.selectable"
    :reserveSelection="tableColumn.reserveSelection"
    :filters="tableColumn.filters"
    :filterPlacement="tableColumn.filterPlacement"
    :filterMultiple="tableColumn.filterMultiple"
    :filterMethod="tableColumn.filterMethod"
    :filteredValue="tableColumn.filteredValue"
    :edit-render="tableColumn.editRender"
  >
    <slot
      name="header"
      slot-scope="scope"
      :row="scope.row"
      :$index="scope.$index"
    ></slot>
    <slot
      slot-scope="scope"
      :row="scope.row"
      :column="scope.column"
      :$index="scope.$index"
    ></slot>
  </elx-editable-column>
  <!--业务代码区域-[end]-->
</template>

<script>
import $common from '../utils/common.js'

export default {
  name: 'meEditableColumn',
  data() {
    return {
      msg: 'Welcome to meEditableColumn',
      formValue: this.propsModelData
    }
  },
  props: [
    'propsModelData',
    'config',

    'prop',
    'label',
    'type',
    'index',
    'columnKey',
    'width',
    'minWidth',
    'renderHeader',
    'sortable',
    'sortMethod',
    'sortBy',
    'sortOrders',
    'resizable',
    'formatter',
    'showOverflowTooltip',
    'align',
    'headerAlign',
    'className',
    'labelClassName',
    'selectable',
    'reserveSelection',
    'filters',
    'filterPlacement',
    'filterMultiple',
    'filterMethod',
    'filteredValue',
    'editRender'
  ],
  model: {
    prop: 'propsModelData',
    event: 'setModelValue'
  },
  computed: {
    $model() {
      return this.$store.state.$model
    },
    tableColumn() {
      var config = this.config || {}
      return {
        //必需属性
        prop: $common.useDefined(this.prop, config.prop),
        label: $common.useDefined(this.label, config.label),

        //新增是否显示属性（默认显示），用于显示列操作
        show: $common.useDefined(config.show, true),
        //新增是否必须显示属性（默认非必须），用于显示列操作
        required: $common.useDefined(config.required, false),

        //其他配置属性
        width: $common.useDefined(this.width, config.width),
        minWidth: $common.useDefined(this.minWidth, config.minWidth),
        type: $common.useDefined(this.type, config.type),
        index: $common.useDefined(this.index, config.index),
        columnKey: $common.useDefined(this.columnKey, config.columnKey),
        renderHeader: $common.useDefined(
          this.renderHeader,
          config.renderHeader
        ),
        sortable: $common.useDefined(this.sortable, config.sortable, false),
        sortMethod: $common.useDefined(this.sortMethod, config.sortMethod),
        sortBy: $common.useDefined(this.sortBy, config.sortBy),
        sortOrders: $common.useDefined(this.sortOrders, config.sortOrders),
        resizable: $common.useDefined(this.resizable, config.resizable, true),
        formatter: $common.useDefined(this.formatter, config.formatter),
        showOverflowTooltip: $common.useDefined(
          this.showOverflowTooltip,
          config.showOverflowTooltip,
          true
        ),
        align: $common.useDefined(this.align, config.align, 'left'),
        headerAlign: $common.useDefined(this.headerAlign, config.headerAlign),
        className: $common.useDefined(this.className, config.className),
        labelClassName: $common.useDefined(
          this.labelClassName,
          config.labelClassName
        ),
        selectable: $common.useDefined(this.selectable, config.selectable),
        reserveSelection: $common.useDefined(
          this.reserveSelection,
          config.reserveSelection,
          false
        ),
        filters: $common.useDefined(this.filters, config.filters),
        filterPlacement: $common.useDefined(
          this.filterPlacement,
          config.filterPlacement
        ),
        filterMultiple: $common.useDefined(
          this.filterMultiple,
          config.filterMultiple
        ),
        filterMethod: $common.useDefined(
          this.filterMethod,
          config.filterMethod
        ),
        filteredValue: $common.useDefined(
          this.filteredValue,
          config.filteredValue
        ),
        editRender: $common.useDefined(this.editRender, config.editRender)
      }
    }
  },
  watch: {
    propsModelData(val) {
      this.formValue = val
    },
    // eslint-disable-next-line no-unused-vars
    config(val) {
      //
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
