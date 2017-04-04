const _ = require('lodash');
const $ = require('jquery');
const common = require('./common');

/**
 * Register actions
 */
module.exports = {
    /**
     * Register an action
     * @param {Object} options
     */
    register(options) {
        _.bindAll(this);

        this[options.ev](options.selector);
    },

    /**
     * Copy action
     * @param {String} selector
     */
    copy(selector) {
        $(selector).find('.copy-action').on('click', function () {
            let element = $(this).parent().find('.output');

            common.copyToClipboard(element[0]);
        });
    }
};