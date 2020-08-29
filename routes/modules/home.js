const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')



// Read all
router.get('/', (req, res) => {
  const userId = req.user._id
 
  function getCategoryList () {
    return new Promise(resolve => {
      const list = new Array()
      Category.find()
        .lean()
        .sort()
        .then(categories => {
          categories.forEach(category => {
            list.push({
              name: category.name
            })
          })
          resolve(list)
        })
        .catch(error => console.log(error))
    })
  }

  function getRecords (userId) {
    return new Promise(resolve => {
      const newRecords = new Array()
      Record.find({ userId })
        .lean()
        .sort({ date: 'asc' })
        .then(records => {
          records.forEach(record => {
            const newDate = `${record.date.getFullYear()}-${record.date.getMonth()+1}-${record.date.getDate()}`
            newRecords.push({
              name: record.name,
              category: record.category,
              date: newDate,
              amount: record.amount,
              merchant: record.merchant,
              userId: record.userId
            })
          })
          resolve(newRecords)
        })
        .catch(error => console.log(error))
    })
  }

  async function getRenderData () {
    try {
      const categoryList = await getCategoryList()
      const records = await getRecords(userId)
      const totalAmount = records.map(record => record.amount).reduce((prev, curr) => { return prev + curr }, 0)
      res.render('index', { records, totalAmount, categoryList })
    } catch (err) {
      console.log(err)
    }
  }

  getRenderData()
})

module.exports = router
