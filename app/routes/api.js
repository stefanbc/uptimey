/**
 * Required packages
 */
const router = require('express').Router();
const abstract = require('../models/abstract');
const advanced = require('../models/advanced');

/* GET api page. */
router.get('/', function(req, res) {
    res.json(abstract.gatherData());
});

router.get('/advanced', function(req, res, next) {
    advanced.getIpObject((ipObject) => {
        return res.json(
            advanced.gatherAdvancedData({
                serverLocalIp  : ipObject.localIp,
                serverPublicIp : ipObject.publicIp
            })
        );
    }, next);
});

module.exports = router;
