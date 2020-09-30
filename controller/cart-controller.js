const db = require("../data.js");

module.exports.cart = function(req, res, next) {
  // res.render("cart");
  // dùng session lấy hết tất cả id trong data.cart
  var getCart = db
    .get("sessions")
    .find({ id: req.signedCookies.sessionId })
    .value();

  var cart = [];
  for (var bookId in getCart.cart) {
    var book = db
      .get("library")
      .find({ id: bookId })
      .value();
    console.log(getCart.cart[bookId])
    book.quantity = getCart.cart[bookId];
    cart.push(book);
  }
  // console.table(cart);
  res.render("cart", {
    cart
  });
  next()
};

module.exports.addToCart = function(req, res, next) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/");
  }

  var count = db
    .get("sessions")
    .find({ id: sessionId })
    .get("cart." + productId, 0)
    .value();

  db.get("sessions")
    .find({ id: sessionId })
    .set("cart." + productId, count + 1)
    .write();

  res.redirect("/");
  next()
};
