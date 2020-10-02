const express = require("express");

const controller = require("../controller/transaction.api.controller.js");

const router = express.Router();

router.get("/trade", controller.tradeApi);

module.exports = router;