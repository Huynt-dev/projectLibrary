const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ library: [], users: [], transactions: [], sessions: [] }).write();

module.exports = db;
