const express = require('express');
const shortid = require("shortid");
const db = require('../data.js')

const bookController = require('../controller/book-controller.js')
const book = express.Router();

book.get("/search", bookController.search);

book.get("/book", bookController.index);

book.get("/add", bookController.add);

book.post("/add", bookController.post);

book.get("/book/:id", bookController.id);

book.get("/book/:id/delete", bookController.delete);

book.get("/book/:id/edit", bookController.edit);

book.post("/book/:id/edit", bookController.editPort);

module.exports = book;