var express = require('express');
var router = express.Router();
var db = require("../models");
var passport = require("../config/passport");

router.post("/customer_login", passport.authenticate("customer-local"), function(req, res) {
  res.json(req.user);
});

router.post('/artist_login', passport.authenticate("artist-local"), function(req, res) {
  res.json(req.user);
});

router.post('/customer_register', (req, res) => {
  db.Customer.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(function () {
      res.redirect("/login");
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

router.post('/artist_register', (req, res) => {
  db.Artist.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(function () {
      res.redirect("/login");
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});


module.exports = router;