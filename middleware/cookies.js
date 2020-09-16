const express = require('express');
const shortid = require("shortid");
const db = require('../data.js')

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