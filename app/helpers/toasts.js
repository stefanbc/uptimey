const $ = require('jquery');
const _ = require('lodash');

/**
 * Helper for generating toasts
 */
module.exports = {

    wormHole: $('.container .toasts-wormhole'),
    defaultPosition: 'tr',

    /**
     * The main method for generating a toast
     * @param {String} type
     * @param {String} msg
     * @param {String} position
     */
    init(type, msg, position = this.defaultPosition) {
        _.bindAll(this);

        this.clearAll();
        this[type](msg, position);

        _.delay(() => {
            this.hide();
        }, 6000);
    },

    /**
     * Generate a success toast
     * @param {String} msg
     * @param {String} position
     */
    success(msg, position) {
        let toast = this.buildToast('success', msg, position);

        this.wormHole.append(toast);
    },

    /**
     * Generate an error toast
     * @param {String} msg
     * @param {String} position
     */
    error(msg, position) {
        let toast = this.buildToast('danger', msg, position);

        this.wormHole.append(toast);
    },

    /**
     * Build a toast and animate it
     * @param {String} type
     * @param {String} msg
     * @param {String} position
     */
    buildToast(type, msg, position) {
        let toast = `<div class="toast toast-${type} toast-${position} animated fadeInDown">${msg}</div>`;

        return toast;
    },

    /**
     * Clears all toasts in the wormhole
     */
    clearAll() {
        this.wormHole.find('.toast').remove();
    },

    /**
     * Hides a toast in the wormhole
     */
    hide() {
        this.wormHole.find('.toast').removeClass('fadeInDown').addClass('fadeOutUp');
    }
};