const db = require('../config/db');
const fs = require('fs');
const path = require('path');

// 1. Lấy danh sách phương tiện
exports.getAllVehicles = async (req, res) => {
    try {
        const sql = "SELECT * FROM phuong_tien";
        const [vehicles] = await db.query(sql);

        res.render('admin/Manage/Vehicle/ManageVehicle', { // Nhớ sửa đường dẫn view cho đúng folder của bạn
            title: 'Quản lý phương tiện',
            vehicles: vehicles
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Database: " + err.message);
    }
};

// 2. Thêm phương tiện mới
exports.addVehicle = async (req, res) => {
    try {
        const { ten_phuong_tien, so_cho, bien_so } = req.body;
        const trang_thai = 1; // 1: Sẵn sàng, 0: Bảo trì/Ngưng

        const files = req.files;

        // Kiểm tra ảnh đại diện
        if (!files || !files['hinh_anh_bia']) {
            return res.send("Vui lòng chọn ảnh đại diện cho xe!");
        }

        const hinh_dai_dien = files['hinh_anh_bia'][0].filename;

        // B1: Insert vào bảng phuong_tien
        const sqlXe = "INSERT INTO phuong_tien (ten_phuong_tien, bien_so, so_cho, trang_thai, hinh_dai_dien) VALUES (?, ?, ?, ?, ?)";

        const [result] = await db.query(sqlXe, [ten_phuong_tien, bien_so, so_cho, trang_thai, hinh_dai_dien]);

        const newVehicleId = result.insertId;

        // B2: Insert vào bảng hinh_phuong_tien (Album ảnh chi tiết)
        if (files['album'] && files['album'].length > 0) {
            const albumValues = files['album'].map(file => [newVehicleId, file.filename]);
            const sqlAlbum = "INSERT INTO hinh_phuong_tien (ma_phuong_tien, duong_dan) VALUES ?";

            await db.query(sqlAlbum, [albumValues]);
        }

        res.redirect('/admin/managevehicle');

    } catch (err) {
        console.log("Lỗi thêm xe:", err);
        res.status(500).send("Lỗi server: " + err.message);
    }
};

// 3. HIỂN THỊ TRANG SỬA XE (GET)
exports.getEditVehicle = async (req, res) => {
    try {
        const id = req.params.id;

        // Lấy thông tin xe
        const [vehicles] = await db.query("SELECT * FROM phuong_tien WHERE ma_phuong_tien = ?", [id]);
        const vehicle = vehicles[0];

        // Lấy album ảnh của xe
        const [album] = await db.query("SELECT * FROM hinh_phuong_tien WHERE ma_phuong_tien = ?", [id]);

        if (!vehicle) {
            return res.redirect('/admin/managevehicle');
        }

        res.render('admin/Manage/Vehicle/EditVehicle', { // Sửa đường dẫn view cho đúng folder của bạn
            title: 'Sửa phương tiện',
            vehicle: vehicle,
            album: album
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Server");
    }
};

// 4. XỬ LÝ CẬP NHẬT XE (POST)
exports.updateVehicle = async (req, res) => {
    try {
        const id = req.params.id;
        const { ten_phuong_tien, so_cho, bien_so, delete_images } = req.body;
        const files = req.files;

        // --- B1: Cập nhật thông tin cơ bản ---
        let sqlUpdate = "UPDATE phuong_tien SET ten_phuong_tien = ?, so_cho = ?, bien_so = ? WHERE ma_phuong_tien = ?";
        let params = [ten_phuong_tien, so_cho, bien_so, id];

        // --- B2: Kiểm tra ảnh đại diện mới ---
        if (files['hinh_anh_bia']) {
            const newCover = files['hinh_anh_bia'][0].filename;

            // Xóa ảnh cũ trong ổ cứng
            const [oldData] = await db.query("SELECT hinh_dai_dien FROM phuong_tien WHERE ma_phuong_tien = ?", [id]);
            if (oldData[0]?.hinh_dai_dien) {
                const oldPath = path.join(__dirname, '../uploads', oldData[0].hinh_dai_dien);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }

            // Cập nhật SQL kèm ảnh mới
            sqlUpdate = "UPDATE phuong_tien SET ten_phuong_tien = ?, so_cho = ?, bien_so = ?, hinh_dai_dien = ? WHERE ma_phuong_tien = ?";
            params = [ten_phuong_tien, so_cho, bien_so, newCover, id];
        }

        // Thực thi Update bảng phuong_tien
        await db.query(sqlUpdate, params);

        // --- B3: Xóa ảnh Album (nếu user tick chọn) ---
        if (delete_images) {
            const idsToDelete = Array.isArray(delete_images) ? delete_images : [delete_images];

            if (idsToDelete.length > 0) {
                // Xóa file cứng
                const [imgs] = await db.query("SELECT duong_dan FROM hinh_phuong_tien WHERE ma_hinh IN (?)", [idsToDelete]);
                imgs.forEach(img => {
                    const fPath = path.join(__dirname, '../uploads', img.duong_dan);
                    if (fs.existsSync(fPath)) fs.unlinkSync(fPath);
                });

                // Xóa trong DB
                await db.query("DELETE FROM hinh_phuong_tien WHERE ma_hinh IN (?)", [idsToDelete]);
            }
        }

        // --- B4: Thêm ảnh mới vào Album ---
        if (files['album'] && files['album'].length > 0) {
            const albumValues = files['album'].map(file => [id, file.filename]);
            await db.query("INSERT INTO hinh_phuong_tien (ma_phuong_tien, duong_dan) VALUES ?", [albumValues]);
        }

        res.redirect('/admin/managevehicle');

    } catch (err) {
        console.log("Lỗi update xe:", err);
        res.status(500).send("Lỗi: " + err.message);
    }
};

// 6. ĐỔI TRẠNG THÁI XE (Logic mới: 0, 1, 2)
exports.toggleMaintenanceVehicle = async (req, res) => {
    try {
        const id = req.params.id;

        // B1: Lấy trạng thái hiện tại
        const sqlGetStatus = "SELECT trang_thai FROM phuong_tien WHERE ma_phuong_tien = ?";
        const [rows] = await db.query(sqlGetStatus, [id]);

        if (rows.length > 0) {
            const currentStatus = rows[0].trang_thai;

            // B2: Logic chặn và đổi
            let newStatus = currentStatus;

            if (currentStatus === 1) {
                // Nếu xe đang chạy (1) mà ai đó cố tình gọi API này -> Không làm gì cả
                console.log("Cảnh báo: Cố tình đổi trạng thái khi xe đang chạy!");
                return res.redirect('/admin/managevehicle');
            } else if (currentStatus === 0) {
                newStatus = 2; // Sẵn sàng -> Bảo trì
            } else if (currentStatus === 2) {
                newStatus = 0; // Bảo trì -> Sẵn sàng
            }

            // B3: Update vào DB
            const sqlUpdate = "UPDATE phuong_tien SET trang_thai = ? WHERE ma_phuong_tien = ?";
            await db.query(sqlUpdate, [newStatus, id]);
        }

        res.redirect('/admin/managevehicle');

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi server: " + err.message);
    }
};