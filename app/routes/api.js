/**
 * Required packages
 */
const router = require('express').Router();
const abstract = require('../models/abstract');

/* GET api page. */
router.get('/', function(req, res) {
    res.json(abstract.gatherData());
});

router.get('/advanced', function(req, res, next) {
    abstract.getIpObject((ipObject) => {
        return res.json(
            abstract.gatherAdvancedData({
                serverLocalIp  : ipObject.localIp,
                serverPublicIp : ipObject.publicIp
            })
        );
    }, next);
});

module.exports = router;
