const fs = require("fs")
const Promise = require("./promise")

function read(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, function(err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

read("age.txt", "utf8").then(console.log, console.log) // 成功 18
read("age.txt1", "utf8").then(console.log, console.log) // 失败

// promise 的链式调用
// 1. 如果then方法中的成功或失败返回的不是一个promise, 会将这个值传递给外层下一次then的成功结果
// 2. 如果执行then方法中出错了 抛出异常 走到下一个promise失败中
// 3. 如果返回的是一个promise会用这个promise的结果作为下一次then的成功或失败

// catch 就是then的别名 没有成功只有失败  (找最近的优先处理, 处理不了找下一层)

// then为什么可以链式调用?
// 每次调用then都返回了新的promise
