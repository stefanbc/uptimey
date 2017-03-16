const $ = require('jquery');
const _ = require('lodash');
const api = require('../helpers/api');
const toasts = require('../helpers/toasts');
const notes = require('../helpers/notes');
const common = require('../helpers/common');

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

                    notes.init('error', 'Failed to update data!');
                    toasts.init('error', 'Server is not responding!');

                });

            }, 1000 * 60);

            $.getJSON('/api/advanced', function (data) {

                api.bindData(data);
                $('#server-info, #network-info').removeClass('loading');

                $('.list-value').find('.copy-action').on('click', function() {
                    let element = $(this).parent().find('.data-value');

                    common.copyToClipboard(element[0], function() {
                        toasts.init('success', 'Value copied to clipboard');
                    });
                });

            }).fail(function() {

                notes.init('error', 'Failed to update data!');
                toasts.init('error', 'Server is not responding!');

            });

        }

    }
};