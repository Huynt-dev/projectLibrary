const mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
  title: String,
  description:String,
})

var bookLibrary = mongoose.model('bookLibrary', bookSchema, 'db-books');

module.exports = bookLibrary;
