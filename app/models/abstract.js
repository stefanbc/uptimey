/**
 * Required packages
 */
const os = require('os');
const osUptime = require('os-uptime')();
const moment = require('moment');
const internalIp = require('internal-ip').v4();
const publicIp = require('public-ip').v4();
const iplocation = require('iplocation');

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
     * Advanced data method. Gathers all advanced data
     * and returns is as an object. The data param is optional.
     * @param  {Object} data
     */
    gatherAdvancedData(data = {}) {
        return {
            serverHostname  : os.hostname(),
            serverType      : os.type(),
            platformRelease : os.release(),
            serverArch      : os.arch(),
            serverCPU       : os.cpus()[0].model,
            serverTotalMem  : os.totalmem(),
            serverLocalIp   : data.serverLocalIp,
            serverPublicIp  : data.serverPublicIp
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
            iplocation(ip, (error, data) => {
                if (callback) {
                    callback(data);
                }
            });
        }).catch(next);
    },

    /**
     * Retrives the current server internal Ip and external Ip.
     * Passes the data using a callback function.
     * @param  {Function} callback
     * @param  {Function} next
     */
    getIpObject(callback, next) {
        publicIp.then(ip => {
            let ipObject = {
                localIp  : internalIp,
                publicIp : ip
            };

            if (callback) {
                callback(ipObject);
            }
        }).catch(next);
    }
};