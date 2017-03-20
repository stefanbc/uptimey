const $ = require('jquery');
const common = require('./common');

module.export = {

    /**
     * Register and event
     * @param {Object} options
     */
    registerEvent(options) {
        switch (options.ev) {
            case 'copy':

                $(options.selector).find('.copy-action').on('click', function() {
                    let element = $(this).parent().find('.data-value');

                    common.copyToClipboard(element[0]);
                });

                break;
        }
    }
};