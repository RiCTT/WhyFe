/** 
 * 谈一个clone为什么用到weakMap
 *  0、原生map导致的，map的实现采用了两个数组来保存key和value
 *    0.1、操作时间复杂度高
 *    0.2、数组一直引用着每个键、值，无法被GC垃圾回收，可能导致内存泄漏
 *  1、weakMap采用的是一个弱引用的做法，当没有其他引用存在时垃圾回收能正确进行
 *  2、weakMap的key只能是一个对象
 *  3、weakMap的key不可枚举，受GC机制，key是不确定的
 */

function deepClone(obj, cache = new WeakMap()) {
  if (!(obj instanceof Object)) return obj

  if (cache.get(obj)) return cache.get(obj)

  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)
  if (obj instanceof Map) {
    const map = new Map()
    map.forEach((value, key) => {
      map.set(key, deepClone(value))
    })
    return map
  }

  const res = Array.isArray(obj) ? [] : {}

  cache.set(obj, res)
  
  Object.keys(obj).forEach((key) => {
    if (obj[key] instanceof Object) {
      res[key] = deepClone(obj[key], cache)
    } else {
      res[key] = obj[key]
    }
  })

  return res
}

const map = new Map()
const obj = {
  a: 'obj'
}
map.set('test', obj)

const source = {
  name: 'Jack',
  myMap: map
}
source.source = source
const newObj = deepClone(source)
console.log(newObj)
