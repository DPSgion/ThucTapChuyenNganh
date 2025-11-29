const pool = require('../config/db');
const fs = require('fs');

exports.addTour = async (req, res) => {
    try {
        const {
            matour, tentour, diemdi, diemden, loaitour, motangan, motachitiet, ngaydi, ngayve, giavenguoilon, giavetreem, soluong
        } = req.body;

        const filename = req.file ? req.file.filename : null; // tên file hình

        const sql = `INSERT INTO tour
                     (matour,tentour,diemdi,diemden,loaitour,hinhdaidien,motangan,motachitiet,ngaydi,ngayve,giavenguoilon,giavetreem,soluong)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await pool.execute(sql, [
            matour, tentour, diemdi, diemden, loaitour, filename,
            motangan, motachitiet, ngaydi, ngayve,
            giavenguoilon, giavetreem, soluong
        ]);

        res.redirect('/admin/managetour');
    } catch (err) {
        // Xóa file nếu upload nhưng DB fail
        if (req.file) fs.unlinkSync(req.file.path);

        console.error("ADD TOUR ERROR:", err);
        res.status(500).send('Lỗi lưu tour: ' + err);
    }
};
