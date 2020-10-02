const dbUser = require("../models/user.model.js")
const dbSession = require("../models/session.model.js")


module.exports = async function(req, res, next) {
  if (!req.signedCookies.sessionId) {
    var newSession = await dbSession.create({});
    res.cookie("sessionId", newSession.id, {
      signed: true
    });
  }
  
  var session = await dbSession.findById(req.signedCookies.sessionId);
  var number = 0;
  if (session) {
    for (let book of session.cart) {
      number += book.quantity;
    }
  }
  res.locals.quantity = number;
  next();
};
