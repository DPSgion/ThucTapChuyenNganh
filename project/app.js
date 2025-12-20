const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const { engine } = require('express-handlebars');
const MySQLStore = require('express-mysql-session')(session);


const pool = require('./config/db');
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');

require('./config/passport')(passport);

const app = express();

// Cấu hình Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'layouts',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        formatDate: function(date) {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        },
        formatDateTime: function(date) {
            const d = new Date(date);

            // Lấy ngày tháng năm
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();

            // Lấy giờ phút
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');

            // Trả về dạng: 08:30 - 20/11/2025
            return `${hours}:${minutes} - ${day}/${month}/${year}`;
        },
        isOdd: function(value) {
            return value % 2 !== 0;
        },
        eq: function(a, b) {
            return a == b;
        },
        formatCurrency: (value) => {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        add: (a, b) => a + b,
    }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cấu hình Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


/* Tùy chọn: Lưu Session vào MySQL  ---
const sessionOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'quanlytour'
};
const sessionStore = new MySQLStore(sessionOptions);
------------------------------------ */


app.use(session({
    // key: 'session_cookie_name', // (Nếu dùng MySQL Store)
    // store: sessionStore,        // (Nếu dùng MySQL Store)
    secret: 'secret_key',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 ngày
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;

    if (req.user && req.user.vaitro === 1) {
        res.locals.isAdmin = true;
    } else {
        res.locals.isAdmin = false;
    }

    next();
});


const checkAdminRole = (req, res, next) => {
    // Kiểm tra đã đăng nhập chưa ?
    if (req.isAuthenticated()) {

        //  Có phải Admin (vaitro = 1) không ?
        if (req.user.vaitro === 1) {
            return next(); // Đúng là Admin -> Mời vào
        } else {
            // Nếu vaitro = 0
            req.flash('error_message', 'Bạn không có quyền vào trang này!');
            return res.redirect('/');
        }
    }
    // Chưa đăng nhập
    req.flash('error_message', 'Vui lòng đăng nhập Admin!');
    res.redirect('/signin_signout');
};


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', checkAdminRole, adminRouter);




// Bắt lỗi 404 (Không tìm thấy trang)
app.use(function(req, res, next) {
    next(createError(404));
});

// Xử lý lỗi server (500)
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error', { layout: false });
});

module.exports = app;