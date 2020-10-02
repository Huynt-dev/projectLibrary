const dbUser = require("../models/user.model.js")
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.auth = async function(req, res, next) {
  if (!req.signedCookies.cookie_user) {
    return res.redirect("auth/login");
  }

  var getUser = await dbUser.findOne({ _id: req.signedCookies.cookie_user });

  res.locals.user = getUser;

  if (!getUser) {
    return res.redirect("auth/login");
  }
  
//   if (getUser.checkLogin > 3) {
//     res.render("auth/login", {
//       error:"Bạn đã đăng nhập sai quá 3 lần, hãy kiểm tra mail để xác nhận bạ là chủ nhân của tài khoản này."
//     });
//     console.log(getUser.emailLogin);

//     const msg = {
//       to: getUser.emailLogin,
//       from: "admin@huynt.xyz", // Use the email address or domain you verified above
//       subject: "Xác nhận tài khoản",
//       text: "Bạn cần phải click vào đường link sau đây để xác nhận tài khoản",
//       html:
//         "<strong>Bạn cần phải click vào đường link sau đây để xác nhận tài khoản</strong>"
//     };
//     sgMail.send(msg, function(err, info) {
//       if (err) {
//         console.log("loi email");
//       } else {
//         console.log("email da duoc gui");
//       }
//     });

//   }
  next();
};
