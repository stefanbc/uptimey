/**
 * Required packages
 */
const os = require('os');
const osName = require('os-name');
const getos = require('getos');
const macosRelease = require('macos-release');
const winRelease = require('win-release');

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
            os           : this.getOS(),
            processor    : this.parseCPUModel(),
            architecture : os.arch(),
            totalMem     : this.parseTotalMem(),
            hostname     : os.hostname(),
            localIp      : data.localIp,
            publicIp     : data.publicIp,
            networkMask  : netmask.netmask,
            mac          : netmask.mac
        };
    },

    /**
     * Returns data about OS distribution and release
     */
    getOS() {
        let getPlatform = os.platform(),
            tempDist, dist, release;

        if (getPlatform === 'linux') {
            tempDist = getos((e, os) => { return os.dist; });
            release = getos((e, os) => { return os.release; });
        } else if (getPlatform === 'darwin') {
            release = macosRelease().version;
        } else if (getPlatform === 'win32') {
            release = winRelease();
        }

        if (getPlatform === 'darwin' || getPlatform === 'win32') {
            tempDist = osName();
        }

        tempDist = tempDist.split(' ');
        dist = tempDist[0];

        return { dist, release };
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
        modelName = modelName[0].replace('CPU', '').replace(/\(.*?\)/g, '');

        return `${frequency} ${modelName}`;
    },

    parseTotalMem() {
        let humemTotalMem = humem.totalmem,
            split = humemTotalMem.split(' '),
            round = Math.floor(split[0]),
            output = `${round} ${split[1]}`;

        return output;
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
                return callback(ipObject);
            }
        }).catch(next);
    }
};