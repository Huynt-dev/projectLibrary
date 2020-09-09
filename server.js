// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();

// https://expressjs.com/en/starter/basic-routing.html

app.set('view engine','pug');
app.set('views','./views');


app.get('/', function(req,res){
  res.render('index')
});

app.get('/todo', function(req,res){
  res.render('toDo', {
    listToDo:[
      {id:1,task:'Đi chợ'},
      {id:2,task:'Nấu cơm'},
      {id:3,task:'Rửa bát'},
      {id:4,task:'Học code tại CodersX'}
    ]
  });
})
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
