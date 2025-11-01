var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Do đã khai báo bên index.js rồi nên không cần khai báo ở đây
// var aboutRouter = require('./routes/about');
// var contactRouter = require('./routes/contact');
// var carRentRouter = require('./routes/car_rent');
// var hotelsRouter = require('./routes/hotel');
// var placesRouter = require('./routes/places');
// var signin_signoutRouter = require('./routes/signin_signup');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Do đã khai báo bên index.js rồi nên không cần khai báo ở đây
// app.use('/about', aboutRouter);
// app.use('/contact', contactRouter);
// app.use('/car_rent', carRentRouter);
// app.use('/hotel', hotelsRouter);
// app.use('/places', placesRouter);
// app.use('/signin_signup', signin_signoutRouter);


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
    res.render('error', {
        layout: false,  // Tắt layout
    });
});

module.exports = app;
