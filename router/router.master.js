const express = require("express");
const shortid = require("shortid");
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })

const masterController = require('../controller/master-controller.js')
const validate = require('../validator/validates.js')


const master = express.Router();

master.get("/", masterController.index);

master.get("/addUser", masterController.addUser);

master.post("/addUser",upload.single('avatar'), validate.validateUser, masterController.addUserP);

master.get("/:id", masterController.id)

master.get("/:id/edit", masterController.edit)

master.post("/:id/edit", masterController.editP)

master.get("/:id/delete", masterController.delete)

module.exports = master;