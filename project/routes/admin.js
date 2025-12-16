var express = require('express');
var router = express.Router();
const upload = require('../middleware/multer');
const {addTour, getAllTours} = require('../controller/tourController');
const {update_password} = require('../controller/authController');


router.all('/*', function(req, res, next) {
    res.app.locals.layout='admin';
    next();
})

router.get('/', function(req, res, next) {
    res.render('admin/index',
        {
            title: 'Admin Page'
        });
});
router.get('/tables', function(req, res, next) {
    res.render('admin/tables',
        {
            title: 'Table Page'
        });
});
// Lấy danh sách tour
router.get('/managetour', getAllTours);

router.get('/addtour', function(req, res, next) {
    res.render('admin/Manage/AddTour',
        {
            title: 'Add Tour Page'
        });
});

router.get('/update_password', function(req, res, next) {
    res.render('admin/update_password',
        {
            title: 'Đổi mật khẩu'
        })
})
router.post('/update_password', update_password);

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/');
    });
});


// Tạo tour
router.post('/addtour', upload.single('hinhdaidien'), addTour);

// Lấy danh sách tour
router.get('/managetour', getAllTours);

module.exports = router;
