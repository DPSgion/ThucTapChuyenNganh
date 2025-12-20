var express = require('express');
var router = express.Router();

const authController = require('../controller/authController');
const {getPlaces, getTourDetail, getBooking, postBooking} = require('../controller/placesController');


var hinhnen = 'images/bg_1.jpg';


function yeuCauDangNhap(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Đã đăng nhập -> Cho qua
    }
    // Chưa login -> Chuyển đến trang đăng nhập
    res.redirect('/login');
}

// Chặn người đã đăng nhập quay lại trang login
function daDangNhapThiDuoiDi(req, res, next) {
    if (req.isAuthenticated()) {
        // if(req.user.vaitro === 1) return res.redirect('/admin');
        return res.redirect('/admin');
    }
    next();
}


// Set layout home mặc định
router.all('/*', function(req, res, next) {
    res.app.locals.layout='home';
    next();
})

router.get('/', function(req, res, next) {
    res.render('home', {
        title: 'Trang chủ',
        background: hinhnen,
    });
})

router.get('/places', getPlaces);
router.get('/tour-detail/:id', getTourDetail);

router.get('/booking/:id', yeuCauDangNhap, getBooking);

// Route xử lý đặt tour (MỚI)
router.post('/booking/:id', yeuCauDangNhap, postBooking);



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