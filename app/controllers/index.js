const $ = require('jquery');
const _ = require('lodash');
const api = require('../helpers/api');

var $document = $(document);

var indexController = {

    /**
     * Init method
     */
    init: function() {
        _.bindAll(this);
    }
};

$document.ready(function () {

    if ( $('body').find('section.layout').attr('id') === 'index' ) {

        indexController.init();
        window.indexController = indexController;

        setInterval(function () {
            $.getJSON('/api', function (data) {
                api.bindData(data);
            }).fail(function() {
            });
        }, 1000 * 60);

        $.getJSON('/api/advanced', function (data) {
            api.bindData(data);
            $('#server-info, #network-info').removeClass('loading');
        }).fail(function() {
        });

    }

});