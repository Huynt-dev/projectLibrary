const db = require("../data.js");

module.exports.auth = function(req, res, next) {
  if (!req.signedCookies.cookie_user) {
    res.redirect("/login");
    return;
}

var getUser = db
  .get("users")
  .find({ id: req.signedCookies.cookie_user })
  .value();

  if (!getUser) {
    res.redirect("/login");
    return;
  };
  res.locals.user = getUser
  next();
};
