const Record = require('../record')
const db = require('../../config/mongoose')
// const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

function getStr(num) {
  let str = Math.ceil(Math.random() * num).toString()
  if (str.length < 2) str = '0' + str
  return str
}


db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Record.create({
      name: 'name-' + i,
      category: i % 5,
      date: '2020-' + getStr(12) + '-' + getStr(30),
      amount: Math.floor(Math.random() * 100)
    })
  }
  console.log('Records are created')
})