import * as _ from 'lodash';

/**
 * Helper for generating toasts
 */
export class ToastsProvider {

    wormHole: '.container .toasts-wormhole';
    defaultPosition: 'tr';
    clearTimeout: 6000;

    /**
     * The main method for generating a toast
     * @param {String} type
     * @param {String} msg
     * @param {String} position
     */
    init(type: string, msg: string, position = this.defaultPosition) {
        this.clearAll();
        // this[type](msg, position);

        _.delay(() => {
            this.hide();
        }, this.clearTimeout);
    }

    /**
     * Generate a success toast
     * @param {String} msg
     * @param {String} position
     */
    success(msg: string, position: string) {
        // $(this.wormHole).append(this.toastTemplate('success', msg, position));
    }

    /**
     * Generate an error toast
     * @param {String} msg
     * @param {String} position
     */
    error(msg: string, position: string) {
        // $(this.wormHole).append(this.toastTemplate('danger', msg, position));
    }

    /**
     * Build a toast and animate it
     * @param {String} type
     * @param {String} msg
     * @param {String} position
     */
    toastTemplate(type: string, msg: string, position: string) {
        return `<div class="toast toast-${type} toast-${position} animated fadeInDown">${msg}</div>`;
    }

    /**
     * Clears all toasts in the wormhole
     */
    clearAll() {
        // $(this.wormHole).find('.toast').remove();
    }

    /**
     * Hides a toast in the wormhole
     */
    hide() {
        // $(this.wormHole).find('.toast').removeClass('fadeInDown').addClass('fadeOutUp');
    }
}