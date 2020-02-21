var express = require('express');
var router = express.Router();
var db = require("../models");

router.get("/api/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      name: req.user.name,
      email: req.user.email,
      id: req.user.id
    });
  }
});

router.get("/category", (req, res) => {
  res.json(category);
});

// 1 foreign key
// router.get("/api/artsbycategory", function(req, res) {
//   var query = {};
//   if (req.query.category) {
//     query.Category = req.query.category;
//   }
//   db.Arts.findAll({
//     where: query,
//     include: [db.Artist]
//   }).then(function(dbArts) {
//     res.json(dbArts);
//   });
// });

// 2 foreign keys
// router.get("/api/artsbycategory", (req, res) => {
//   var query = {};
//   if (req.query.category) {
//     query.Category = req.query.category;
//   }
//   db.Arts.findAll({
//     where: query,
//     include: [
//       {
//         model: db.Artist
//       },
//       {
//         model: db.Category
//       }
//   ]
//   }).then(function(dbArts) {
//     res.json(dbArts);
//   });
// });


module.exports = router;