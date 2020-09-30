require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./data.js");
const cookieParser = require("cookie-parser");
const routerMaster = require("./router/router.master.js");
const routerBook = require("./router/router.book.js");
const routerTrade = require("./router/router.transactions.js");
const indexRouter = require("./router/index.js");
const routerAuth = require("./router/router.auth.js");
const routerCart = require("./router/router.cart.js");
const routerBuy = require("./router/router.buy.js");
const authLogin = require("./middleware/authLogin.js");
const checkUser = require("./middleware/checkLogin.js");
const sessionMiddleware = require("./middleware/session.middleware.js");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_COOKIE));

app.use(sessionMiddleware);
app.use(checkUser);

app.use("/", indexRouter);
app.use("/book", authLogin.auth, routerBook);
app.use("/master", authLogin.auth, routerMaster);
app.use("/trade", authLogin.auth, routerTrade);
app.use("/cart", routerCart);
app.use("/buy", authLogin.auth, routerBuy);
app.use("/auth", routerAuth);


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
