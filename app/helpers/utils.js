const $ = require('jquery');

/**
 * Utils helpers with different methods
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
     * Retrives the current layout
     */
    getCurrentLayout() {
        return $('body').find('section.layout').attr('id');
    },

    /**
     * Adds leading zero to
     * @param {String} number
     */
    pad(number) {
        if (number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }
};