var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index", {
    title1: "Home Page",
    logo01: `<img class="thumbnail shadow" src='/images/logo02.png' onclick='this.src="/images/logo02.png"'/>`
  });
});

router.post("/", function(req, res, next) {
  res.render("index", {
    title1: "Home Page",
    logo01: `<img class="thumbnail shadow" src='/images/logo02.png' onclick='this.src="/images/logo02.png"'/>`,
    userName: req.body.email,
  });
  // res.json(req.body);
});
module.exports = router;
