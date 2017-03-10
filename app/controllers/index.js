const $ = require('jquery');
const _ = require('lodash');
const basic = require('../helpers/basic');

var $document = $(document);

var indexController = {

    /**
     * Init method
     */
    init: function() {
        _.bindAll(this);
    },

    /**
     * Parses data
     * @param  {Object} data
     */
    parseData: function(data) {
        $.each(data, _.bind(updateValues, this));

        // Recursive function to update values
        function updateValues(key, value) {
            if (typeof value !== 'object') {
                var selector = '#' + basic.normalizeString(key);

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

$document.ready(function () {

    if ( $('body').find('section.layout').attr('id') === 'index' ) {

        indexController.init();
        window.indexController = indexController;

        setInterval(function () {
            $.getJSON('/api', function (data) {
                indexController.parseData(data);
            }).fail(function() {
            });
        }, 1000 * 60);

        $.getJSON('/api/advanced', function (data) {
            indexController.parseData(data);
            $('#server-info, #network-info').removeClass('loading');
        }).fail(function() {
        });

    }

});