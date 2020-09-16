const db = require("../data.js");
const bcrypt = require("bcrypt");

module.exports.login = function(req, res) {
  res.render("auth/login");
};

module.exports.loginP = async function(req, res) {
  var getEmail = db
    .get("users")
    .find({ emailLogin: req.body.emailLogin })
    .value();
  var getPass = req.body.passLogin;
  var checkPass = await bcrypt.compare(getPass, getEmail.passLogin);

  if (!getEmail) {
    res.render("auth/login", {
      error: "Sai tên đăng nhập hoặc mật khẩu"
    });
    return;
  }

  if (checkPass !== true) {
    res.render("auth/login", {
      error: "Sai tên đăng nhập hoặc mật khẩu"
    });
    return;
  }

  res.cookie("cookie_user", getEmail.id, {
    signed: true
  });
  res.redirect("/master");
};
