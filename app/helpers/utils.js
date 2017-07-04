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
     * Checks the current layout
     */
    isCurrentLayout(layout) {
        return $('body').find('section.layout').attr('id') === layout;
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