const bookLibrary = require("../models/books.model.js");
const mongoose = require("mongoose");

module.exports.search = async function(req, res) {
  var q = req.query.q;
  var getData = await bookLibrary.find();
  var filterBook = getData.filter(function(x) {
    return x.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render("books/book", {
    library: filterBook,
    queryValue: q
  });
};


module.exports.book = async function(req, res) {
  var library = await bookLibrary.find();
  res.render("books/book", {
    library
  });
};

module.exports.add = function(req, res) {
  res.render("books/add");
};

module.exports.post = async function(req, res) {
  req.body.id = mongoose.Types.ObjectId;
  var err = [];
  if (!req.body.title) {
    err.push("Không được bỏ trống tiêu đề sách");
  }

  if (!req.body.description) {
    err.push("không được bỏ trống miêu tả nội dung");
  }

  if (err.length > 0) {
    res.render("books/add", {
      error: err,
      values: req.body
    });
    return;
  }

  await bookLibrary.create(req.body)
  res.redirect("/");
};

module.exports.id = async function(req, res) {
  var getId = req.params.id;
  var getData = await bookLibrary.findById(getId);

  res.render("books/show", {
    data: getData
  });
};

module.exports.delete = async function(req, res) {
  var getId = req.params.id;
  var getData = await bookLibrary.find().deleteOne({ _id: getId });

  res.redirect("/");
};

module.exports.edit = async function(req, res) {
  var getId = req.params.id;
  var getData = await bookLibrary.findById(getId);

  res.render("books/edit", {
    data: getData
  });
};

module.exports.editPort = async function(req, res) {
  var getId = req.params.id;
  var getTitle = req.body.title;
  var getDescription = req.body.description;
  await bookLibrary.findById(getId).updateOne({ title: getTitle, description: getDescription });

  res.redirect("/");
};
