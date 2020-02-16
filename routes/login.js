var express = require('express');
var router = express.Router();


/* GET login page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect("/arts");
  }
  res.render("login", {title1: "Login Page"});

});


module.exports = router;