const _ = require('lodash');
const $ = require('jquery');

/**
 * Helper for generating notes
 */
module.exports = {

    notesDefaultParent: '.box',
    defaultPosition: 'tr',

    /**
     * The main method for generating a note
     * @param {String} type
     * @param {String} msg
     * @param {Object} parent
     * @param {String} position
     */
    init(type, msg, parent = this.notesDefaultParent, position = this.defaultPosition) {
        _.bindAll(this);

        this[type](msg, parent, position);
    },

    /**
     * Generate a success note
     * @param {String} msg
     * @param {Object} parent
     * @param {String} position
     */
    success(msg, parent, position) {
        let note = this.buildNote('success', msg, position);

        if (!this.checkForNote(parent)) {
            parent.append(note);
        }
    },

    /**
     * Generate an error note
     * @param {String} msg
     * @param {Object} parent
     * @param {String} position
     */
    error(msg, parent, position) {
        let note = this.buildNote('danger', msg, position);

        if (!this.checkForNote(parent)) {
            parent.append(note);
        }
    },

    /**
     * Build a note and animate it
     * @param {String} type
     * @param {String} msg
     * @param {String} position
     */
    buildNote(type, msg, position) {
        let note = `<div class="note note-${type} note-${position} tooltip tooltip-bottom" data-tooltip="${msg}"></div>`;

        return note;
    },

    /**
     *
     * @param {String} selector
     */
    checkForNote(selector) {
        return (selector.find('.note').length !== 0) ? true : false;
    },

    /**
     * Clears all notes
     */
    clearAll() {
        $(this.notesDefaultParent).find('.note').remove();
    }
};