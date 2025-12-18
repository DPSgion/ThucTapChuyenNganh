const db = require('../config/db');

exports.getPlaces = async (req, res) => {
    try {
        const sql = `
            SELECT lt.*, 
                   t.ten_tour, 
                   d.ten_dia_diem, 
                   d.hinhdaidien
            FROM lich_trinh_tour lt
            JOIN tour t ON lt.ma_tour = t.ma_tour
            JOIN dia_diem d ON t.diem_den = d.ma_dia_diem
            WHERE lt.trang_thai = 1
            ORDER BY lt.ngay_di ASC
        `;

        const [rows] = await db.query(sql);

        res.render('home/places', {
            title: 'Điểm đến',
            background: 'images/bg_1.jpg',
            tours: rows
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Server");
    }
};