/**
 * Required packages
 */
const osUptime = require('os-uptime')();
const moment = require('moment');
const publicIp = require('public-ip').v4();
const ipLocation = require('iplocation');

/**
 *  Abstract module with all methods
 */
module.exports = {
    /**
     * Main data method. Gathers all data and returns
     * is as an object. The data param is optional.
     * @param  {Object} data
     */
    gatherData(data = {}) {
        return {
            uptime      : this.getUptime(),
            currentDate : this.getCurrentDate(),
            activeDate  : this.getActiveDate(),
            time        : this.getTime(),
            location    : data.location
        };
    },

    /**
     * Calculates the current uptime, using the difference
     * between the current time and the OS time.
     */
    getUptime() {
        let diffSeconds = moment().diff(osUptime, 'seconds'),
            calcMinutes = diffSeconds / 60,
            calcHours   = calcMinutes / 60,
            days        = Math.floor(calcHours / 24),
            hours       = Math.floor(calcHours - (days * 24)),
            minutes     = Math.floor(calcMinutes - (days * 60 * 24) - (hours * 60));

        return { days, hours, minutes };
    },

    /**
     * Returns the current date.
     */
    getCurrentDate() {
        return moment().format('MMMM DD, YYYY');
    },

    /**
     * Returns the date when the server became active.
     */
    getActiveDate() {
        return moment(osUptime).format('MMMM DD, YYYY');
    },

    /**
     * Returns the current time.
     */
    getTime() {
        return {
            hh : moment().format('hh'),
            mm : moment().format('mm'),
            p  : moment().format('a')
        };
    },

    /**
     * Retrives the current location after it receives the
     * public IP. Passes the data using a callback function.
     * @param  {Function} callback
     * @param  {Function} next
     */
    getLocation(callback, next) {
        publicIp.then(ip => {
            ipLocation(ip, (error, data) => {
                if (callback) {
                    return callback(data);
                }
            });
        }).catch(next);
    }
};