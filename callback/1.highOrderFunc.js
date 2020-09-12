// 什么是高阶函数? (满足下列两个特点之一)
// 1. 给一个函数传入一个函数作为参数
// 2. 一个函数返回一个函数

// 装饰器模式  对原本的函数的功能进行包装

function core() {
  console.log("core...")
  console.log("arguments", arguments)
}

Function.prototype.before = function(beforeFn) {
  // 箭头函数中没有this 没有arguments 没有prototype
  return (...args) => {
    beforeFn()
    this(...args)
  }
}

core.before(() => {
  console.log("core before...")
})(1, 2, 3)
// core before...
// core...
// arguments [Arguments] { '0': 1, '1': 2, '2': 3 }

// 闭包
// 定义函数的作用域和调用函数的作用域不是同一个
