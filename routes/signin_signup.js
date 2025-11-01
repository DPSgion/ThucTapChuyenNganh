var express = require('express');
var router = express.Router();

router.get('/signin_signout', function(req, res, next) {
    res.render('signin_signout', { title: 'Du lịch miền Nam'});
});

module.exports = router;
