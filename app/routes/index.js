/**
 * Required packages
 */
const router = require('express').Router();
const abstract = require('../models/abstract');

/* GET home page. */
router.get('/', function(req, res, next) {
    abstract.getServerLocation((serverLocation) => {
        return res.render('index', {
            layoutId    : 'index',
            initialData : abstract.gatherData({
                serverLocation : serverLocation
            })
        });
    }, next);
});

module.exports = router;