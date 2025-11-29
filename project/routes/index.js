var express = require('express');
var router = express.Router();
const tourController = require('../controller/tourController');
const pool = require('../config/db');

var hinhnen = 'images/bg_1.jpg';


router.all('/*', function(req, res, next) {
    res.app.locals.layout='home';
    next();
})

/* GET home page. */
router.get('/', tourController.getPopularTours);

// router.get('/about', function(req, res, next) {
//     res.render('home/about', {
//         title: 'Về chúng tôi',
//         background: hinhnen
//     });
// });
router.get('/places', function(req, res, next) {
    res.render('home/places', {
        title: 'Nơi đi',
        background: hinhnen
    });
});
// router.get('/hotel', function(req, res, next) {
//     res.render('home/hotel', {
//         title: 'Khách sạn',
//         background: hinhnen
//     });
// });
// router.get('/car_rent', function(req, res, next) {
//     res.render('home/car_rent', {
//         title: 'Thuê xe tự lái',
//         background: hinhnen
//     });
// });
router.get('/signin_signout', function(req, res, next) {
    res.render('home/signin_signout', {
        // layouts: false,
        title: 'Đăng nhập',
        background: hinhnen
    });
});
router.post('/register', async function(req, res, next) {
    try {
        const { hoten, email, password } = req.body;

        if (!hoten || !email || !password) {
            return res.status(400).json({ message: 'Missing fields' });
        }

        const sql = 'INSERT INTO user (email, pass, hoten) VALUES (?, ?, ?)';
        const [result] = await pool.query(sql, [email, password, hoten]);

        return res.json({
            status: 'success',
            userId: result.insertId,
            message: 'Đăng ký thành công!'
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({ message: 'Server error' });

    }
});
router.post('/login', async function(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing fields' });
        }

        // Kiểm tra email và mật khẩu
        const sql = 'SELECT * FROM user WHERE email = ? AND pass = ?';
        const [rows] = await pool.query(sql, [email, password]);

        if (rows.length === 0) {
            return res.status(401).json({ status: 'fail', message: 'Email hoặc mật khẩu không đúng' });
        }

        return res.json({ status: 'success', message: 'Đăng nhập thành công!', user: rows[0] });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', message: 'Server error' });
    }
});


module.exports = router;
