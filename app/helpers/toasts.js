const _ = require('lodash');
const $ = require('jquery');

/**
 * Helper for generating toasts
 */
module.exports = {

    wormHole: '.container .toasts-wormhole',
    defaultPosition: 'tr',
    clearTimeout: 6000,

    /**
     * The main method for generating a toast
     * @param {String} type
     * @param {String} msg
     * @param {String} position
     */
    init(type, msg, position = this.defaultPosition) {
        this.clearAll();
        this[type](msg, position);

        _.delay(() => {
            this.hide();
        }, this.clearTimeout);
    },

    /**
     * Generate a success toast
     * @param {String} msg
     * @param {String} position
     */
    success(msg, position) {
        $(this.wormHole).append(this.toastTemplate('success', msg, position));
    },

    /**
     * Generate an error toast
     * @param {String} msg
     * @param {String} position
     */
    error(msg, position) {
        $(this.wormHole).append(this.toastTemplate('danger', msg, position));
    },

    /**
     * Build a toast and animate it
     * @param {String} type
     * @param {String} msg
     * @param {String} position
     */
    toastTemplate(type, msg, position) {
        return `<div class="toast toast-${type} toast-${position} animated fadeInDown">${msg}</div>`;
    },

    /**
     * Clears all toasts in the wormhole
     */
    clearAll() {
        $(this.wormHole).find('.toast').remove();
    },

    /**
     * Hides a toast in the wormhole
     */
    hide() {
        $(this.wormHole).find('.toast').removeClass('fadeInDown').addClass('fadeOutUp');
    }
};