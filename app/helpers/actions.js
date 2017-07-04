const $ = require('jquery');
const toasts = require('./toasts');
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
        this[options.ev](options.selector);
    },

    /**
     * Copy action
     * @param {String} selector
     */
    copy(selector) {
        let actionIcon = $(selector).find('.copy-action');

        common.insertIcon(selector, 'copy', 'clippy');

        actionIcon.on('click', (ev) => {
            let element = $(ev.currentTarget).parent().find('.output');

            this.copyToClipboard(element[0]);
        });
    },

    /**
     * Copies an elements text to clipboard
     * @param {Object} element
     */
    copyToClipboard(element) {
        let text = element,
            selection = window.getSelection(),
            range = document.createRange();

        range.selectNodeContents(text);
        selection.removeAllRanges().addRange(range);

        document.execCommand('copy');

        toasts.init('success', 'Value copied to clipboard');

        selection.removeAllRanges();
    },
};