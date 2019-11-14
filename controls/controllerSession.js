var express  = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var viewPath = path.join(__dirname, '/../views');
var ItemDB = require('../utility/ItemDB.js');
app.set('view engine', 'ejs');
app.set('views', viewPath);
// app.use('/assets',express.static(path.join(__dirname,'assets')));
// app.use('/assets/images',express.static(path.join(__dirname,'/assets/images/')));

router.get('/index', function(req,res){
    if(req.session.theUser){

    }
    res.render('index');
});

router.get('/about', function(req,res){
    res.render('about');
});
router.get('/balls', function(req,res){
    res.render('balls');
});
router.get('/blades', function(req,res){
    res.render('blades');
});
router.get('/contactUs', function(req,res){
    res.render('contactUs');
});
router.get('/mysaveditems', function(req,res){
    res.render('mysaveditems');
});
router.get('/rubbers', function(req,res){
    res.render('rubbers');
});
router.get('/shoes', function(req,res){
    res.render('shoes');

});
router.get('/categories', function(req,res){
    var subCategory= ItemDB.subCategory;
    var item = ItemDB.getItems();
    //console.log(item);
    res.render('categories' , {subCategory:subCategory});

});
router.get('/categories/Blades', function(req,res){
    var item = ItemDB.getItems();
    // console.log(item);/
    res.render('blades' , {item:item});

});
router.get('/categories/Rubbers', function(req,res){
    var item = ItemDB.getItems();
    // console.log(item);/
    res.render('rubbers' , {item:item});

});
router.get('/categories/Balls', function(req,res){
    var item = ItemDB.getItems();
    // console.log(item);/
    res.render('balls' , {item:item});

});
router.get('/categories/Shoes', function(req,res){
    var item = ItemDB.getItems();
    // console.log(item);/
    res.render('shoes' , {item:item});

});
router.get('/feedback', function(req,res){
    var item = ItemDB.getItems();
    // console.log(item);/
    res.render('feedback' , {item:item});

});
router.get('/categories/productDetails/:itemCode', function(req,res){
    var item = ItemDB.getItem(req.params.itemCode);
    // console.log('into the item' , item);
    // console.log('this is for itemCode', item.itemCode);
    if(!(item=== null || item=== undefined))
        res.render('productDetails' , {id:req.params.itemCode, item:item});
    else {
        res.redirect('/categories');
        // var subCategory= ItemDB.subCategory;

        //console.log(item);
        res.render('categories' , {subCategory:subCategory});
    }
});
router.get('/', function(req,res){
    res.render('index');
});


module.exports=router;