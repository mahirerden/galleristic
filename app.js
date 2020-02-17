var createError = require('http-errors');
var express = require('express');
var session = require("express-session");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("./config/passport");
var hbs = require('hbs');

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// middleware
var app = express();

var indexRouter = require('./routes/index');
var customerRouter = require('./routes/customer');
var artistRouter = require('./routes/artist');
var artsRouter = require('./routes/arts');
var aboutRouter = require('./routes/about');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use("/customer", customerRouter);
app.use('/artist', artistRouter);
app.use('/arts', artsRouter);
app.use('/about', aboutRouter);
app.use('/login', require('./routes/login.js'));
app.use('/register', require('./routes/register.js'));
app.use('/logout', require('./routes/logout.js'));
app.use('/artist_register', require('./routes/artist_register.js'));
app.use('/artist_login', require('./routes/artist_login.js'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
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

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force:true }).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

