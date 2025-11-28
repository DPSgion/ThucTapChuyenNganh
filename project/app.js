var createError = require('http-errors');
const {engine} = require('express-handlebars');
const pool = require('./config/db');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();


// Middleware để đọc dữ liệu form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayouts: 'layouts',
        partialsDir: path.join(__dirname, 'views', 'partials'),
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
    })
);

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);

app.post('/admin/addtour', async (req, res) => {
    try {
        const {
            matour,
            tentour,
            diemdi,
            diemden,
            loaitour,
            hinhdaidien,
            motangan,
            motachitiet,
            ngaydi,
            ngayve,
            giavenguoilon,
            giavetreem,
            soluong
        } = req.body;

        const sql = `INSERT INTO quanlytour
                     (matour,tentour,diemdi,diemden,loaitour,hinhdaidien,motangan,motachitiet,ngaydi,ngayve,giavenguoilon,giavetreem,soluong)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await pool.execute(sql, [
            matour,
            tentour,
            diemdi,
            diemden,
            loaitour,
            hinhdaidien,
            motangan,
            motachitiet,
            ngaydi,
            ngayve,
            giavenguoilon,
            giavetreem,
            soluong
        ]);

        // res.send('Tour đã được lưu thành công!');
        res.redirect('/admin/managetour');
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi lưu tour: ' + err);
    }
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
    res.render('error', {
        layout: false,  // Tắt layouts
    });
});

module.exports = app;
