const db = require("../data.js");
const shortid = require("shortid");

module.exports.buy = function(req, res) {
  // get cart from session:
  var getCart = db
    .get("sessions")
    .find({ id: req.signedCookies.sessionId })
    .value();
  console.log(getCart);

  for (var key in getCart.cart) {
    var userId = req.signedCookies.cookie_user;
    var getQuantity = getCart.cart[key];
    var getBookId = key;
    turnToTransaction(userId, getBookId, getQuantity);
  }

  function turnToTransaction(userId, bookId, quantity) {
    for (var i = 0; i < quantity; i++) {
      db.get("transactions")
        .push({
          id: shortid.generate(),
          isComplete: false,
          user: { userId },
          book: { bookId }
        })
        .write();
    }
  }
  res.redirect("/trade");
};
