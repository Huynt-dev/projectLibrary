const db = require('../data.js')
const shortid = require("shortid");

module.exports.index = function(req, res) {
  res.render("admin/master", { dataUsers: db.get("users").value() });
}

module.exports.addUser = function(req, res) {
  res.render("admin/addUser");
}

module.exports.addUserP = function(req, res) {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/master")
}

module.exports.id = function(req, res){
  var getId = req.params.id
  var getData = db.get("users")
  .find({id: getId})
  .value()
  res.render("admin/show",{
    data: getData
  })
}

module.exports.edit = function(req, res){
  var getId = req.params.id;
  var getData = db.get("users")
  .find({id: getId})
  .value()
  res.render("admin/editUser",{
    data: getData
  })
}

module.exports.editP = function(req,res){
  var getId = req.params.id;
  var getName = req.body.name;
  var getIntroduce = req.body.introduce;
  var getData = db.get("users")
  .find({id: getId})
  .assign({name: getName, introduce: getIntroduce})
  .write();
  res.redirect('/master')
}

module.exports.delete = function(req,res){
  var getId = req.params.id;
  db.get("users")
  .remove({id: getId})
  .write()
  res.redirect("/master")
}