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

// Edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  console.log('id', id)
  let categoryList = new Array()
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
  return Record.findById(id)
    .lean()
    .then((record) => {
      categoryList[record.category].check = true
      res.render('edit', { record, categoryList })
    })
    .catch((error) => console.error(error))
})

router.post('/:id', (req, res) => {

  const id = req.params.id
  console.log('req.p', req.params)
  console.log('req.body', req.body)

  return Record.findById(id)
    .then((record) => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch((error) => console.error(error))
})



// Delete

// 匯出路由模組
module.exports = router