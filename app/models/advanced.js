/**
 * Required packages
 */
const os = require('os');
const internalIp = require('internal-ip').v4();
const publicIp = require('public-ip').v4();
const netmask = require('ipmask')();
const humem = require('humem');

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
            serverCpu       : this.parseCPUModel(),
            serverTotalMem  : humem.totalmem,
            serverLocalIp   : data.serverLocalIp,
            serverPublicIp  : data.serverPublicIp,
            serverMask      : netmask.netmask,
            serverMac       : netmask.mac
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

    /**
     * Parses the CPU model retrived by the os module
     */
    parseCPUModel() {
        let model = os.cpus()[0].model,
            split = model.split('@'),
            modelName = split[0].trim(),
            frequency = split[1].trim();

        modelName = modelName.split('-');
        modelName = modelName[0].replace('CPU', '')
                    .replace(/\(.*?\)/g, '');

        return `${frequency} ${modelName}`;
    }
};