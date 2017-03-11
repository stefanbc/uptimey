const $ = require('jquery');
const _ = require('lodash');
const api = require('../helpers/api');
const toasts = require('../helpers/toasts');

/**
 * Controller for the index route
 */
module.exports = {
    /**
     * Init method
     */
    init: function() {
        _.bindAll(this);

        this.gatherData();
    },

    /**
     * Gathers all data from the API
     */
    gatherData() {

        if ( $('body').find('section.layout').attr('id') === 'index' ) {

            setInterval(function () {

                $.getJSON('/api', function (data) {

                    api.bindData(data);
                    toasts.init('success', 'Data has been updated!');

                }).fail(function() {
                    toasts.init('error', 'Server is not responding!');
                });

            }, 1000 * 60);

            $.getJSON('/api/advanced', function (data) {

                api.bindData(data);
                $('#server-info, #network-info').removeClass('loading');

            }).fail(function() {
                toasts.init('error', 'Server is not responding!');
            });

        }

    }
};