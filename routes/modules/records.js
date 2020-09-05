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
  // const userId = req.user._id
  const record = req.body
  record.userId = req.user._id
  console.log('req.body', req.body)
  return Record.create(record)
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

// Edit
router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  const categoryList = new Array()
  const promises = []
  promises.push(
    Category.find()
      .lean()
      .sort({ _id: 'asc' })
      .then(categories => {
        categories.forEach(category => {
          categoryList.push({
            name: category.name
          })
        })
      })
      .catch(error => console.log(error))
  )
  return Promise.all(promises).then(() => {
    Record.findById(id)
      .lean()
      .then((record) => {
        categoryList[record.category].check = true
        record.date = `${record.date.getFullYear()}-${record.date.getMonth() + 1}-${record.date.getDate()}`
        res.render('edit', { record, categoryList })
      })
      .catch((error) => console.error(error))
  })
  // Category.find()
  //   .lean()
  //   .sort({ _id: 'asc' })
  //   .then(categories => {
  //     categories.forEach(category => {
  //       categoryList.push({
  //         name: category.name
  //       })
  //     })
  //   })
  //   .catch(error => console.log(error))
  // return Record.findById(id)
  //   .lean()
  //   .then((record) => {
  //     categoryList[record.category].check = true
  //     res.render('edit', { record, categoryList })
  //   })
  //   .catch((error) => console.error(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

// Delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

// 匯出路由模組
module.exports = router
