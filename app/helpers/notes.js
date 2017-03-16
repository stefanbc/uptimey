const $ = require('jquery');
const _ = require('lodash');

/**
 * Helper for generating notes
 */
module.exports = {

    notesDefaultParent: $('.layout .box'),
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

        parent.append(note);
    },

    /**
     * Generate an error note
     * @param {String} msg
     * @param {Object} parent
     * @param {String} position
     */
    error(msg, parent, position) {
        let note = this.buildNote('danger', msg, position);

        parent.append(note);
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
     * Clears all notes
     */
    clearAll() {
        this.notesDefaultParent.find('.note').remove();
    }
};