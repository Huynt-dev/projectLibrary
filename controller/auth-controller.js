const dbUser = require("../models/user.model.js");
const bcrypt = require("bcrypt");


module.exports.login = function(req, res) {
  if (!req.signedCookies.cookie_user) {
    res.render("auth/login");
    return;
  }
  res.redirect("/");
};

module.exports.loginOk = async function(req, res) {
  var getEmail = await dbUser.findOne({ emailLogin: req.body.emailLogin });

  if (!getEmail) {
    res.render("auth/login", {
      error: "Sai tên đăng nhập hoặc mật khẩu"
    });
    return;
  }
console.log(getEmail)
  var getPass = req.body.passLogin;

  if (!getPass) {
    res.render("auth/login", {
      error: "Sai tên đăng nhập hoặc mật khẩu"
    });
    return;
  }

  var checkPass = await bcrypt.compare(getPass, getEmail.passLogin);

  if (checkPass !== true) {
    await dbUser.find({ emailLogin: req.body.emailLogin }).update({"checkLogin": n => n + 1});
    
    res.render("auth/login", {
      error: "Sai tên đăng nhập hoặc mật khẩu"
    });
    return;
  }else{
    res.cookie("cookie_user", getEmail.id, {
      signed: true
    });
    res.redirect("/");
  }
};
