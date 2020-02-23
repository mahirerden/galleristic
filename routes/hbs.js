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
router.get("/customer", isAuthenticated, (req, res) => {
  res.render("customer", {
    title1: "Customer Page"
  });
});

/* GET artist page. */
router.get("/artist", isAuthenticated, (req, res) => {
  db.Category.findAll({ attributes: ["id", "name"] }).then(function(dbCategory) {
    db.Artist.findAll({ attributes: ["id", "name"] }).then(function (artistName){
    res.render("artist", {
      title1: "Artist Submission Page",
      categories: dbCategory,
      artists: artistName
    });
  });
})});

/* GET arts page. */
router.get("/arts", isAuthenticated, (req, res) => {
  res.render("arts", {
    title1: "Abstract Art Section",
    abs01: `<img class="thumbnail shadow" src='/images/abstract01_tn.jpeg' onclick='this.src="/images/abstract01.jpeg"'/>`,
    abs02: `<img class="thumbnail shadow" src='/images/abstract02_tn.jpeg' onclick='this.src="/images/abstract02.jpeg"'/>`,
    abs03: `<img class="thumbnail shadow" src='/images/abstract03_tn.jpeg' onclick='this.src="/images/abstract03.jpeg"'/>`,
    title2: "Modern Art Section",
    mdn01: `<img class="thumbnail shadow" src='/images/modern01_tn.jpeg' onclick='this.src="/images/modern01.jpeg"'/>`,
    mdn02: `<img class="thumbnail shadow" src='/images/modern02_tn.jpeg' onclick='this.src="/images/modern02.jpeg"'/>`,
    mdn03: `<img class="thumbnail shadow" src='/images/modern03_tn.jpeg' onclick='this.src="/images/modern03.jpeg"'/>`,
    title3: "Street Art Section",
    str01: `<img class="thumbnail shadow" src='/images/street01_tn.jpeg' onclick='this.src="/images/street01.jpeg"'/>`,
    str02: `<img class="thumbnail shadow" src='/images/street02_tn.jpeg' onclick='this.src="/images/street02.jpeg"'/>`,
    str03: `<img class="thumbnail shadow" src='/images/street03_tn.jpeg' onclick='this.src="/images/street03.jpeg"'/>`,
    title4: "Glass Art Section",
    gla01: `<img class="thumbnail shadow" src='/images/glass01_tn.jpeg' onclick='this.src="/images/glass01.jpeg"'/>`,
    gla02: `<img class="thumbnail shadow" src='/images/glass02_tn.jpeg' onclick='this.src="/images/glass02.jpeg"'/>`,
    gla03: `<img class="thumbnail shadow" src='/images/glass03_tn.jpeg' onclick='this.src="/images/glass03.jpeg"'/>`
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