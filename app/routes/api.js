/**
 * Required packages
 */
const router = require('express').Router();
const basic = require('../models/basic');
const advanced = require('../models/advanced');

/* GET api endpoint. */
router.get('/basic', function(req, res, next) {

    if (req.xhr) {
        res.json(basic.gatherData());
    } else {
        next(new Error("Permission denied"));
    }

});

/* GET advanced api endpoint. */
router.get('/advanced', function(req, res, next) {

    if (req.xhr) {

        advanced.getIpObject((ipObject) => {

            return res.json(
                advanced.gatherAdvancedData({
                    localIp  : ipObject.localIp,
                    publicIp : ipObject.publicIp
                })
            );

        }, next);

    } else {
        next(new Error("Permission denied"));
    }

});

module.exports = router;
