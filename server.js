const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const shortid = require("shortid");
const app = express();
db.defaults({ library: [] }).write();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function(req, res) {
  res.render("index", { library: db.get("library").value() });
});

app.get("/search", function(req, res) {
  var q = req.query.q;
  var getData = db.get("library").value();
  var filterBook = getData.filter(function(x) {
    return x.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("book", {
    library: filterBook,
    queryValue: q
  });
});

app.get("/book", function(req, res) {
  res.render("book", { library: db.get("library").value() });
});



app.get("/add", function(req, res) {
  res.render("add");
});

app.post("/add", function(req, res) {
  req.body.id = shortid.generate();
  db.get("library")
    .push(req.body)
    .write();
  res.redirect("/");
});

app.get("/book/:id", function(req, res) {
  var getId = req.params.id;
  var getData = db
    .get("library")
    .find({ id: getId })
    .value();
  res.render("show", {
    data: getData
  });
});

app.get("/book/:id/delete", function(req, res) {
  var getId = req.params.id;
  var getData = db
    .get("library")
    .remove({ id: getId })
    .write();
  res.redirect("/");
});

app.get("/book/:id/edit", function(req,res){
  var getId = req.params.id;
  var getData = db
    .get("library")
    .find({ id: getId })
    .value();
  res.render("edit", {
    data: getData
  });
})

app.post("/book/:id/edit", function(req,res){
  var getId = req.params.id;
  var getTitle = req.body.title;
  var getDescription = req.body.description;
  db.get("library")
    .find({ id: getId })
    .assign({title:  getTitle, description: getDescription})
    .write();
  res.redirect("/");
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
