var express = require('express');
const cors = require("cors");
var app = express();


var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var routes = require("./routes/auth.routes");
const { default: mongoose } = require('mongoose');

//CORS
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

//to parse requests of content-type - applicaiton/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');



mongoose.Promise = require("bluebird");
var dbHost = process.env.DB_HOST || "localhost";
var dbName = process.env.DB_NAME;
var dbUser = process.env.DB_USERNAME;
var dbPass = process.env.DB_PASSWORD;
var dbPort = process.env.DB_PORT || "27017";


mongoose
  .connect(
    "mongodb://" +
    dbUser +
    ":" +
    dbPass +
    "@" +
    dbHost +
    ":" +
    dbPort +
    "/" +
    dbName
    // ,
    // {
    //   useUnifiedTopology: true,
    //   // useCreateIndex: true,
    //   promiseLibrary: require("bluebird"),
    //   useNewUrlParser: true,
    // }
  )
  .then(() => console.log("connection successful at port"))
  .catch((err) => console.error(err));
// mongoose.connect("mongodb://localhost:27017/gfoss_db");

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//UNAUTHORIZED ROUTES
app.use(routes);

//AUTHORIZED ROUTES
require('./routes/user.routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); //issue-SEEdocumentation
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
