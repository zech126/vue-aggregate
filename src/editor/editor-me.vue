<template>
    <el-row  id="editor-me">
      <el-col :span="24" v-loading="!showEditor">
          <div class="editorLoading" v-if="!showEditor">正在加载编辑器...</div>
          <myEditor 
            v-if="showEditor" 
            v-model="contentHtml" 
            :showView = "showView"
            @ready="ready($event)"
            @focus="focus($event)"
            @blur="blur($event)"
            @change="change($event)"
          />
      </el-col>
    </el-row>
</template>

<script>
import myEditor from "./vue-quill-editor-me.vue";
export default {
  name: "editor-me",
  data() {
    return {
      msg: 'welcome to editor-me',
      showEditor:false,
      contentHtml: this.$xss(this.propsModelData),
    };
  },
  props:['propsModelData','showView'],
  model: {
      prop: 'propsModelData',
      event: 'setModelValue',
  },
  watch:{
    propsModelData(nVal){
      // 此处须保持注释，避免双向绑定值变化后产生循环修改问题
      // this.contentHtml = this.$xss(nVal)
    },
    contentHtml(nVal,oVal){
      this.$emit('setModelValue', nVal)
			// console.log('index 部',nVal,oVal)
    },
  },
  methods: {
    ready(e) {
      this.$emit('ready', e)
    },
    focus(e) {
      this.$emit('focus', e)
    },
    blur(e) {
      this.$emit('blur', e)
    },
    change(e) {
      this.$emit('change', e)
    },
    
  },
  mounted() {

    var me = this
    this.$common.loadScripts({
      async:false , //顺序加载js 
      url: [
        "assets/vue-quill-editor/quill.js",    //quill编辑器
        "assets/vue-quill-editor/vue-quill-editor.js",  //quill的vue组件
        "assets/vue-quill-editor/image-drop.min.js",    //拖拽上传图片
        "assets/vue-quill-editor/image-resize.min.js",  //调整图片尺寸
      ],
      callback: function() {
        Vue.use(window.VueQuillEditor)
        me.showEditor = true
      }
    });
  },
  components: {
    myEditor
  },

};
</script>
<style scoped>
.editorLoading{
  height: 80px;
  line-height: 80px;
  text-align: center;
}
</style>
