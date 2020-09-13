// 观察者模式   观察者/被观察者
// 将所有的观察者都放到被观察者中  (基于发布订阅)

// 状态变化主动通知观察者

// 被观察者
class Subject {
  constructor(name) {
    this.name = name
    this.observers = []
    this.state = "玩"
  }
  attach(o) {
    // 被观察者中要存放所有的观察者
    if (this.observers.includes(o)) return
    this.observers.push(o)
  }
  setState(state) {
    this.state = state
    this.observers.forEach(o => o.update(this))
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  update(subject) {
    console.log(
      this.name + "观察到" + subject.name + "的状态更新了: ",
      subject.state
    )
  }
}

const subject = new Subject("被观察者")
const observer = new Observer("观察者")
subject.attach(observer)
subject.setState("吃")
subject.setState("学习")
