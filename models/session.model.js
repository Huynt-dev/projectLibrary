const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var bookSchema = new Schema({
  cart: [
    {
      bookId: {type: mongoose.Schema.Types.ObjectId,ref: 'Book'},
      quantity: Number
    }
  ]
})

var session = mongoose.model('session', bookSchema, 'db-sessions');

module.exports = session;
