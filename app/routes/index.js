/**
 * Required packages
 */
const router = require('express').Router();
const basic = require('../models/basic');

/* GET home page. */
router.get('/', function (req, res, next) {

    basic.getLocation((location) => {

        return res.render('index', {
            layoutId : 'index',
            data     : basic.gatherData({
                location
            })
        });

    }, next);

});

module.exports = router;