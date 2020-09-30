const db = require('../data.js');
const shortid = require("shortid");
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2

module.exports.index = function(req, res) {
  res.render("admin/master", { dataUsers: db.get("users").value() });
}

module.exports.addUser = function(req, res) {
  res.render("admin/addUser");
}


module.exports.addUserP = async function(req, res) {
    try{
      var hashedPassword =  await bcrypt.hash(req.body.passLogin, 10) 

      var pushData = {
        isAdmin: req.body.isAdmin = false,
        checkLogin:req.body.checkLogin = 0,
        id: req.body.id = shortid.generate(),
        emailLogin: req.body.emailLogin,
        passLogin: hashedPassword,
        name: req.body.name,
        introduce: req.body.introduce,
        avatar: req.body.avatar = req.file.path.split('/').slice(1).join('/')
      }
      
      var hehe = db.get("users")
      .push(pushData)
      .write();
      res.redirect("/master")
    }catch{
      res.status(500).send()
    }
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