const db = require("../data.js");
const bcrypt = require("bcrypt");

module.exports.login = function(req, res,next) {
  if (!req.signedCookies.cookie_user) {
    res.render("auth/login");
    return;
  }

  if (req.signedCookies.cookie_user) {
    res.redirect("/");
    return;
  }
  next()
};

module.exports.loginOk = async function(req, res) {
  var getEmail = db
    .get("users")
    .find({ emailLogin: req.body.emailLogin })
    .value();

  if (!getEmail) {
    res.render("auth/login", {
      error: "Sai tên đăng nhập hoặc mật khẩu"
    });
    return;
  }

  var getPass = req.body.passLogin;

  if (!getPass) {
    res.render("auth/login", {
      error: "Sai tên đăng nhập hoặc mật khẩu"
    });
    return;
  }

  var checkPass = await bcrypt.compare(getPass, getEmail.passLogin);

  if (checkPass !== true) {
    db.get("users")
      .find({ emailLogin: req.body.emailLogin })
      .update("checkLogin", n => n + 1)
      .write();

    res.render("auth/login", {
      error: "Sai tên đăng nhập hoặc mật khẩu"
    });
    return;
  }

  res.cookie("cookie_user", getEmail.id, {
    signed: true
  });
  res.redirect("/");
};
