var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tabletennisdirectory', { useNewUrlParser: true });
var Schema=mongoose.Schema;
var UserSchema = new Schema({
    userId : String,
    firstName : String,
    lastName : String,
    emailAddress : String,
    address1Field : String,
    address2Field : String,
    city : String,
    state : String,
    zipCode : String,
    country : String,
    password: String

});
var User=mongoose.model('users',UserSchema);

module.exports.getUsers=function(){
  var listUsers=User.find();
  return listUsers;
}

module.exports.getUser=function(userId){
  var query=User.find({userId:userId});
  return query;
}
module.exports.getUserbyemail = function(email,password) {
  var userbyEmail=User.find({emailAddress:email,password:password});
  return userbyEmail;
}
module.exports.addUser=function(ans){
  User({
  userId:ans.userId,
  firstName : ans.firstName,
  lastName : ans.lastName,
  emailAddress :  ans.emailAddress,
  password: ans.password
  }).save(function(err){
    if(err) throw err;
  })
};
