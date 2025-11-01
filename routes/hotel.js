var express = require('express');
var router = express.Router();

router.get('/hotel', function(req, res, next) {
    res.render('hotel');
});

module.exports = router;
