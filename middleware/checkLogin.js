const express = require("express");
const db = require("../data.js");

// module.exports.cookies = function (req, res, next) {
//     // var cookie = req.cookies.cookie_name
//     // if(!cookie){
//     //   res.cookie('cookie_name',333);
//     // }else{
//     //   db.update('count', n => n + 1).write()
//     //   const countCookie = db.get('count').value();
//     //   console.log('countCookie', countCookie);
//     // }
//    next();
// }

module.exports = function(req, res, next) {
  if (req.signedCookies.cookie_user) {
    var getUser = db
      .get("users")
      .find({ id: req.signedCookies.cookie_user })
      .value();
    // validate ở đoạn này
    res.locals.user = getUser;
    // req.user = getUser;
  }
   next();
};
