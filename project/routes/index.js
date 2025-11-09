var express = require('express');
var router = express.Router();

var hinhnen = 'images/bg_1.jpg';


router.all('/*', function(req, res, next) {
    res.app.locals.layout='home';
    next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home/index',
        {
            title: 'Trang chủ',
            background: hinhnen
        });
});

router.get('/about', function(req, res, next) {
    res.render('home/about', {
        title: 'Về chúng tôi',
        background: hinhnen
    });
});
router.get('/places', function(req, res, next) {
    res.render('home/places', {
        title: 'Nơi đi',
        background: hinhnen
    });
});
router.get('/hotel', function(req, res, next) {
    res.render('home/hotel', {
        title: 'Khách sạn',
        background: hinhnen
    });
});
router.get('/car_rent', function(req, res, next) {
    res.render('home/car_rent', {
        title: 'Thuê xe tự lái',
        background: hinhnen
    });
});
router.get('/signin_signout', function(req, res, next) {
    res.render('home/signin_signout', {
        // layouts: false,
        title: 'Đăng nhập',
        background: hinhnen
    });
});

module.exports = router;
