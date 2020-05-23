const Category = require('../category')
const db = require('../../config/mongoose')
const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他'].map(category => ({ name: category }))

db.once('open', () => {
  Category.insertMany(categories).then(
    console.log('Category seeds are created')
  )
})