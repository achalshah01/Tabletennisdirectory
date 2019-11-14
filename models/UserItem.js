var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tabletennisdirectory', { useNewUrlParser: true });
var Schema=mongoose.Schema;

var UserItemsSchema= new Schema(
  {
    userId: String,
    itemCode: String,
    itemName: String,
    subCategory: String,
    rating: String,
    usedIt: String

  }
);
var UserItems =mongoose.model('userItem',UserItemsSchema, 'userItems');

module.exports.getUserItems=function(userId){
    console.log("This is ID Superman"+typeof(userId));
  var query= UserItems.find({userId:userId});
  console.log("This is query"+ query);
  return query;
}
module.exports.getSingleUserItem = function (userId, itemCode) {
  console.log("this is userId and itemCode Superman" +userId+""+itemCode);
    var query= UserItems.find({userId:userId,itemCode: itemCode});
    return query;

}

module.exports.removeUserItem= function(userId, itemCode){
    var query = UserItems.remove({userId:userId, itemCode: itemCode});
    return query;
}
module.exports.addUserItem= function (userId,itemCode,itemName,subCategory,rating,usedIt) {
  var query= UserItems.findOneAndUpdate({userId:userId,itemCode:itemCode},
  {$set:{userId:userId, itemCode:itemCode,itemName:itemName,subCategory:subCategory,rating:rating,usedIt:usedIt }}
  ,{new:true,upsert:true});
  return query;
}

// module.exports.addUserItem = function (userId, itemCode, itemName, subCategory, rating, usedIt) {
//     var query = UserItems.insertOne({userId: userId ,itemCode: itemCode, itemName:itemName, subCategory:subCategory , rating:rating, usedIt:usedIt });
//     return query;
// }

module.exports.updateUserItem = function(userId, itemCode,rating, usedIt ){
    var query =UserItems.updateOne({userId:userId, itemCode: itemCode}, {$set:{rating:rating, usedIt:usedIt}});
    return query;
}
/*

var userItem = function userItem(userId, itemCode, itemName ,subCategory ,  rating, usedIt) {
    this.userId= userId;
    this.itemCode = itemCode;
    this.itemName = itemName;
    this.subCategory = subCategory;
    this.rating = rating;
    this.usedIt = usedIt;
}

module.exports = userItem;
*/
