const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getAllHotels = async (req, res) => {
    try {
        const sql = `
            SELECT k.*, d.ten_dia_diem 
            FROM khach_san k 
            JOIN dia_diem d ON k.ma_dia_diem = d.ma_dia_diem
            ORDER BY k.ma_khach_san DESC
        `;

        const [hotels] = await db.query(sql);

        res.render('admin/Manage/Hotel/ManageHotel', {
            title: 'Quản lý khách sạn',
            hotels: hotels
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Database: " + err.message);
    }
};

// 2. Hiển thị Form thêm khách sạn (GET)
exports.getAddHotel = async (req, res) => {
    try {
        const [locations] = await db.query("SELECT ma_dia_diem, ten_dia_diem FROM dia_diem");

        res.render('admin/Manage/Hotel/AddHotel', {
            title: 'Thêm khách sạn',
            locations: locations
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Server");
    }
};

// 3. Xử lý Thêm khách sạn (POST)
exports.addHotel = async (req, res) => {
    try {
        const { ten_khach_san, ma_dia_diem, dia_chi, gia_thue, quan_ly, sdt } = req.body;
        const files = req.files;

        // Validate ảnh bìa
        if (!files || !files['anh_bia']) {
            return res.send("Vui lòng chọn ảnh bìa khách sạn!");
        }
        const anh_bia = files['anh_bia'][0].filename;

        // Insert Khách sạn
        const sql = `INSERT INTO khach_san 
                     (ten_khach_san, ma_dia_diem, dia_chi, gia_thue, quan_ly, sdt, anh_bia, trang_thai) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, 1)`;

        const [result] = await db.query(sql, [ten_khach_san, ma_dia_diem, dia_chi, gia_thue, quan_ly, sdt, anh_bia]);
        const newHotelId = result.insertId;

        // Insert Album
        if (files['album'] && files['album'].length > 0) {
            const albumValues = files['album'].map(file => [newHotelId, file.filename]);
            await db.query("INSERT INTO hinh_khach_san (ma_khach_san, duong_dan) VALUES ?", [albumValues]);
        }

        res.redirect('/admin/managehotel');

    } catch (err) {
        console.log("Lỗi thêm hotel:", err);
        res.status(500).send("Lỗi: " + err.message);
    }
};

// 4. HIỂN THỊ TRANG SỬA (GET)
exports.getEditHotel = async (req, res) => {
    try {
        const id = req.params.id;

        // Lấy thông tin khách sạn
        const [hotels] = await db.query("SELECT * FROM khach_san WHERE ma_khach_san = ?", [id]);
        const hotel = hotels[0];

        // Lấy danh sách địa điểm (để hiện Dropdown)
        const [locations] = await db.query("SELECT ma_dia_diem, ten_dia_diem FROM dia_diem");

        // Lấy Album ảnh
        const [album] = await db.query("SELECT * FROM hinh_khach_san WHERE ma_khach_san = ?", [id]);

        if (!hotel) {
            return res.redirect('/admin/managehotel');
        }

        res.render('admin/Manage/Hotel/EditHotel', {
            title: 'Sửa khách sạn',
            hotel: hotel,
            locations: locations,
            album: album
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Server");
    }
};

// 5. XỬ LÝ CẬP NHẬT (POST)
exports.updateHotel = async (req, res) => {
    try {
        const id = req.params.id;
        const { ten_khach_san, ma_dia_diem, dia_chi, gia_thue, quan_ly, sdt, delete_images } = req.body;
        const files = req.files;

        // Update thông tin cơ bản
        let sqlUpdate = `UPDATE khach_san 
                         SET ten_khach_san=?, ma_dia_diem=?, dia_chi=?, gia_thue=?, quan_ly=?, sdt=? 
                         WHERE ma_khach_san=?`;
        let params = [ten_khach_san, ma_dia_diem, dia_chi, gia_thue, quan_ly, sdt, id];

        // Kiểm tra nếu có đổi Ảnh Bìa
        if (files['anh_bia']) {
            const newCover = files['anh_bia'][0].filename;

            // Xóa ảnh bìa cũ
            const [oldData] = await db.query("SELECT anh_bia FROM khach_san WHERE ma_khach_san = ?", [id]);
            if (oldData[0]?.anh_bia) {
                const oldPath = path.join(__dirname, '../uploads', oldData[0].anh_bia);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }

            // Update SQL kèm ảnh mới
            sqlUpdate = `UPDATE khach_san 
                         SET ten_khach_san=?, ma_dia_diem=?, dia_chi=?, gia_thue=?, quan_ly=?, sdt=?, anh_bia=? 
                         WHERE ma_khach_san=?`;
            params = [ten_khach_san, ma_dia_diem, dia_chi, gia_thue, quan_ly, sdt, newCover, id];
        }

        // Chạy lệnh Update chính
        await db.query(sqlUpdate, params);

        // Xóa ảnh Album (nếu có tick chọn)
        if (delete_images) {
            const idsToDelete = Array.isArray(delete_images) ? delete_images : [delete_images];
            if (idsToDelete.length > 0) {
                // Xóa file cứng
                const [imgs] = await db.query("SELECT duong_dan FROM hinh_khach_san WHERE ma_hinh_anh IN (?)", [idsToDelete]);
                imgs.forEach(img => {
                    const fPath = path.join(__dirname, '../uploads', img.duong_dan);
                    if (fs.existsSync(fPath)) fs.unlinkSync(fPath);
                });
                // Xóa DB (Lưu ý tên cột là ma_hinh_anh theo bảng bạn đưa)
                await db.query("DELETE FROM hinh_khach_san WHERE ma_hinh_anh IN (?)", [idsToDelete]);
            }
        }

        // Thêm ảnh Album mới
        if (files['album'] && files['album'].length > 0) {
            const albumValues = files['album'].map(file => [id, file.filename]);
            await db.query("INSERT INTO hinh_khach_san (ma_khach_san, duong_dan) VALUES ?", [albumValues]);
        }

        res.redirect('/admin/managehotel');

    } catch (err) {
        console.log("Lỗi update hotel:", err);
        res.status(500).send("Lỗi: " + err.message);
    }
};

// 6. ĐỔI TRẠNG THÁI KHÁCH SẠN (Toggle)
exports.toggleStatusHotel = async (req, res) => {
    try {
        const id = req.params.id;

        // Lấy trạng thái hiện tại
        const sqlGetStatus = "SELECT trang_thai FROM khach_san WHERE ma_khach_san = ?";
        const [rows] = await db.query(sqlGetStatus, [id]);

        if (rows.length > 0) {
            const currentStatus = rows[0].trang_thai;

            // Đảo trạng thái (1 -> 0, 0 -> 1)
            const newStatus = currentStatus === 1 ? 0 : 1;

            // Update vào DB
            const sqlUpdate = "UPDATE khach_san SET trang_thai = ? WHERE ma_khach_san = ?";
            await db.query(sqlUpdate, [newStatus, id]);
        }

        res.redirect('/admin/managehotel');

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi server: " + err.message);
    }
};