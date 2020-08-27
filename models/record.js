const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: { type: String },
  category: { type: Number },
  date: { type: String },
  amount: { type: Number },
  store: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)
