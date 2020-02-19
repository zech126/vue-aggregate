<template>
  <div id="app">
    <el-form v-model="form">
      <el-select-me label="更新操作者方式" v-model="updateOperatorType">
        <el-option
          v-for="item in updateTypes"
          :key="item.id"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select-me>
    </el-form>
  </div>
</template>

<script>
import elSelectMe from '../src/tags/el-select-me'

export default {
  name: 'App',
  components: { elSelectMe },
  data() {
    return {
      updateTypes: [
        {
          id: 'ddd',
          label: 'ggg',
          value: '1233'
        }
      ],
      updateOperatorType: '',
      form: {}
    }
  },
  mounted() {},
  methods: {
    querySearch() {},
    handleQuerySelect() {},
    handleQueryChange() {}
  }
}
</script>

<style></style>
