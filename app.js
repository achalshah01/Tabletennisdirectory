

const createError = require('http-errors');
const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tabletennisdirectory');

let catalogController = require('./controls/controller');
// let catalogControllerSess = require('./controls/controllerSession');
var app = module.exports=  express();
var session = require('express-session');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended : true});
var validator=require('express-validator');
app.use(validator());

app.use(session({
    secret: "achal"
}));
// var path = require('path');
app.use('/assets',express.static('assets'));

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({secret: 'achal'}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//  routes defining
app.use('/', catalogController);
app.use('/categories', catalogController);
app.use('/categories/blades', catalogController);





app.listen('8080');
// catch 404 and forward to error handler




module.exports = app;
