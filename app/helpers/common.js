const $ = require('jquery');
const toasts = require('./toasts');

/**
 * Common helper with different methods
 */
module.exports = {
    /**
     * Normalizes a string
     * @param  {String} string
     */
    normalizeString(string) {
        return string.split(/(?=[A-Z])/).join('-').toLowerCase();
    },

    /**
     * Copys element text to clipboard
     * @param {Object} element
     */
    copyToClipboard(element) {
        let text = element,
            selection = window.getSelection(),
            range = document.createRange();

        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');

        toasts.init('success', 'Value copied to clipboard');

        selection.removeAllRanges();
    },

    /**
     * Retrives the current layout
     */
    getCurrentLayout() {
        return $('body').find('section.layout').attr('id');
    }
};