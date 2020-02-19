var express = require('express');
var router = express.Router();
var category = require("../public/js/category");

var db = require("../models");

router.get('/', function (req, res, next) {
  res.render("artsbycategory", {
    title1: "Arts By Category"
  });
});

router.get("/api/artsbycategory", function(req, res) {
  var query = {};
  if (req.query.category) {
    query.Category = req.query.category;
  }
  db.Arts.findAll({
    where: query,
    include: [db.Artist]
  }).then(function(dbArts) {
    res.json(dbArts);
  });
});

router.get("/category", function (req, res) {
  res.json(category);
});

module.exports = router;