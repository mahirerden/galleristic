var createError = require('http-errors');
var express = require('express');
var session = require("express-session");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("./config/passport");
var hbs = require('hbs');
var flash = require('connect-flash');
var helmet = require("helmet");
var multer = require("multer");
var path = require("path");


// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// middleware
var app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Multer section
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("artistFile");

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

// insert image function
createRecord = (req, res) => {
var file = req.file;
console.log(file);
var body = req.body;
console.log(body);
  db.Artist.findOne({ where: { name: req.body.artist } }).then(function(artist){
    db.Category.findOne({where:{name:req.body.category}}).then(function(result){
      db.Arts.create({
        title: req.body.title,
        price: req.body.price,
        year: req.body.year,
        file: req.file.path,
        comment: req.body.comment,
        ArtistId: artist.dataValues.id,
        CategoryId: result.dataValues.id
      }).then(() => {
        res.render("artist", {
          msg: "File Uploaded!",
          file: `uploads/${req.file.filename}`
        });
      });
    })
  });
  };


/* PUT for File upload */
// app.post("/artist", (req, res) => {
//   upload(req, res, err => {
//     if (err) {
//       res.render("artist", {
//         msg: err
//       });
//     } else {
//       if (req.file == undefined) {
//         res.render("artist", {
//           msg: "Error: No File Selected!"
//         });
//       } else {
//         res.render("artist", {
//           msg: "File Uploaded!",
//           file: `uploads/${req.file.filename}`,
//           atitle: req.body.title,
//           aprice: req.body.price,
//         });
//       }
//     }
//   });
// });

app.post("/artist", upload, createRecord);



app.use(flash());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//app.use('/', require('./routes/index.js'));
//app.use("/customer", require('./routes/customer.js'));
//app.use('/artist', require('./routes/artist.js'));
//app.use('/arts', require('./routes/arts.js'));
//app.use('/about', require('./routes/about.js'));
//app.use('/login', require('./routes/login.js'));
//app.use('/register', require('./routes/register.js'));
//app.use('/logout', require('./routes/logout.js'));
//app.use('/artist_register', require('./routes/artist_register.js'));
//app.use('/artist_login', require('./routes/artist_login.js'));
//app.use('/artsbycategory', require('./routes/artsbycategory.js'));
app.use('/', require('./routes/hbs.js'));
app.use('/users', require('./routes/users.js'));
app.use('/apis', require('./routes/apis.js'));

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
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

