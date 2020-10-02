const Transaction = require("../../models/trade.model.js");

module.exports.tradeApi = async function(req, res) {
  res.json(await Transaction.find());
};
