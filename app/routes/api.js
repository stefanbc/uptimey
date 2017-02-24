/**
 * Required packages
 */
const router = require('express').Router();
const abstract = require('../models/abstract');

/* GET api page. */
router.get('/', function(req, res) {
    res.json(abstract.gatherData());
});

module.exports = router;
