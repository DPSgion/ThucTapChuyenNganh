const bcryptjs = require('bcryptjs');
const pool = require('../config/db');
const passport = require('passport');

var hinhnen = 'images/bg_1.jpg';

exports.register = async (req, res, next) => {
    const { hoten, email, password } = req.body;
    let errors = [];
    if (!hoten) errors.push({ message: 'Họ tên là bắt buộc' });
    if (!email) errors.push({ message: 'Email là bắt buộc' });
    if (!password) errors.push({ message: 'Mật khẩu là bắt buộc' });

    if (errors.length > 0) {
        return res.render('home/register', {
            title: 'Đăng nhập',
            errors: errors,
            background: hinhnen
        });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
        if (rows.length > 0) {
            req.flash('error_message', 'Email này đã được đăng ký!');
            return res.redirect('/register');
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
        res.redirect('/register');
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {

        const { email, password } = req.body;
        let errors = [];
        if (!email) errors.push({ message: 'Email là bắt buộc' });
        if (!password) errors.push({ message: 'Mật khẩu là bắt buộc' });

        if (errors.length > 0) {
            return res.render('home/login', {
                title: 'Đăng nhập',
                errors: errors,
                background: hinhnen
            });
        }

        if (err) { return next(err); }
        if (!user) {
            req.flash('error_message', info.message);
            return res.redirect('/login');
        }

        req.logIn(user, (err) => {
            if (err) { return next(err); }

            // --- PHÂN QUYỀN ---
            // if (user.vaitro === 1) {
            //     return res.redirect('/admin');
            // } else {
            //     return res.redirect('/');
            // }

            return res.redirect('/');

        });

    })(req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/');
    });
};