const $ = require('jquery');
const index = require('./controllers/index');

// The only thing that should be in a DOMReady
$(function () {
    index.init();
});