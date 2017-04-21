const _ = require('lodash');
const api = require('../helpers/api');
const utils = require('../helpers/utils');
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

        if ( utils.getCurrentLayout() === 'index' ) {

            setInterval(() => {

                api.get('basic', true, true, (data) => {
                    let days = `${data.uptime.days} days`,
                        hours = `${data.uptime.hours} hours`,
                        minutes = `${data.uptime.minutes} minutes`;

                    common.updateTitle(`uptimey - ${days} ${hours} ${minutes}`);
                });

            }, this.updateTimeout);

            api.get('advanced', false, false, () => {
                actions.register({
                    ev: 'copy',
                    selector: '.list-value'
                });
            });

        }
    }
};