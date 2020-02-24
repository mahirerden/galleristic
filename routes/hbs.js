var express = require("express");
var router = express.Router();
var db = require("../models");
var isAuthenticated = require("../config/isAuthenticated");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title1: "Home Page",
    logo01: `<img class="thumbnail shadow" src='/images/logo02.png' onclick='this.src="/images/logo02.png"'/>`
  });
});

/* GET about page. */
router.get("/about", (req, res) => {
  res.render("about", {
    title1: "About Page"
  });
});

/* GET customer page. */
// router.get("/customer", isAuthenticated, (req, res) => {
//   res.render("customer", {
//     title1: "Customer Page"
//   });
// });

/* GET artist page. */
router.get("/artist", isAuthenticated, (req, res) => {
  db.Category.findAll(
    { attributes: ["id", "name"] }
  ).then(function(dbCategory) {
    db.Artist.findAll(
      { attributes: ["id", "name"] }
    ).then(function(artistName) {
      res.render("artist", {
        title1: "Artist Submission Page",
        categories: dbCategory,
        artists: artistName
      });
    });
  });});

/* GET arts page. */
router.get("/arts", isAuthenticated, (req, res) => {
  db.Arts.findAll({}).then(function(results){
    console.log(results);
    res.render("arts", {
      mainTitle: "Galleristic Art Gallery",
      gallery: results
    });
  });

});


router.get('/artsbycategory', (req, res) => {
  
  res.render("artsbycategory", {
    title1: "Arts By Category"
  });
});

router.get('/artsbyartist', (req, res) => {
  
  res.render("artsbyartist", {
    title1: "Arts By Artist"
  });
});

/* GET login page. */
router.get("/login", function(req, res, next) {
  // if (req.user) {
  //   res.redirect("/");
  // }
  res.render("login", {
    title1: "Login Page"
  });
});

/* GET register page. */
router.get("/register", function(req, res, next) {
  res.render("register", {
    title1: "Register Page"
  });
});

/* Logout */
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("login");
});

module.exports = router;