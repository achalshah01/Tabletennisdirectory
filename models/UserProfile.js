//var path = require('path');
//var userDB = require(path.join(__dirname + '/../models/itemDB.js'));

var userProfile = function userProfile(userId, userItems) {
    this.userId  = userId;
    this.userItems = userItems;
}

function removeUserItem(userItem) {

}

function updateUserItem(userItem) {

}

function addUserItem(userItem) {

}

function getItems() {

}

function emptyProfile(){

}

module.exports.removeUserItem = removeUserItem;
module.exports.getItems = getItems;
module.exports.emptyProfile = emptyProfile;
module.exports.addUserItem = addUserItem;
module.exports.updateUserItem = updateUserItem;
module.exports.emptyProfile = emptyProfile;
module.exports = userProfile;
