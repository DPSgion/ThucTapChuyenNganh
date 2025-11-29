
const multer = require('multer');
const {engine} = require("express-handlebars");
const path = require("path"); // Để lưu được hình
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // thư mục lưu hình
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // tránh trùng tên
    }
});

const upload = multer({ storage: storage });

module.exports = upload;