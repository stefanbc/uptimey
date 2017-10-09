import $ from 'jquery';
import index from './components/pages/index';

// The only thing that should be in a DOMReady
$(function () {
    index.init();
});