import { ApiProvider } from '../../providers/api';
import { UtilsProvider } from '../../providers/utils';
import { ActionsProvider } from '../../providers/actions';

export class IndexPage {

    constructor(private api?: ApiProvider, private utils?: UtilsProvider, private actions?: ActionsProvider) {

        if (utils.isCurrentLayout('index')) {

            api.get({
                route   : 'basic',
                updates : true,
                callback(data) {
                    let days = `${data.uptime.days} days`,
                        hours = `${data.uptime.hours} hours`,
                        minutes = `${data.uptime.minutes} minutes`;

                    document.title = `uptimey - ${days} ${hours} ${minutes}`;
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