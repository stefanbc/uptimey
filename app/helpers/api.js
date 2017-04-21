const _ = require('lodash');
const $ = require('jquery');
const utils = require('./utils');
const notes = require('./notes');
const toasts = require('./toasts');

/**
 * Helper for API interaction
 */
module.exports = {

    updateTimeout: 1000 * 60,

    /**
     * Makes an API call using the provided params
     *
     * Available options are:
     * {String} url
     * {Boolean} updates
     * {Function} callback
     *
     * @param {Object} options
     */
    get(options) {

        _.bindAll(this);

        if (options.updates) {

            setInterval(() => {
                this._ajax(options);
            }, this.updateTimeout);

        } else {
            this._ajax(options);
        }

    },

    /**
     * Makes an Ajax call with the passed options
     * @param {Object} options
     */
    _ajax(options) {

        let normalizeUrl = this.buildUrl(options.route);

        $.ajax({
            dataType: "json",
            url: normalizeUrl,
            success: _.bind((data) => {

                this.bindData(data, options.updates);

                if (options.updates) {
                    notes.clearAll();
                    toasts.init('success', 'Data has been updated!');
                }

                $('ul.list-values').removeClass('loading');

                if (options.callback) {
                    return options.callback(data);
                }

            }, this),
            error: _.bind(() => {

                this.bindDataNotes();
                toasts.init('error', 'Server is not responding!');

            }, this)
        });

    },

    /**
     * Binds data to DOM elements
     * @param {Object} data
     * @param {Boolean} updatable
     */
    bindData(data, updatable) {
        // Recursive function to update values
        function updateValues(key, value) {
            if (typeof value !== 'object') {
                let selector = '#' + utils.normalizeString(key);

                if ($(selector).find('span').length === 1) {
                    $(selector).find('span').text(value);
                } else {
                    $(selector).text(value);
                }

                if (updatable) {
                    $(selector).data('data-updatable', true);
                }

            } else {
                $.each(value, _.bind(updateValues, this));
            }
        }

        $.each(data, _.bind(updateValues, this));
    },

    /**
     * Builds an url for API calls
     * @param {String} string
     */
    buildUrl(string) {
        return `/api${string ? '/' + string : ''}`;
    },

    /**
     * Binds notes to all data
     */
    bindDataNotes() {
        let outputBoxes = $('.data-wrapper .output');

        $.each(outputBoxes, function () {
            let updatable = $(this).data('data-updatable'),
                key = $(this).attr('id'),
                selector = $(`#${key}`).parents('.box');

            if (updatable) {
                notes.init('error', 'Failed to update data!', selector);
            }
        });
    }
};