const $ = require('jquery');
const _ = require('lodash');

/**
 * Helper for generating toasts
 */
module.exports = {

    wormHole: $('.container .toasts-wormhole'),
    defaultPosition: 'tc',

    init(type, msg, position = this.defaultPosition) {
        _.bindAll(this);

        this.clearAll();
        this[type](msg, position);

        _.delay(() => {
            this.clearAll();
        }, 10000);
    },

    success(msg, position) {
        let toast = this.buildToast('success', msg, position);

        this.wormHole.append(toast);
    },

    warning(msg, position) {
        let toast = this.buildToast('warning', msg, position);

        this.wormHole.append(toast);
    },

    error(msg, position) {
        let toast = this.buildToast('error', msg, position);

        this.wormHole.append(toast);
    },

    buildToast(type, msg, position) {
        let toast = `<div class="toast toast-${type} toast-${position} animated fadeInDown">${msg}</div>`;

        return toast;
    },

    clearAll() {
        this.wormHole.find('.toast').removeClass('fadeInDown').addClass('fadeInOut');

        _.delay(() => {
            this.wormHole.find('.toast').remove();
        }, 2000);
    }
};