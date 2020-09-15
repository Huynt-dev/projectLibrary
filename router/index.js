const express = require('express');
const shortid = require("shortid");
const db = require('../data.js')
const index = express.Router();

index.get("/", function(req, res) {
  res.render("index", { library: db.get("library").value() });
});

module.exports = index;