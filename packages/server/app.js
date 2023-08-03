var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv  = require('dotenv').config();

var { swaggerUi, swaggerSpec } = require('./docs/swagger');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.router');
var corouselsRouter = require('./routes/corousels.router');
var activitiesRouter = require('./routes/activities.router');

var app = express();

var connectDB = require('./database/connect');
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if(process.env.NODE_ENV !== 'production') app.use('/log', express.static(path.join(__dirname, 'log')));

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/corousels', corouselsRouter);
app.use('/activities', activitiesRouter);

//header middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header', '*');
  res.setHeader('Content-Type', 'application/json');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.mode = req.app.get('env');
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
