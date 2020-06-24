var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var handler = express();

// view engine setup
handler.set('views', path.join(__dirname, 'views'));
handler.set('view engine', 'ejs');

handler.use(logger('dev'));
handler.use(express.json());
handler.use(express.urlencoded({ extended: false }));
handler.use(cookieParser());
handler.use(express.static(path.join(__dirname, 'public')));

handler.use('/', indexRouter);
handler.use('/index', indexRouter);
handler.use('/users', usersRouter);

// catch 404 and forward to error handler
handler.use(function (req, res, next) {
  //next(createError(404));
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// error handler
handler.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.handler.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = handler;
