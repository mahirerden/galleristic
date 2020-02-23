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

router.get("/api/category", (req, res) => {
  db.Category.findAll({
  }).then(function(dbCategory) {
    res.json(dbCategory);
  });
});

router.get("/api/artist", (req, res) => {
  db.Artist.findAll({
  }).then(function(dbArtist) {
    res.json(dbArtist);
  });
});

router.get("/api/artsbycategory", (req, res) => {
  var query = {};
  if (req.query.categoryid) {
    query.categoryid = req.query.categoryid;
  }
  console.log('req.query = ' + JSON.stringify(req.query));
  db.Arts.findAll({
    where: query,
    include: [
            {
              model: db.Artist
            },
            {
              model: db.Category
            }
        ]
  }).then(function(dbArts) {
    res.json(dbArts);
  });
});

router.get("/api/artsbyartist", (req, res) => {
  var query = {};
  if (req.query.artistid) {
    query.artistid = req.query.artistid;
  }
  console.log('req.query = ' + JSON.stringify(req.query));
  db.Arts.findAll({
    where: query,
    include: [
            {
              model: db.Artist
            },
            {
              model: db.Category
            }
        ]
  }).then(function(dbArts) {
    res.json(dbArts);
  });
});

// router.get("/api/artsbycategory/:id", (req, res) => {
//   var query = {};
//   console.log(JSON.stringify(req.query));
//   if (req.query.id) {
//     query.id = req.query.id;
//   }
//   db.Arts.findAll({
//     where: {
//       categoryid: req.params.id
//     },
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