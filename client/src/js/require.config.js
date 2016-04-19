requirejs.config({
    baseUrl: 'client/bin',
    paths: {
        jQuery      : '//ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min',
        moment      : '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min',
        weather     : '//cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.1.0/jquery.simpleWeather.min',
        html2canvas : '//cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min',
        noty        : '/client/src/js/jquery.noty.packaged.min',
        app         : 'app.min'
    },
    shim: {
        'moment'    : ['jQuery'],
        'weather'   : ['jQuery'],
        'noty'      : ['jQuery'],
        'app'       : {
            deps    : ['jQuery', 'moment', 'weather', 'html2canvas', 'noty']
        }
    },
    waitSeconds: 5
});