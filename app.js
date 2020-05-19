// use express
const express = require("express")
const exphbs = require('express-handlebars')

const app = express();
const port = 3000;
// setup template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

require("./config/mongoose");

// setup req and res
// render
app.get('/', (req, res) => {
  res.render("index")
})

// app.listen
app.listen(port, () => {
console.log(`Express is running on http://localhost:${port}`)
})