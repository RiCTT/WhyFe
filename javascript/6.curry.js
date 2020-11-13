// function.length 可以获取形参个数

/**
 * 其实有点没理解柯里化函数到底解决了什么问题？
 * 百度过一些文章
 *  1.提高适用性，解决代码重复（没太感觉
 *  2.延迟执行，累计，直到条件满足（没有参数了）再返回计算的结果
 *  3.固定因变元素（没太感觉
 */

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    }
    return function(...args2) {
      return curried.apply(this, args.concat(args2))
    }
  }
}

function sum (a, b, c) {
  return a + b + c
}
const curriedSum = curry(sum)
console.log(curriedSum(1, 2, 3))
console.log(curriedSum(1)(2,3))
console.log(curriedSum(1)(2)(3))
