const _ = require('lodash');
const $ = require('jquery');
const moment = require('moment');
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

                this.requestTimer();
                this.bindDataNotes();

                toasts.init('error', 'Server is not responding!');

            }, this)
        });

    },

    /**
     * Binds data to DOM elements
     * @param {Object} data
     * @param {Boolean} updates
     */
    bindData(data, updates) {
        // Recursive function to update values
        function updateValues(key, value) {
            if (typeof value !== 'object') {
                let selector = '#' + utils.normalizeString(key);

                if ($(selector).find('span').length === 1) {
                    $(selector).find('span').text(value);
                } else {
                    $(selector).text(value);
                }

                if (updates) {
                    $(selector).data('data-updates', true);
                }

            } else {
                $.each(value, _.bind(updateValues, this));
            }
        }

        $.each(data, _.bind(updateValues, this));
    },

    /**
     * Binds notes to all data
     */
    bindDataNotes() {
        let outputBoxes = $('.data-wrapper .output');

        $.each(outputBoxes, function () {
            let updates = $(this).data('data-updates'),
                key = $(this).attr('id'),
                selector = $(`#${key}`).parents('.box');

            if (updates) {
                notes.init('error', 'Failed to update data!', selector);
            }
        });
    },

    /**
     * Builds an url for API calls
     * @param {String} string
     */
    buildUrl(string) {
        return `/api${string ? '/' + string : ''}`;
    },

    /**
     * Request timer when connection to server is down
     */
    requestTimer() {
        let interval = 1000,
            duration = moment.duration(this.updateTimeout * 1000, 'milliseconds'),
            counter = setInterval(() => {

                duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');

                let output = moment(duration.asMilliseconds()).format('ss');

                $('.request-timer-wrapper').removeClass('hide');
                $('.request-timer').text(output);

                if (output === '00') {
                    clearInterval(counter);
                    $('.request-timer-wrapper').addClass('hide');
                }

            }, interval);
    }
};