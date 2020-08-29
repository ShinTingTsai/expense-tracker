const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { all } = require('./home')

// Filter
router.get('/', (req, res) => {
  const { month, category } = req.query
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

  function getRecords () {
    return new Promise(resolve => {
      console.log('category/month/userId:', category + ' / ' + month + ' / ' + userId )
      let recordsAggregate = []
      if (category === 'all' && month === 'all') {
        recordsAggregate = Record.aggregate([
          { $match: { userId } },
          {
            $project:
            {
              name: 1,
              category: 1,
              date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
              month: { $month: '$date' },
              amount: 1,
              merchant: 1
            }
          }
        ])
      } else if (category !== 'all' && month !== 'all') {
        recordsAggregate = Record.aggregate([
          { $match: { userId: userId, category: Number(category) } },
          {
            $project:
            {
              name: 1,
              category: 1,
              date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
              month: { $month: '$date' },
              amount: 1,
              merchant: 1
            }
          },
          { $match: { month: Number(month) } }
        ])
      } else if (category !== 'all' && month === 'all') {
        recordsAggregate = Record.aggregate([
          { $match: { userId: userId, category: Number(category) } },
          {
            $project:
            {
              name: 1,
              category: 1,
              date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
              month: { $month: '$date' },
              amount: 1,
              merchant: 1
            }
          }
        ])
      }
      // category === 'all' && month !== 'all'
      else {
        recordsAggregate = Record.aggregate([
          { $match: { userId: userId } },
          {
            $project:
            {
              name: 1,
              category: 1,
              date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
              month: { $month: '$date' },
              amount: 1,
              merchant: 1
            }
          },
          { $match: { month: Number(month) } }
        ])
      }
      console.log('recordsAggregate', recordsAggregate)
      resolve(recordsAggregate)
    })
  }


  async function getRenderData () {
    try {
      const categoryList = await getCategoryList()
      const records = await getRecords()
      console.log('records2', records)
      const totalAmount = await records.map(record => record.amount).reduce((prev, curr) => { return prev + curr }, 0)
      res.render('index', { records, totalAmount, categoryList })
    } catch (err) {
      console.log(err)
    }
  }

  getRenderData()
})

module.exports = router
