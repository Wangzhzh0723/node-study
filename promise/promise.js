const STATUS = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED"
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
    const promise2 = new Promise((resolve, reject) => {
      let x
      if (this.status === STATUS.FULFILLED) {
        try {
          x = onFulfilled(this.value)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status === STATUS.REJECTED) {
        try {
          x = onRejected(this.reason)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status === STATUS.PENDING) {
        // 装饰器模式  切片编程
        this.onResolvedCallbacks.push(() => {
          // 这里增加额外逻辑
          try {
            x = onFulfilled(this.value)
            resolve(x)
          } catch (error) {
            reject(error)
          }
        })
        this.onRejectedCallbacks.push(() => {
          try {
            x = onRejected(this.reason)
            resolve(x)
          } catch (error) {
            reject(error)
          }
        })
      }
    })

    return promise2
  }
}

module.exports = Promise
