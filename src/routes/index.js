/**
 * Required packages
 */
const basic = require('../models/basic');

const router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    basic.getLocation((location) => {

        return res.render('pages/index/index', {
            layoutId : 'index',
            data     : basic.gatherData({
                location
            })
        });

    }, next);

});

module.exports = router;