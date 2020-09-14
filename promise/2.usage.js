// const Promise = require("./promise")

const p = new Promise((resolve, reject) => {
  console.log(1)
  setTimeout(() => {
    console.log(2)
    reject("失败了")
    console.log(3)
  }, 100)
})

p.then(
  data => {
    // 成功的回调
    console.log("success", data)
  },
  reason => {
    //失败的回调
    console.log("fail", reason)
  }
)

p.then(
  data => {
    // 成功的回调
    console.log("success", data)
  },
  reason => {
    //失败的回调
    console.log("fail", reason)
  }
)
console.log(4)
