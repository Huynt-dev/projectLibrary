const mongoose = require("mongoose");
const dbTransactions = require("../models/trade.model.js");
const dbUser = require("../models/user.model.js");
const bookLibrary = require("../models/books.model.js");


module.exports.index = async function(req, res) {
  var getData = await dbTransactions.find();
  var userId = req.signedCookies.cookie_user;
  var userDb = await dbUser.findById(userId)
  
  if (userDb.isAdmin !== true) {
    var getNewDb = getData.filter(function(x) {
      if (x.user.userId === userId) {
        return x;
      }
    });
    res.render("trade/showTrade", { transactions: getNewDb });
  } else {
    res.render("trade/showTrade", { transactions: getData });
  }
};

module.exports.new = async function(req, res) {
  
  // var getDataUser = db.get("users").value();
  var getDataUser = await dbUser.find();
  
  // var getDataLibrary = db.get("library").value();
  var getDataLibrary = await bookLibrary.find();

  res.render("trade/newTrader", {
    dataUser: getDataUser,
    dataBook: getDataLibrary
  });
};

module.exports.newP = async function(req, res) {
  await dbTransactions.create({
    isComplete: false,
    user: {
      userId: req.body.userId
    },
    book: {
      bookId: req.body.bookId
    }
  })
  res.redirect("/trade");
};

module.exports.complete = async function(req, res) {
  var getId = req.params.id;
  var getData = await dbTransactions.findById(getId).updateOne({isComplete: true});
  res.redirect("/trade");
};
