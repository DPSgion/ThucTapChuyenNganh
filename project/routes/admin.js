var express = require('express');
var router = express.Router();
const upload = require('../middleware/multer');
const {update_password} = require('../controller/authController');
const { addLocation, getAllLocations, getEditLocation, updateLocation, toggleStatusLocation } = require('../controller/locationController');
const {
    getAllVehicles,
    addVehicle,
    getEditVehicle,
    updateVehicle,
    toggleMaintenanceVehicle
} = require('../controller/vehicleController');
const {
    getAllHotels, getAddHotel, addHotel,
    getEditHotel, updateHotel,
    toggleStatusHotel
} = require('../controller/hotelController');

const {
    getAllTours, toggleStatusTour,
    getAddTour, addTour,
    getEditTour, updateTour
} = require('../controller/tourController');

const {
    getAllSchedules, toggleStatusSchedule,
    getAddSchedule, addSchedule,
    getResourcesByLocation,
    getAvailableVehicles
} = require('../controller/scheduleController');



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






router.get('/managetour', getAllTours);

router.get('/addtour', getAddTour);
router.post('/addtour', upload.none(), addTour); // upload.none() nếu không up file

router.get('/edittour/:id', getEditTour);
router.post('/edittour/:id', updateTour);

// Thay đổi trạng thái
router.get('/tour/toggle-status/:id', toggleStatusTour);


// UPDATE PASSWORD
router.get('/update_password', function(req, res, next) {
    res.render('admin/update_password',
        {
            title: 'Đổi mật khẩu'
        })
})
router.post('/update_password', update_password);


// LOCATION
router.get('/managelocations', getAllLocations);

router.get('/addlocation', function(req, res, next) {
    res.render('admin/Manage/Location/AddLocation',{
        title: 'Thêm địa điểm'
    })
})
router.post('/addlocation', upload.fields([
    { name: 'hinh_anh_bia', maxCount: 1 }, // Chỉ cho phép 1 ảnh bìa
    { name: 'album', maxCount: 10 }        // Cho phép tối đa 10 ảnh album
]), addLocation);

router.get('/editlocation/:id', getEditLocation);
router.post('/editlocation/:id', upload.fields([
    { name: 'hinh_anh_bia', maxCount: 1 },
    { name: 'album', maxCount: 10 }
]), updateLocation);

router.get('/toggle-status/:id', toggleStatusLocation);



// VEHICLE
router.get('/managevehicle', getAllVehicles);

router.get('/addvehicle', function(req, res) {
    res.render('admin/Manage/Vehicle/AddVehicle', {
        title: 'Thêm phương tiện'
    });
});
router.post('/addvehicle', upload.fields([
    { name: 'hinh_anh_bia', maxCount: 1 },
    { name: 'album', maxCount: 10 }
]), addVehicle);

router.get('/editvehicle/:id', getEditVehicle);
router.post('/editvehicle/:id', upload.fields([
    { name: 'hinh_anh_bia', maxCount: 1 },
    { name: 'album', maxCount: 10 }
]), updateVehicle);

router.get('/vehicle/toggle-maintenance/:id', toggleMaintenanceVehicle);



// HOTEL
router.get('/managehotel', getAllHotels);
router.get('/addhotel', getAddHotel);

router.post('/addhotel', upload.fields([
    { name: 'anh_bia', maxCount: 1 },
    { name: 'album', maxCount: 10 }
]), addHotel);

router.get('/edithotel/:id', getEditHotel);
router.post('/edithotel/:id', upload.fields([
    { name: 'anh_bia', maxCount: 1 },
    { name: 'album', maxCount: 10 }
]), updateHotel);

// Thay đổi trạng thái Khách sạn
router.get('/hotel/toggle-status/:id', toggleStatusHotel);



// SCHEDULE
router.get('/manageschedule', getAllSchedules);
router.get('/schedule/toggle-status/:id', toggleStatusSchedule);

// Route API lấy dữ liệu theo địa điểm (AJAX gọi vào đây)
router.get('/api/get-resources', getResourcesByLocation);

router.get('/addschedule', getAddSchedule);
router.post('/addschedule', addSchedule);

// API lấy xe rảnh
router.get('/api/get-available-vehicles', getAvailableVehicles);





router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/');
    });
});


module.exports = router;
