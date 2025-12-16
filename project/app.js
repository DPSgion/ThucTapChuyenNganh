var createError = require('http-errors');
const {engine} = require('express-handlebars');
const pool = require('./config/db');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Gọi thư viện lưu session MySQL
const MySQLStore = require('express-mysql-session')(session);

var app = express();

const hbs = require('express-handlebars');

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'layouts',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        formatDate: function(date) {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2,'0');
            const month = String(d.getMonth()+1).padStart(2,'0');
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        },
        isOdd: function(value) {
            return value % 2 !== 0;
        }
    }
}));


var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// CẤU HÌNH SESSION STORE (LƯU VÀO DB THAY VÌ RAM)
// const sessionOptions = {
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '',
//     database: 'quanlytour'
// };
//
// const sessionStore = new MySQLStore(sessionOptions);
//
// app.use(session({
//     key: 'session_cookie_name',
//     secret: 'secret_key',
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 ngày
// }));
// =================================================================

app.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 ngày
}));
// =================================================================


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Routes công khai
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/admin', adminRouter);

const checkAdminRole = (req, res, next) => {
    // Nếu đã đăng nhập VÀ vai trò là 1 (Admin)
    if (req.isAuthenticated()) {
        return next(); // Cho qua
    }

    req.flash('error_message', 'Bạn không có quyền truy cập trang Admin!');
    res.redirect('/');
};

// Áp dụng middleware này cho toàn bộ route /admin
app.use('/admin', checkAdminRole, adminRouter);


// Error handling
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error', { layout: false });
});

module.exports = app;