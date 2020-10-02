require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const apiLoginRoute = require("./api/router/login.api.router.js");
const apiTransactionRoute = require("./api/router/transaction.api.router.js");

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

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
  console.log('Connected !!!!!')
})

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
app.use("/api", apiLoginRoute);
app.use("/api", apiTransactionRoute);

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
