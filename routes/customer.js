var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send(`Building new app called Galleristic`);
// });

/* GET artist page. */
router.get('/', function(req, res, next) {
  res.render("customer", {
    title1: "Customer Section"
  
  });
});


module.exports = router;
