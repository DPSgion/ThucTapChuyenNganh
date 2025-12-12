var express = require('express');
var router = express.Router();
const tourController = require('../controller/tourController');
const pool = require('../config/db');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// Cấu hình Passport Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (email, password, done) {
    try {
        const sql = 'SELECT * FROM user WHERE email = ?';
        const [rows] = await pool.query(sql, [email]);
        if (rows.length === 0) {
            return done(null, false, { message: 'Email không tồn tại' });
        }
        const user = rows[0];
        const isMatch = await bcryptjs.compare(password, user.password);
        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Mật khẩu không đúng' });
        }
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    // LƯU Ý: Đảm bảo DB của bạn cột id tên là 'userid' hay 'id' hay 'ID'
    // Ở đây bạn dùng user.userid -> Nếu DB là 'userid' thì đúng.
    done(null, user.userid);
});

passport.deserializeUser(async (id, done) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE userid = ?', [id]);
        if (rows.length > 0) {
            done(null, rows[0]);
        } else {
            done(null, false);
        }
    } catch (err) {
        done(err);
    }
});


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
        if(req.user.vaitro === 1) return res.redirect('/admin');
        return res.redirect('/');
    }
    next();
}

router.get('/signin_signout', daDangNhapThiDuoiDi, function(req, res, next) {
    res.render('home/signin_signout', { title: 'Đăng nhập', background: hinhnen });
});


// Xử lý Đăng ký
router.post('/register', async function(req, res, next) {
    const { hoten, email, password } = req.body;
    let errors = [];
    if (!hoten) errors.push({ message: 'Họ tên là bắt buộc' });
    if (!email) errors.push({ message: 'Email là bắt buộc' });
    if (!password) errors.push({ message: 'Mật khẩu là bắt buộc' });

    if (errors.length > 0) {
        return res.render('home/signin_signout', {
            title: 'Đăng nhập',
            errors: errors,
            background: hinhnen
        });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
        if (rows.length > 0) {
            req.flash('error_message', 'Email này đã được đăng ký!');
            return res.redirect('/signin_signout');
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        // Mặc định vaitro là 0 (User thường)
        const sql = 'INSERT INTO user (email, password, hoten, vaitro) VALUES (?, ?, ?, 0)';
        await pool.query(sql, [email, hashPassword, hoten]);

        req.flash('success_message', 'Đăng ký thành công! Bạn có thể đăng nhập.');
        res.redirect('/signin_signout');

    } catch (err) {
        console.error(err);
        req.flash('error_message', 'Lỗi hệ thống!');
        res.redirect('/signin_signout');
    }
});

// Xử lý Đăng nhập và Phân quyền
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash('error_message', info.message);
            return res.redirect('/signin_signout');
        }

        req.logIn(user, (err) => {
            if (err) { return next(err); }

            // --- PHÂN QUYỀN ---
            if (user.vaitro === 1) {
                return res.redirect('/admin');
            } else {
                return res.redirect('/');
            }
        });

    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/');
    });
});

module.exports = router;