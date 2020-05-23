const express = require('express')
const router = express.Router()
// 引用  model
const Record = require('../../models/record')
const Category = require('../../models/category')

// Read all
router.get('/', (req, res) => {
  //從資料庫取得所有類別(categoryList)，帶入前端產生類別清單
  let categoryList = new Array()
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      categoryList = categories.map(category => category.name)
      // categories.forEach(category => {
      //   categoryList.push({
      //     name: category.name,
      //     value: categories.indexOf(category)
      //   })
      // })
      // console.log('categoryList',categoryList)
    })
    .catch(error => console.log(error))
  Record.find()
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      const totalAmount = records.map(record => record.amount).reduce((prev, curr) => prev + curr)
      res.render("index", { records, totalAmount, categoryList })
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router