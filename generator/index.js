// promise中有很多缺点  内部还是采用回调的方式 如果逻辑过多还是可能会导致 回调地狱
// try-catch

// koa1 用的generator  koa2 => async + await

// generator可以实现暂停的功能 => redux saga dva

// yield 表示的是产出  * generator函数 迭代器函数

// 根据指针向下执行 + switch-case来实现
function* gen() {
  yield 1
  yield 2
  yield 3
}
const it = gen()
console.log(it.next()) // { value: 1, done: false }
console.log(it.next()) // { value: 2, done: false }
console.log(it.next()) // { value: 3, done: false }
console.log(it.next()) // { value: undefined, done: true }

function* read(name) {
  console.log(name) // name1
  const y = yield 2
  console.log(y) // 3
}

const r = read("name1")
console.log(r.next("name2")) // { value: 2, done: false }
console.log(r.next(3)) // { value: undefined, done: true }

// async + await === generator + co

function co(it) {
  return new Promise((resolve, reject) => {
    function step(data) {
      let { value, done } = it.next(data)
      if (!done) {
        Promise.resolve(value).then(step, reject) // 失败就失败了
      } else {
        resolve(value) // 将最终的结果抛出去
      }
    }
    step()
  })
}

const fs = require("fs").promises
function* read2() {
  let name = yield fs.readFile("name.txt", "utf8")
  let age = yield fs.readFile(name, "utf8")
  return age
}

co(read2()).then(data => console.log(data)) // 18
