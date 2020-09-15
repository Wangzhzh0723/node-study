const STATUS = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED"
}

function resolvePromise(x, promise, resolve, reject) {
  if (x == promise) {
    // 防止自己等待自己完成
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    )
  }
  // 看x是普通值还是promise  如果是promise要采用他的等待状态

  if ((x !== null && typeof x === "object") || typeof x === "function") {
    // x 可以是一个对象或函数
    let called = false
    try {
      const then = x.then // 看下这个x是否存在then方法
      if (typeof then === "function") {
        // then是函数 说明x是promise

        // 采用x的状态
        // 调用返回的promise 用它的结果 作为下一次then的结果
        then.call(
          x,
          function(y) {
            if (called) return
            called = true
            // 递归解析成功后的值  直到他不是promise为止
            resolvePromise(y, promise, resolve, reject)
          },
          function(r) {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        // 非promise, 直接调用resolve
        resolve(x)
      }
    } catch (e) {
      // 取then报错 直接抛出
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x) // 是一个原始数据类型  直接就调用resolve
  }
  // 不是promise 直接就调用resolve
}

class Promise {
  constructor(executor) {
    this.status = STATUS.PENDING
    this.value = this.reason = undefined
    this.onResolvedCallbacks = [] // 存放成功的回调
    this.onRejectedCallbacks = [] // 存放失败的回调
    const resolve = val => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED
        this.value = val
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    const reject = reason => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      // 出错走失败逻辑
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    // 处理onFulfilled, onRejected为空的情况
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : data => data
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : e => {
            throw e
          }

    const promise2 = new Promise((resolve, reject) => {
      let x
      if (this.status === STATUS.FULFILLED) {
        setTimeout(() => {
          try {
            x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status === STATUS.REJECTED) {
        setTimeout(() => {
          try {
            x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status === STATUS.PENDING) {
        // 装饰器模式  切片编程
        this.onResolvedCallbacks.push(() => {
          // 这里增加额外逻辑
          setTimeout(() => {
            try {
              x = onFulfilled(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              x = onRejected(this.reason)
              resolvePromise(x, promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })
    return promise2
  }
}

// 测试时会调用此方法
Promise.defer = Promise.deferred = function() {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise
