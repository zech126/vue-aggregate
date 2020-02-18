/**
 * @preserve
 * aggregate v2.1.5
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

//
//
//
//
//
//
//
//

var script = {
  name: 'test',

  components: {},

  model: {},

  props: {},

  data: function data() {
    return {
      text: '测试文本'
    }
  },

  computed: {},

  watch: {},

  created: function created() {},

  methods: {}
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._v("\n  "+_vm._s(_vm.text)+"\n")])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-4f17f3ce_0", { source: ".item-selector{position:relative;line-height:1;background-color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;overflow:hidden;font-size:14px}.item-selector__searchbar{position:relative;margin:8px}.item-selector__searchbar input{background-color:#fff;border-radius:4px;border:1px solid #dcdfe6;-webkit-box-sizing:border-box;box-sizing:border-box;color:#606266;display:inline-block;font-size:inherit;height:32px;line-height:32px;outline:0;padding:0 15px;-webkit-transition:border-color .2s cubic-bezier(.645,.045,.355,1);transition:border-color .2s cubic-bezier(.645,.045,.355,1);width:100%}.item-selector__searchbar input:focus{border-color:#409eff}.item-selector__searchbar input::-webkit-input-placeholder{color:#bdc2ca}.item-selector__searchbar input::-moz-placeholder{color:#bdc2ca}.item-selector__searchbar input:-ms-input-placeholder{color:#bdc2ca}.item-selector__searchbar input::-ms-input-placeholder{color:#bdc2ca}.item-selector__searchbar input::placeholder{color:#bdc2ca}.item-selector__searchbar-clean{width:20px;height:20px;line-height:20px;position:absolute;top:50%;right:5px;margin-top:-10px;text-align:center;cursor:pointer;opacity:.6}.item-selector__searchbar-clean:hover{opacity:1}.item-selector__searchbar-clean::after,.item-selector__searchbar-clean::before{content:'';position:absolute;width:16px;height:1px;background-color:#999;left:50%;top:50%;margin-left:-8px}.item-selector__searchbar-clean::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.item-selector__searchbar-clean::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.item-selector__options-wrap{border-top:#e2e6ec 1px solid}.item-selector__options{margin:0;padding:0;list-style:none}.item-selector__options--empty{margin:0;line-height:34px;text-align:center;color:#999;font-size:14px}.item-selector__option{font-size:14px;padding:0 15px;position:relative;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#606266;height:34px;line-height:34px;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer}.item-selector__option--active,.item-selector__option:hover{background-color:#f5f7fa}.item-selector__option::after{position:absolute;top:50%;right:15px;display:none;width:6px;height:12px;margin-top:-8px;content:'';-webkit-transform:rotate(45deg);transform:rotate(45deg);text-align:center;border:solid #ddd;border-width:0 1px 1px 0}.item-selector__option--checked{color:#409eff;font-weight:700}.item-selector__option--checked::after{display:block;border-color:#409eff}.item-selector mark{background-color:#ff0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

__vue_component__.install = function(Vue) {
  Vue.component(__vue_component__.name, __vue_component__);
};

if (typeof window !== 'undefined' && window.Vue) {
  __vue_component__.install(window.Vue);
}

exports.Component = __vue_component__;
exports.default = __vue_component__;
