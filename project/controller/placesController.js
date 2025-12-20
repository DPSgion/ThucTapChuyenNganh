const db = require('../config/db');

exports.getPlaces = async (req, res) => {
    try {
        // Lấy tham số từ URL
        const { keyword, d_start, d_end } = req.query;

        let sql = `
            SELECT lt.*, 
                   t.ten_tour, 
                   d.ten_dia_diem, 
                   d.hinhdaidien
            FROM lich_trinh_tour lt
            JOIN tour t ON lt.ma_tour = t.ma_tour
            JOIN dia_diem d ON t.diem_den = d.ma_dia_diem
            WHERE lt.trang_thai = 1
        `;

        const params = [];

        // Nếu có từ khóa (Tìm theo tên địa điểm hoặc tên tour)
        if (keyword) {
            sql += ` AND (d.ten_dia_diem LIKE ? OR t.ten_tour LIKE ?)`;
            params.push(`%${keyword}%`);
            params.push(`%${keyword}%`);
        }

        // Tìm ngày đi
        if (d_start) {
            sql += ` AND DATE(lt.ngay_di) >= ?`;
            params.push(d_start);
        }

        // Tìm ngày về
        if (d_end) {
            sql += ` AND DATE(lt.ngay_ve) <= ?`;
            params.push(d_end);
        }

        // Sắp xếp
        sql += ` ORDER BY lt.ngay_di ASC`;


        const [rows] = await db.query(sql, params);

        res.render('home/places', {
            title: 'Điểm đến',
            background: 'images/bg_1.jpg',
            tours: rows,
            search_params: { keyword, d_start, d_end }
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Server");
    }
};

exports.getTourDetail = async (req, res) => {
    try {
        const id = req.params.id;

        // Query lấy thông tin Tour
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
        if (rows.length === 0) return res.redirect('/places');
        const tour = rows[0];


        // Kiểm tra xem user đã đặt tour này chưa
        let daDatCho = false;

        // Chỉ kiểm tra nếu người dùng ĐÃ ĐĂNG NHẬP
        if (req.isAuthenticated() && req.user) {
            const [checkBooking] = await db.query(
                "SELECT id_don_dat FROM don_dat WHERE userid = ? AND ma_lich_trinh = ?",
                [req.user.userid, id]
            );
            if (checkBooking.length > 0) {
                daDatCho = true;
            }
        }

        // Kiểm tra xem tour đã hết chỗ chưa
        let hetCho = false;
        if (tour.so_cho_da_dat >= tour.so_cho) {
            hetCho = true;
        }

        // Lấy hình ảnh
        const [hinhDiaDiem, hinhXe, hinhKS] = await Promise.all([
            db.query("SELECT duong_dan FROM hinh_dia_diem WHERE ma_dia_diem = ?", [tour.diem_den]),
            db.query("SELECT duong_dan FROM hinh_phuong_tien WHERE ma_phuong_tien = ?", [tour.ma_phuong_tien]),
            db.query("SELECT duong_dan FROM hinh_khach_san WHERE ma_khach_san = ?", [tour.ma_khach_san])
        ]);

        res.render('home/tour_detail', {
            title: tour.ten_tour,
            background: '/images/bg_1.jpg',
            tour: tour,
            imgs_location: hinhDiaDiem[0],
            imgs_vehicle: hinhXe[0],
            imgs_hotel: hinhKS[0],
            daDatCho: daDatCho,
            hetCho: hetCho
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Server: " + err.message);
    }
};

exports.getBooking = async (req, res) => {
    try {
        const id = req.params.id;

        const sql = `
            SELECT lt.*, t.ten_tour, pt.so_cho
            FROM lich_trinh_tour lt
            JOIN tour t ON lt.ma_tour = t.ma_tour
            JOIN phuong_tien pt ON lt.ma_phuong_tien = pt.ma_phuong_tien
            WHERE lt.ma_lich_trinh = ?
        `;

        const [rows] = await db.query(sql, [id]);

        if (rows.length === 0) return res.redirect('/');

        const tour = rows[0];
        // Tính số chỗ còn lại thực tế
        const slots_left = tour.so_cho - tour.so_cho_da_dat;

        res.render('home/booking', {
            title: 'Đặt tour',
            background: '/images/bg_1.jpg',
            tour: tour,
            user: req.user, // Truyền thông tin user để điền sẵn vào ô người đầu tiên
            slots_left: slots_left
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Server");
    }
};

exports.postBooking = async (req, res) => {
    try {
        const ma_lich_trinh = req.params.id;
        const userid = req.user.userid; // ID người đặt
        const { adult_count, child_count, passenger_name, passenger_dob, passenger_type } = req.body;

        const numAdults = parseInt(adult_count);
        const numChildren = parseInt(child_count);
        const totalPeople = numAdults + numChildren;

        // Lấy thông tin tour để tính tiền
        const [rows] = await db.query("SELECT gia_nguoi_lon, gia_tre_em, so_cho_da_dat, ma_phuong_tien FROM lich_trinh_tour WHERE ma_lich_trinh = ?", [ma_lich_trinh]);
        const tour = rows[0];

        // Lấy số chỗ tối đa của xe
        const [xe] = await db.query("SELECT so_cho FROM phuong_tien WHERE ma_phuong_tien = ?", [tour.ma_phuong_tien]);
        const maxSlots = xe[0].so_cho;

        // Kiểm tra còn đủ chỗ không
        if (tour.so_cho_da_dat + totalPeople > maxSlots) {
            return res.send("<script>alert('Xin lỗi, không đủ chỗ!'); window.location.href='/';</script>");
        }

        // Tính tổng tiền
        const totalMoney = (numAdults * tour.gia_nguoi_lon) + (numChildren * tour.gia_tre_em);
        const today = new Date(); // Ngày đặt



        // Insert vào bảng don_dat
        const sqlDonDat = `INSERT INTO don_dat (userid, ma_lich_trinh, tong_so_nguoi_di, tong_tien, ngay_dat) VALUES (?, ?, ?, ?, ?)`;
        const [resultDonDat] = await db.query(sqlDonDat, [userid, ma_lich_trinh, totalPeople, totalMoney, today]);
        const idDonDat = resultDonDat.insertId; // Lấy ID vừa tạo

        // Insert danh sách nguoi_di_tour
        // Nếu chỉ có 1 người, nó có thể là string, cần đưa về mảng
        const names = Array.isArray(passenger_name) ? passenger_name : [passenger_name];
        const dobs = Array.isArray(passenger_dob) ? passenger_dob : [passenger_dob];

        for (let i = 0; i < names.length; i++) {
            // Người đầu tiên trong list là người đặt
            let isBooker = (i === 0) ? 1 : 0;

            const sqlNguoiDi = `INSERT INTO nguoi_di_tour (id_don_dat, ho_ten, ngay_sinh, nguoi_dat_tour) VALUES (?, ?, ?, ?)`;
            await db.query(sqlNguoiDi, [idDonDat, names[i], dobs[i], isBooker]);
        }

        // Cập nhật số chỗ đã đặt trong lich_trinh_tour
        const newSoChoDaDat = tour.so_cho_da_dat + totalPeople;
        await db.query("UPDATE lich_trinh_tour SET so_cho_da_dat = ? WHERE ma_lich_trinh = ?", [newSoChoDaDat, ma_lich_trinh]);


        res.send(`<script>alert('Đặt tour thành công! Cảm ơn bạn.'); window.location.href='/';</script>`);

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi hệ thống khi đặt tour: " + err.message);
    }
};