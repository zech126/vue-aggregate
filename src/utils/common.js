// eslint-disable-next-line no-unused-vars
const $common = {
  unDefined(v) {
    return v === undefined ? true : false
  },
  isDefined(v) {
    return v != undefined ? true : false
  },
  propNoFalse(v) {
    return v !== undefined && v !== false ? true : false
  },
  useDefined: function(...option) {
    for (let i = 0; i < option.length; i++) {
      if (
        option[i] === 'undefined' ||
        option[i] === undefined ||
        option[i] === null
      ) {
        //
      } else {
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
      console.warn('[common]: $common.isArray(obj)方法中obj不能为undefined')
    }
    return Array.isArray(obj)
  },
  isJson: function(obj) {
    //判断obj是否为json对象
    if (this.useDefined(obj) === undefined) {
      console.warn('[common]: $common.isJson(obj)方法中obj不能为undefined')
    }
    return obj.constructor == Object
  },
  isObject: function(obj) {
    //是否为object类型
    if (this.useDefined(obj) === undefined) {
      console.warn('[common]: $common.isObject(obj)方法中obj不能为undefined')
    }
    return typeof obj == 'object' ? true : false
  },
  copy: function(val) {
    return this.isObject(val) ? this.toObject(JSON.stringify(val)) : val
  },
  setObject(object, item, value) {
    var obj = this.copy(object)
    if (this.isEmpty(item)) {
      for (let item in obj) {
        obj[item] = value
      }
    } else {
      obj[item] = value
    }
    return obj
  },
  //数组去重
  distinctArryObject(arryObject, prop) {
    //根据prop值去重
    let result = []
    let obj = {}
    arryObject.forEach(item => {
      let value = item[prop]
      if (!obj[value]) {
        result.push(item)
        obj[value] = 1
      }
    })
    // for (let item of arryObject) {
    //   let value = item[prop]
    //   if (!obj[value]) {
    //     result.push(item)
    //     obj[value] = 1
    //   }
    // }
    return result
  }
}
export default $common
