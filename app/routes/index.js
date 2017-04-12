/**
 * Required packages
 */
const router = require('express').Router();
const basic = require('../models/basic');
const octicons = require("octicons");

/* GET home page. */
router.get('/', function (req, res, next) {

    basic.getLocation((location) => {

        return res.render('index', {
            title    : 'uptimey - simple uptime monitor',
            layoutId : 'index',
            data     : basic.gatherData({
                location
            }),
            octicons
        });

    }, next);

});

module.exports = router;