requirejs.config({
    baseUrl: 'script/',
    paths: {
        jQuery: '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min',
        moment: '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min',
        weather: '//cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.0.2/jquery.simpleWeather.min',
        functions: 'functions.min',
        base: 'base.min'
    },
    shim: {
        'moment': ['jQuery'],
        'weather': ['jQuery'],
        'functions': {
            deps: ['jQuery', 'moment', 'weather']
        },
        'base': {
            deps: ['jQuery', 'functions']
        }
    },
    waitSeconds: 15
});