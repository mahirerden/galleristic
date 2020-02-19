var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/', function (req, res, next) {
  res.render("artist_register", {
    title1: "Register Page"

  });
});

router.post('/artist_register', (req, res) => {
  db.Artist.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    islocal: 1
  })
    .then(function () {
      res.render("login", {
        title1: "Login Page"
      });
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

module.exports = router;