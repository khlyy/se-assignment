var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var  db =require('./db.js');
var app = express();

db.connect(function(_db){

var seed=require('./quotes');
seed.seed(function(error,s){});
console.log("connected succesful");

});

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 app.use(logger('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));
 
// Make our db accessible to our router
// app.use(function(req,res,next){
//     req.db = db;
//     next();
// });

app.use('/', routes);

// catch 404 and forward to error handler

// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
