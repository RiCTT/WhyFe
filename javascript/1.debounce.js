/* eslint-disable no-unused-vars */
// 1、防抖
function debounce(func, ms = 1000) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, ms)
  }
}

// const task = () => { console.log('run task') }
// const debouceTask = debounce(task, 1000)
// window.addEventListener('scroll', debouceTask)


// 2、节流
function throttle(func, ms = 1000) {
  let canRun = true
  return function(...args) {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      func.apply(this, args)
      canRun = true
    }, ms)
  }
}

// const task = () => { console.log('run task') }
// const throttleTask = throttle(task, 1000)
// window.addEventListener('scroll', throttleTask)