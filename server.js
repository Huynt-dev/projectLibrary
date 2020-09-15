const express = require("express");
const bodyParser = require("body-parser");
const db = require("./data.js");
const cookieParser = require('cookie-parser')
const routerMaster = require("./router/router.master.js");
const routerBook = require("./router/router.book.js");
const routerTrade = require("./router/router.transactions.js");
const indexRouter = require("./router/index.js");
const routerAuth = require("./router/router.auth.js");
const authLogin = require("./middleware/authLogin.js");
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "pug");
app.set("views", "./views");
// app.use(cookiesMiddleware.cookies);


app.use("/", indexRouter);
app.use("/", routerAuth);
app.use("/book", routerBook);
app.use("/master",authLogin.auth, routerMaster);
app.use("/trade",authLogin.auth, routerTrade)

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
