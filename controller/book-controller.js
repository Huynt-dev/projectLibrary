const db = require('../data.js')
const shortid = require("shortid");

module.exports.search = function(req, res) {
  var q = req.query.q;
  var getData = db.get("library").value();
  var filterBook = getData.filter(function(x) {
    return x.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  
  res.render("books/book", {
    library: filterBook,
    queryValue: q
  });
}

module.exports.index = function(req, res) {
  res.render("books/book", { library: db.get("library").value() });
}

module.exports.add = function(req, res) {
  res.render("books/add");
}

module.exports.post = function(req, res) {
  req.body.id = shortid.generate();
  var err = [];
  if(!req.body.title){
    err.push('Không được bỏ trống tiêu đề sách')
  }
  
  if(!req.body.description){
    err.push('không được bỏ trống miêu tả nội dung')
  }
  
  if(err.length > 0){
    res.render('books/add',{
      error: err,
      values: req.body
    });
    return;
  }
  
  db.get("library")
    .push(req.body)
    .write();
  res.redirect("/");
}

module.exports.id = function(req, res) {
  var getId = req.params.id;
  var getData = db
    .get("library")
    .find({ id: getId })
    .value();
  res.render("books/show", {
    data: getData
  });
}

module.exports.delete = function(req, res) {
  var getId = req.params.id;
  var getData = db
    .get("library")
    .remove({ id: getId })
    .write();
  res.redirect("/");
}

module.exports.edit = function(req,res){
  var getId = req.params.id;
  var getData = db
    .get("library")
    .find({ id: getId })
    .value();
  res.render("books/edit", {
    data: getData
  });
}

module.exports.editPort = function(req,res){
  var getId = req.params.id;
  var getTitle = req.body.title;
  var getDescription = req.body.description;
  db.get("library")
    .find({ id: getId })
    .assign({title:  getTitle, description: getDescription})
    .write();
  res.redirect("/");
}