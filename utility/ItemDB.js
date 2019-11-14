var Item = require('../models/Item');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tabletennisdirectory', { useNewUrlParser: true });
var Schema=mongoose.Schema;

var ItemSchema=new Schema({
  itemCode : String,
  itemName : String,
  subCategory : String,
  brand : String,
  Description : String,
  rating : String,
  imageUrl : String

});
var ItemDB=mongoose.model('items',ItemSchema);

module.exports.getItems = function(){
  var data = ItemDB.find();
  return data;
}



/**
 *
 * @param itemCode
 * @returns {*}
 */

 module.exports.getItem= function(itemCode){
   var data=ItemDB.find({itemCode:itemCode});
   console.log("Here to get individual item" + itemCode);
  return data;
 }
 module.exports.getItemFeedback= function(itemCode, itemName){
   var data=ItemDB.find({itemCode:itemCode, itemName:itemName});
   console.log("Here to get individual item" + itemCode+" "+itemName+" "+data);
  return data;
 }
 var CategoriesSchema=new Schema({
   subCategory : String
 });
 var CategoriesDB=mongoose.model('categories',ItemSchema);
 module.exports.subCategory= function(){
   var data = CategoriesDB.find();
   return data;
 }
 // var subCategory = ["Blades", "Rubbers","Balls", "Shoes"];
 // module.exports.subCategory=subCategory;
