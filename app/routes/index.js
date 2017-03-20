/**
 * Required packages
 */
const router = require('express').Router();
const basic = require('../models/basic');
const octicons = require("octicons");

/* GET home page. */
router.get('/', function(req, res, next) {
    basic.getServerLocation((serverLocation) => {
        return res.render('index', {
            layoutId    : 'index',
            initialData : basic.gatherData({
                serverLocation : serverLocation
            }),
            octicons    : octicons
        });
    }, next);
});

module.exports = router;