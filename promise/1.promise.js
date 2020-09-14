// promise 目前只有ie版本可能不支持

// 1. 用法 2. 生态  3. 原理

// Promise解决哪些问题
// 1.解决异步并发问题(Promise.all)
// 2.解决回调地狱问题(链式调用)(上一个的输出是下一个的输入)
// 3.错误处理较方便(try-catch)

// Promise缺陷
// 依旧是基于回调函数

// [Promises/A+规范](https://promisesaplus.com)

// 1.Promise是一个类, 类中的构造函数需要传入一个函数executor, 默认就会执行
// 2.executor中有两个参数resolve和reject
// 3.三个状态pending(等待)   fulfilled(成功)   rejected(失败)
// 4.状态发生变化之后就不能再更改了
// 5.调用成功和失败需要传入原因
// 6.then传入的函数有返回值时惠志东包装成新的Promise
// 7.如果抛出异常按照失败处理
const Promise = require("./promise")
new Promise((resolve, reject) => {
  console.log(1)
  throw new Error("throw error")
  reject("失败了")
  resolve("成功了")
  console.log(2)
}).then(
  data => {
    console.log(data, "success")
  },
  err => {
    console.log(err, "error")
  }
)

console.log(3)
