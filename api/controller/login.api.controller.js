const dbUser = require("../../models/user.model.js");
const bcrypt = require("bcrypt");

module.exports.loginApi = async function(req, res) {
  var getEmail = await dbUser.findOne({ emailLogin: req.body.emailLogin });
  if (!getEmail) {
    res.json("auth/login", {
      error: "Sai tên đăng nhập hoặc mật khẩu"
    });
    return;
  }
  
  var getPass = req.body.passLogin;

  if (!getPass) {
    res.json("auth/login", {
      error: "Sai tên đăng nhập hoặc mật khẩu"
    });
    return;
  }

  var checkPass = await bcrypt.compare(getPass, getEmail.passLogin);

  if (checkPass !== true) {
    await dbUser.find({ emailLogin: req.body.emailLogin }).updateOne({"checkLogin": n => n + 1});
    res.json("auth/login", {
      error: "Sai tên đăng nhập hoặc mật khẩu"
    });
    return;
  }
  res.json({ login: true });
};
