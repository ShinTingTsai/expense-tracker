const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recordSchema = new Schema({
  name: { type: String },
  category: { type: String },
  date: { type: String },
  amount: { type: String },
});
module.exports = mongoose.model("Todo", todoSchema);



// 支出名稱：name
// 類別：category
// 日期：date
// 金額：amount