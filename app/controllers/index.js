const _ = require('lodash');
const api = require('../helpers/api');
const common = require('../helpers/common');
const events = require('../helpers/events');

/**
 * Controller for the index route
 */
module.exports = {

    updateTimeout: 1000 * 60,

    /**
     * Init method
     */
    init() {
        _.bindAll(this);

        if ( common.getCurrentLayout() === 'index' ) {

            setInterval(() => {

                api.get('basic', true);

            }, this.updateTimeout);

            api.get('advanced', false, () => {
                events.registerEvent({
                    ev: 'click',
                    selector: '.list-value'
                });
            });

        }
    }
};