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

Promise.resolve(new Promise(resolve => resolve(2))).then(res => {
  console.log("value", res)
})

Promise.resolve(222).then(res => {
  console.log("value", res)
})

Promise.all([null, 1, new Promise(res => res(222))]).then(console.log)

new Promise(resolve => {
  resolve("2")
})
  .finally(() => {
    return 22
  })
  .then(res => {
    console.log(res)
  })

new Promise(resolve => {
  resolve("2")
})
  .finally(() => {})
  .then(res => {
    console.log(res)
  })

new Promise(resolve => {
  resolve("2")
})
  .finally(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("2222")
      }, 1000)
    })
  })
  .then(res => {
    console.log(res)
  })
