const express = require('express');
const shortid = require("shortid");
const db = require('../data.js')

const bookController = require('../controller/book-controller.js')
const book = express.Router();

book.get("/search", bookController.search);

book.get("/", bookController.index);

book.get("/add", bookController.add);

book.post("/add", bookController.post);

book.get("/:id", bookController.id);

book.get("/:id/delete", bookController.delete);

book.get("/:id/edit", bookController.edit);

book.post("/:id/edit", bookController.editPort);

module.exports = book;