// 订阅/发布模式
// 异步数据处理

const fs = require("fs")

let eventObj = {
  arr: [], // 中介存放 订阅数据
  on(fn) {
    this.arr.push(fn)
  },
  emit() {
    this.arr.forEach(fn => fn())
  }
}

let obj = {}
fs.readFile("name.txt", "utf8", (err, data) => {
  if (!err) {
    obj.name = data
    eventObj.emit()
  }
})
fs.readFile("age.txt", "utf8", (err, data) => {
  if (!err) {
    obj.age = data
    eventObj.emit()
  }
})

eventObj.on(() => {
  if (Object.keys(obj).length >= 2) {
    console.log(obj)
  }
})
