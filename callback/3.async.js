// 异步数据处理

const fs = require("fs")
const path = require("path")

// node中的异步不能通过try-catch捕获异常
// fs.readFile(path.resolve(__dirname, "./2.curring.js"), "utf8", function(
//   err,
//   data
// ) {
//   if (!err) {
//     console.log(data)
//   }
// })

// 异步穿行(解决异步问题 核心就是回调函数)

const obj = {}

function after(times, cb) {
  return function() {
    !--times && cb()
  }
}

const fn = after(2, () => {
  console.log(obj)
})

fs.readFile("name.txt", "utf8", (err, data) => {
  if (!err) {
    obj.name = data
    fn()
  }
})
fs.readFile("age.txt", "utf8", (err, data) => {
  if (!err) {
    obj.age = data
    fn()
  }
})
