/**
 * Required packages
 */
const router = require('express').Router();
const basic = require('../models/basic');

/* GET home page. */
router.get('/', function(req, res, next) {
    basic.getServerLocation((serverLocation) => {
        return res.render('index', {
            layoutId    : 'index',
            initialData : basic.gatherData({
                serverLocation : serverLocation
            })
        });
    }, next);
});

module.exports = router;