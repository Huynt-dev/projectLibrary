const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var transactionsSchema = new Schema({
    isComplete: Boolean,
    user:{userId:{type: mongoose.Schema.Types.ObjectId,ref: 'User'}},
    book:{bookId:{type: mongoose.Schema.Types.ObjectId,ref: 'Book',
    }}
  })

var dbTransactions = mongoose.model('dbTransactions', transactionsSchema, 'db-transactions');

module.exports = dbTransactions;
