requirejs.config({
    baseUrl: './js',
    paths: {
        jQuery      : '//ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min',
        svg         : '//cdnjs.cloudflare.com/ajax/libs/svg.js/2.3.2/svg.min',
        moment      : '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min',
        weather     : '//cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.1.0/jquery.simpleWeather.min',
        html2canvas : '//cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min',
        app         : 'app.min'
    },
    shim: {
        'moment'    : {
            deps    : ['jQuery'],
            exports : 'moment'
        },
        'weather'   : ['jQuery'],
        'app'       : {
            deps    : ['jQuery', 'svg', 'moment', 'weather', 'html2canvas']
        }
    }
});