const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  isAdmin: Boolean,
  emailLogin:String,
  passLogin:String,
  name:String,
  introduce:String,
  checkLogin:Number,
  avatar:String
})

var dbUser = mongoose.model('dbUser', userSchema, 'db-users');

module.exports = dbUser;