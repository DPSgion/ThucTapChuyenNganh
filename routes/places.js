var express = require('express');
var router = express.Router();

router.get('/places', function(req, res, next) {
    res.render('places');
});

module.exports = router;
