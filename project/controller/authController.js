const bcryptjs = require('bcryptjs');
const pool = require('../config/db');
const passport = require('passport');

var hinhnen = 'images/bg_1.jpg';

exports.register = async (req, res, next) => {
    const { hoten, email, password, ngaysinh } = req.body;

    let errors = [];
    if (!hoten) errors.push({ message: 'Họ tên là bắt buộc' });
    if (!email) errors.push({ message: 'Email là bắt buộc' });
    if (!password) errors.push({ message: 'Mật khẩu là bắt buộc' });
    if (!ngaysinh) errors.push({ message: 'Ngày sinh là bắt buộc' });

    if (ngaysinh) {
        const birthDate = new Date(ngaysinh);
        const today = new Date();

        // Tính tuổi dựa trên năm
        let age = today.getFullYear() - birthDate.getFullYear();

        // Kiểm tra tháng và ngày để tính tuổi
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            errors.push({ message: 'Bạn phải đủ 18 tuổi để đăng ký tài khoản!' });
        }
    }

    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows.length > 0) {
        errors.push({ message: 'Email này đã được đăng ký!' });
    }

    if (errors.length > 0) {
        return res.render('home/register', {
            title: 'Đăng ký',
            errors: errors,
            background: hinhnen,
            hoten: hoten,
            email: email,
            ngaysinh: ngaysinh
        });
    }

    try {


        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const sql = 'INSERT INTO user (email, password, hoten, ngay_sinh, vaitro) VALUES (?, ?, ?, ?, 0)';

        await pool.query(sql, [email, hashPassword, hoten, ngaysinh]);

        req.flash('success_message', 'Đăng ký thành công! Bạn có thể đăng nhập.');
        res.redirect('/login');

    } catch (err) {
        console.error(err);
        req.flash('error_message', 'Lỗi hệ thống!');
        res.redirect('/register');
    }
};

exports.update_password = async (req, res, next) => {
    // 1. Kiểm tra xem đã đăng nhập chưa
    // if (!req.isAuthenticated() || !req.user) {
    //     req.flash('error_message', 'Vui lòng đăng nhập trước!');
    //     return res.redirect('/admin/login');
    // }

    // 2. Lấy email từ chính người đang đăng nhập
    const emailHienTai = req.user.email;

    const { password, confirmPassword } = req.body;
    let errors = [];

    // 3. Validate form
    if (!password || !confirmPassword) {
        errors.push({ message: 'Vui lòng nhập đầy đủ thông tin' });
    }
    if (password !== confirmPassword) {
        errors.push({ message: 'Mật khẩu xác nhận không khớp' });
    }

    if (errors.length > 0) {
        // Kiểm tra vai trò (Giả sử 1 là Admin, 0 là User)
        if (req.user.vaitro === 1) {
            // Là Admin -> Trả về giao diện Admin
            return res.render('admin/update_password', {
                title: 'Đổi mật khẩu Admin',
                errors: errors,
                user: req.user
            });
        } else {
            return res.render('/', {
                title: 'Trang chủ',
                errors: errors,
                user: req.user
            });
        }
    }

    try {
        // 4. Mã hóa mật khẩu mới
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        // 5. Cập nhật vào DB
        const sql = 'UPDATE user SET password = ? WHERE email = ?';
        await pool.query(sql, [hashPassword, emailHienTai]);

        req.flash('success_message', 'Đổi mật khẩu thành công!');
        return res.redirect('back');

    } catch (err) {
        console.error(err);
        req.flash('error_message', 'Lỗi hệ thống!');
        res.redirect('back');
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
            if (user.vaitro === 1) {
                return res.redirect('/admin');
            } else {
                return res.redirect('/');
            }

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