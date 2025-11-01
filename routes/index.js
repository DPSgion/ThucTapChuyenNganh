var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Du lịch miền Nam'});
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'Du lịch miền Nam'});
});
router.get('/places', function(req, res, next) {
    res.render('places', { title: 'Du lịch miền Nam'});
});
router.get('/hotel', function(req, res, next) {
    res.render('hotel', { title: 'Du lịch miền Nam'});
});
router.get('/blog', function(req, res, next) {
    res.render('blog', { title: 'Du lịch miền Nam'});
});
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Du lịch miền Nam'});
});

module.exports = router;
