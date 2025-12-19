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

exports.getTourDetail = async (req, res) => {
    try {
        const id = req.params.id;

        const sqlTour = `
            SELECT lt.*,
                   t.ten_tour, t.diem_den,
                   d.ten_dia_diem, d.mota as mota_dia_diem,
                   pt.ten_phuong_tien, pt.so_cho,
                   ks.ten_khach_san
            FROM lich_trinh_tour lt
                     JOIN tour t ON lt.ma_tour = t.ma_tour
                     JOIN dia_diem d ON t.diem_den = d.ma_dia_diem
                     JOIN phuong_tien pt ON lt.ma_phuong_tien = pt.ma_phuong_tien
                     JOIN khach_san ks ON lt.ma_khach_san = ks.ma_khach_san
            WHERE lt.ma_lich_trinh = ?
        `;

        const [rows] = await db.query(sqlTour, [id]);

        if (rows.length === 0) {
            return res.redirect('/places');
        }

        const tour = rows[0];

        const [hinhDiaDiem, hinhXe, hinhKS] = await Promise.all([
            db.query("SELECT duong_dan FROM hinh_dia_diem WHERE ma_dia_diem = ?", [tour.diem_den]),
            db.query("SELECT duong_dan FROM hinh_phuong_tien WHERE ma_phuong_tien = ?", [tour.ma_phuong_tien]),
            db.query("SELECT duong_dan FROM hinh_khach_san WHERE ma_khach_san = ?", [tour.ma_khach_san])
        ]);

        // 3. Truyền dữ liệu sang View
        res.render('home/tour_detail', {
            title: tour.ten_tour,
            background: '/images/bg_1.jpg',
            tour: tour,
            imgs_location: hinhDiaDiem[0], // List hình địa điểm
            imgs_vehicle: hinhXe[0],       // List hình xe
            imgs_hotel: hinhKS[0]          // List hình khách sạn
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Server");
    }
};

exports.getBooking = async (req, res) => {
    try {
        const id = req.params.id;

        // Lấy thông tin User đang đăng nhập (Passport lưu trong req.user)
        console.log("User đang đặt vé:", req.user);

        res.send(`<h1>Xin chào ${req.user.hoten}, bạn đang đặt tour có ID: ${id}</h1>`);

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi");
    }
};