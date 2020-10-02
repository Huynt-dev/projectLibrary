const dbSession = require("../models/session.model.js");
const dbTransactions = require("../models/trade.model.js");
const mongoose = require("mongoose");

async function turnToTransaction(user, book, q) {
    for (var i = 0; i < q; i++) {
       await dbTransactions.create({
          isComplete: false,
          user:{userId:user},
          book:{bookId:book}
        });

    }
  }

module.exports.buy = async function(req, res) {
  var session = await dbSession.findById(req.signedCookies.sessionId);
  var promises = [];
  var userId = res.locals.user._id;
  
  session.cart.map(function(cart) {
    promises.push(
      dbTransactions.create({
        isComplete: false,
        user:{userId: userId} ,
        book:{bookId: cart.bookId} 
      })
    )
  })
  
  await Promise.all(promises)
  
  res.redirect("/trade");
};
  // console.log(session)
  /*
  {
    _id: 5f76dd9b37a3cc3b71b3ea05,
    cart: [
      {
        _id: 5f770141c6986d26815f1ee8,
        bookId: '5f7580cd68075183287f3b15',
        quantity: 1
      },
      {
        _id: 5f770146c6986d26815f1ee9,
        bookId: '5f7580df68075183287f3d90',
        quantity: 1
      }
    ],
    __v: 0
  }
  */