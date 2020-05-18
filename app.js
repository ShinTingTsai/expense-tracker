// use express
const express = require("express")


const app = express();
const port = 3000;

require("./config/mongoose");

// setup req and res
// render
app.get('/', (req, res) => {
 res.send("hello world");
})

// app.listen
app.listen(port, () => {
console.log(`Express is running on http://localhost:${port}`)
})