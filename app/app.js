import $ from 'jquery';
import index from './controllers/index';

// The only thing that should be in a DOMReady
$(function () {
    index.init();
});