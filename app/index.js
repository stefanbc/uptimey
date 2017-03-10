// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();

// ROUTES
// =============================================================================
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

// VIEWS
// =============================================================================
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

// MISC
// =============================================================================
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(cookieParser());

let limiter = new RateLimit({
    windowMs: 1*60*1000, // 1 minute
    max: 50, // limit each IP to 50 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
app.use(limiter);
app.use(helmet({
    noCache: false
}));

// STATIC FILES
// =============================================================================
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/vendor', express.static(path.join(__dirname, '../bower_components')));

// LOCALS
// =============================================================================
app.locals.livereload = true;

// ERROR HANDLER
// =============================================================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        layoutId : 'error'
    });
});

module.exports = app;
