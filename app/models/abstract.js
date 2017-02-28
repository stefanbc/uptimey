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
            currentDate    : this.getCurrentDate(),
            activeDate     : this.getServerActiveDate(),
            serverTime     : this.getServerTime(),
            serverUptime   : this.getServerUptime(),
            serverLocation : data.serverLocation
        };
    },

    /**
     * Returns the current server date.
     */
    getCurrentDate() {
        return moment().format('MMMM DD, YYYY');
    },

    /**
     * Returns the date when the server became active.
     */
    getServerActiveDate() {
        return moment(osUptime).format('MMMM DD, YYYY');
    },

    /**
     * Returns the current server time.
     */
    getServerTime() {
        return {
            currentHour    : moment().format('HH'),
            currentMinutes : moment().format('mm'),
            currentPeriod  : moment().format('a')
        };
    },

    /**
     * Calculates the current uptime for the server,
     * using the difference between the current time and the OS time.
     */
    getServerUptime() {
        let diffSeconds = moment().diff(osUptime, 'seconds'),
            calcMinutes = diffSeconds / 60,
            calcHours   = calcMinutes / 60,
            days        = Math.floor(calcHours / 24),
            hours       = Math.floor(calcHours - (days * 24)),
            minutes     = Math.floor(calcMinutes - (days * 60 * 24) - (hours * 60));

        return {
            uptimeDays    : days,
            uptimeHours   : hours,
            uptimeMinutes : minutes
        };
    },

    /**
     * Retrives the current server location after it receives the
     * public IP of the server. Passes the data using a callback function.
     * @param  {Function} callback
     * @param  {Function} next
     */
    getServerLocation(callback, next) {
        publicIp.then(ip => {
            ipLocation(ip, (error, data) => {
                if (callback) {
                    callback(data);
                }
            });
        }).catch(next);
    }
};