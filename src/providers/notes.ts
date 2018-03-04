/**
 * Helper for generating notes
 */
export class NotesProvider {

    notesDefaultParent: '.box';
    defaultPosition: 'tr';

    /**
     * The main method for generating a note
     * @param {String} type
     * @param {String} msg
     * @param {Object} parent
     * @param {String} position
     */
    init(type: string, msg: string, parent = this.notesDefaultParent, position = this.defaultPosition) {
        // this[type](msg, parent, position);
    }

    /**
     * Generate a success note
     * @param {String} msg
     * @param {Object} parent
     * @param {String} position
     */
    success(msg: string, parent: string, position: string) {
        if (!this.checkForNote(parent)) {
            // parent.append(this.noteTemplate('success', msg, position));
        }
    }

    /**
     * Generate an error note
     * @param {String} msg
     * @param {Object} parent
     * @param {String} position
     */
    error(msg: string, parent: string, position: string) {
        if (!this.checkForNote(parent)) {
            // parent.append(this.noteTemplate('danger', msg, position));
        }
    }

    /**
     * Build a note and animate it
     * @param {String} type
     * @param {String} msg
     * @param {String} position
     */
    noteTemplate(type: string, msg: string, position: string) {
        return `<div class="note note-${type} note-${position} tooltip tooltip-bottom" data-tooltip="${msg}"></div>`;
    }

    /**
     * Checks for the existance of a note
     * @param {String} selector
     */
    checkForNote(selector: string) {
        // return (selector.find('.note').length !== 0) ? true : false;
    }

    /**
     * Clears all notes
     */
    clearAll() {
        // $(this.notesDefaultParent).find('.note').remove();
    }
}