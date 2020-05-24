// use express
const express = require("express")
const exphbs = require('express-handlebars')
const bodyParser = require("body-parser")
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000
// setup template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(routes)


// const handlebars = require('handlebars')
// handlebars.registerHelper('equal', function(item1, item2, options) {
//   return (item1 == item2) ? options.fn(this) : options.inverse(this)
// })

// app.get('/', (req, res) => {
//   //從資料庫取得所有類別(categoryList)，帶入前端產生類別清單
//   let categoryList = new Array()
//   Category.find()
//     .lean()
//     .sort({ _id: 'asc' })
//     .then(categories => {
//       categoryList = categories.map(category => category.name)
//       // categories.forEach(category => {
//       //   categoryList.push({
//       //     name: category.name,
//       //     value: categories.indexOf(category)
//       //   })
//       // })
//       // console.log('categoryList',categoryList)
//     })
//     .catch(error => console.log(error))
//   Record.find()
//     .lean()
//     .sort({ date: 'asc' })
//     .then(records => {
//       const totalAmount = records.map(record => record.amount).reduce((prev, curr) => prev + curr)
//       res.render("index", { records, totalAmount, categoryList })
//     })
//     .catch(error => console.log(error))
// })

// app.get('/records/new', (req, res) => {
//   let categoryList = new Array()
//   Category.find()
//     .lean()
//     .sort({ _id: 'asc' })
//     .then(categories => {
//       categoryList = categories.map(category => category.name)
//       res.render('new', { categoryList })
//     })
//     .catch(error => console.log(error))
// })

// app.post('/records', (req, res) => {
//   const record = req.body
//   return Record.create(record)
//     .then(() => res.redirect('/'))
//     .catch((error) => console.error(error))
// })


app.listen(port, () => {
console.log(`Express is running on http://localhost:${port}`)
})