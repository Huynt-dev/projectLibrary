const express = require("express");
const shortid = require("shortid");
const db = require("../data.js");

const masterController = require('../controller/master-controller.js')

const master = express.Router();

master.get("/master", masterController.index);

master.get("/addUser", masterController.addUser);

master.post("/addUser", masterController.addUserP);

master.get("/master/:id", masterController.id)

master.get("/master/:id/edit", masterController.edit)

master.post("/master/:id/edit", masterController.editP)

master.get("/master/:id/delete", masterController.delete)

module.exports = master;