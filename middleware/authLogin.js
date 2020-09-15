const db = require('../data.js')

module.exports.auth = function(req,res,next){
  if(!req.cookies.cookie_user){
    res.redirect("/login")
    return;
  }
  
  var getUser = db.get("users").find({id: req.cookies.cookie_user}).value()
  console.log(getUser)
  if(getUser.isAdmin !== true){

  }
  
  if(!getUser){
    res.redirect("/login")
    return;
  }
  next()
}