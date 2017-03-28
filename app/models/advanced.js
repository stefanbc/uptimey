/**
 * Required packages
 */
const os = require('os');
const osName = require('os-name');
const getos = require('getos');
const humem = require('humem');
const internalIp = require('internal-ip').v4();
const publicIp = require('public-ip').v4();
const netmask = require('ipmask')();

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
            platform     : this.getOs('platform'),
            release      : this.getOs('release'),
            processor    : this.parseCPUModel(),
            architecture : os.arch(),
            totalMem     : humem.totalmem,
            hostname     : os.hostname(),
            localIp      : data.localIp,
            publicIp     : data.publicIp,
            networkMask  : netmask.netmask,
            mac          : netmask.mac
        };
    },

    /**
     * Returns data about OS distribution and release
     * @param {String} type
     */
    getOs(type) {
        let platform = os.platform(),
            release = os.release(),
            output;

        switch (type) {
            case 'platform':
                if (platform === 'linux') {
                    output = getos((e, os) => { return os.dist; });
                } else {
                    output = osName(platform, release);
                }
            break;
            case 'release':
                if (platform === 'linux') {
                    output = getos((e, os) => { return os.release; });
                } else {
                    output = release;
                }
            break;
        }

        return output;
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