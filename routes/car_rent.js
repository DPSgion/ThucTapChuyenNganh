var express = require('express');
var router = express.Router();

router.get('/car_rent', function(req, res, next) {
    res.render('car_rent', { title: 'Du lịch miền Nam'});
});

module.exports = router;
