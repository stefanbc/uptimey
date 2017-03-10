/**
 * Required packages
 */
const router = require('express').Router();
const abstract = require('../models/abstract');
const advanced = require('../models/advanced');

/* GET api endpoint. */
router.get('/', function(req, res, next) {
    if (req.xhr) {
        res.json(abstract.gatherData());
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
                    serverLocalIp  : ipObject.localIp,
                    serverPublicIp : ipObject.publicIp
                })
            );
        }, next);
    } else {
        next(new Error("Permission denied"));
    }
});

module.exports = router;
