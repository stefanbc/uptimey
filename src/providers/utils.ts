/**
 * Utils helpers with different methods
 */
export class UtilsProvider {
    /**
     * Normalizes a string
     * @param  {String} string
     */
    normalizeString(string: string) {
        return string.split(/(?=[A-Z])/).join('-').toLowerCase();
    }

    /**
     * Checks the current layout
     */
    isCurrentLayout(layout: string) {
        return $('body').find('section.layout').attr('id') === layout;
    }

    /**
     * Adds leading zero to
     * @param {String} number
     */
    pad(number: number) {
        if (number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }
}