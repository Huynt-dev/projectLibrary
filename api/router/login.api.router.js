const express = require("express");

const controller = require("../controller/login.api.controller.js");

const router = express.Router();

router.post("/login", controller.loginApi);

module.exports = router;
