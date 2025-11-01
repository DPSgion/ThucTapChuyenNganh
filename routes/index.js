var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/about', function(req, res, next) {
    res.render('about');
});
router.get('/places', function(req, res, next) {
    res.render('places');
});
router.get('/hotel', function(req, res, next) {
    res.render('hotel');
});
router.get('/blog', function(req, res, next) {
    res.render('blog');
});
router.get('/contact', function(req, res, next) {
    res.render('contact');
});

module.exports = router;
