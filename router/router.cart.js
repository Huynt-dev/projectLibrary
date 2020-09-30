const express = require("express");
const shortid = require("shortid");
const cartController = require('../controller/cart-controller.js')
const db = require("../data.js");
const authLogin = require("../middleware/authLogin.js");

const cart = express.Router();

cart.get("/add/:productId", cartController.addToCart)

cart.get("/", cartController.cart)

module.exports = cart