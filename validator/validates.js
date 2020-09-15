const db = require("../data.js");
const shortid = require("shortid");

module.exports.validateComplete = function(req,res,next){
  var getId = req.params.id;
  var getData = db.get("transactions").find({ id: getId }).value();
  console.log(getData);
    if(!getData){
      res.send('404');
    }
    next();
}

module.exports.validateUser = function(req,res,next){
  var err = [];
  if(!req.body.name){
    err.push('Vui lòng nhập tên của bạn')
  }
  
  if(req.body.name.length > 30){
    err.push('Xin chào bạn ở hành tinh nào vậy ?')
  }
  
  if(!req.body.introduce){
    err.push('Vui lòng giới thiệu qua về bản thân')
  }
  
  if(!req.body.emailLogin){
    err.push('Vui lòng Nhập Email')
  }
  
  if(!req.body.passLogin){
    err.push('Vui lòng nhập password')
  }
  
  if(err.length > 0){
    res.render('admin/addUser',{
      error: err,
      values: req.body
    });
    return;
  }
  next()
}