// db.js
const mysql = require('mysql2/promise');

// Tạo pool kết nối
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',       // user MySQL của bạn
    password: '', // password
    database: 'quanlytour',   // database muốn kết nối
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
