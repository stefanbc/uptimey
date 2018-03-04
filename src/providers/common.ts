// import * as octicons from 'octicons';

/**
 * Common helpers
 */
export class CommonProvider {

    /**
     * Inserts an icon within the desired element
     * @param {Object} selector
     * @param {String} action
     * @param {String} icon
     */
    insertIcon(selector: Object, action: string, icon: string) {
        // let actionIcon = $(selector).find(`.${action}-action`);

        // actionIcon.addClass('tooltip tooltip-right').attr('data-tooltip', action);

        // $(selector).on('mouseenter mouseleave', (ev) => {
        //     let type = ev.type;

        //     if (type === 'mouseenter') {
        //         actionIcon.append(this.generateIcon(icon));
        //     } else if (type === 'mouseleave') {
        //         actionIcon.find('.icon').remove();
        //     }
        // });
    }

    /**
     * Outputs the correct markup for the oction
     * @param {String} icon
     */
    generateIcon(icon: string) {
        // return `<span class="icon">${octicons[icon].toSVG()}</span>`;
    }
}