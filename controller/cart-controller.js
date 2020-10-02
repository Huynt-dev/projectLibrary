const dbSession = require("../models/session.model.js");
const bookLibrary = require("../models/books.model.js");

module.exports.cart = async function(req, res, next) {
  var session = await dbSession.findById(req.signedCookies.sessionId );
  var cart = session.cart;
  res.render("cart", {
    cart
  });
  next();
};

module.exports.addToCart = async function(req, res) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;
  // var userId = await sessionId.findOne()
  if (!sessionId) {
    res.redirect("/");
  }
  var session = await dbSession.findById(sessionId);
  
  var book = session.cart.find(
    cartItem => cartItem.bookId.toString() === productId
  );

  if (book) {
    book.quantity += 1;
    await session.save();
  } else {
    await dbSession.findByIdAndUpdate(sessionId, {
      $push: { cart: { bookId: productId, quantity: 1 } }
    });
  }

  res.redirect("/");
};