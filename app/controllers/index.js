const _ = require('lodash');
const api = require('../helpers/api');
const common = require('../helpers/common');

/**
 * Controller for the index route
 */
module.exports = {

    updateTimeout: 1000 * 60,

    /**
     * Init method
     */
    init: function() {
        _.bindAll(this);

        if ( common.getCurrentLayout() === 'index' ) {

            setInterval(function () {

                api.get('basic', true);

            }, this.updateTimeout);

            api.get('advanced', false);

        }
    }
};