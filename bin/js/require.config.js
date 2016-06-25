requirejs.config({
    baseUrl: './js',
    paths: {
        jQuery      : '//ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min',
        raphael     : '//cdnjs.cloudflare.com/ajax/libs/raphael/2.2.0/raphael.min',
        moment      : '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min',
        weather     : '//cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.1.0/jquery.simpleWeather.min',
        html2canvas : '//cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min',
        app         : 'app.min'
    },
    shim: {
        'raphael'   : {
            exports : 'Raphael'
        },
        'moment'    : {
            exports : 'moment',
            deps    : ['jQuery']
        },
        'weather'   : ['jQuery'],
        'app'       : {
            deps    : ['jQuery', 'raphael', 'moment', 'weather', 'html2canvas']
        }
    }
});