const db = require('../config/db');

// 1. Lấy danh sách lịch trình
exports.getAllSchedules = async (req, res) => {
    try {
        const sql = `
            SELECT lt.*, 
                   t.ten_tour, 
                   pt.ten_phuong_tien, pt.bien_so, pt.so_cho, 
                   ks.ten_khach_san
            FROM lich_trinh_tour lt
            JOIN tour t ON lt.ma_tour = t.ma_tour
            JOIN phuong_tien pt ON lt.ma_phuong_tien = pt.ma_phuong_tien
            JOIN khach_san ks ON lt.ma_khach_san = ks.ma_khach_san
            ORDER BY lt.ngay_di DESC
        `;

        const [schedules] = await db.query(sql);

        res.render('admin/Manage/Schedule/ManageSchedule', {
            title: 'Quản lý lịch trình',
            schedules: schedules
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Database: " + err.message);
    }
};

// 2. Đổi trạng thái (0 <-> 1)
exports.toggleStatusSchedule = async (req, res) => {
    try {
        const id = req.params.id;

        // Lấy trạng thái cũ
        const [rows] = await db.query("SELECT trang_thai FROM lich_trinh_tour WHERE ma_lich_trinh = ?", [id]);

        if (rows.length > 0) {
            const currentStatus = rows[0].trang_thai;
            const newStatus = currentStatus === 1 ? 0 : 1;

            // Cập nhật
            await db.query("UPDATE lich_trinh_tour SET trang_thai = ? WHERE ma_lich_trinh = ?", [newStatus, id]);
        }

        res.redirect('/admin/manageschedule');
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi: " + err.message);
    }
};

// 3. HIỂN THỊ FORM THÊM LỊCH TRÌNH (GET)
exports.getAddSchedule = async (req, res) => {
    try {
        const [locations] = await db.query("SELECT ma_dia_diem, ten_dia_diem FROM dia_diem WHERE trang_thai = 1");

        // Không load xe ở đây nữa, vì xe phụ thuộc vào ngày chọn
        res.render('admin/Manage/Schedule/AddSchedule', {
            title: 'Thêm Lịch Trình',
            locations: locations
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Server");
    }
};

// 4. XỬ LÝ THÊM LỊCH TRÌNH (POST)
exports.addSchedule = async (req, res) => {
    try {
        const { ma_tour, ma_phuong_tien, ma_khach_san, ngay_di, ngay_ve, gia_nguoi_lon, gia_tre_em } = req.body;

        // Validate cơ bản: Ngày về phải sau ngày đi
        if (new Date(ngay_ve) <= new Date(ngay_di)) {
            return res.send("Lỗi: Ngày về phải sau Ngày đi!");
        }

        const sql = `
            INSERT INTO lich_trinh_tour 
            (ma_tour, ma_phuong_tien, ma_khach_san, ngay_di, ngay_ve, gia_nguoi_lon, gia_tre_em, so_cho_da_dat, trang_thai) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 0, 1)
        `;

        await db.query(sql, [ma_tour, ma_phuong_tien, ma_khach_san, ngay_di, ngay_ve, gia_nguoi_lon, gia_tre_em]);

        res.redirect('/admin/manageschedule');

    } catch (err) {
        console.log("Lỗi thêm lịch trình:", err);
        res.status(500).send("Lỗi: " + err.message);
    }
};

// 5. API: Lấy Tour và Khách sạn theo Địa điểm (Dùng cho AJAX)
exports.getResourcesByLocation = async (req, res) => {
    try {
        const locationId = req.query.locationId; // Lấy ID địa điểm từ URL

        if (!locationId) {
            return res.json({ tours: [], hotels: [] });
        }

        // Query 1: Lấy Tour có điểm đến là locationId
        const [tours] = await db.query("SELECT ma_tour, ten_tour FROM tour WHERE diem_den = ? AND trang_thai = 1", [locationId]);

        // Query 2: Lấy Khách sạn thuộc locationId
        const [hotels] = await db.query("SELECT ma_khach_san, ten_khach_san FROM khach_san WHERE ma_dia_diem = ? AND trang_thai = 1", [locationId]);

        // Trả về JSON
        res.json({
            tours: tours,
            hotels: hotels
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// 6. API: Lấy danh sách xe RẢNH trong khoảng thời gian (Bỏ qua giờ phút)
exports.getAvailableVehicles = async (req, res) => {
    try {
        const { ngay_di, ngay_ve } = req.query;

        if (!ngay_di || !ngay_ve) {
            return res.json([]);
        }

        // Logic: Tìm những xe ĐANG BẬN (có lịch trình trùng hoặc dính líu đến ngày này)
        // Lưu ý: DATE() dùng để chỉ lấy phần ngày tháng năm, bỏ qua giờ phút
        const sqlBusyVehicles = `
            SELECT DISTINCT ma_phuong_tien 
            FROM lich_trinh_tour 
            WHERE trang_thai = 1 -- Lịch trình đang hoạt động
            AND (
                DATE(ngay_di) <= DATE(?) AND DATE(ngay_ve) >= DATE(?)
            )
        `;

        // Lấy danh sách xe bận ra trước
        const [busyRows] = await db.query(sqlBusyVehicles, [ngay_ve, ngay_di]);
        const busyIds = busyRows.map(row => row.ma_phuong_tien);

        // Tạo câu query lấy xe rảnh
        let sqlGetFree = "SELECT ma_phuong_tien, ten_phuong_tien, bien_so, so_cho FROM phuong_tien WHERE trang_thai != 2"; // Không lấy xe đang bảo trì

        // Nếu có xe bận thì loại trừ nó ra (NOT IN)
        if (busyIds.length > 0) {
            sqlGetFree += ` AND ma_phuong_tien NOT IN (${busyIds.join(',')})`;
        }

        const [availableVehicles] = await db.query(sqlGetFree);

        res.json(availableVehicles);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};