<template>
  <div id="pagination" style="margin:0; padding:0;">
    <div class="container mb-0">
      <!--业务代码区域-[start]-->
      <el-row
        class="pageContainer el-pagination-item-me"
        type="flex"
        justify="space-between"
        align="bottom"
      >
        <el-col
          class="page-info "
          :span="fitWidth({ xs: 0, sm: 0, md: 0, lg: 6, xl: 6 })"
        >
          <h2>第{{ myFrom }}-{{ myTo }}条,共{{ myTotalPages }}页记录</h2>
        </el-col>
        <el-col
          class="page-control "
          :span="fitWidth({ xs: 24, sm: 24, md: 24, lg: 18, xl: 18 })"
        >
          <el-pagination
            class="el-pagination-me"
            :small="mySmall"
            redefine
            background
            layout="total, sizes, prev, pager, next, jumper"
            :pager-count="myPagerCount"
            :current-page="myPage"
            :page-size="myPageSize"
            :page-sizes="myPageSizes"
            :total="myTotal"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </el-col>
      </el-row>
      <!--业务代码区域-[end]-->
    </div>
  </div>
</template>

<script>
import $common from '../utils/common.js'

export default {
  name: 'pagination',
  data() {
    return {
      msg: 'Welcome to pagination ',
      myPage: this.currentPage || 1, //当前页页数
      myPageSize: this.pageSize || 10, //当前分页条数
      myPageSizes: this.pageSizes || [5, 10, 20, 50, 100], //可选的分页条数
      myTotal: this.total || 0, //总记录条数

      myPagerCount: this.pagerCount || 5, //显示的页码数字个数
      mySmall: this.small || false
    }
  },
  props: [
    'currentPage',
    'pageSize',
    'pageSizes',
    'total',
    'pagerCount',
    'small'
  ],
  computed: {
    $model() {
      return this.$store.state.$model
    },
    myTotalPages() {
      return Math.ceil(this.myTotal / this.myPageSize)
    },
    myFrom() {
      return this.myTotal > 0 ? (this.myPage - 1) * this.myPageSize + 1 : 0
    },
    myTo() {
      return this.myPage * this.myPageSize > this.total
        ? this.total
        : this.myPage * this.myPageSize
    }
  },
  watch: {
    currentPage: function(val) {
      this.myPage = $common.isEmpty(val) ? this.myPage : val
    },
    pageSize: function(val) {
      this.myPageSize = $common.isEmpty(val) ? this.myPageSize : val
    },
    pageSizes: function(val) {
      this.myPageSizes = $common.isEmpty(val) ? this.myPageSizes : val
    },
    total: function(val) {
      this.myTotal = $common.isEmpty(val) ? this.myTotal : val
      if ((this.myPage - 1) * this.myPageSize > val) {
        this.myPage = 1
        this.handleOnChange()
      }
    },
    pagerCount: function(val) {
      this.myPagerCount = $common.isEmpty(val) ? this.myPagerCount : val
    },
    small: function(val) {
      this.mySmall = $common.isEmpty(val) ? this.mySmall : val
    }
  },
  created() {
    //
  },
  mounted() {
    //
  },
  methods: {
    handlePageChange(val) {
      this.myPage = val
      this.$emit('current-change', val)
      this.handleOnChange()
    },
    handleSizeChange(val) {
      this.myPageSize = val
      this.$emit('size-change', val)
      this.handleOnChange()
    },
    handleOnChange() {
      let option = {
        page: this.myPage,
        pageSize: this.myPageSize
      }
      this.$emit('onChange', option)
    }
  },
  components: {
    //
  }
}
</script>

<style scoped>
/** css */
#pagination .pageContainer {
  height: 62px;
}
#pagination .pageContainer .page-info h2 {
  margin-left: 34px;
}
#pagination .pageContainer .page-control {
  margin-right: -35px;
}
#pagination .pageContainer .page-info h2 {
  margin-bottom: 11px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(156, 166, 181, 1);
}
</style>
