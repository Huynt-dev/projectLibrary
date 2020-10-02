const express = require('express');
// const db = require('../data.js');
const buyController = require('../controller/buy-controller.js')
const buy = express.Router();

buy.get("/", buyController.buy)

module.exports = buy