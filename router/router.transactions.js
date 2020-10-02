const express = require("express");
const tradeController = require('../controller/trade-controller.js')
const validate = require('../validator/validates.js')

const trade = express.Router();

trade.get("/", tradeController.index);

trade.get("/newTrader", tradeController.new);

trade.post("/newTrader", tradeController.newP);

trade.get("/:id/complete", validate.validateComplete, tradeController.complete);

module.exports = trade;