import Component from './list/test.vue'

Component.install = function(Vue) {
  Vue.component(Component.name, Component)
}

if (typeof window !== 'undefined' && window.Vue) {
  Component.install(window.Vue)
}

// 全局配置
export default Component
// 按需
export { Component }
