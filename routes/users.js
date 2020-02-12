var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`Building new app called Galleristic`);
});

module.exports = router;
