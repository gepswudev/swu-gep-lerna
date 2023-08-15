const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv  = require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { ensureDirectoriesExist } = require('./utils/dirValidate');

const { swaggerUi, swaggerSpec } = require('./docs/swagger');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.router');
const corouselsRouter = require('./routes/corousels.router');
const activitiesRouter = require('./routes/activities.router');
const personnelsRouter = require('./routes/personnels.router');

var app = express();

var connectDB = require('./database/connect');
connectDB();

//ensure directories exist
ensureDirectoriesExist();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({origin: '*'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // Set the maximum file size 
}));


if(process.env.NODE_ENV !== 'production') app.use('/log', express.static(path.join(__dirname, 'log')));

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/files', express.static(path.join(__dirname, 'uploads')));
app.use('/db', express.static(path.join(__dirname, 'log/database')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/corousels', corouselsRouter);
app.use('/activities', activitiesRouter);
app.use('/personnels', personnelsRouter);


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


// const Personnels = require("./models/Personnels");
// const createTest = async ( ) => { 
//   try{
//     const personnels = new Personnels({
//       name: "Nguyen Van A",
//       wellcenter: {
//         status: true,
//         position: "HCM",
//         availableDate: ["2021-01-01", "2021-01-02"],
//         availableTime: ["08:00", "09:00"],
//       },
//     });
//     await personnels.save();
//     console.log(`Created ${personnels.name}`);
//   }catch(e){
//     console.log(e);
//   }
// };
// createTest();

module.exports = app;
