var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index", {
    title1: "Abstract Art Section",
    abs01: `<img src='/images/abstract01_tn.jpeg' onclick='this.src="/images/abstract01.jpeg"'/>`,
    abs02: `<img src='/images/abstract02_tn.jpeg' onclick='this.src="/images/abstract02.jpeg"'/>`,
    abs03: `<img src='/images/abstract03_tn.jpeg' onclick='this.src="/images/abstract03.jpeg"'/>`,
    title2: "Modern Art Section",
    mdn01: `<img src='/images/modern01_tn.jpeg' onclick='this.src="/images/modern01.jpeg"'/>`,
    mdn02: `<img src='/images/modern02_tn.jpeg' onclick='this.src="/images/modern02.jpeg"'/>`,
    mdn03: `<img src='/images/modern03_tn.jpeg' onclick='this.src="/images/modern03.jpeg"'/>`,
    title3: "Street Art Section",
    str01: `<img src='/images/street01_tn.jpeg' onclick='this.src="/images/street01.jpeg"'/>`,
    str02: `<img src='/images/street02_tn.jpeg' onclick='this.src="/images/street02.jpeg"'/>`,
    str03: `<img src='/images/street03_tn.jpeg' onclick='this.src="/images/street03.jpeg"'/>`,
    title4: "Glass Art Section",
    gla01: `<img src='/images/glass01_tn.jpeg' onclick='this.src="/images/glass01.jpeg"'/>`,
    gla02: `<img src='/images/glass02_tn.jpeg' onclick='this.src="/images/glass02.jpeg"'/>`,
    gla03: `<img src='/images/glass03_tn.jpeg' onclick='this.src="/images/glass03.jpeg"'/>`
  });
});

module.exports = router;
