const _ = require('lodash');
const api = require('../helpers/api');
const common = require('../helpers/common');
const actions = require('../helpers/actions');

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
                actions.register({
                    ev: 'copy',
                    selector: '.list-value'
                });
            });

        }
    }
};