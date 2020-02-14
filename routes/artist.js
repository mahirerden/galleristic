var express = require('express');
var router = express.Router();

/* GET artist page. */
router.get('/', function(req, res, next) {
  res.render("artist", {
    title1: "Artist Submission Page"
  
  });
});

module.exports = router;
