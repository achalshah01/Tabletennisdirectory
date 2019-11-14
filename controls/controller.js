var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var viewPath = path.join(__dirname, '/../views');
var ItemDB = require('../utility/ItemDB.js');
var UserDB= require('../models/User.js');
// var UserDB = require('../models/UserDB.js');
var UserItem = require('../models/UserItem.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tabletennisdirectory', { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.set('views', viewPath);
var signLabel = "";
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: true});

// app.use('/assets',express.static(path.join(__dirname,'assets')));
// app.use('/assets/images',express.static(path.join(__dirname,'/assets/images/')));
router.get('/mysaveditems', function (req, res) {
    // if(req.session.theUser === undefined)
    // {
    if(req.session.theUser ===undefined){
      res.redirect('signin');
    }
    else{
    console.log(req.session.currentProfile);
    var currentUserItemList=[];
    // req.session.theUser = UserDB.getUsers();
    UserDB.getUsers().exec(function (err, userdata)  {
        if (err) throw err;
        // req.session.theUser = userdata;
        console.log(userdata);
        UserItem.getUserItems(req.session.theUser[0].userId).exec(function (err, currentProf) {
            if (err) throw err;
            req.session.currentProfile = currentProf;
            currentUserItemList= currentProf;
            //var currentUserItemList = req.session.currentProfile;
            console.log("inside getUseritem loop" +currentProf );

            console.log(req.session.currentProfile)
            var data = req.session.theUser;
            signLabel = "Sign Out";
            var action = req.query.action;
            var itemCode = req.query.item_code;
            // UserItem.getUserItems("1").exec(function(err, CurrentProff){
            //     if (err) throw err;
            // });
            currentUserItemList = req.session.currentProfile;
            if (action == "delete" && req.session.currentProfile != undefined) {
                UserItem.removeUserItem(req.session.theUser[0].userId , itemCode).exec(function (err, updatedProf) {
                    if (err) throw err;
                    currentUserItemList = updatedProf;
                    req.session.currentProfile= updatedProf;
                    console.log("This is updatedProf after delete" +updatedProf);

                    UserItem.getUserItems(req.session.theUser[0].userId).exec (function (err, userItemAfterUpdate){
                      if (err) throw err;
                        req.session.currentProfile = userItemAfterUpdate;


                    res.render('mysaveditems', {currentUserItemList: req.session.currentProfile, signLabel: signLabel,userName:req.session.theUser[0].firstName});


  });
      });
            }

else{

            console.log("This is currentUserItemList for default data load"+currentUserItemList)

            res.render('mysaveditems', {currentUserItemList: req.session.currentProfile, signLabel: signLabel,userName:req.session.theUser[0].firstName});
}
        });
    });
  }
});
router.get('/mysaveditems*', function (req, res) {
    res.send('Invalid URL');
});
router.get('/signin', function (req, res) {
  res.render('signin',{message:'1'})
});
router.post('/signin',urlEncodedParser,function(req,res){
  req.assert('emailid','Invalid Email ID').trim().isEmail();
  req.assert('password','Invalid Password').trim().matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/);
  var errors=req.validationErrors();
  if(errors){
    res.render('signin',{message:'2'});
    console.log("Here, initial signin errors.");
  }
  else{
    console.log("Validation errors not there");
    console.log("My email id "+req.body.emailid );
    UserDB.getUserbyemail(req.body.emailid,req.body.password).exec(function(err,result){
      if(result.length!==0){
        result.forEach(function (i) {
          UserDB.getUser(i.userId).exec(function(err,result){
             if(err) throw err;
             UserItem.getUserItems(i.userId).exec(function(err,ans){
               if(err) throw err;
               req.session.theUser= result;
               console.log("THis is user First name "+ req.session.theUser[0].firstName);
               //req.session.users=ans;
               res.render('mysaveditems',{
                 user:req.session.theUser,
                 currentUserItemList:ans,
                 userName:req.session.theUser[0].firstName});
             })
          })
        })
      }
      else{
        res.render('signin',{message:'2'});
      }
    })
  }
});
router.get('/signup',function(req,res){
  res.render('signup');
});
router.get('/signuperror',function(req,res){
  res.render('signuperror');
});
router.post('/signup',urlEncodedParser,function(req,res){
req.assert('firstname','Only Alphabhet is allowed in First Name').trim().matches(/^[a-zA-Z\s]+$/);
req.assert('lastname','Only Alphabhet is allowed in Last Name').trim().matches(/^[a-zA-Z\s]+$/);
req.assert('password','Invalid Password').trim().matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/);
req.assert('email','Invalid Email').trim().isEmail();
req.assert('userid','Only Alphabhet is allowed in First Name').trim().matches(/^[a-zA-Z0-9\s]+$/);
var errors=req.validationErrors();
if (errors){
  console.log("Error while signup"+ errors);
      res.render('signup');
    }
else{
  UserDB.getUser(req.body.userid).exec(function(err,result){
    if(result.length===0){
      UserDB.getUserbyemail(req.body.emailid).exec(function(err,ans){
        if(ans.length===0){

      var Userobj={
        userId: req.body.userid,
        firstName:req.body.firstname,
        lastName:req.body.lastname,
        emailAddress:req.body.email,
        password:req.body.password
      }
      UserDB.addUser(Userobj);
      res.render('signin',{message:'1'});
    }
    else{
      res.render('signuperror');
    }
      })

    }
    else{
      res.render('signuperror');
    }

  })

}
});
// router.get('/signin', function (req, res) {
//     // if (req.session.theUser ===undefined){
//     signLabel = "Sign Out";
//
//      UserDB.getUsers().exec(function (err, userSignin) {
//         if (err) throw err;
//           req.session.theUser= userSignin  ;
//           console.log("This is UserDB"+ userSignin);
//         // var data = UserItem.getUserItems("1");
//         res.render('mysaveditems', {signLabel: signLabel});
//         // }
//     });
// });
router.get('/signout', function (req, res) {
    signLabel = "Sign in";
    // here session destroy will occur
    req.session.destroy();

    //res.render('index', {signLabel:signLabel})
    res.redirect('index');

})
router.get('/index', function (req, res) {
    if (req.session.theUser === undefined) {
        signLabel = "Sign in";
        console.log("achal")
        // req.session.theUser =UserDB.getUsers();
        // var data =req.session.theUser;
        res.render('index', {signLabel: signLabel});
        console.log("not working");
    } else {
        console.log(req.session.theUser);
        signLabel = "Sign Out";
        // here session destroy will occur
        res.render('index', {signLabel: signLabel,userName:req.session.theUser[0].firstName});
    }
});

router.get('/about', function (req, res) {
    if (req.session.theUser === undefined) {
        signLabel = "Sign in";

        res.render('about', {signLabel: signLabel});
        console.log("not working");
    } else {
        console.log(req.session.theUser);
        signLabel = "Sign Out";
        // here session destroy will occur req.session.theUser[0].userId
        res.render('about', {signLabel: signLabel,userName:req.session.theUser[0].firstName});
    }
});

router.get('/contactUs', function (req, res) {
    if (req.session.theUser === undefined) {
        signLabel = "Sign in";

        res.render('contactUs', {signLabel: signLabel});
        console.log("not working");
    } else {
        console.log(req.session.theUser);
        signLabel = "Sign Out";
        // here session destroy will occur
        res.render('contactUs', {signLabel: signLabel,userName:req.session.theUser[0].firstName});
    }
});


router.get('/categories', function (req, res) {
    ItemDB.subCategory().exec(function(err,subCategory){
      if (err) throw err;


    // var item = ItemDB.getItems();
    //console.log(item);
    if (req.session.theUser === undefined) {
        signLabel = "Sign in";

        res.render('categories', {subCategory: subCategory, signLabel: signLabel});
        console.log("not working");
    } else {
        console.log(req.session.theUser);
        signLabel = "Sign Out";
        // here session destroy will occur
        res.render('categories', {subCategory: subCategory, signLabel: signLabel,userName:req.session.theUser[0].firstName});
    }

});
});
router.get('/categories/Blades', function (req, res) {
    // var item = ItemDB.getItems();
    ItemDB.getItems().exec(function (err, item) {
        if (err) throw err;

    console.log("This is item"+item);
    if (req.session.theUser === undefined) {
        signLabel = "Sign in";

        res.render('blades', {item: item, signLabel: signLabel});

        // console.log("not working");
    }

    else {
        console.log(req.session.theUser);
        signLabel = "Sign Out";
        // here session destroy will occur
        res.render('blades', {item: item, signLabel: signLabel,userName:req.session.theUser[0].firstName});
    } });
    // console.log(item);/

});
router.get('/categories/Rubbers', function (req, res) {
    ItemDB.getItems().exec(function (err, item) {
        if (err) throw err;
    if (req.session.theUser === undefined) {
        signLabel = "Sign in";

        res.render('rubbers', {item: item, signLabel: signLabel});
        console.log("not working");
    } else {
        console.log(req.session.theUser);
        signLabel = "Sign Out";
        res.render('rubbers', {item: item, signLabel: signLabel,userName:req.session.theUser[0].firstName});
    }});

});
router.get('/categories/Balls', function (req, res) {
    ItemDB.getItems().exec(function (err, item) {
        if (err) throw err;
    console.log(item);
    if (req.session.theUser === undefined) {
        signLabel = "Sign in";

        res.render('balls', {item: item, signLabel: signLabel});
        console.log("not working");
    } else {
        console.log(req.session.theUser);
        signLabel = "Sign Out";
        res.render('balls', {item: item, signLabel: signLabel,userName:req.session.theUser[0].firstName});
    }});

});
router.get('/categories/Shoes', function (req, res) {
    ItemDB.getItems().exec(function (err, item) {
        if (err) throw err;
    if (req.session.theUser === undefined) {
        signLabel = "Sign in";

        res.render('shoes', {item: item, signLabel: signLabel});
        console.log("not working");
    } else {
        console.log(req.session.theUser);
        signLabel = "Sign Out";
        res.render('shoes', {item: item, signLabel: signLabel,userName:req.session.theUser[0].firstName});
    }
    });

});
router.get('/feedback', function (req, res) {
req.checkBody('item_code','Not a valid Item according to data').isAlphanumeric();
    var ID  = req.query.item_code;
    var userId = req.query.user_id;
    console.log("This is feedback ID" +ID);
    // if(ID == undefined)
    //     ID = "BL01";
    //     if(userId==undefined)
    //     userId=req.session.theUser[0].userId;//changed userId here
    ItemDB.getItem(ID).exec(function (err, item) {
        console.log("This is item on feedback page" + item);
        if (err) throw err;
        if (req.session.theUser === undefined) {
            signLabel = "Sign in";
            req.query.item_code= req.session.theUser;
            userId= req.session.theUser;


            res.render('feedback', {item: item, signLabel: signLabel});
            console.log("not working");
        } else {
            console.log(req.session.theUser);
            signLabel = "Sign Out";
            res.render('feedback', {item: item, signLabel: signLabel,userName:req.session.theUser[0].firstName});
        }
    });

});
router.get('/categories/productDetails/:itemCode', function (req, res) {
  req.checkBody('itemCode','Not a valid Item according to data').isAlphanumeric();
     ItemDB.getItem(req.params.itemCode).exec(function (err, item) {
         console.log("item detail individual"+ item);
         if (err) throw err;
          if (!(item === null || item === undefined)) {

             if (req.session.theUser === undefined) {
                 signLabel = "Sign in";
                 res.render('productDetails', {id: req.params.itemCode, item: item, signLabel: signLabel});
             } else {
                 console.log(req.session.theUser);
                 signLabel = "Sign Out";
               res.render('productDetails', {id: req.params.itemCode, item: item, signLabel: signLabel,userName:req.session.theUser[0].firstName});
             }

         }
         else {
             res.redirect('/categories');

         }
     });
});
    router.post('/mysaveditems', urlEncodedParser, function (req, res) {
      if(req.session.theUser ===undefined){
        res.redirect('signin');
      }else{
        var itemId = req.query.item_code;
        var action = req.query.action;
        var selectRating = req.body.selectRating;
        var usedIt = req.body.usedIt;
        console.log("This is rating"+ selectRating);

        var currentUserItemList = req.session.currentProfile;
        var newCurrentUserItemList;

        signLabel = "Sign Out";
        if (action === "update") { //changed userid here
            UserItem.updateUserItem(req.session.theUser[0].userId, itemId, selectRating, usedIt).exec(function (err, updatedUserItem) {
                if (err) throw err;
                console.log("Updated user items -"+updatedUserItem);
                req.session.currentProfile = updatedUserItem;

            });//userid change here
            UserItem.getUserItems(req.session.theUser[0].userId).exec (function (err, userItemAfterUpdate){
              if (err) throw err;
                req.session.currentProfile = userItemAfterUpdate;
            });
            currentUserItemList = req.session.currentProfile;

        }
        else if(action === "save"){
            var newItemDetails=[];
            console.log("Into save loop");
            ItemDB.getItem(itemId).exec(function (err, itemDetailsSpecific) {
                if (err) throw err;
                newItemDetails = itemDetailsSpecific;
                console.log("This is newitemDetailsArray" + newItemDetails);
                UserItem.addUserItem(req.session.theUser[0].userId,newItemDetails[0].itemCode, newItemDetails[0].itemName, newItemDetails[0].subCategory, "1", "No")
                .exec(function(err, addNewUserItem){
                  if (err) throw err;
                  req.session.currentProfile = addNewUserItem;
                });
                UserItem.getUserItems(req.session.theUser[0].userId).exec(function(err, userItemsAfterAdd){
                  if (err) throw err;
                  req.session.currentProfile =userItemsAfterAdd;
                });

              if((req.session.currentProfile!=undefined)){
                UserItem.getUserItems(req.session.theUser[0].userId).exec(function (err, UserItemAfterAdd) {
                    if (err) throw err;
                    currentUserItemList = UserItemAfterAdd;
                });
              req.session.currentProfile= currentUserItemList;}
            else{
                req.session.currentProfile= "Please Sign In";
            }
            });
        }
        res.redirect('mysaveditems');
      }
    });


router.get('/', function (req, res) {
    if (req.session.theUser === undefined) {
        signLabel = "Sign in";
        console.log("achal");
        res.render('index', {signLabel: signLabel});
        console.log("not working");
    } else {
        console.log(req.session.theUser);
        signLabel = "Sign Out";
        // here session destroy will occur
        res.render('index', {signLabel: signLabel,userName:req.session.theUser[0].firstName});
    }

});


module.exports = router;
