const shortid = require("shortid");
const db = require("../data.js");

module.exports = function(req, res, next) {
  if (!req.signedCookies.sessionId) {
    var newSessionId = shortid.generate();
    res.cookie("sessionId", newSessionId, {
      signed: true
    });

    db.get("sessions")
      .push({
        id: newSessionId
      })
      .write();
    next();
  }

  var data = db
    .get("sessions")
    .find({ id: req.signedCookies.sessionId })
    .value();
  //count
  var number = 0;
  if (!data.cart) {
    res.locals.quantity = number;
    next();
  }

  for (var book in data.cart) {
    number += data.cart[book];
  }
  res.locals.quantity = number;
  // quantity = số lượng
  next();
};
