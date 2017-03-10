module.exports({
    /**
     * Normalizes a string
     * @param  {String} string
     */
    normalizeString: function(string) {
        return string.split(/(?=[A-Z])/).join('-').toLowerCase();
    }
});