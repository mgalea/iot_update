var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var fileStoreOptions = {};


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var downloadsRouter = require('./routes/downloads');

var app = express();

var SECRET_KEY="The Secret Seven";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'firmware')));
app.use(session({secret: SECRET_KEY,   
  name: 'RSI',
  store: new FileStore(fileStoreOptions),
  proxy: true,
  resave: true,
  saveUninitialized: true}));

app.use(helmet());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/downloads', downloadsRouter);

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

module.exports = app;
