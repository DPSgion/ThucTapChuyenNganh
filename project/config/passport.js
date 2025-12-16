const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const pool = require('./db');

module.exports = function(passport) {
    // Cấu hình Passport Strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async function (email, password, done) {
        try {
            const sql = 'SELECT * FROM user WHERE email = ?';
            const [rows] = await pool.query(sql, [email]);
            if (rows.length === 0) {
                return done(null, false, { message: 'Email không tồn tại' });
            }
            const user = rows[0];
            const isMatch = await bcryptjs.compare(password, user.password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Mật khẩu không đúng' });
            }
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.userid);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const [rows] = await pool.query('SELECT * FROM user WHERE userid = ?', [id]);
            if (rows.length > 0) {
                done(null, rows[0]);
            } else {
                done(null, false);
            }
        } catch (err) {
            done(err);
        }
    });
};