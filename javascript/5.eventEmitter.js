class EventEmitter {
  constructor () {
    this.cache = {}
  }
  on(name, fn) {
    if (!this.cache[name]) {
      this.cache[name] = []
    }
    this.cache[name].push(fn)
  }
  off(name, fn) {
    const tasks = this.cache[name]
    if (tasks) {
      const index = tasks.findIndex(f => f === fn)
      if (index >= 0) {
        tasks.splice(index, 1)
      }
    }
  }
  emit(name) {
    if (this.cache[name]) {
      this.cache[name].forEach(fn => {
        fn()
      })
    }
  }
}