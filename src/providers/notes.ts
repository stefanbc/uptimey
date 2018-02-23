import $ from 'jquery';

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
        this[type](msg, parent, position);
    },

    /**
     * Generate a success note
     * @param {String} msg
     * @param {Object} parent
     * @param {String} position
     */
    success(msg, parent, position) {
        if (!this.checkForNote(parent)) {
            parent.append(this.noteTemplate('success', msg, position));
        }
    },

    /**
     * Generate an error note
     * @param {String} msg
     * @param {Object} parent
     * @param {String} position
     */
    error(msg, parent, position) {
        if (!this.checkForNote(parent)) {
            parent.append(this.noteTemplate('danger', msg, position));
        }
    },

    /**
     * Build a note and animate it
     * @param {String} type
     * @param {String} msg
     * @param {String} position
     */
    noteTemplate(type, msg, position) {
        return `<div class="note note-${type} note-${position} tooltip tooltip-bottom" data-tooltip="${msg}"></div>`;
    },

    /**
     * Checks for the existance of a note
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