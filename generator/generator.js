function gen$(context) {
  // 拆分原函数根据yield
}

let gen = function() {
  const context = {
    prev: 0, // 当前要运行的
    next: 0, // 下一次要运行的
    done: false, // 是否完成
    stop() {
      this.done = true // 更改完成状态
    }
  }
  return {
    next() {
      return {
        value: gen$(context),
        done: context.done
      }
    }
  }
}
