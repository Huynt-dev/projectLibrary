const dbUser = require("../models/user.model.js");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2

module.exports.index = async function(req, res) {
  // res.render("admin/master", { dataUsers: db.get("users").value() });
  var getUser = await dbUser.find()
  res.render("admin/master", { dataUsers: getUser });
}

module.exports.addUser = function(req, res) {
  res.render("admin/addUser");
}


module.exports.addUserP = async function(req, res) {
    try{
      var hashedPassword =  await bcrypt.hash(req.body.passLogin, 10) 

      await dbUser.create ({
        isAdmin: req.body.isAdmin = false,
        checkLogin:req.body.checkLogin = 0,
        id: req.body.id = mongoose.Types.ObjectId,
        emailLogin: req.body.emailLogin,
        passLogin: hashedPassword,
        name: req.body.name,
        introduce: req.body.introduce,
        avatar: req.body.avatar = req.file.path.split('/').slice(1).join('/')
      })
      
      res.redirect("/master")
    }catch{
      res.status(500).send()
    }
}

module.exports.id = async function(req, res){
  var getId = req.params.id
  var data = await dbUser.findById(getId)
  res.render("admin/show",{
    data
  })
}

module.exports.edit = async function(req, res){
  var getId = req.params.id;
  var data = await dbUser.findById(getId)
  res.render("admin/editUser",{
    data
  })
}

module.exports.editP = async function(req,res){
  var getId = req.params.id;
  var getName = req.body.name;
  var getIntroduce = req.body.introduce;
  await dbUser.findById(getId).updateOne({name: getName, introduce: getIntroduce})
  // var getData = db.get("users")
  // .find({id: getId})
  // .assign({name: getName, introduce: getIntroduce})
  // .write();
  res.redirect('/master')
}

module.exports.delete = async function(req,res){
  var getId = req.params.id;
  var data = await dbUser.deleteOne({_id:getId})
  // db.get("users")
  // .remove({id: getId})
  // .write()
  res.redirect("/master")
}