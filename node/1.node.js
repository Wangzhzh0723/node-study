// node 中的全局对象  浏览器是window  node是global
// 默认访问t是在文件中访问的this 内部更改了 所以不是 global 而是module.exports

// console.log(this === module.exports) // true

function a() {
  console.log(this) // global
}
// a() // === global.a()

// node 全局属性

// 全局变量是可以在文件中不声明直接访问的变量  但是global上的属性叫全局属性
// require module exports __dirname __filename

// process中重要属性 platform  chdir  cwd  env  argv  nextTick

// platform 平台 可以区分操作系统
// 可以根据不同平台操作系统文件
// console.log(process.platform)

// cwd 可以获取当前执行命令的目录  是可变的  __dirname __filename 是不可变的
// console.log(process.cwd()) // /Users/jonath/Desktop/GitHub/zf学习/node

// chdir (change dir) 改变路径
// process.chdir("../")
// console.log(process.cwd()) // /Users/jonath/Desktop/GitHub/zf学习

// env 当前系统的环境变量
// 如果是window可以通过set xxx=xxx 如果是mac 或 linux 可以通过 export xxx=xxx
// 第三方模块cross-env可以不区分环境设置环境变量
// console.log(process.env)
// 用webpack区分是生产环境还是开发环境

// argv
// 运行命令传入的参数
// node node/1.node.js --prot 3000
//
// [ '/usr/local/bin/node', // node执行文件
//   '/Users/jonath/Desktop/GitHub/zf学习/node/node/1.node.js', // 执行谁
//   '--port',
//   '3000' ]

console.log(process.argv)

// commander 三方模块 解析用户参数(argv) 作者是TJ(node作者)
const program = require("commander")
program.name("wzz")
program.usage("[options]")
program.command("rm").action(() => {
  console.log("删除")
})
program.option("-p,--port <v>", "set your port")
program.parse(process.argv)
