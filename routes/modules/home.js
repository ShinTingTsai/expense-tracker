const express = require('express')
const router = express.Router()
// 引用  model
const Record = require('../../models/record')
const Category = require('../../models/category')

// Read all
router.get('/', (req, res) => {
  // 從資料庫取得所有類別(categoryList)，帶入前端產生類別清單
  const categoryList = new Array()
  const promises = []
  promises.push(
    Category.find()
      .lean()
      .sort({ _id: 'asc' })
      .then(categories => {
        // categoryList = categories.map(category => category.name)
        categories.forEach(category => {
          categoryList.push({
            name: category.name
            // value: categories.indexOf(category)
          })
        })
      })
      .catch(error => console.log(error))
  )
  Promise.all(promises).then(() => {
    Record.find()
      .lean()
      .sort({ date: 'asc' })
      .then(records => {
        const totalAmount = records.map(record => record.amount).reduce((prev, curr) => { return prev + curr }, 0)
        res.render('index', { records, totalAmount, categoryList })
      })
      .catch(error => console.log(error))
  })

  // Category.find()
  //   .lean()
  //   .sort({ _id: 'asc' })
  //   .then(categories => {
  //     // categoryList = categories.map(category => category.name)
  //     categories.forEach(category => {
  //       categoryList.push({
  //         name: category.name
  //         // value: categories.indexOf(category)
  //       })
  //     })
  //   })
  //   .catch(error => console.log(error))
  // Record.find()
  //   .lean()
  //   .sort({ date: 'asc' })
  //   .then(records => {
  //     const totalAmount = records.map(record => record.amount).reduce((prev, curr) => { return prev + curr }, 0)
  //     res.render('index', { records, totalAmount, categoryList })
  //   })
  //   .catch(error => console.log(error))
})

// Filter
router.get('/filter/:keyword', (req, res) => {
  const keyword = req.params.keyword
  const condition = (keyword === '-1') ? {} : { category: keyword }
  const categoryList = new Array()
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      // categoryList = categories.map(category => category.name)
      categories.forEach(category => {
        categoryList.push({
          name: category.name
          // value: categories.indexOf(category)
        })
      })
    })
    .catch(error => console.log(error))
  return Record.find(condition)
    .lean()
    .then((records) => {
      if (keyword !== '-1') categoryList[keyword].check = true
      const totalAmount = records.map(record => record.amount).reduce((prev, curr) => prev + curr)
      res.render('index', { records, totalAmount, categoryList })
    })
})

// 匯出路由模組
module.exports = router
