const pool = require('../config/db');
const fs = require('fs');

var hinhnen = 'images/bg_1.jpg';

exports.addTour = async (req, res) => {
    try {
        const {
            matour, tentour, diemdi, diemden, loaitour, motangan, motachitiet, ngaydi, ngayve, thoiluong, giavenguoilon, giavetreem, soluong
        } = req.body;

        const filename = req.file ? req.file.filename : null; // tên file hình

        const sql = `INSERT INTO tour
                     (matour,tentour,diemdi,diemden,loaitour,hinhdaidien,motangan,motachitiet,ngaydi,ngayve,thoiluong,giavenguoilon,giavetreem,soluong)
                     VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await pool.execute(sql, [
            matour, tentour, diemdi, diemden, loaitour, filename, motangan, motachitiet, ngaydi, ngayve, thoiluong, giavenguoilon, giavetreem, soluong
        ]);

        res.redirect('/admin/managetour');
    } catch (err) {
        // Xóa file nếu upload nhưng DB fail
        if (req.file) fs.unlinkSync(req.file.path);

        console.error("ADD TOUR ERROR:", err);
        res.status(500).send('Lỗi lưu tour: ' + err);
    }
};

exports.getAllTours = async (req, res) => {
    let dbReady = false;
    try {
        const[tourRows] = await pool.execute('SELECT * FROM tour ORDER BY matour ASC');
        res.render('admin/Manage/ManageTour', {
            title: 'Manage Tour Page',
            tours: tourRows, // truyền dữ liệu vào template
            dbReady: true
        });
    } catch (err) {
        console.error('DB connection error:');
        // console.log(err);
        res.render('admin/Manage/ManageTour', {
            dbReady: false
        });
    }
};

exports.getPopularTours = async (req, res) => {
    try{
        const [rows] = await pool.execute('SELECT * FROM tour ORDER BY matour ASC LIMIT 4');
        const numTours = rows.length > 0;
        console.log(rows);
        res.render('home/index', {
            title: 'Trang chủ',
            background: hinhnen,
            popularTours: rows,
            numTours
        });
    } catch (err) {
        console.error('DB connection error:', err);
        res.render('home/index', {
            popularTours: [],
            numTours: false
        });
    }
}