const Record = require('../record')
const db = require('../../config/mongoose')
// const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Record.create({
      name: 'name-' + i,
      category: i % 5,
      date: '2020-' + Math.ceil(Math.random() * 12) + '-' + Math.ceil(Math.random() * 30),
      amount: Math.floor(Math.random() * 100)
    })
  }
  console.log('Record seeds are created')
})