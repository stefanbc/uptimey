const $ = require('jquery');
const _ = require('lodash');
const common = require('./common');
const notes = require('./notes');
const toasts = require('./toasts');

/**
 * Helper for API interaction
 */
module.exports = {

    /**
     * Makes an API call using the provided params
     * @param {String} url
     * @param {Boolean} notice
     * @param {Function} callback
     */
    get(url, notice) {

        let normalizeUrl = this.buildUrl(url);

        $.getJSON(normalizeUrl, _.bind(function (data) {

            this.bindData(data);

            if (notice) {
                toasts.init('success', 'Data has been updated!');
            }

            $('ul.list-values').removeClass('loading');

            $('.list-value').find('.copy-action').on('click', function() {
                let element = $(this).parent().find('.data-value');

                common.copyToClipboard(element[0], function() {
                    toasts.init('success', 'Value copied to clipboard');
                });
            });

        }, this)).fail(function() {

            notes.init('error', 'Failed to update data!');
            toasts.init('error', 'Server is not responding!');

        });

    },

    /**
     * Binds data
     * @param  {Object} data
     */
    bindData: function(data) {
        $.each(data, _.bind(updateValues, this));

        // Recursive function to update values
        function updateValues(key, value) {
            if (typeof value !== 'object') {
                let selector = '#' + common.normalizeString(key);

                if($(selector).find('span').length === 1) {
                    $(selector).find('span').text(value);
                } else {
                    $(selector).text(value);
                }

                notes.clearAll();

            } else {
                $.each(value, _.bind(updateValues, this));
            }
        }
    },

    /**
     * Builds an url for API calls
     * @param {String} string
     */
    buildUrl(string) {
        return `/api${string ? '/' + string : ''}`;
    }

    /**
     * Binds the data to each box
     * @param {Object} data
     * @param {Array} dataBoxes
     */
    // bindDataBoxes(data, dataBoxes) {
    //     $.each(data, function(key, value) {
    //         let normalizeKey = common.normalizeString(key);

    //         if(_.isEmpty(value)) {

    //         }

    //         console.log(data);
    //         console.log(dataBoxes);
    //     });
    // }
};