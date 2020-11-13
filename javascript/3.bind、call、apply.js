/* eslint-disable no-extend-native */

// 4、bind
//  1.先保存调用时的函数，this
//  2.保存传递进来的参数，包括bind时，和执行时
//  3.返回一个函数
//  4.设置proto
//  5.根据调用方法的不同，不同执行，比如new关键字和普通函数
Function.prototype.myBind = function(ctx = window) {
  const fn = this
  const args = Array.from(arguments).slice(1)
  const newFn = function() {
    const allArgs = args.concat(...arguments)
    if (this instanceof newFn) {
      fn.apply(this, allArgs)
    } else {
      fn.apply(fn, allArgs)
    }
  }
  newFn.prototype = Object.create(fn.prototype)
  return newFn
}
// const me = { name: 'Jack' }
// const other = { name: 'Jackson' }
// function say() {
//   console.log(`My name is ${this.name || 'default'}`);
// }
// const meSay = say.bind(me)
// meSay()
// const otherSay = say.bind(other)
// otherSay()

//  有点6，把当前的this（函数），作为上下文的一个方法，执行上下的方法，那this肯定指向上下文
Function.prototype.myCall = function(ctx = window) {
  const key = Symbol('key')
  const args = Array.from(arguments).slice(1)
  ctx[key] = this
  const res = ctx[key](...args)
  delete ctx[key]
  return res
}
const me = { name: 'Jack' }
function say() {
  console.log(`My name is ${this.name || 'default'}`);
}
say.myCall(me)


// 7、apply
// eslint-disable-next-line no-extend-native
Function.prototype.myApply = function(ctx = window) {
  const key = Symbol('ctxKey')
  ctx[key] = this
  let res
  if (arguments[1]) {
    res = ctx[key](...arguments[1])
  } else {
    res = ctx[key]()
  }
  delete ctx[key]
  return res
}