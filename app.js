// use express
const express = require("express")
const exphbs = require('express-handlebars')
const handlebars = require('handlebars')
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

//用於網頁判斷兩個參數是否相等
handlebars.registerHelper('equal', function (item1, item2, options) {
  return (item1 === item2) ? options.fn(this) : options.inverse(this)
})

app.listen(port, () => {
console.log(`Express is running on http://localhost:${port}`)
})