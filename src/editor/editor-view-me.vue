<template>
    <div 
      id="editor-view-me" 
      class="editor-view-me ql-editor"
      style="width:100%; min-height: 30px;" 
      v-html="$xss(this.contentHtml)"
    >HTML预览</div>
</template>

<script>
export default {
  name: "editor-view-me",
  data() {
    return {
      msg: 'welcome to editor-view-me',
    };
  },
  props:['contentHtml'],
  mounted() {
    // console.log('viewContentHtml', this.contentHtml, this.$xss(this.contentHtml))
  },

};
</script>
<style scoped>
/*  */
</style>
