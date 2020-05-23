const express = require('express')
const router = express.Router()
// 引用  model
const Record = require('../../models/record')
const Category = require('../../models/category')

// Create
router.get('/new', (req, res) => {
  let categoryList = new Array()
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      categoryList = categories.map(category => category.name)
      res.render('new', { categoryList })
    })
    .catch(error => console.log(error))
})

router.post('/create', (req, res) => {
  const record = req.body
  return Record.create(record)
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

// Read Single

// Update

// Delete

// 匯出路由模組
module.exports = router