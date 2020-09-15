// promisify  promisifyAll 原理
// 高阶函数  执行返回 包装 promise

const Promise = require("./promise")
const fs = require("fs")
// bluebird promise库 promisify  promisifyAll
// 将异步api转换成promise的方式 (只针对promise)
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function(err, data) {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
}

function promisifyAll(target) {
  Reflect.ownKeys(target).forEach(key => {
    target[key + "Async"] = promisify(target[key])
  })
  return target
}

const obj = promisifyAll(fs)

obj
  .readFileAsync("age.txt", "utf8")
  .then(console.log)
  .catch(console.log)
// 18

obj
  .readFileAsync("age.txt1", "utf8")
  .then(console.log)
  .catch(console.log)
// { [Error: ENOENT: no such file or directory, open 'age.txt1'] errno: -2, code: 'ENOENT', syscall: 'open', path: 'age.txt1' }
