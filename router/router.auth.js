const express = require('express');
const db = require('../data.js')
const authController = require('../controller/auth-controller.js')
const auth = express.Router();

auth.get("/login", authController.login);

auth.post("/login", authController.loginOk);

module.exports = auth;