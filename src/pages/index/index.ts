import { ApiProvider } from '../../providers/api';
import { UtilsProvider } from '../../providers/utils';
import { ActionsProvider } from '../../providers/actions';

/**
 * Controller for the index route
 */
export class IndexPage {

    /**
     * Init method
     */
    constructor(public api: ApiProvider, public utils: UtilsProvider, public actions: ActionsProvider) {

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