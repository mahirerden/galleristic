var express = require('express');
var router = express.Router();
var db = require("../models");
var passport = require("../config/passport");

router.get('/', function (req, res, next) {
  res.render("register", {
    title1: "Register Page"

  });
});

router.post('/register', (req, res) => {
  db.Customer.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isLocal: 1
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