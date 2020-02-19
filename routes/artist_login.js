var express = require('express');
var router = express.Router();
var passport = require("../config/passport");


/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect("/");
  }
  res.render("login", {title1: "Login Page"});
 
 });

router.post('/artist_login', passport.authenticate("artist-local"), function(req, res) {
  res.json(req.user);
});

module.exports = router;