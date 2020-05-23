// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 準備引入路由模組
const home = require('./modules/home')
const records = require('./modules/records')

// 依據網址結構(home or records) 導向 對應的模組
router.use('/', home)
router.use('/records', records)

// 匯出路由器
module.exports = router