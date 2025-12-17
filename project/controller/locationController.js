const db = require('../config/db');


exports.getAllLocations = async (req, res) => {
    try {
        const sql = "SELECT * FROM dia_diem";
        // Với mysql2 promise, kết quả trả về là mảng [rows, fields]
        // Chỉ lấy rows (dữ liệu) nên dùng destructuring [locations]
        const [locations] = await db.query(sql);

        res.render('admin/Manage/Location/ManageLocations', {
            title: 'Quản lý địa điểm',
            locations: locations
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Database: " + err.message);
    }
};


exports.addLocation = async (req, res) => {
    try {
        const {ten_dia_diem, mo_ta} = req.body;
        const trang_thai = 1;

        const files = req.files;
        if (!files || !files['hinh_anh_bia']) {
            return res.send("Vui lòng chọn ảnh bìa!");
        }

        const hinh_anh_bia = files['hinh_anh_bia'][0].filename;

        const sqlDiaDiem = "INSERT INTO dia_diem (ten_dia_diem, mota, hinhdaidien, trang_thai) VALUES (?, ?, ?, ?)";

        const [result] = await db.query(sqlDiaDiem, [ten_dia_diem, mo_ta, hinh_anh_bia, trang_thai]);

        const newLocationId = result.insertId;

        // Insert Album (nếu có)
        if (files['album'] && files['album'].length > 0) {
            const albumValues = files['album'].map(file => [newLocationId, file.filename]);
            const sqlAlbum = "INSERT INTO hinh_dia_diem (ma_dia_diem, duong_dan) VALUES ?";

            await db.query(sqlAlbum, [albumValues]);
        }

        res.redirect('/admin/managelocations');

    } catch (err) {
        console.log("Lỗi thêm địa điểm:", err);
        res.status(500).send("Lỗi server: " + err.message);
    }
}

//  3. HIỂN THỊ TRANG SỬA (GET) 
exports.getEditLocation = async (req, res) => {
    try {
        const id = req.params.id;

        const [locations] = await db.query("SELECT * FROM dia_diem WHERE ma_dia_diem = ?", [id]);
        const location = locations[0];

        const [album] = await db.query("SELECT * FROM hinh_dia_diem WHERE ma_dia_diem = ?", [id]);

        if (!location) {
            return res.redirect('/admin/managelocations');
        }

        res.render('admin/Manage/Location/EditLocation', {
            title: 'Sửa địa điểm',
            location: location,
            album: album
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Server");
    }
};

//  4. XỬ LÝ CẬP NHẬT (POST) 
    exports.updateLocation = async (req, res) => {
        try {
            const id = req.params.id;
            const { ten_dia_diem, mo_ta, delete_images } = req.body;
            const files = req.files;

            let sqlUpdate = "UPDATE dia_diem SET ten_dia_diem = ?, mota = ? WHERE ma_dia_diem = ?";
            let params = [ten_dia_diem, mo_ta, id];

            if (files['hinh_anh_bia']) {
                const newCover = files['hinh_anh_bia'][0].filename;
                
                sqlUpdate = "UPDATE dia_diem SET ten_dia_diem = ?, mota = ?, hinhdaidien = ? WHERE ma_dia_diem = ?";
                params = [ten_dia_diem, mo_ta, newCover, id];
            }

            // Chạy lệnh update bảng dia_diem
            await db.query(sqlUpdate, params);

            //  Xử lý Xóa ảnh trong Album (Nếu user có tích chọn)
            if (delete_images) {
                // delete_images có thể là 1 string (nếu chọn 1 cái) hoặc array (nếu chọn nhiều)
                // Nếu chọn nhiều thì ép về mảng cho dễ xử lý
                const idsToDelete = Array.isArray(delete_images) ? delete_images : [delete_images];

                if (idsToDelete.length > 0) {
                    await db.query("DELETE FROM hinh_dia_diem WHERE ma_hinh IN (?)", [idsToDelete]);
                }
            }

            //  Thêm ảnh mới vào Album
            if (files['album'] && files['album'].length > 0) {
                const albumValues = files['album'].map(file => [id, file.filename]);
                await db.query("INSERT INTO hinh_dia_diem (ma_dia_diem, duong_dan) VALUES ?", [albumValues]);
            }

            res.redirect('/admin/managelocations');

        } catch (err) {
            console.log("Lỗi update:", err);
            res.status(500).send("Lỗi update: " + err.message);
        }
};

// 5. ĐỔI TRẠNG THÁI ĐỊA ĐIỂM
exports.toggleStatusLocation = async (req, res) => {
    try {
        const id = req.params.id;

        const sqlGetStatus = "SELECT trang_thai FROM dia_diem WHERE ma_dia_diem = ?";
        const [rows] = await db.query(sqlGetStatus, [id]);

        if (rows.length > 0) {
            const currentStatus = rows[0].trang_thai;

            const newStatus = currentStatus === 1 ? 0 : 1;

            const sqlUpdate = "UPDATE dia_diem SET trang_thai = ? WHERE ma_dia_diem = ?";
            await db.query(sqlUpdate, [newStatus, id]);
        }

        res.redirect('/admin/managelocations');

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi server: " + err.message);
    }
};