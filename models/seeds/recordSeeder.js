const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const Record = require('../record')
const db = require('../../config/mongoose')
// const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
const seeduser =
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  }

function getStr (num) {
  let str = Math.ceil(Math.random() * num).toString()
  if (str.length < 2) str = '0' + str
  return str
}

db.once('open', () => {
  function createUser (user) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => User.create({
          name: user.name,
          email: user.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          return resolve(userId)
        })
    }).catch(err => console.log(err))
  }

  function createRecord (userId) {
    return Promise.all(Array.from(
      { length: 10 },
      (_, i) => Record.create({
        name: 'name-' + i,
        category: i % 5,
        date: '2020-' + getStr(12) + '-' + getStr(30),
        amount: Math.floor(Math.random() * 100),
        userId
      })
    ))
      .catch(err => console.log(err))
  }
  
  async function createData (user) {
    try {
      const userId = await createUser(user)
      await createRecord(userId)
    } catch (err) {
      console.log(err)
    }
  }

  createData(seeduser)
    .then(() => {
      db.close()
      console.log('Records are created, DB closed.')
      process.exit()
    })
    .catch(err => console.log(err))
})
