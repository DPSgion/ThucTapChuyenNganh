var express = require('express');
var router = express.Router();
const upload = require('../middleware/multer');
const {addTour, getAllTours} = require('../controller/tourController');


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


// Tạo tour
router.post('/addtour', upload.single('hinhdaidien'), addTour);

// Lấy danh sách tour
router.get('/managetour', getAllTours);

module.exports = router;
