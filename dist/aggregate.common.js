/**
 * @preserve
 * aggregate v1.0.1.1
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

// eslint-disable-next-line no-unused-vars
var $common = {
  unDefined: function unDefined(v) {
    return v === undefined ? true : false
  },
  isDefined: function isDefined(v) {
    return v != undefined ? true : false
  },
  propNoFalse: function propNoFalse(v) {
    return v !== undefined && v !== false ? true : false
  },
  useDefined: function() {
    var option = [], len = arguments.length;
    while ( len-- ) option[ len ] = arguments[ len ];

    for (var i = 0; i < option.length; i++) {
      if (
        option[i] === 'undefined' ||
        option[i] === undefined ||
        option[i] === null
      ) ; else {
        return option[i]
      }
    }
    return undefined
  },
  isEmpty: function(v) {
    //是否为空数据
    //null,undefined,'',"",{},[],[{}] 匹配到这些值时，都是返回true
    if (
      v === '' ||
      v === '' ||
      v === 'undefined' ||
      v === undefined ||
      v === null
    ) {
      return true
    }
    if (
      JSON.stringify(v) == '{}' ||
      JSON.stringify(v) == '[]' ||
      JSON.stringify(v) == '[{}]'
    ) {
      return true
    }
    return false
  },
  isString: function(str) {
    //判断str是否为string对象
    return typeof str == 'string' ? true : false
  },
  isArray: function(obj) {
    //判断obj是否为Array对象
    if (this.useDefined(obj) === undefined) {
      console.warn('[common]: $common.isArray(obj)方法中obj不能为undefined');
    }
    return Array.isArray(obj)
  },
  isJson: function(obj) {
    //判断obj是否为json对象
    if (this.useDefined(obj) === undefined) {
      console.warn('[common]: $common.isJson(obj)方法中obj不能为undefined');
    }
    return obj.constructor == Object
  },
  isObject: function(obj) {
    //是否为object类型
    if (this.useDefined(obj) === undefined) {
      console.warn('[common]: $common.isObject(obj)方法中obj不能为undefined');
    }
    return typeof obj == 'object' ? true : false
  },
  copy: function(val) {
    return this.isObject(val) ? this.toObject(JSON.stringify(val)) : val
  },
  setObject: function setObject(object, item, value) {
    var obj = this.copy(object);
    if (this.isEmpty(item)) {
      for (var item$1 in obj) {
        obj[item$1] = value;
      }
    } else {
      obj[item] = value;
    }
    return obj
  },
  //数组去重
  distinctArryObject: function distinctArryObject(arryObject, prop) {
    //根据prop值去重
    var result = [];
    var obj = {};
    arryObject.forEach(function (item) {
      var value = item[prop];
      if (!obj[value]) {
        result.push(item);
        obj[value] = 1;
      }
    });
    // for (let item of arryObject) {
    //   let value = item[prop]
    //   if (!obj[value]) {
    //     result.push(item)
    //     obj[value] = 1
    //   }
    // }
    return result
  }
};

//

var script$1 = {
  name: 'pagination',
  data: function data() {
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
    $model: function $model() {
      return this.$store.state.$model
    },
    myTotalPages: function myTotalPages() {
      return Math.ceil(this.myTotal / this.myPageSize)
    },
    myFrom: function myFrom() {
      return this.myTotal > 0 ? (this.myPage - 1) * this.myPageSize + 1 : 0
    },
    myTo: function myTo() {
      return this.myPage * this.myPageSize > this.total
        ? this.total
        : this.myPage * this.myPageSize
    }
  },
  watch: {
    currentPage: function(val) {
      this.myPage = $common.isEmpty(val) ? this.myPage : val;
    },
    pageSize: function(val) {
      this.myPageSize = $common.isEmpty(val) ? this.myPageSize : val;
    },
    pageSizes: function(val) {
      this.myPageSizes = $common.isEmpty(val) ? this.myPageSizes : val;
    },
    total: function(val) {
      this.myTotal = $common.isEmpty(val) ? this.myTotal : val;
      if ((this.myPage - 1) * this.myPageSize > val) {
        this.myPage = 1;
        this.handleOnChange();
      }
    },
    pagerCount: function(val) {
      this.myPagerCount = $common.isEmpty(val) ? this.myPagerCount : val;
    },
    small: function(val) {
      this.mySmall = $common.isEmpty(val) ? this.mySmall : val;
    }
  },
  created: function created() {
    //
  },
  mounted: function mounted() {
    //
  },
  methods: {
    handlePageChange: function handlePageChange(val) {
      this.myPage = val;
      this.$emit('current-change', val);
      this.handleOnChange();
    },
    handleSizeChange: function handleSizeChange(val) {
      this.myPageSize = val;
      this.$emit('size-change', val);
      this.handleOnChange();
    },
    handleOnChange: function handleOnChange() {
      var option = {
        page: this.myPage,
        pageSize: this.myPageSize
      };
      this.$emit('onChange', option);
    }
  },
  components: {
    //
  }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"margin":"0","padding":"0"},attrs:{"id":"pagination"}},[_c('div',{staticClass:"container mb-0"},[_c('el-row',{staticClass:"pageContainer el-pagination-item-me",attrs:{"type":"flex","justify":"space-between","align":"bottom"}},[_c('el-col',{staticClass:"page-info ",attrs:{"span":_vm.fitWidth({ xs: 0, sm: 0, md: 0, lg: 6, xl: 6 })}},[_c('h2',[_vm._v("第"+_vm._s(_vm.myFrom)+"-"+_vm._s(_vm.myTo)+"条,共"+_vm._s(_vm.myTotalPages)+"页记录")])]),_vm._v(" "),_c('el-col',{staticClass:"page-control ",attrs:{"span":_vm.fitWidth({ xs: 24, sm: 24, md: 24, lg: 18, xl: 18 })}},[_c('el-pagination',{staticClass:"el-pagination-me",attrs:{"small":_vm.mySmall,"redefine":"","background":"","layout":"total, sizes, prev, pager, next, jumper","pager-count":_vm.myPagerCount,"current-page":_vm.myPage,"page-size":_vm.myPageSize,"page-sizes":_vm.myPageSizes,"total":_vm.myTotal},on:{"current-change":_vm.handlePageChange,"size-change":_vm.handleSizeChange}})],1)],1)],1)])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-8efc6d28_0", { source: "#pagination .pageContainer[data-v-8efc6d28]{height:62px}#pagination .pageContainer .page-info h2[data-v-8efc6d28]{margin-left:34px}#pagination .pageContainer .page-control[data-v-8efc6d28]{margin-right:-35px}#pagination .pageContainer .page-info h2[data-v-8efc6d28]{margin-bottom:11px;font-size:14px;font-weight:400;line-height:20px;color:#9ca6b5}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = "data-v-8efc6d28";
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$2 = {
  name: 'meInput',
  data: function data() {
    return {
      msg: 'Welcome to meInput',
      formValue: this.propsModelData,
      requiredTip: true, //控制显示必填*号提示
      focusTip: false //标识当前是否属于focus状态
    }
  },
  props: [
    'propsModelData',
    'config',
    'prop',
    'label',
    'placeholder',

    'type',
    'error',
    'readonly',
    'disabled',
    'clearable',
    'size',
    'maxlength',
    'minlength',
    'showWordLimit',
    'prefixIcon',
    'suffixIcon',
    'rows',
    'autosize',
    'autocomplete',
    'name',
    'max',
    'min',
    'step',
    'resize',
    'autofocus',
    'form',
    'tabindex',
    'validateEvent',
    'showPassword'
  ],
  model: {
    prop: 'propsModelData',
    event: 'setModelValue'
  },
  computed: {
    cssFocus: function cssFocus() {
      return this.focusTip ? 'active' : ''
    },
    cssRequired: function cssRequired() {
      return this.requiredTip ? '' : 'is-no-asterisk'
    },
    formConfig: function formConfig() {
      var config = $common.useDefined(this.config, {}),
        isAutosize = config.type === 'textarea' ? true : false; //如果type为textare默认autosize为true
      return {
        //必需属性
        prop: $common.useDefined(this.prop, config.prop), //用于表单校验
        label: $common.useDefined(this.label, config.label),
        placeholder: $common.useDefined(
          this.placeholder,
          config.placeholder,
          this.label,
          config.label,
          ' '
        ),
        focus: $common.useDefined(config.focus, false),

        //其他配置属性
        type: $common.useDefined(this.type, config.type, 'text'),
        error: $common.useDefined(this.error, config.error),
        readonly: $common.useDefined(this.readonly, config.readonly, false),
        disabled: $common.useDefined(this.disabled, config.disabled, false),
        clearable: $common.useDefined(this.clearable, config.clearable, false),
        size: $common.useDefined(this.size, config.size),
        maxlength: $common.useDefined(this.maxlength, config.maxlength),
        minlength: $common.useDefined(this.minlength, config.minlength),
        showWordLimit: $common.useDefined(
          this.showWordLimit,
          config.showWordLimit,
          false
        ),
        prefixIcon: $common.useDefined(this.prefixIcon, config.prefixIcon),
        suffixIcon: $common.useDefined(this.suffixIcon, config.suffixIcon),
        rows: $common.useDefined(this.rows, config.rows, 2),
        autosize: $common.useDefined(
          this.autosize,
          config.autosize,
          isAutosize
        ),
        autocomplete: $common.useDefined(
          this.autocomplete,
          config.autocomplete,
          'off'
        ),
        name: $common.useDefined(this.name, config.name),
        max: $common.useDefined(this.max, config.max),
        min: $common.useDefined(this.min, config.min),
        step: $common.useDefined(this.step, config.step),
        resize: $common.useDefined(this.resize, config.resize),
        autofocus: $common.useDefined(this.autofocus, config.autofocus, false),
        form: $common.useDefined(this.form, config.form),
        tabindex: $common.useDefined(this.tabindex, config.tabindex),
        validateEvent: $common.useDefined(
          this.validateEvent,
          config.validateEvent,
          true
        ),
        showPassword: $common.useDefined(
          this.showPassword,
          config.showPassword,
          false
        )
      }
    }
  },
  watch: {
    propsModelData: function propsModelData(val) {
      this.formValue = val;
      this.handleChange();
    },
    // eslint-disable-next-line no-unused-vars
    config: function config(val) {
      this.handleChange();
    },
    // eslint-disable-next-line no-unused-vars
    formConfig: function formConfig(val) {
      this.handleChange();
    }
  },
  created: function created() {
    //
  },
  mounted: function mounted() {
    //错误检查
    this.checkError();

    //初始化处理label和placeholder显示
    this.handleChange();
  },
  methods: {
    handleChange: function handleChange() {
      var config = $common.useDefined(this.config, {});
      this.formConfig.label = $common.useDefined(this.label, config.label);
      this.formConfig.placeholder = $common.useDefined(
        this.placeholder,
        config.placeholder,
        this.label,
        config.label,
        ' '
      );
      if (!this.formConfig.focus && $common.isEmpty(this.formValue)) {
        this.formConfig.label = ' ';
        this.requiredTip = false;
      } else {
        this.formConfig.placeholder = '';
        this.requiredTip = true;
      }
      this.focusTip = this.formConfig.focus;
      this.$emit('setModelValue', this.formValue);
      //强制更新数据绑定
      this.$forceUpdate();
    },
    onFocus: function onFocus(e) {
      var this$1 = this;

      this.$emit('focus', e);
      this.formConfig.focus = true;
      this.focusTip = true;
      setTimeout(function () {
        this$1.handleChange();
      }, 100);
    },
    onBlur: function onBlur(e) {
      var this$1 = this;

      this.$emit('blur', e);
      this.formConfig.focus = false;
      this.focusTip = false;
      setTimeout(function () {
        this$1.handleChange();
      }, 100);
    },

    /**事件转发 */
    change: function change(e) {
      this.$emit('change', e);
    },
    clear: function clear(e) {
      this.handleChange();
      this.$emit('clear', e);
    },

    // eslint-disable-next-line no-unused-vars
    checkError: function checkError(option) {
      var eg = "\n            <el-input-me  label=\"名称\" v-model=\"roleName\"></el-input-me>\n            或\n            <el-input-me  :config={label: \"名称\"} v-model=\"roleName\"></el-input-me>\n            ";
      $common.useDefined(this.label, this.config && this.config.label) ==
      undefined
        ? console.error('[el-input-me] label参数必传，参数示例: ', eg)
        : '';
    }
  },
  components: {
    //
  }
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-form-item',{staticClass:"el-form-item-me",class:_vm.cssFocus + ' ' + _vm.cssRequired,attrs:{"border":"","label":_vm.formConfig.label,"prop":_vm.formConfig.prop}},[_c('el-input',{staticClass:"el-input-me",attrs:{"placeholder":_vm.formConfig.placeholder,"type":_vm.formConfig.type,"error":_vm.formConfig.error,"readonly":_vm.formConfig.readonly,"disabled":_vm.formConfig.disabled,"clearable":_vm.formConfig.clearable,"size":_vm.formConfig.size,"maxlength":_vm.formConfig.maxlength,"minlength":_vm.formConfig.minlength,"showWordLimit":_vm.formConfig.showWordLimit,"prefixIcon":_vm.formConfig.prefixIcon,"suffixIcon":_vm.formConfig.suffixIcon,"rows":_vm.formConfig.rows,"autosize":_vm.formConfig.autosize,"autocomplete":_vm.formConfig.autocomplete,"name":_vm.formConfig.name,"max":_vm.formConfig.max,"min":_vm.formConfig.min,"step":_vm.formConfig.step,"resize":_vm.formConfig.resize,"autofocus":_vm.formConfig.autofocus,"form":_vm.formConfig.form,"tabindex":_vm.formConfig.tabindex,"validateEvent":_vm.formConfig.validateEvent,"showPassword":_vm.formConfig.showPassword},on:{"focus":_vm.onFocus,"blur":_vm.onBlur,"input":function($event){return _vm.handleChange()},"change":_vm.change,"clear":_vm.clear},model:{value:(_vm.formValue),callback:function ($$v) {_vm.formValue=$$v;},expression:"formValue"}},[_vm._t("prefix"),_vm._v(" "),_vm._t("suffix"),_vm._v(" "),_vm._t("prepend"),_vm._v(" "),_vm._t("append"),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),_c('span',{staticClass:"is-required-me"},[_vm._v("*")]),_vm._v(" "),_c('div',{staticClass:"animate-bar",class:_vm.cssFocus})],1)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-733ad3c2_0", { source: ".el-form-item:not(.is-required)>.el-form-item__content>.is-required-me[data-v-733ad3c2]{display:none}.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__content>.is-required-me[data-v-733ad3c2]{display:none}.el-form-item.is-required.is-no-asterisk>.el-form-item__content>.is-required-me[data-v-733ad3c2]{display:block;left:5px;transition:all .3s;position:absolute;top:0;-webkit-transition:all .3s;height:100%;color:#df1d1d;text-align:center}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = "data-v-733ad3c2";
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$3 = {
  name: 'autocomplete',
  data: function data() {
    return {
      msg: 'Welcome to meSelect',
      formValue: this.propsModelData,
      requiredTip: true, //控制显示必填*号提示
      focusTip: false //标识当前是否属于focus状态
    }
  },
  props: [
    'propsModelData',
    'config',
    'prop',
    'label',
    'placeholder',

    'triggerOnFocus',
    'type',
    'error',
    'readonly',
    'disabled',
    'clearable',
    'size',
    'maxlength',
    'minlength',
    'showWordLimit',
    'prefixIcon',
    'suffixIcon',
    'rows',
    'autosize',
    'autocomplete',
    'name',
    'max',
    'min',
    'step',
    'resize',
    'autofocus',
    'form',
    'tabindex',
    'validateEvent'
  ],
  model: {
    prop: 'propsModelData',
    event: 'setModelValue'
  },
  computed: {
    cssFocus: function cssFocus() {
      return this.focusTip ? 'active' : ''
    },
    cssRequired: function cssRequired() {
      return this.requiredTip ? '' : 'is-no-asterisk'
    },
    formConfig: function formConfig() {
      var config = $common.useDefined(this.config, {});
      return {
        //必需属性
        prop: $common.useDefined(this.prop, config.prop), //用于表单校验
        label: $common.useDefined(this.label, config.label),
        placeholder: $common.useDefined(
          this.placeholder,
          config.placeholder,
          this.label,
          config.label,
          ' '
        ),
        focus: $common.useDefined(config.focus, false),

        /**triggerOnFocus：true时，表示获取光标即调用handleFetchSuggestions方法进行远程搜索**/
        triggerOnFocus: $common.useDefined(
          this.triggerOnFocus,
          config.triggerOnFocus,
          false
        ),

        //其他配置属性
        type: $common.useDefined(this.type, config.type, 'text'),
        error: $common.useDefined(this.error, config.error),
        readonly: $common.useDefined(this.readonly, config.readonly, false),
        disabled: $common.useDefined(this.disabled, config.disabled, false),
        clearable: $common.useDefined(this.clearable, config.clearable, false),
        size: $common.useDefined(this.size, config.size),
        maxlength: $common.useDefined(this.maxlength, config.maxlength),
        minlength: $common.useDefined(this.minlength, config.minlength),
        showWordLimit: $common.useDefined(
          this.showWordLimit,
          config.showWordLimit,
          false
        ),
        prefixIcon: $common.useDefined(this.prefixIcon, config.prefixIcon),
        suffixIcon: $common.useDefined(this.suffixIcon, config.suffixIcon),
        rows: $common.useDefined(this.rows, config.rows, 2),
        autosize: $common.useDefined(this.autosize, config.autosize, false),
        autocomplete: $common.useDefined(
          this.autocomplete,
          config.autocomplete,
          'off'
        ),
        name: $common.useDefined(this.name, config.name),
        max: $common.useDefined(this.max, config.max),
        min: $common.useDefined(this.min, config.min),
        step: $common.useDefined(this.step, config.step),
        resize: $common.useDefined(this.resize, config.resize),
        autofocus: $common.useDefined(this.autofocus, config.autofocus, false),
        form: $common.useDefined(this.form, config.form),
        tabindex: $common.useDefined(this.tabindex, config.tabindex),
        validateEvent: $common.useDefined(
          this.validateEvent,
          config.validateEvent,
          true
        )
      }
    }
  },
  watch: {
    propsModelData: function propsModelData(val) {
      this.formValue = val;
      this.handleChange();
    },
    // eslint-disable-next-line no-unused-vars
    config: function config(val) {
      this.handleChange();
    },
    // eslint-disable-next-line no-unused-vars
    formConfig: function formConfig(val) {
      this.handleChange();
    }
  },
  created: function created() {
    //
  },
  mounted: function mounted() {
    //错误检查
    this.checkError();

    this.handleChange();
  },
  methods: {
    handleChange: function handleChange() {
      var config = $common.useDefined(this.config, {});
      this.formConfig.label = $common.useDefined(this.label, config.label);
      this.formConfig.placeholder = $common.useDefined(
        this.placeholder,
        config.placeholder,
        this.label,
        config.label,
        ' '
      );
      if (!this.formConfig.focus && $common.isEmpty(this.formValue)) {
        this.formConfig.label = ' ';
        this.requiredTip = false;
      } else {
        this.formConfig.placeholder = '';
        this.requiredTip = true;
      }
      this.focusTip = this.formConfig.focus;
      this.$emit('setModelValue', this.formValue);
      this.$forceUpdate();
    },
    onFocus: function onFocus(e) {
      var this$1 = this;

      this.$emit('focus', e);
      this.formConfig.focus = true;
      this.focusTip = true;
      setTimeout(function () {
        this$1.handleChange();
      }, 100);
    },
    onBlur: function onBlur(e) {
      var this$1 = this;

      this.$emit('blur', e);
      this.formConfig.focus = false;
      this.focusTip = false;
      setTimeout(function () {
        this$1.handleChange();
      }, 100);
    },
    handleFetchSuggestions: function handleFetchSuggestions(queryString, callback) {
      //输入值时触发的事件（如：远程搜索callback返回下拉输入建议）
      this.$emit('fetch-suggestions', queryString, callback);
    },

    /**事件转发 */
    select: function select(e) {
      //选择下拉框中的选项（输入建议项）时触发的事件
      this.$emit('select', e);
    },
    change: function change(e) {
      this.$emit('change', e);
    },
    clear: function clear(e) {
      this.handleChange();
      this.$emit('clear', e);
    },

    // eslint-disable-next-line no-unused-vars
    checkError: function checkError(option) {
      var eg = "\n            <el-autocomplete-me  label=\"姓名\" v-model=\"roleName\"></el-autocomplete-me>\n            或\n            <el-autocomplete-me  :config={label: \"姓名\"} v-model=\"roleName\"></el-autocomplete-me>\n            ";
      $common.useDefined(this.label, this.config && this.config.label) ==
      undefined
        ? console.error('[el-autocomplete-me] label参数必传，参数示例: ', eg)
        : '';
    }
  },
  components: {
    //
  }
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-form-item',{staticClass:"el-form-item-me",class:_vm.cssFocus + ' ' + _vm.cssRequired,attrs:{"border":"","label":_vm.formConfig.label,"prop":_vm.formConfig.prop}},[_c('el-autocomplete',{staticClass:"el-autocomplete-me",attrs:{"placeholder":_vm.formConfig.placeholder,"fetch-suggestions":_vm.handleFetchSuggestions,"trigger-on-focus":_vm.formConfig.triggerOnFocus,"type":_vm.formConfig.type,"error":_vm.formConfig.error,"readonly":_vm.formConfig.readonly,"disabled":_vm.formConfig.disabled,"clearable":_vm.formConfig.clearable,"size":_vm.formConfig.size,"maxlength":_vm.formConfig.maxlength,"minlength":_vm.formConfig.minlength,"showWordLimit":_vm.formConfig.showWordLimit,"prefixIcon":_vm.formConfig.prefixIcon,"suffixIcon":_vm.formConfig.suffixIcon,"rows":_vm.formConfig.rows,"autosize":_vm.formConfig.autosize,"autocomplete":_vm.formConfig.autocomplete,"name":_vm.formConfig.name,"max":_vm.formConfig.max,"min":_vm.formConfig.min,"step":_vm.formConfig.step,"resize":_vm.formConfig.resize,"autofocus":_vm.formConfig.autofocus,"form":_vm.formConfig.form,"tabindex":_vm.formConfig.tabindex,"validateEvent":_vm.formConfig.validateEvent},on:{"focus":_vm.onFocus,"blur":_vm.onBlur,"input":function($event){return _vm.handleChange()},"select":_vm.select,"change":_vm.change,"clear":_vm.clear},model:{value:(_vm.formValue),callback:function ($$v) {_vm.formValue=$$v;},expression:"formValue"}},[_vm._t("prefix"),_vm._v(" "),_vm._t("suffix")],2),_vm._v(" "),_c('span',{staticClass:"is-required-me"},[_vm._v("*")]),_vm._v(" "),_c('div',{staticClass:"animate-bar",class:_vm.cssFocus})],1)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-2a0132e6_0", { source: ".el-form-item:not(.is-required)>.el-form-item__content>.is-required-me[data-v-2a0132e6]{display:none}.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__content>.is-required-me[data-v-2a0132e6]{display:none}.el-form-item.is-required.is-no-asterisk>.el-form-item__content>.is-required-me[data-v-2a0132e6]{display:block;left:5px;transition:all .3s;position:absolute;top:0;-webkit-transition:all .3s;height:100%;color:#df1d1d;text-align:center}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = "data-v-2a0132e6";
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$4 = {
  name: 'meSelect',
  data: function data() {
    return {
      msg: 'Welcome to meSelect',
      formValue: this.propsModelData,
      requiredTip: true, //控制显示必填*号提示
      focusTip: false //标识当前是否属于focus状态
    }
  },
  props: [
    'propsModelData',
    'config',
    'prop',
    'label',
    'option',
    'props',
    'focus',
    'placeholder',

    'clearable',
    'filterable',
    'multiple',
    'disabled',
    'valueKey',
    'size',
    'collapseTags',
    'multipleLimit',
    'name',
    'autocomplete',
    'allowCreate',
    'filterMethod',
    'remote',
    'remoteMethod',
    'loading',
    'loadingText',
    'noMatchText',
    'noDataText',
    'popperClass',
    'reserveKeyword',
    'defaultFirstOption',
    'popperAppendToBody',
    'automaticDropdown'
  ],
  model: {
    prop: 'propsModelData',
    event: 'setModelValue'
  },
  computed: {
    cssFocus: function cssFocus() {
      return this.focusTip ? 'active' : ''
    },
    cssRequired: function cssRequired() {
      return this.requiredTip ? '' : 'is-no-asterisk'
    },
    formConfig: function formConfig() {
      var config = $common.useDefined(this.config, {});
      return {
        //必需属性
        prop: $common.useDefined(this.prop, config.prop), //用于表单校验
        label: $common.useDefined(this.label, config.label),
        option: $common.useDefined(this.option, config.option),
        props: $common.useDefined(this.props, config.props), //用于下拉选项
        focus: $common.useDefined(config.focus, false),
        placeholder: $common.useDefined(
          this.placeholder,
          config.placeholder,
          this.label,
          config.label,
          ' '
        ),

        //其他配置属性
        clearable: $common.useDefined(this.clearable, config.clearable, true),
        filterable: $common.useDefined(
          this.filterable,
          config.filterable,
          true
        ),

        multiple: $common.useDefined(this.multiple, config.multiple, false),
        disabled: $common.useDefined(this.disabled, config.disabled, false),
        valueKey: $common
          .useDefined(this.valueKey, config.valueKey, this.formValue, '')
          .toString(),
        size: $common.useDefined(this.size, config.size),
        collapseTags: $common.useDefined(
          this.collapseTags,
          config.collapseTags,
          false
        ),
        multipleLimit: $common.useDefined(
          this.multipleLimit,
          config.multipleLimit,
          0
        ),
        name: $common.useDefined(this.name, config.name),
        autocomplete: $common.useDefined(
          this.autocomplete,
          config.autocomplete,
          'off'
        ),
        allowCreate: $common.useDefined(
          this.allowCreate,
          config.allowCreate,
          false
        ),
        filterMethod: $common.useDefined(
          this.filterMethod,
          config.filterMethod
        ),
        remote: $common.useDefined(this.remote, config.remote, false),
        remoteMethod: $common.useDefined(
          this.remoteMethod,
          config.remoteMethod
        ),
        loading: $common.useDefined(this.loading, config.loading, false),
        loadingText: $common.useDefined(
          this.loadingText,
          config.loadingText,
          '加载中'
        ),
        noMatchText: $common.useDefined(
          this.noMatchText,
          config.noMatchText,
          '无匹配数据'
        ),
        noDataText: $common.useDefined(
          this.noDataText,
          config.noDataText,
          '无数据'
        ),
        popperClass: $common.useDefined(this.popperClass, config.popperClass),
        reserveKeyword: $common.useDefined(
          this.reserveKeyword,
          config.reserveKeyword,
          false
        ),
        defaultFirstOption: $common.useDefined(
          this.defaultFirstOption,
          config.defaultFirstOption,
          false
        ),
        popperAppendToBody: $common.useDefined(
          this.popperAppendToBody,
          config.popperAppendToBody,
          true
        ),
        automaticDropdown: $common.useDefined(
          this.automaticDropdown,
          config.automaticDropdown,
          false
        )
      }
    }
  },
  watch: {
    propsModelData: function propsModelData(val) {
      this.formValue = val;
      this.handleChange();
    },
    // eslint-disable-next-line no-unused-vars
    config: function config(val) {
      this.handleChange();
    },
    // eslint-disable-next-line no-unused-vars
    formConfig: function formConfig(val) {
      this.handleChange();
    }
  },
  created: function created() {
    //
  },
  mounted: function mounted() {
    var this$1 = this;

    //错误检查
    this.checkError();

    //初始化处理label和placeholder显示
    this.handleChange();
    setTimeout(function () {
      this$1.handleChange();
    }, 200); //二次修正处理
  },
  methods: {
    handleChange: function handleChange() {
      var config = $common.useDefined(this.config, {});
      this.formConfig.label = $common.useDefined(this.label, config.label);
      this.formConfig.placeholder = $common.useDefined(
        this.placeholder,
        config.placeholder,
        this.label,
        config.label,
        ' '
      );
      if (!this.formConfig.focus && $common.isEmpty(this.formValue)) {
        this.formConfig.label = ' ';
        this.requiredTip = false;
      } else {
        this.formConfig.placeholder = '';
        this.requiredTip = true;
      }
      this.focusTip = this.formConfig.focus;
      this.$emit('setModelValue', this.formValue);
      this.$forceUpdate();
    },
    onFocus: function onFocus(type) {
      var this$1 = this;

      if (type == 'focus') {
        this.formConfig.focus = true;
        this.$emit('focus');
      } else {
        this.formConfig.focus = false;
        this.$emit('blur');
      }
      this.focusTip = this.formConfig.focus;
      setTimeout(function () {
        this$1.handleChange();
      }, 100);
    },

    /**事件转发 */
    change: function change(item) {
      this.$emit('change', item);
    },
    visibleChange: function visibleChange(item) {
      this.onFocus(item ? 'focus' : 'blur');
      this.$emit('visible-change', item);
    },
    removeTag: function removeTag(item) {
      this.$emit('remove-tag', item);
    },
    clear: function clear() {
      this.handleChange();
      this.$emit('clear');
    },

    // eslint-disable-next-line no-unused-vars
    checkError: function checkError(option) {
      var eg = "\n            <el-select-me  label=\"选择类型\" v-model=\"roleType\">\n                <el-option label=\"类型1\" value=\"1\"></el-option>\n                <el-option label=\"类型2\" value=\"2\"></el-option>\n            </el-select-me>\n            或\n            <el-select-me  :config=\"config\" v-model=\"roleType\">\n                <el-option label=\"类型1\" value=\"1\"></el-option>\n                <el-option label=\"类型2\" value=\"2\"></el-option>\n            </el-select-me>\n            this.config = {\n                label: \"选择类型\",\n                option:[{ id:\"1\", text:\"类型1\" }, { id:\"2\", text:\"类型2\" }],\n                props:{ value:'id', label:'text' }\n            }\n            ";
      $common.useDefined(this.label, this.config && this.config.label) ==
      undefined
        ? console.error('[el-select-me] label参数必传，参数示例: ', eg)
        : '';
    }
  },
  components: {
    //
  }
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-form-item',{staticClass:"el-form-item-me",class:_vm.cssFocus + ' ' + _vm.cssRequired,attrs:{"border":"","label":_vm.formConfig.label,"prop":_vm.formConfig.prop}},[_c('el-select',{staticClass:"el-select-me",attrs:{"placeholder":_vm.formConfig.placeholder,"multiple":_vm.formConfig.multiple,"disabled":_vm.formConfig.disabled,"valueKey":_vm.formConfig.valueKey,"size":_vm.formConfig.size,"clearable":_vm.formConfig.clearable,"collapseTags":_vm.formConfig.collapseTags,"multipleLimit":_vm.formConfig.multipleLimit,"name":_vm.formConfig.name,"autocomplete":_vm.formConfig.autocomplete,"filterable":_vm.formConfig.filterable,"allowCreate":_vm.formConfig.allowCreate,"filterMethod":_vm.formConfig.filterMethod,"remote":_vm.formConfig.remote,"remoteMethod":_vm.formConfig.remoteMethod,"loading":_vm.formConfig.loading,"loadingText":_vm.formConfig.loadingText,"noMatchText":_vm.formConfig.noMatchText,"noDataText":_vm.formConfig.noDataText,"popperClass":_vm.formConfig.popperClass,"reserveKeyword":_vm.formConfig.reserveKeyword,"defaultFirstOption":_vm.formConfig.defaultFirstOption,"popperAppendToBody":_vm.formConfig.popperAppendToBody,"automaticDropdown":_vm.formConfig.automaticDropdown},on:{"focus":function($event){return _vm.onFocus('focus')},"blur":function($event){return _vm.onFocus('blur')},"input":function($event){return _vm.handleChange()},"change":_vm.change,"visible-change":_vm.visibleChange,"remove-tag":_vm.removeTag,"clear":_vm.clear},model:{value:(_vm.formValue),callback:function ($$v) {_vm.formValue=$$v;},expression:"formValue"}},[_vm._t("prefix"),_vm._v(" "),_vm._t("empty"),_vm._v(" "),_vm._t("default"),_vm._v(" "),_vm._l((_vm.formConfig.option),function(item){return _c('el-option',{key:item[_vm.formConfig.props.label],attrs:{"label":item[_vm.formConfig.props.label],"value":item[_vm.formConfig.props.value]}})})],2),_vm._v(" "),_c('span',{staticClass:"is-required-me"},[_vm._v("*")]),_vm._v(" "),_c('div',{staticClass:"animate-bar",class:_vm.cssFocus})],1)};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-af49234c_0", { source: ".el-form-item:not(.is-required)>.el-form-item__content>.is-required-me[data-v-af49234c]{display:none}.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__content>.is-required-me[data-v-af49234c]{display:none}.el-form-item.is-required.is-no-asterisk>.el-form-item__content>.is-required-me[data-v-af49234c]{display:block;left:5px;transition:all .3s;position:absolute;top:0;-webkit-transition:all .3s;height:100%;color:#df1d1d;text-align:center}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = "data-v-af49234c";
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$5 = {
  name: 'meInput',
  data: function data() {
    var config = this.config || {};
    var startClearableText =
      this.startClearableText ||
      '清空' +
        $common.useDefined(
          this.startPlaceholder,
          config['start-placeholder'],
          '开始日期'
        );
    var endClearableText =
      this.endClearableText ||
      '清空' +
        $common.useDefined(
          this.endPlaceholder,
          config['end-placeholder'],
          '结束日期'
        );

    return {
      msg: 'Welcome to meInput',
      formValue: this.propsModelData,
      requiredTip: true, //控制显示必填*号提示
      focusTip: false, //标识当前是否属于focus状态

      myClearableForOne: false,
      defaultPickerOptions: {
        shortcuts: [
          {
            text: startClearableText,
            onClick: function onClick(picker) {
              // eslint-disable-next-line no-unused-vars
              var start = new Date(picker.value[0]);
              var end = new Date(picker.value[1]);
              picker.$emit('pick', ['', end]);
            }
          },
          {
            text: endClearableText,
            onClick: function onClick(picker) {
              var start = new Date(picker.value[0]);
              // eslint-disable-next-line no-unused-vars
              var end = new Date(picker.value[1]);
              picker.$emit('pick', [start, '']);
            }
          }
        ]
      }
    }
  },
  props: [
    'propsModelData',
    'config',
    'prop',
    'label',
    'placeholder',
    //-----

    'clearableForOne', //是否开启可“清除开始日期”和及“清除结束日期”模式
    'startClearableText', //清空开始日期
    'endClearableText', //清空结束日期

    'type',
    'error',
    'readonly',
    'disabled',
    'editable',
    'clearable',
    'size',
    'startPlaceholder',
    'endPlaceholder',
    'format',
    'align',
    'popperClass',
    'pickerOptions',
    'rangeSeparator',
    'defaultValue',
    'defaultTime',
    'valueFormat',
    'unlinkPanels',
    'showWordLimit',
    'prefixIcon',
    'suffixIcon',
    'name',
    'resize',
    'validateEvent'
  ],
  model: {
    prop: 'propsModelData',
    event: 'setModelValue'
  },

  computed: {
    cssFocus: function cssFocus() {
      return this.focusTip ? 'active' : ''
    },
    cssRequired: function cssRequired() {
      return this.requiredTip ? '' : 'is-no-asterisk'
    },
    formConfig: function formConfig() {
      var config = $common.useDefined(this.config, {});
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.myClearableForOne =
        $common.useDefined(this.clearableForOne, config.clearableForOne) === ''
          ? true
          : $common.useDefined(
              this.clearableForOne,
              config.clearableForOne,
              false
            );

      return {
        //必需属性
        prop: $common.useDefined(this.prop, config.prop), //用于表单校验
        label: $common.useDefined(this.label, config.label),
        placeholder: $common.useDefined(
          this.placeholder,
          config.placeholder,
          this.label,
          config.label,
          ' '
        ),
        focus: $common.useDefined(config.focus, false),
        //其他配置属性
        type: $common.useDefined(this.type, config.type, 'text'),
        error: $common.useDefined(this.error, config.error),
        readonly: $common.useDefined(this.readonly, config.readonly, false),
        disabled: $common.useDefined(this.disabled, config.disabled, false),
        editable: $common.useDefined(this.editable, config.editable, true),
        clearable: $common.useDefined(this.clearable, config.clearable, true),
        size: $common.useDefined(this.size, config.size),
        startPlaceholder: $common.useDefined(
          this.startPlaceholder,
          config['start-placeholder'],
          '开始日期'
        ),
        endPlaceholder: $common.useDefined(
          this.endPlaceholder,
          config['end-placeholder'],
          '结束日期'
        ),
        format: $common.useDefined(this.format, config.format, 'yyyy-MM-dd'),
        align: $common.useDefined(this.align, config.align, 'left'),
        popperClass: $common.useDefined(
          this.popperClass,
          config['popper-class']
        ),
        pickerOptions: $common.useDefined(
          this.pickerOptions,
          config['picker-options'],
          this.myClearableForOne && this.defaultPickerOptions //开启可清除时间范围其中一个值模式
        ),
        rangeSeparator: $common.useDefined(
          this.rangeSeparator,
          config['range-separator'],
          '至'
        ),
        defaultValue: $common.useDefined(
          this.defaultValue,
          config['default-value']
        ),
        defaultTime: $common.useDefined(
          this.defaultTime,
          config['default-time']
        ),

        valueFormat: this.myClearableForOne
          ? undefined
          : $common.useDefined(
              this.valueFormat,
              config['value-format'],
              'yyyy-MM-dd'
            ),
        unlinkPanels: $common.useDefined(
          this.unlinkPanels,
          config['unlink-panels'],
          true
        ),
        prefixIcon: $common.useDefined(this.prefixIcon, config.prefixIcon),
        suffixIcon: $common.useDefined(this.suffixIcon, config.suffixIcon),
        name: $common.useDefined(this.name, config.name),
        validateEvent: $common.useDefined(
          this.validateEvent,
          config['validate-event'],
          true
        )
      }
    }
  },
  watch: {
    propsModelData: function propsModelData(val) {
      this.formValue = val;
      this.handleChange();
    },
    // eslint-disable-next-line no-unused-vars
    config: function config(val) {
      this.handleChange();
    },
    // eslint-disable-next-line no-unused-vars
    formConfig: function formConfig(val) {
      this.handleChange();
    }
  },
  mounted: function mounted() {
    //错误检查
    this.checkError();

    //初始化处理label和placeholder显示
    this.handleChange();
  },
  methods: {
    handleChange: function handleChange() {
      //this.valueFormat
      var config = $common.useDefined(this.config, {});
      this.formConfig.label = $common.useDefined(this.label, config.label);
      this.formConfig.placeholder = $common.useDefined(
        this.placeholder,
        config.placeholder,
        this.label,
        config.label,
        ' '
      );

      try {
        if (this.myClearableForOne) {
          this.formValue[0] =
            new Date(this.formValue[0]) == 'Invalid Date'
              ? ''
              : new Date(this.formValue[0]).Format(
                  this.valueFormat || 'yyyy-MM-dd'
                );
          this.formValue[1] =
            new Date(this.formValue[1]) == 'Invalid Date'
              ? ''
              : new Date(this.formValue[1]).Format(
                  this.valueFormat || 'yyyy-MM-dd'
                );
          if (
            $common.isEmpty(this.formValue[0]) &&
            $common.isEmpty(this.formValue[1])
          ) {
            this.formValue = null;
          }
        }
      } catch (error) {}

      if (!this.formConfig.focus && $common.isEmpty(this.formValue)) {
        this.formConfig.label = ' ';
        this.requiredTip = false;
      } else {
        this.formConfig.placeholder = '';
        this.requiredTip = true;
      }

      this.focusTip = this.formConfig.focus;
      this.$emit('setModelValue', this.formValue);
      //强制更新数据绑定
      this.$forceUpdate();
    },
    onFocus: function onFocus(type) {
      var this$1 = this;

      this.formConfig.focus = type == 'focus' ? true : false;
      this.focusTip = this.formConfig.focus;
      setTimeout(function () {
        this$1.handleChange();
      }, 100);
    },

    /**事件转发 */
    change: function change(item) {
      this.$emit('change', item);
    },
    clear: function clear() {
      this.handleChange();
      this.$emit('clear');
    },

    // eslint-disable-next-line no-unused-vars
    checkError: function checkError(option) {
      var eg = "<el-date-picker-me  label=\"日期\" v-model=\"selDate\"></el-date-picker-me>或\n\t\t\t\t<el-date-picker-me  :config={label: \"日期\"} v-model=\"selDate\"></el-date-picker-me>\n\t\t\t\t\t\t\t\t ";
      $common.useDefined(this.label, this.config && this.config.label) ==
      undefined
        ? console.error('[el-date-picker-me] label参数必传，参数示例: ', eg)
        : '';
    }
  },
  components: {
    //
  }
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-form-item',{staticClass:"el-form-item-me",class:_vm.cssFocus + ' ' + _vm.cssRequired,attrs:{"border":"","label":_vm.formConfig.label,"prop":_vm.formConfig.prop}},[_c('el-date-picker',_vm._b({staticClass:"el-date-picker-me",on:{"focus":function($event){return _vm.onFocus('focus')},"blur":function($event){return _vm.onFocus('blur')},"input":function($event){return _vm.handleChange()},"change":_vm.change,"clear":_vm.clear},model:{value:(_vm.formValue),callback:function ($$v) {_vm.formValue=$$v;},expression:"formValue"}},'el-date-picker',_vm.formConfig,false),[_vm._t("default")],2),_vm._v(" "),_c('span',{staticClass:"is-required-me"},[_vm._v("*")]),_vm._v(" "),_c('div',{staticClass:"animate-bar",class:_vm.cssFocus})],1)};
var __vue_staticRenderFns__$5 = [];

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-2a8c6f67_0", { source: ".el-form-item:not(.is-required)>.el-form-item__content>.is-required-me[data-v-2a8c6f67]{display:none}.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__content>.is-required-me[data-v-2a8c6f67]{display:none}.el-form-item.is-required.is-no-asterisk>.el-form-item__content>.is-required-me[data-v-2a8c6f67]{display:block;left:5px;transition:all .3s;position:absolute;top:0;-webkit-transition:all .3s;height:100%;color:#df1d1d;text-align:center}.el-form-item-me .el-range-editor[data-v-2a8c6f67]{border:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = "data-v-2a8c6f67";
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$6 = {
  name: 'meInput',
  data: function data() {
    return {
      msg: 'Welcome to meInput',
      formValue: this.propsModelData,
      requiredTip: true, //控制显示必填*号提示
      focusTip: false //标识当前是否属于focus状态
    }
  },
  props: [
    'propsModelData',
    'config',
    'prop',
    'label',
    'placeholder',
    //-----
    'type',
    'error',
    'readonly',
    'disabled',
    'editable',
    'clearable',
    'size',
    'startPlaceholder',
    'endPlaceholder',
    'isRange',
    'arrowControl',
    'align',
    'popperClass',
    'pickerOptions',
    'rangeSeparator',
    'defaultValue',
    'valueFormat',
    'showWordLimit',
    'prefixIcon',
    'suffixIcon',
    'name',
    'resize',
    'validateEvent'
  ],
  model: {
    prop: 'propsModelData',
    event: 'setModelValue'
  },
  computed: {
    cssFocus: function cssFocus() {
      return this.focusTip ? 'active' : ''
    },
    cssRequired: function cssRequired() {
      return this.requiredTip ? '' : 'is-no-asterisk'
    },
    formConfig: function formConfig() {
      var config = $common.useDefined(this.config, {});
      return {
        //必需属性
        prop: $common.useDefined(this.prop, config.prop), //用于表单校验
        label: $common.useDefined(this.label, config.label),
        placeholder: $common.useDefined(
          this.placeholder,
          config.placeholder,
          this.label,
          config.label,
          ' '
        ),
        focus: $common.useDefined(config.focus, false),

        //其他配置属性
        type: $common.useDefined(this.type, config.type, 'text'),
        error: $common.useDefined(this.error, config.error),
        readonly: $common.useDefined(this.readonly, config.readonly, false),
        disabled: $common.useDefined(this.disabled, config.disabled, false),
        editable: $common.useDefined(this.editable, config.editable, true),
        clearable: $common.useDefined(this.clearable, config.clearable, true),
        size: $common.useDefined(this.size, config.size),
        startPlaceholder: $common.useDefined(
          this.startPlaceholder,
          config['start-placeholder']
        ),
        endPlaceholder: $common.useDefined(
          this.endPlaceholder,
          config['end-placeholder']
        ),
        isRange: $common.useDefined(this.isRange, config['is-range'], false),
        arrowControl: $common.useDefined(
          this.arrowControl,
          config['arrow-control'],
          false
        ),

        align: $common.useDefined(this.align, config.align, 'left'),
        popperClass: $common.useDefined(
          this.popperClass,
          config['popper-class']
        ),
        pickerOptions: $common.useDefined(
          this.pickerOptions,
          config['picker-options'],
          {}
        ),
        rangeSeparator: $common.useDefined(
          this.rangeSeparator,
          config['range-separator'],
          '-'
        ),
        defaultValue: $common.useDefined(
          this.defaultValue,
          config['default-value']
        ),

        valueFormat: $common.useDefined(
          this.valueFormat,
          config['value-format']
        ),
        prefixIcon: $common.useDefined(this.prefixIcon, config.prefixIcon),
        suffixIcon: $common.useDefined(this.suffixIcon, config.suffixIcon),
        name: $common.useDefined(this.name, config.name),
        validateEvent: $common.useDefined(
          this.validateEvent,
          config['validate-event'],
          true
        )
      }
    }
  },
  watch: {
    propsModelData: function propsModelData(val) {
      this.formValue = val;
      this.handleChange();
    },
    // eslint-disable-next-line no-unused-vars
    config: function config(val) {
      this.handleChange();
    },
    // eslint-disable-next-line no-unused-vars
    formConfig: function formConfig(val) {
      this.handleChange();
    }
  },
  created: function created() {
    //
  },
  mounted: function mounted() {
    //错误检查
    this.checkError();

    //初始化处理label和placeholder显示
    this.handleChange();
  },
  methods: {
    handleChange: function handleChange() {
      var config = $common.useDefined(this.config, {});
      this.formConfig.label = $common.useDefined(this.label, config.label);
      this.formConfig.placeholder = $common.useDefined(
        this.placeholder,
        config.placeholder,
        this.label,
        config.label,
        ' '
      );
      if (!this.formConfig.focus && $common.isEmpty(this.formValue)) {
        this.formConfig.label = ' ';
        this.requiredTip = false;
      } else {
        this.formConfig.placeholder = '';
        this.requiredTip = true;
      }

      this.focusTip = this.formConfig.focus;
      this.$emit('setModelValue', this.formValue);
      //强制更新数据绑定
      this.$forceUpdate();
    },
    onFocus: function onFocus(type) {
      var this$1 = this;

      this.formConfig.focus = type == 'focus' ? true : false;
      this.focusTip = this.formConfig.focus;
      setTimeout(function () {
        this$1.handleChange();
      }, 100);
    },

    /**事件转发 */
    change: function change(item) {
      this.$emit('change', item);
    },
    clear: function clear() {
      this.handleChange();
      this.$emit('clear');
    },

    // eslint-disable-next-line no-unused-vars
    checkError: function checkError(option) {
      var eg = "<el-time-picker-me  label=\"名称\" v-model=\"roleName\"></el-time-picker-me>或 <el-time-picker-me  :config={label: \"名称\"} v-model=\"roleName\"></el-time-picker-me> ";
      $common.useDefined(this.label, this.config && this.config.label) ==
      undefined
        ? console.error('[el-time-picker-me] label参数必传，参数示例: ', eg)
        : '';
    }
  },
  components: {
    //
  }
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-form-item',{staticClass:"el-form-item-me",class:_vm.cssFocus + ' ' + _vm.cssRequired,attrs:{"border":"","label":_vm.formConfig.label,"prop":_vm.formConfig.prop}},[_c('el-time-picker',_vm._b({staticClass:"el-time-picker-me",on:{"focus":function($event){return _vm.onFocus('focus')},"blur":function($event){return _vm.onFocus('blur')},"input":function($event){return _vm.handleChange()},"change":_vm.change,"clear":_vm.clear},model:{value:(_vm.formValue),callback:function ($$v) {_vm.formValue=$$v;},expression:"formValue"}},'el-time-picker',_vm.formConfig,false),[_vm._t("prefix"),_vm._v(" "),_vm._t("suffix"),_vm._v(" "),_vm._t("prepend"),_vm._v(" "),_vm._t("append"),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),_c('span',{staticClass:"is-required-me"},[_vm._v("*")]),_vm._v(" "),_c('div',{staticClass:"animate-bar",class:_vm.formConfig.focus ? 'active' : ''})],1)};
var __vue_staticRenderFns__$6 = [];

  /* style */
  var __vue_inject_styles__$6 = function (inject) {
    if (!inject) { return }
    inject("data-v-3b81de42_0", { source: ".el-form-item:not(.is-required)>.el-form-item__content>.is-required-me[data-v-3b81de42]{display:none}.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__content>.is-required-me[data-v-3b81de42]{display:none}.el-form-item.is-required.is-no-asterisk>.el-form-item__content>.is-required-me[data-v-3b81de42]{display:block;left:5px;transition:all .3s;position:absolute;top:0;-webkit-transition:all .3s;height:100%;color:#df1d1d;text-align:center}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$6 = "data-v-3b81de42";
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$7 = {
  name: 'showColumn',
  data: function data() {
    return {
      msg: 'Welcome to showColumn ',
      showColumn: [],
      tableColumn: this.propsModelData.map(function (item) {
        Vue.set(item, 'show', $common.useDefined(item.show, true));
        return item
      })
    }
  },
  props: ['propsModelData'],
  model: {
    prop: 'propsModelData',
    event: 'setModelValue'
  },
  computed: {
    //
  },
  watch: {
    propsModelData: function propsModelData(newValue) {
      this.tableColumn = newValue.map(function (item) {
        Vue.set(item, 'show', $common.useDefined(item.show, true));
        return item
      });
    },
    showColumn: function(newValue) {
      for (var i = 0; i < this.tableColumn.length; i++) {
        if (newValue.indexOf(this.tableColumn[i].label) > -1) {
          this.tableColumn[i].show = true;
        } else {
          this.tableColumn[i].show = false;
        }
      }
      this.$emit('setModelValue', this.tableColumn);
    }
  },
  created: function created() {
    //
  },
  mounted: function mounted() {
    //
  },
  methods: {
    //
  },
  components: {
    //
  }
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-popover',{staticClass:"el-show-column-popover-me",attrs:{"id":"showColumn","placement":"left","width":"330","trigger":"click"}},[_c('el-form',{staticClass:"el-show-column-form-me",attrs:{"inline":true}},[_c('el-form-item',{staticClass:"el-show-column-item-me",attrs:{"label":"选择需要显示的列:"}},[_c('el-checkbox-group',{model:{value:(_vm.showColumn),callback:function ($$v) {_vm.showColumn=$$v;},expression:"showColumn"}},_vm._l((_vm.tableColumn),function(item){return _c('el-checkbox',{key:item.id,staticStyle:{"width":"150px","margin":"0 5px"},attrs:{"label":item.label,"disabled":item.required,"checked":item.show},model:{value:(item.show),callback:function ($$v) {_vm.$set(item, "show", $$v);},expression:"item.show"}})}),1)],1)],1),_vm._v(" "),_c('p',{staticClass:"el-button pl-15 pr-15 el-show-column-me",attrs:{"slot":"reference"},slot:"reference"},[(!_vm.$slots.default)?[_c('i',{staticClass:"fa fa-filter primary"}),_vm._v(" "),_c('span',[_vm._v("显示列")])]:[_vm._t("default")]],2)],1)};
var __vue_staticRenderFns__$7 = [];

  /* style */
  var __vue_inject_styles__$7 = undefined;
  /* scoped */
  var __vue_scope_id__$7 = "data-v-5a472420";
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$8 = {
  name: 'meEditableColumn',
  data: function data() {
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
    $model: function $model() {
      return this.$store.state.$model
    },
    tableColumn: function tableColumn() {
      var config = this.config || {};
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
    propsModelData: function propsModelData(val) {
      this.formValue = val;
    },
    // eslint-disable-next-line no-unused-vars
    config: function config(val) {
      //
    }
  },
  created: function created() {
    //
  },
  mounted: function mounted() {
    //
  },
  methods: {
    //
  },
  components: {
    //
  }
};

/* script */
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.tableColumn.show)?_c('elx-editable-column',{staticClass:"elx-editable-column-me",attrs:{"prop":_vm.tableColumn.prop,"label":_vm.tableColumn.label,"type":_vm.tableColumn.type,"index":_vm.tableColumn.index,"columnKey":_vm.tableColumn.columnKey,"width":_vm.tableColumn.width,"minWidth":_vm.tableColumn.minWidth,"renderHeader":_vm.tableColumn.renderHeader,"sortable":_vm.tableColumn.sortable,"sortMethod":_vm.tableColumn.sortMethod,"sortBy":_vm.tableColumn.sortBy,"sortOrders":_vm.tableColumn.sortOrders,"resizable":_vm.tableColumn.resizable,"formatter":_vm.tableColumn.formatter,"showOverflowTooltip":_vm.tableColumn.showOverflowTooltip,"align":_vm.tableColumn.align,"headerAlign":_vm.tableColumn.headerAlign,"className":_vm.tableColumn.className,"labelClassName":_vm.tableColumn.labelClassName,"selectable":_vm.tableColumn.selectable,"reserveSelection":_vm.tableColumn.reserveSelection,"filters":_vm.tableColumn.filters,"filterPlacement":_vm.tableColumn.filterPlacement,"filterMultiple":_vm.tableColumn.filterMultiple,"filterMethod":_vm.tableColumn.filterMethod,"filteredValue":_vm.tableColumn.filteredValue,"edit-render":_vm.tableColumn.editRender},scopedSlots:_vm._u([{key:"default",fn:function(scope){return _vm._t("default",null,{"row":scope.row,"column":scope.column,"$index":scope.$index})}}],null,true)}):_vm._e()};
var __vue_staticRenderFns__$8 = [];

  /* style */
  var __vue_inject_styles__$8 = undefined;
  /* scoped */
  var __vue_scope_id__$8 = "data-v-01018d7d";
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$9 = {
  name: 'elButtonIconMe',
  components: {},
  data: function data() {
    return {
      msg: 'Welcome to elButtonIconMe',
      // 存放初始值
      oldConfig: {},
      isShowText: false,
      timeout: null,
      tipsText: '',
      other: {}
    }
  },
  props: [
    'size',
    'type',
    'plain',
    'round',
    'circle',
    'loading',
    'disabled',
    'icon',
    'autofocus',
    'nativeType',
    'config',
    'strLength',
    'title'
  ],
  model: {},
  computed: {
    buttonConfig: function buttonConfig() {
      var config = $common.useDefined(this.config, {});
      var newConfig = {
        size: $common.useDefined(this.size, config.size, 'medium'),
        // type: $common.useDefined(this.type, config.type, ''),
        type: '',
        plain: $common.useDefined(this.plain, config.plain, false),
        round: $common.useDefined(this.round, config.round, false),
        circle: $common.useDefined(this.circle, config.circle, true),
        loading: $common.useDefined(this.sloadingize, config.loading, false),
        icon: this.isShowText
          ? ''
          : $common.useDefined(this.icon, config.icon, ''),
        autofocus: $common.useDefined(this.autofocus, config.autofocus, false),
        nativeType: $common.useDefined(
          this.nativeType,
          config.nativeType,
          'button'
        ),
        strLength: $common.useDefined(this.strLength, config.strLength, 5),
        title: $common.useDefined(this.title, config.title, ''),
        disabled: $common.useDefined(this.disabled, config.disabled, false)
      };
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.oldConfig = JSON.parse(JSON.stringify(newConfig));
      return newConfig
    }
  },
  watch: {
    buttonConfig: {
      deep: true,
      immediate: true,
      // eslint-disable-next-line no-unused-vars
      handler: function handler(val) {
        var config = $common.useDefined(this.config, {});
        this.tipsText =
          this.$slots.default &&
          this.$slots.default[0] &&
          this.$slots.default[0].text
            ? this.$slots.default[0].text
            : '';
        this.other = {
          disabled: $common.useDefined(this.disabled, config.disabled, false)
        };
      }
    }
  },
  mounted: function mounted() {
    //错误检查
    this.checkError();
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    checkError: function checkError(option) {
      var eg = "\n            <el-button-icon-me  icon=\"el-icon-edit\"></el-button-icon-me>\n            或\n            <el-button-icon-me  :config={icon: \"el-icon-edit\"}></el-button-icon-me>\n            ";
      !this.icon && this.config && !this.config.icon
        ? console.error('[el-button-icon-me] icon 参数必传，参数示例: ', eg)
        : '';
    },
    click: function click(e) {
      if (this.other.disabled) {
        return
      }
      this.$emit('click', e);
    },
    // eslint-disable-next-line no-unused-vars
    mouseenter: function mouseenter(e) {
      var this$1 = this;

      if (!this.$slots.default) {
        return
      }
      this.timeout = setTimeout(function () {
        this$1.isShowText = true;
        this$1.$slots.default[0].text = this$1.$slots.default[0].text
          .trim()
          .substr(0, this$1.buttonConfig.strLength);
        if (!this$1.oldConfig.circle) {
          return
        }
        this$1.buttonConfig.round = true;
        this$1.buttonConfig.circle = false;
      }, 1000);
    },
    // eslint-disable-next-line no-unused-vars
    mouseleave: function mouseleave(e) {
      this.timeout && clearTimeout(this.timeout);
      if (!this.$slots.default) {
        return
      }
      this.isShowText = false;
      if (!this.oldConfig.circle) {
        return
      }
      this.buttonConfig.circle = true;
      this.buttonConfig.round = false;
    }
  }
};

/* script */
var __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-tooltip',{attrs:{"effect":"dark","content":_vm.tipsText,"placement":"bottom","disabled":_vm.tipsText.length == 0 || _vm.other.disabled,"open-delay":1000}},[_c('el-button',_vm._b({staticClass:"custom-button",class:{ 'is-disabled': _vm.other.disabled },attrs:{"title":_vm.title},on:{"click":function($event){return _vm.click($event)}}},'el-button',_vm.buttonConfig,false),[(_vm.isShowText)?[_vm._t("prefix"),_vm._v(" "),_vm._t("suffix"),_vm._v(" "),_vm._t("prepend"),_vm._v(" "),_vm._t("append"),_vm._v(" "),_vm._t("default")]:_vm._e()],2)],1)};
var __vue_staticRenderFns__$9 = [];

  /* style */
  var __vue_inject_styles__$9 = function (inject) {
    if (!inject) { return }
    inject("data-v-e945eca0_0", { source: ".custom-button.el-button[data-v-e945eca0]{padding:3px;background:0 0;border:none;color:#409eff}.custom-button.el-button[data-v-e945eca0]:focus,.custom-button.el-button[data-v-e945eca0]:hover{color:#409eff}.custom-button.el-button.is-disabled[data-v-e945eca0],.custom-button.el-button.is-disabled[data-v-e945eca0]:focus,.custom-button.el-button.is-disabled[data-v-e945eca0]:hover{color:#c0c4cc}", map: undefined, media: undefined })
,inject("data-v-e945eca0_1", { source: ".custom-button.el-button i{font-size:1.3em}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$9 = "data-v-e945eca0";
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$9 = normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$a = {
  name: 'meMenuItem',
  data: function data() {
    return {
      msg: 'Welcome to meMenuItem'
    }
  },
  props: ['index'],
  computed: {},
  created: function created() {
    //
  },
  mounted: function mounted() {
    //
  },
  methods: {
    hasPermission: function hasPermission() {
      var index = [], len = arguments.length;
      while ( len-- ) index[ len ] = arguments[ len ];

      return $common.hasPermission.apply($common, index)
    }
  },
  components: {
    //
  }
};

/* script */
var __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.hasPermission(_vm.index))?_c('el-menu-item',{attrs:{"index":_vm.index}},[_c('i',{staticClass:"fa fa-futbol-o mr-5",staticStyle:{"color":"#61A4E4"}}),_vm._v(" "),_vm._t("default")],2):_vm._e()};
var __vue_staticRenderFns__$a = [];

  /* style */
  var __vue_inject_styles__$a = undefined;
  /* scoped */
  var __vue_scope_id__$a = "data-v-c50c0818";
  /* module identifier */
  var __vue_module_identifier__$a = undefined;
  /* functional template */
  var __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$a = normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//

var script$b = {
  name: 'meSubMenu',
  data: function data() {
    return {
      msg: 'Welcome to meSubMenu',
      ifShow: true
    }
  },
  props: ['index'],
  mounted: function mounted() {
    //从$slots.default中提取各个slots的innerText值
    //如果innerText不为空则表示有下一级目录含有有权限的菜单
    var defaultSlots = this.$slots.default;
    var ifShow = false;
    for (var j = 0; j < defaultSlots.length; j++) {
      try {
        var innerText = defaultSlots[j].componentInstance.$el.innerText;
        innerText ? (ifShow = true) : '';
      } catch (error) {
        //
      }
    }
    this.ifShow = ifShow;
  }
};

/* script */
var __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.ifShow)?_c('el-submenu',{attrs:{"index":_vm.index}},[(_vm.ifShow)?_c('template',{slot:"title"},[_c('i',{staticClass:"fa fa-window-restore mr-5",staticStyle:{"color":"#61A4E4"}}),_vm._v(" "),(_vm.ifShow)?_vm._t("title"):_vm._e()],2):_vm._e(),_vm._v(" "),_vm._t("default")],2):_vm._e()};
var __vue_staticRenderFns__$b = [];

  /* style */
  var __vue_inject_styles__$b = undefined;
  /* scoped */
  var __vue_scope_id__$b = "data-v-29cf20be";
  /* module identifier */
  var __vue_module_identifier__$b = undefined;
  /* functional template */
  var __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$b = normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$c = {
  name: 'elTreeMe',
  props: {
    data: {
      //树数据
      type: Array,
      required: true
    },
    props: {
      type: Object,
      default: function () {
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
      default: function () {
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
  data: function data() {
    return {
      filterText: '',
      defaultExpandedKeyArr: [],
      treeData: []
    }
  },
  watch: {
    filterText: function filterText(val) {
      this.$refs['elTreeMe'].filter(val);
    },
    data: function data() {
      this.initialization();
    },
    defaultExpandedKeys: function defaultExpandedKeys() {
      this.defaultExpandedKeyArr = $common.copy(this.defaultExpandedKeys);
    }
  },
  created: function created() {
    this.initialization();
  },
  methods: {
    initialization: function initialization() {
      this.treeData = $common.copy(this.data); //复制树数据
      this.defaultExpandedKeyArr = $common.copy(this.defaultExpandedKeys); //复制默认展开的key
      this.checkExpandeFirst();
      this.setCurrentItem();
    },
    filterNode: function filterNode(value, data) {
      if (value) {
        var labelKey = this.props.label;
        return data[labelKey].indexOf(value) !== -1
      } else {
        return true
      }
    },
    handleNodeClick: function handleNodeClick(data, node, v) {
      var labelKey = this.props.label,
        nodeKey = this.nodeKey;
      var newValue = {};
      if (this.value[nodeKey] === data[nodeKey] && this.reClickCancel) {
        //再次点击取消选中
        node.isCurrent = false;
        node.checked = false;
        v.$el.blur();
      } else {
        newValue = {};
        newValue[labelKey] = data[labelKey];
        newValue[nodeKey] = data[nodeKey];
      }
      this.$emit('input', newValue);
      this.$emit('node-click', data, node, v);
    },
    handleRefresh: function handleRefresh() {
      this.initialization();
    },
    checkExpandeFirst: function checkExpandeFirst() {
      //默认展开第一级别
      var nodeKey = this.nodeKey,
        treeData = this.treeData;
      if (treeData[0] && this.openFirstStage) {
        this.defaultExpandedKeyArr.push(treeData[0][nodeKey]);
      }
    },
    setCurrentItem: function setCurrentItem() {
      var this$1 = this;

      //设置默认选中
      var nodeKey = this.nodeKey,
        item = this.value,
        keyValue = item[nodeKey];
      if (!$common.isEmpty(keyValue)) {
        if (!this.defaultExpandAll) {
          //如果不是全部展开，要展开该item所在的树
          var parentKeyValue = this.getParentKeyValue(keyValue); //获取父级键值
          this.defaultExpandedKeyArr.push(parentKeyValue);
        }
        this.$nextTick(function () {
          //需要树重新渲染成功后再去设置
          this$1.$refs['elTreeMe'].setCurrentKey(keyValue);
        });
      }
    },
    getParentKeyValue: function getParentKeyValue(childrenKeyValue) {
      var nodeKey = this.nodeKey,
        childrenKey = this.props['children'], //prop中children对应的key
        result = '',
        findParentKey = function(array, parentKeyValue) {
          array.forEach(function (item) {
            if (result == '') {
              if (item[nodeKey] === childrenKeyValue) {
                result = parentKeyValue;
              } else {
                if (item[childrenKey]) {
                  findParentKey(item[childrenKey], item[nodeKey]);
                }
              }
            }
          });
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
        };
      findParentKey(this.data);
      return result
    },
    removeFocus: function removeFocus(data, node, v) {
      //移除树展开或合并时，会自动有focus状态的样式问题
      var nodeKey = this.nodeKey;
      if (this.value[nodeKey] !== data[nodeKey]) {
        v.$el.blur();
      }
    }
  }
};

/* script */
var __vue_script__$c = script$c;

/* template */
var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"margin":"0","padding":"0"},attrs:{"id":"el-tree-me"}},[_c('div',{staticClass:"container"},[(!_vm.hideSearch)?_c('div',{attrs:{"redefine-icon-blue":"","eltreeinput":""}},[_c('el-input',{attrs:{"placeholder":"输入关键字"},model:{value:(_vm.filterText),callback:function ($$v) {_vm.filterText=$$v;},expression:"filterText"}},[_c('template',{slot:"append"},[_c('el-button',{staticClass:"icon-indigo",attrs:{"icon":"el-icon-refresh","title":"刷新"},on:{"click":_vm.handleRefresh}})],1)],2)],1):_vm._e(),_vm._v(" "),_c('el-scrollbar',{staticClass:"treeHeight",attrs:{"redefine":"","overscroll":""}},[_c('el-tree',{ref:"elTreeMe",staticClass:"simplicity",attrs:{"redefine":"","data":_vm.treeData,"props":_vm.props,"node-key":_vm.nodeKey,"expand-on-click-node":false,"default-expand-all":_vm.defaultExpandAll,"default-expanded-keys":_vm.defaultExpandedKeyArr,"filter-node-method":_vm.filterNode,"check-on-click-node":true},on:{"node-click":_vm.handleNodeClick,"node-expand":_vm.removeFocus,"node-collapse":_vm.removeFocus}})],1)],1)])};
var __vue_staticRenderFns__$c = [];

  /* style */
  var __vue_inject_styles__$c = function (inject) {
    if (!inject) { return }
    inject("data-v-d5a1673a_0", { source: ".treeHeight[data-v-d5a1673a]{height:70vh}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$c = "data-v-d5a1673a";
  /* module identifier */
  var __vue_module_identifier__$c = undefined;
  /* functional template */
  var __vue_is_functional_template__$c = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$c = normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//

// import $common from '../utils/common.js'

var script$d = {
  name: 'el-fold-me',
  props: {
    /* 收起时显示的文字 */
    hideText: {
      type: String,
      default: '展开查询条件'
    },
    /* 展开时显示的文字 */
    extendText: {
      type: String,
      default: '收起查询条件'
    },
    /* 初始时是否展示 |默认false */
    show: {
      type: Boolean,
      default: false
    },
    /* 调整bar的位置 |  {top:"20px"} */
    barStyle: {
      type: Object
    }
  },
  data: function data() {
    return { showContent: false }
  },
  watch: {
    show: {
      immediate: true,
      handler: function handler(v) {
        this.showContent = v;
      }
    },
    barStyle: function barStyle(v) {
      if (v) {
        this.$nextTick(function () {
          for (var key in v)
            { document.getElementById('slideButton').style[key] = v[key]; }
        });
      }
    }
  },
  methods: {
    handleClick: function handleClick() {
      this.showContent = !this.showContent;
      this.$emit('slide-click', this.showContent);
    }
  }
};

/* script */
var __vue_script__$d = script$d;

/* template */
var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"slideButton"}},[_c('div',{staticClass:"wrapper",on:{"click":_vm.handleClick}},[_c('span',{staticClass:"text"},[_vm._v(_vm._s(_vm.showContent ? _vm.extendText : _vm.hideText))]),_vm._v(" "),_c('div',{class:_vm.showContent ? 'hide-dot' : 'ext-dot'})])])};
var __vue_staticRenderFns__$d = [];

  /* style */
  var __vue_inject_styles__$d = function (inject) {
    if (!inject) { return }
    inject("data-v-4dae9058_0", { source: "#slideButton[data-v-4dae9058]{position:absolute;left:50%;bottom:-30px;-webkit-transform:translateX(-50%);transform:translateX(-50%);width:150px;height:20px;background:tomato}#slideButton .wrapper[data-v-4dae9058]{cursor:pointer;border-bottom:100px solid #f3f3f3;border-left:50px solid transparent;border-right:50px solid transparent;width:100%;margin-left:-50px}#slideButton .wrapper .dot[data-v-4dae9058],#slideButton .wrapper .text[data-v-4dae9058]{position:absolute}#slideButton .wrapper .text[data-v-4dae9058]{left:35px;color:#465266;font-family:Source Han Sans SC,PingFangSC-Light,helvetica neue,hiragino sans gb,arial,microsoft yahei ui,microsoft yahei,simsun,sans-serif;font-size:14px}#slideButton .wrapper .ext-dot[data-v-4dae9058]{position:absolute;top:8px;left:20px;width:0;height:0;border-width:5px;border-style:solid;border-color:#a0a0a0 transparent transparent transparent}#slideButton .wrapper .hide-dot[data-v-4dae9058]{position:absolute;top:3px;left:20px;width:0;height:0;border-width:5px;border-style:solid;border-color:transparent transparent #a0a0a0 transparent}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$d = "data-v-4dae9058";
  /* module identifier */
  var __vue_module_identifier__$d = undefined;
  /* functional template */
  var __vue_is_functional_template__$d = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$d = normalizeComponent(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    createInjector,
    undefined,
    undefined
  );

// import Vue from 'vue'

// common 应该放到每个组件内，不应该放到 vue 原型链上
// Vue.prototype.$common = common

__vue_component__.install = function(Vue) {
  Vue.component(__vue_component__.name, __vue_component__);
};
__vue_component__$1.install = function(Vue) {
  Vue.component(__vue_component__$1.name, __vue_component__$1);
};
__vue_component__$2.install = function(Vue) {
  Vue.component(__vue_component__$2.name, __vue_component__$2);
};
__vue_component__$3.install = function(Vue) {
  Vue.component(__vue_component__$3.name, __vue_component__$3);
};
__vue_component__$4.install = function(Vue) {
  Vue.component(__vue_component__$4.name, __vue_component__$4);
};
__vue_component__$5.install = function(Vue) {
  Vue.component(__vue_component__$5.name, __vue_component__$5);
};
__vue_component__$6.install = function(Vue) {
  Vue.component(__vue_component__$6.name, __vue_component__$6);
};
__vue_component__$7.install = function(Vue) {
  Vue.component(__vue_component__$7.name, __vue_component__$7);
};
__vue_component__$8.install = function(Vue) {
  Vue.component(__vue_component__$8.name, __vue_component__$8);
};
__vue_component__$9.install = function(Vue) {
  Vue.component(__vue_component__$9.name, __vue_component__$9);
};
__vue_component__$a.install = function(Vue) {
  Vue.component(__vue_component__$a.name, __vue_component__$a);
};
__vue_component__$b.install = function(Vue) {
  Vue.component(__vue_component__$b.name, __vue_component__$b);
};
// editorViewMe.install = function(Vue) {
//   Vue.component(editorViewMe.name, editorViewMe)
// }
// editorMe.install = function(Vue) {
//   Vue.component(editorMe.name, editorMe)
// }
// elUploadMe.install = function(Vue) {
//   Vue.component(elUploadMe.name, elUploadMe)
// }
__vue_component__$c.install = function(Vue) {
  Vue.component(__vue_component__$c.name, __vue_component__$c);
};
__vue_component__$d.install = function(Vue) {
  Vue.component(__vue_component__$d.name, __vue_component__$d);
};

exports.elAutocompleteMe = __vue_component__$3;
exports.elButtonIconMe = __vue_component__$9;
exports.elDatePickerMe = __vue_component__$5;
exports.elFoldMe = __vue_component__$d;
exports.elInputMe = __vue_component__$2;
exports.elMenuItemMe = __vue_component__$a;
exports.elPaginationMe = __vue_component__$1;
exports.elSelectMe = __vue_component__$4;
exports.elShowColumnMe = __vue_component__$7;
exports.elSubMenuMe = __vue_component__$b;
exports.elTimePickerMe = __vue_component__$6;
exports.elTreeMe = __vue_component__$c;
exports.elxEditableColumnMe = __vue_component__$8;
exports.test = __vue_component__;
