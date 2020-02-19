<template>
  <div id="vue-quill-editor-me">
    
    <!-- 无预览界面 -->
    <template v-if="!$common.propNoFalse(showView)">
        <quill-editor v-model="contentHtml"
            class="vue-quill-editor-me"
            ref="quillEditor"
            :options="editorOption"
            @ready="ready($event)"
            @focus="focus($event)"
            @blur="blur($event)"
            @change="change($event)"
            >
        </quill-editor>
    </template>
    <!-- 带预览界面 -->
    <template v-else>
      <el-table
        :data="[1]"
        border
        ref="el-table-editor-me"
        class="el-table-editor-me"
        style="width: 100%">
        <el-table-column min-width="600" label="编辑">
          <template>
            <quill-editor v-model="contentHtml"
                class="vue-quill-editor-me"
                ref="quillEditor"
                :options="editorOption"
                @ready="ready($event)"
                @focus="focus($event)"
                @blur="blur($event)"
                @change="change($event)"
                >
            </quill-editor>
          </template>
        </el-table-column>
        <el-table-column min-width="600" label="预览">
          <template>
            <editor-view-me :contentHtml="contentHtml" />
          </template>
        </el-table-column>

      </el-table>
    </template>


  </div>
</template>

<script>
const titleConfig = {
    'ql-bold':'加粗',
    'ql-color':'颜色',
    'ql-font':'字体',
    'ql-code':'插入代码',
    'ql-italic':'斜体',
    'ql-link':'添加链接',
    'ql-background':'背景颜色',
    'ql-size':'字体大小',
    'ql-strike':'删除线',
    'ql-script':'上标/下标',
    'ql-underline':'下划线',
    'ql-blockquote':'引用',
    'ql-header':'标题',
    'ql-indent':'缩进',
    'ql-list':'列表',
    'ql-align':'文本对齐',
    'ql-direction':'文本方向',
    'ql-code-block':'代码块',
    'ql-formula':'公式',
    'ql-image':'图片',
    'ql-video':'视频',
    'ql-clean':'清除字体样式',
    'ql-upload':'文件'
};

export default {
  name:'vue-quill-editor-me',
  data() {
    return {
      msg: 'welcome vue-quill-editor-me',
      showEditor:false,
      contentHtml:this.$common.useDefined(this.propsModelData, 'hello world!'),
      editorOption: {
        theme: 'snow',     //snow风格
        modules:{
          imageDrop: true,  //拖拽上传图片
          imageResize: {},  //调整图片尺寸
          toolbar:[         //工具栏设置
            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'],     //引用，代码块

            [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
            [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
            [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
            [{ 'direction': 'rtl' }],             // 文本方向

            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题

            [{'color': []}],   //字体颜色
            [{'background': []}],    //字体背景颜色
            [{ 'font': [] }],     //字体
            [{ 'align': [] }],    //对齐方式

            ['clean'],    //清除字体样式
            ['image']    //上传图片、上传视频

          ],
        },
      },
    };
  },
  props:['propsModelData','showView'],
  model: {
      prop: 'propsModelData',
      event: 'setModelValue',
  },
  watch:{
    propsModelData(nVal){
      this.contentHtml = nVal
    },
    contentHtml(nVal,oVal){
      this.$emit('setModelValue', nVal)
      // console.log('editor部',nVal,oVal)
    },
  },
  mounted() {
    //编辑工具栏添加中文提示
    this.addQuillTitle()
    this.$nextTick(function () {
      this.removeTableHover()
    })
  },
  methods: {
    ready(e) {
      this.$emit('ready', e)
    },
    focus(e) {
      this.removeTableHover()
      this.$emit('focus', e)
    },
    blur(e) {
      this.$emit('blur', e)
    },
    change(e) {
      this.$emit('change', e)
    },

    removeTableHover(){ //去掉class避免表格中光标hover变底色行为
      try {
        let classNames = this.$refs['el-table-editor-me'].$el.className
        classNames = classNames.replace(/(el-table--enable-row-hover)|(el-table--enable-row-transition)/ig, '')
        this.$refs['el-table-editor-me'].$el.className = classNames
      } catch (error) {
        //
      }
    },

    addQuillTitle () {
        const quillEditorMe = document.querySelector('.vue-quill-editor-me');
        const oToolBar = quillEditorMe.querySelector('.ql-toolbar');
        const aButton = oToolBar.querySelectorAll('button');
        const aSelect =  oToolBar.querySelectorAll('select');
        for(let i=0; i<aButton.length; i++){
          let item = aButton[i] || {}
          if(item.className === 'ql-script'){
              item.value === 'sub' ? item.title = '下标': item.title = '上标';
          }else if(item.className === 'ql-indent'){
              item.value === '+1' ? item.title ='向右缩进': item.title ='向左缩进';
          }else{
              item.title = titleConfig[item.classList[0]];
          }
        }
        for(let i=0; i<aSelect.length; i++){
          let item = aSelect[i] || {}
          item.parentNode.title = titleConfig[item.classList[0]];
        }
         
    },
  },

};

</script>

<style>
  #vue-quill-editor-me .el-table-editor-me.el-table td{
    vertical-align: top !important;
  }
</style>