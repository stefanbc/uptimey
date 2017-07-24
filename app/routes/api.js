/**
 * Required packages
 */
const basic = require('../models/basic');
const advanced = require('../models/advanced');

const router = require('express').Router();

/* GET api endpoint. */
router.get('/basic', function (req, res, next) {

    if (req.xhr) {
        res.json(basic.gatherData());
    } else {
        return next(new Error("Permission denied"));
    }

});

/* GET advanced api endpoint. */
router.get('/advanced', function (req, res, next) {

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
        return next(new Error("Permission denied"));
    }

});

module.exports = router;
