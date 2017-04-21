const _ = require('lodash');
const $ = require('jquery');
const octicons = require("octicons");
const common = require('./common');

/**
 * Register actions
 */
module.exports = {
    /**
     * Register an action
     * @param {Object} options
     */
    register(options) {
        _.bindAll(this);

        this[options.ev](options.selector);
    },

    /**
     * Copy action
     * @param {String} selector
     */
    copy(selector) {
        let actionIcon = $(selector).find('.copy-action');

        actionIcon.on('click', () => {
            let element = $(this).parent().find('.output');

            common.copyToClipboard(element[0]);
        });

        this.insertIcon(selector, 'copy', 'clippy');
    },

    /**
     * Inserts an icon within the desired element
     * @param {Object} selector
     * @param {String} action
     * @param {String} icon
     */
    insertIcon(selector, action, icon) {
        let actionIcon = $(selector).find(`.${action}-action`);

        $(selector).on('mouseenter mouseleave', (ev) => {
            let type = ev.type;

            if (type === 'mouseenter') {
                actionIcon.append(this.generateIcon(icon));
            } else if (type === 'mouseleave') {
                actionIcon.find('.icon').remove();
            }
        });
    },

    /**
     * Outputs the correct markup for the oction
     * @param {String} icon
     */
    generateIcon(icon) {
        return `<span class="icon">${octicons[icon].toSVG()}</span>`;
    }
};