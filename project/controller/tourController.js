const db = require('../config/db');

// Lấy danh sách Tour (JOIN 2 lần để lấy tên Điểm đi và Điểm đến)
exports.getAllTours = async (req, res) => {
    try {
        const sql = `
            SELECT t.*, 
                   d1.ten_dia_diem AS ten_diem_di, 
                   d2.ten_dia_diem AS ten_diem_den
            FROM tour t
            JOIN dia_diem d1 ON t.diem_di = d1.ma_dia_diem
            JOIN dia_diem d2 ON t.diem_den = d2.ma_dia_diem
            ORDER BY t.ma_tour DESC
        `;

        const [tours] = await db.query(sql);

        res.render('admin/Manage/Tour/ManageTour', {
            title: 'Quản lý Tour',
            tours: tours
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Database: " + err.message);
    }
};

// 2. Hiển thị trang Thêm Tour (GET)
exports.getAddTour = async (req, res) => {
    try {
        // Lấy danh sách địa điểm để người dùng chọn
        const [locations] = await db.query("SELECT ma_dia_diem, ten_dia_diem FROM dia_diem ORDER BY ten_dia_diem ASC");

        res.render('admin/Manage/Tour/AddTour', {
            title: 'Thêm Tour mới',
            locations: locations
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Server");
    }
};

// 3. Xử lý Thêm Tour (POST)
exports.addTour = async (req, res) => {
    try {
        const { ten_tour, diem_di, diem_den } = req.body;

        // Validate cơ bản: Điểm đi không được trùng điểm đến
        if (diem_di == diem_den) {
            return res.send("Lỗi: Điểm đi và Điểm đến không được trùng nhau!");
        }

        const sql = "INSERT INTO tour (ten_tour, diem_di, diem_den, trang_thai) VALUES (?, ?, ?, 1)";
        await db.query(sql, [ten_tour, diem_di, diem_den]);

        res.redirect('/admin/managetour');

    } catch (err) {
        console.log("Lỗi thêm tour:", err);
        res.status(500).send("Lỗi: " + err.message);
    }
};

// 4. HIỂN THỊ TRANG SỬA TOUR (GET)
exports.getEditTour = async (req, res) => {
    try {
        const id = req.params.id;

        // Query 1: Lấy thông tin Tour hiện tại
        const [tours] = await db.query("SELECT * FROM tour WHERE ma_tour = ?", [id]);
        const tour = tours[0];

        // Query 2: Lấy danh sách địa điểm (để đổ vào dropdown)
        const [locations] = await db.query("SELECT ma_dia_diem, ten_dia_diem FROM dia_diem ORDER BY ten_dia_diem ASC");

        if (!tour) {
            return res.redirect('/admin/managetour');
        }

        res.render('admin/Manage/Tour/EditTour', {
            title: 'Sửa thông tin Tour',
            tour: tour,
            locations: locations
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Server");
    }
};

// 5. XỬ LÝ CẬP NHẬT TOUR (POST)
exports.updateTour = async (req, res) => {
    try {
        const id = req.params.id;
        const { ten_tour, diem_di, diem_den } = req.body;

        // Validate: Điểm đi không được trùng điểm đến
        if (diem_di == diem_den) {
            return res.send("Lỗi: Điểm đi và Điểm đến không được trùng nhau!");
        }

        const sql = "UPDATE tour SET ten_tour = ?, diem_di = ?, diem_den = ? WHERE ma_tour = ?";
        await db.query(sql, [ten_tour, diem_di, diem_den, id]);

        res.redirect('/admin/managetour');

    } catch (err) {
        console.log("Lỗi update tour:", err);
        res.status(500).send("Lỗi: " + err.message);
    }
};

exports.toggleStatusTour = async (req, res) => {
    try {
        const id = req.params.id;

        const sqlGet = "SELECT trang_thai FROM tour WHERE ma_tour = ?";
        const [rows] = await db.query(sqlGet, [id]);

        if (rows.length > 0) {
            const currentStatus = rows[0].trang_thai;
            const newStatus = currentStatus === 1 ? 0 : 1;

            await db.query("UPDATE tour SET trang_thai = ? WHERE ma_tour = ?", [newStatus, id]);
        }

        res.redirect('/admin/managetour');
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi: " + err.message);
    }
};