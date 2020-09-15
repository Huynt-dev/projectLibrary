const db = require('../data.js')
const md5 = require('md5');

module.exports.login = function(req,res){
  res.render('auth/login')
}

module.exports.loginP = function(req,res){
  var getEmail = db.get('users').find({emailLogin: req.body.emailLogin}).value();
  var getPass = req.body.passLogin;
  var hashedPass = md5(getPass)
  if(!getEmail){
    res.render('auth/login',{
      error: 'Sai tên đăng nhập hoặc mật khẩu'
    });
    return;
  }
  
  if(getEmail.passLogin !== hashedPass){
    res.render('auth/login',{
      error: 'Sai tên đăng nhập hoặc mật khẩu'
    });
    return;
  }
  
  res.cookie('cookie_user', getEmail.id)
  res.redirect("/master")
}