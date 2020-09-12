// 函数柯里化
// 接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，
// 并且返回接受余下的参数且返回结果的新函数

// 柯里化也是一个高阶函数

// 判断元素的类型
const isType = type => obj =>
  Object.prototype.toString.call(obj) === `[object ${type}]`

const isArray = isType("Array")
const isObject = isType("Object")

console.log(isArray([])) // true
console.log(isArray("")) // false
console.log(isObject([])) // false
console.log(isObject("")) // false
console.log(isObject({})) // true

// 通用柯里化/偏函数
const sum = (a, b, c) => a + b + c
const curring = (fn, arr = []) => {
  // 每次调用收集传入的参数
  const fnLength = fn.length // 函数参数长度
  return function(...args) {
    const newArgs = [...arr, ...args]
    if (fnLength == newArgs.length) {
      return fn(...newArgs)
    } else {
      return curring(fn, newArgs)
    }
  }
}
const newSum = curring(sum)
console.log(newSum(1)(2)(3))

const _isType = (type, obj) =>
  Object.prototype.toString.call(obj) === `[object ${type}]`
const newIsType = curring(_isType)
const _isString = newIsType("String")

console.log(_isString(1))
console.log(_isString("1"))
