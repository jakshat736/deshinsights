var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var categoryRouter = require('./routes/category');
var uploadBlogRouter = require('./routes/uploadblog');
var userLoginRouter = require('./routes/userlogin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/category', categoryRouter);
app.use('/uploadblog', uploadBlogRouter);
app.use('/userlogin', userLoginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// MONGO DB
const mongoose = require("mongoose");
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Failed to connect to MongoDB", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

mongoose.connect("mongodb+srv://Akshat12345:Akshat@cluster0.ouiqyg9.mongodb.net/DeshInsights?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// module.exports = db;

module.exports = app;