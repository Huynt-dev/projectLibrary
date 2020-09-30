const express = require("express");
const shortid = require("shortid");
const db = require("../data.js");
const index = express.Router();

index.get("/", function(req, res) {
  var currPage = parseInt(req.query.page) || 1;
  var record = 21;

  var start = (currPage - 1) * record;
  var end = currPage * record;
  
  var data = db
    .get("library")
    .value()
    .slice(start, end);

  var maxPage = Math.ceil(db.get("library").value().length / record); // cái này sẽ là tổng số page mà ta sẽ có 
  
  // console.log("data: ", data);
  res.render("index", {
    library: data,
    currPage, // nếu 2 cái biết với key giống nhau thì bỏ đi cũng đc, viết như này là đủ rồi.
    maxPage
  });
});

module.exports = index;