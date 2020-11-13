// 1、设置原型
// 2、考虑原型构造函数是否有显示返回this

function myNew(func, ...args) {
  const instance = {}
  if (func.prototype) {
    Object.setPrototypeOf(instance, func.prototype)
  }
  const res = func.apply(instance, args)
  if (typeof res === 'function' || (typeof res === 'object' && res !== null)) {
    return res
  }
  return instance
}

function Person(name) {
  this.name = name
}
Person.prototype.sayName = function () {
  console.log(this.name)
}

// const me = new Person('new')
// const my = myNew(Person, 'myNew')
// me.sayName()
// my.sayName()
// console.log(me)
// console.log(my)

function mNew(func) {
  let obj = {}
  if (func.prototype) {
    // 不能直接这样子改，并没有修改obj的隐式
    // obj.prototype = func.prototype
    // 设置原型1
    let f = function(){}
    f.prototype = func.prototype
    obj = new f()

    // 设置原型2
    // Object.setPrototypeOf(obj, func.prototype)
  }
  // 将构造函数中的this指向obj
  let res = func.apply(obj, [].slice.call(arguments, 1))
  if (typeof res === "object" && res !== null) {
    return res
  }
  return obj
}

