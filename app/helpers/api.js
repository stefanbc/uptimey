const _ = require('lodash');
const $ = require('jquery');
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
     * @param {Boolean} updateNotice
     * @param {Function} callback
     */
    get(url, updateNotice, callback) {

        let normalizeUrl = this.buildUrl(url);

        $.ajax({
            dataType: "json",
            url: normalizeUrl,
            success: _.bind((data) => {

                this.bindData(data);

                if (updateNotice) {
                    notes.clearAll();
                    toasts.init('success', 'Data has been updated!');
                }

                let listValues = $('ul.list-values');

                if (listValues.hasClass('loading')) {
                    listValues.removeClass('loading');
                }

                if (callback) {
                    callback();
                }

            }, this),
            error: _.bind(() => {

                notes.init('error', 'Failed to update data!');
                toasts.init('error', 'Server is not responding!');

            }, this)
        });

    },

    /**
     * Binds data
     * @param  {Object} data
     */
    bindData(data) {
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
};