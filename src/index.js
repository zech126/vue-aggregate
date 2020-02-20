import elPaginationMe from './tags/el-pagination-me.vue'
import elInputMe from './tags/el-input-me.vue'
import elAutocompleteMe from './tags/el-Autocomplete-Me.vue'
import elSelectMe from './tags/el-select-me.vue'
import elDatePickerMe from './tags/el-date-picker-me.vue'
import elTimePickerMe from './tags/el-time-picker-me.vue'
import elShowColumnMe from './tags/el-show-column-me.vue'
import elxEditableColumnMe from './tags/elx-editable-column-me.vue'
import elButtonIconMe from './tags/el-button-icon-me.vue'
import elMenuItemMe from './tags/el-menu-item-me.vue'
import elSubMenuMe from './tags/el-submenu-me.vue'

// editor 存在其他依赖
// import editorMe from './editor/editor-me.vue'
// import editorViewMe from './editor/editor-view-me.vue'

// upload 存在上传接口
// import elUploadMe from './tags/el-upload-me.vue'

import elTreeMe from './tags/el-tree-me.vue'
import elFoldMe from './tags/el-fold-me.vue'

elPaginationMe.install = function(Vue) {
  Vue.component(elPaginationMe.name, elPaginationMe)
}
elInputMe.install = function(Vue) {
  Vue.component(elInputMe.name, elInputMe)
}
elAutocompleteMe.install = function(Vue) {
  Vue.component(elAutocompleteMe.name, elAutocompleteMe)
}
elSelectMe.install = function(Vue) {
  Vue.component(elSelectMe.name, elSelectMe)
}
elDatePickerMe.install = function(Vue) {
  Vue.component(elDatePickerMe.name, elDatePickerMe)
}
elTimePickerMe.install = function(Vue) {
  Vue.component(elTimePickerMe.name, elTimePickerMe)
}
elShowColumnMe.install = function(Vue) {
  Vue.component(elShowColumnMe.name, elShowColumnMe)
}
elxEditableColumnMe.install = function(Vue) {
  Vue.component(elxEditableColumnMe.name, elxEditableColumnMe)
}
elButtonIconMe.install = function(Vue) {
  Vue.component(elButtonIconMe.name, elButtonIconMe)
}
elMenuItemMe.install = function(Vue) {
  Vue.component(elMenuItemMe.name, elMenuItemMe)
}
elSubMenuMe.install = function(Vue) {
  Vue.component(elSubMenuMe.name, elSubMenuMe)
}
// editorViewMe.install = function(Vue) {
//   Vue.component(editorViewMe.name, editorViewMe)
// }
// editorMe.install = function(Vue) {
//   Vue.component(editorMe.name, editorMe)
// }
// elUploadMe.install = function(Vue) {
//   Vue.component(elUploadMe.name, elUploadMe)
// }
elTreeMe.install = function(Vue) {
  Vue.component(elTreeMe.name, elTreeMe)
}
elFoldMe.install = function(Vue) {
  Vue.component(elFoldMe.name, elFoldMe)
}

// export default {
//   elPaginationMe,
//   elInputMe,
//   elAutocompleteMe,
//   elSelectMe,
//   elDatePickerMe,
//   elTimePickerMe,
//   elShowColumnMe,
//   elxEditableColumnMe,
//   elButtonIconMe,
//   elMenuItemMe,
//   elSubMenuMe,
//   // editorViewMe,
//   // editorMe,
//   // elUploadMe,
//   elTreeMe,
//   elFoldMe
// }

export {
  elPaginationMe,
  elInputMe,
  elAutocompleteMe,
  elSelectMe,
  elDatePickerMe,
  elTimePickerMe,
  elShowColumnMe,
  elxEditableColumnMe,
  elButtonIconMe,
  elMenuItemMe,
  elSubMenuMe,
  // editorViewMe,
  // editorMe,
  // elUploadMe,
  elTreeMe,
  elFoldMe
}
