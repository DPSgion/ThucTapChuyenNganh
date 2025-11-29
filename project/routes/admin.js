var express = require('express');
var router = express.Router();
const upload = require('../middleware/multer');
const {addTour} = require('../controller/tourController');

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
router.get('/managetour', function(req, res, next) {
    res.render('admin/Manage/ManageTour',
        {
            title: 'Manage Tour Page'
        });
});
router.get('/addtour', function(req, res, next) {
    res.render('admin/Manage/AddTour',
        {
            title: 'Add Tour Page'
        });
});


// Tạo tour
router.post('/addtour', upload.single('hinhdaidien'), addTour);

module.exports = router;
