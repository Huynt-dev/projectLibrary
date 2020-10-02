const express = require("express");
const bookLibrary = require("../models/books.model.js")
const index = express.Router();

index.get("/", async function(req, res) {

  var getdata = await bookLibrary.find();
  res.render("index", {
    library: getdata,
  })
});

module.exports = index;