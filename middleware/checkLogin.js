const express = require("express");
const dbUser = require("../models/user.model.js")


module.exports = async function(req, res, next) {
  if (req.signedCookies.cookie_user) {
    var getUser = await dbUser.findById(req.signedCookies.cookie_user);
    res.locals.user = getUser;
  }
   next();
};
