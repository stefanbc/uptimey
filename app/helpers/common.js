const $ = require('jquery');
const toasts = require('./toasts');

/**
 * Common helpers
 */
module.exports = {
    /**
     * Copies an elements text to clipboard
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
     * Sets a new title
     * @param {String} text
     */
    updateTitle(text) {
        let title = $('title');

        title.text(text);
    },
};