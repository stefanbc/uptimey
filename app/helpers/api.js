const $ = require('jquery');
const _ = require('lodash');
const common = require('./common');

module.exports = {

    /**
     * Binds data
     * @param  {Object} data
     */
    bindData: function(data) {
        $.each(data, _.bind(updateValues, this));

        // Recursive function to update values
        function updateValues(key, value) {
            if (typeof value !== 'object') {
                var selector = '#' + common.normalizeString(key);

                if($(selector).find('span').length === 1) {
                    $(selector).find('span').text(value);
                } else {
                    $(selector).text(value);
                }
            } else {
                $.each(value, _.bind(updateValues, this));
            }
        }
    }
};