const checkoutVersion = require('../build/check-version')

checkoutVersion() // 检查 node.js 和 npm 版本

const mongoose = require('mongoose')

const app = require('./app')
const config = require('../config/server')

// const Socket = require('./models/socket')
const Group = require('./models/group')
const getRandomAvatar = require('../utils/getRandomAvatar');

global.mdb = new Map() // 作为内存数据库使用
global.mdb.set('sealList', new Set()) // 封禁用户列表
global.mdb.set('newUserList', new Set()) // 新注册用户列表

mongoose.Promise = Promise

mongoose.connect(config.database, async (err) => {
  if (err) {
    console.log('connect database error!')
    console.error(error)
    return process.exit(1)
  }

  // 判断默认群是否存在，不存在就创建一个
  const group = await Group.findOne({ isDefault: true })
  console.log('>>>>>>>>>>>>>>>>>>> default group <<<<<<<<<<<<<<<<<<<<<<')
  console.log(group)
  console.log('>>>>>>>>>>>>>>>>>>> default group <<<<<<<<<<<<<<<<<<<<<<')
  if (!group) {
    const defaultGroup = await Group.create({
      name: config.defaultGroupName,
      avatar: getRandomAvatar(),
      isDefault: true
    })

    console.log('>>>>>>>>>>>>>>>>>>> create default group <<<<<<<<<<<<<<<<<<<<<<')
    console.log(defaultGroup)
    console.log('>>>>>>>>>>>>>>>>>>> create default group <<<<<<<<<<<<<<<<<<<<<<')

    if (!defaultGroup) {
      console.log(error('create default group fail'))
      return process.exit(1)
    }
  }

  app.listen(config.port, async () => {
    console.log(` >>> server listen on http://localhost:${config.port}`);
  })
})