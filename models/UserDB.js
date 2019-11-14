var path = require('path');
var user = require(path.join(__dirname + '/../models/User.js'));
var userProfile = require(path.join(__dirname + '/../models/UserProfile.js'));
var userItem = require(path.join(__dirname + '/../models/UserItem.js'));

var listUsers = [
    new user("1", "Achal", "Shah", "ashah77@uncc.edu", "Univerisity Terrace Drive ", "Apartment G",
        "Charlotte", "NC", "28262", "United States")

];

var listUser1Items = [
    new userItem('BL01','Butterfly Timo Boll ALC', 'Blade' ,4, 'Yes'),
    new userItem('RU01','Butterfly Tenergy 05','Rubber', 4, 'Yes')
];


var listUserProfile = [
    new userProfile("1", listUser1Items)
];

function getUsers() {
    return listUsers;
}

function getUserProfile(userId) {
    var newUserProfileList;
    for (let i = 0; i < listUserProfile.length; i++) {
        if(listUserProfile[i].userId === userId) {
            newUserProfileList = listUserProfile[i].userItems;
        }
    }
    return newUserProfileList;
}

function getUserById(userId) {
    var userDetails;
    for (let i = 0; i < listUsers.length; i++) {
        if(listUsers[i].userId === userId) {
            userDetails = listUsers[i];
            break;
        }
    }
    return userDetails;
}

module.exports.getUsers = getUsers;
module.exports.getUserProfile = getUserProfile;
module.exports.getUserById = getUserById;
