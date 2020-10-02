const express = require("express");
const cartController = require('../controller/cart-controller.js')
const authLogin = require("../middleware/authLogin.js");

const cart = express.Router();

cart.get("/add/:productId", cartController.addToCart)

cart.get("/", cartController.cart)

module.exports = cart