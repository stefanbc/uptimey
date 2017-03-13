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
    copyToClipboard(element, callback) {
        let text = element,
            selection = window.getSelection(),
            range = document.createRange();

        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');

        if (callback) {
            callback();
        }
    }
};