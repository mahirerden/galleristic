var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
  req.logout();
  res.render("logout", {
    title1: "You logged out"
  });

  res.render("index", {
    title1: "Home Page",
    logo01: `<img class="thumbnail shadow" src='/images/logo02.png' onclick='this.src="/images/logo02.png"'/>`
  });

});

module.exports = router;