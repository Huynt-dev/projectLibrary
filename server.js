const express = require("express");
const bodyParser = require("body-parser");
const db = require("./data.js");

const routerMaster = require("./router/router.master.js");
const routerBook = require("./router/router.book.js");
const routerTrade = require("./router/router.transactions.js")
const app = express();

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function(req, res) {
  res.render("index", { library: db.get("library").value() });
});

app.use("/", routerBook);
app.use("/", routerMaster);
app.use("/trade", routerTrade)

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
