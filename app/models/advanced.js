/**
 * Required packages
 */
const os = require('os');
const internalIp = require('internal-ip').v4();
const publicIp = require('public-ip').v4();

/**
 *  Abstract module with all methods
 */
module.exports = {

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
            serverCpu       : os.cpus()[0].model,
            serverTotalMem  : Math.floor(os.totalmem() / 1024^2),
            serverLocalIp   : data.serverLocalIp,
            serverPublicIp  : data.serverPublicIp
        };
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
    },

    //Create function to get CPU information
    getCPUAverage() {

        //Initialise sum of idle and time of cores and fetch CPU info
        let totalIdle = 0, totalTick = 0;
        let cpus = os.cpus();

        //Loop through CPU cores
        for(let i = 0, len = cpus.length; i < len; i++) {
            //Select CPU core
            let cpu = cpus[i];

            //Total up the time in the cores tick
            for(type in cpu.times) {
                totalTick += cpu.times[type];
            }

            //Total up the idle time of the core
            totalIdle += cpu.times.idle;
        }

        //Return the average Idle and Tick times
        return {
            idle: totalIdle / cpus.length,
            total: totalTick / cpus.length
        };
    },

    calcCPUAverage() {
        //Grab first CPU Measure
        var startMeasure = this.cpuAverage();

        //Set delay for second Measure
        setTimeout(function() {

            //Grab second Measure
            var endMeasure = this.cpuAverage();

            //Calculate the difference in idle and total time between the measures
            var idleDifference = endMeasure.idle - startMeasure.idle;
            var totalDifference = endMeasure.total - startMeasure.total;

            //Calculate the average percentage CPU usage
            var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

            //Output result to console
            console.log(percentageCPU + "% CPU Usage.");

        }, 100);
    }
};