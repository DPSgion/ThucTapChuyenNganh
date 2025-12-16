var express = require('express');
var router = express.Router();

const tourController = require('../controller/tourController');
const authController = require('../controller/authController');


var hinhnen = 'images/bg_1.jpg';

// Set layout home mặc định
router.all('/*', function(req, res, next) {
    res.app.locals.layout='home';
    next();
})

// Route trang chủ
router.get('/', tourController.getPopularTours);

router.get('/places', function(req, res, next) {
    res.render('home/places', { title: 'Nơi đi', background: hinhnen });
});

// Chặn người đã đăng nhập quay lại trang login
function daDangNhapThiDuoiDi(req, res, next) {
    if (req.isAuthenticated()) {
        // if(req.user.vaitro === 1) return res.redirect('/admin');
        return res.redirect('/admin');
    }
    next();
}

router.get('/register', daDangNhapThiDuoiDi, function(req, res, next) {
    res.render('home/register', { title: 'Đăng ký', background: hinhnen });
});
router.get('/update_password', function(req, res, next) {
    res.render('home/update_password', { title: 'Đổi mật khẩu', background: hinhnen });
})
router.get('/login', daDangNhapThiDuoiDi, function(req, res, next) {
    res.render('home/login', { title: 'Đăng nhập', background: hinhnen });
});

router.post('/register', authController.register);
router.post('/update_password', authController.update_password);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;