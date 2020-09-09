const db = require("../data.js");
const shortid = require("shortid");

module.exports.index = function(req, res) {
  var getData = db.get("transactions").value();
  res.render("trade/showTrade", { transactions: getData });
};

module.exports.new = function(req, res) {
  var getDataUser = db.get("users").value();
  var getDataLibrary = db.get("library").value();

  res.render("trade/newTrader", {
    dataUser: getDataUser,
    dataBook: getDataLibrary
  });
};

module.exports.newP = function(req, res) {
  var pushData = {
    id: shortid.generate(),
    isComplete: false,
    user: {
      userId: req.body.userId,
      userName: req.body.userName
    },
    book: {
      bookId: req.body.bookId,
      bookName: req.body.bookName
    }
  };

  db.get("transactions")
    .push(pushData)
    .write();
  res.redirect("/trade");
};

module.exports.complete = function(req, res) {
  var getId = req.params.id;
  db.get("transactions")
    .find({ id: getId })
    .assign({ isComplete: true })
    .write();
  res.redirect("/trade");
};
