var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(reg, res){
  // [req.query] access query string in url
  // path ; /users/:id  access id with [req.params.id]
  // res.send() // text, json, number (http code)
  res.render('index', { title: 'AutoMuse' }); // (path/to/file, {json:obj})
});

module.exports = router;
