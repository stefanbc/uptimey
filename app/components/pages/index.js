import $ from 'jquery';
import api from '../../helpers/api';
import utils from '../../helpers/utils';
import actions from '../../helpers/actions';

/**
 * Controller for the index route
 */
module.exports = {
    /**
     * Init method
     */
    init() {
        if (utils.isCurrentLayout('index')) {

            api.get({
                route   : 'basic',
                updates : true,
                callback(data) {
                    let days = `${data.uptime.days} days`,
                        hours = `${data.uptime.hours} hours`,
                        minutes = `${data.uptime.minutes} minutes`;

                    $('title').text(`uptimey - ${days} ${hours} ${minutes}`);
                }
            });

            api.get({
                route   : 'advanced',
                updates : false,
                callback() {
                    actions.register({
                        ev: 'copy',
                        selector: '.list-value'
                    });
                }
            });

        }
    }
};