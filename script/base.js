function getUptime() {
    $.get('script/ajax.php', function(data) {
        $('.notice h1').html(data);
    });
}

$(document).ready(function() {
    // Initial show
    getUptime();

    // Set interval to 1min
    setInterval(function() {
        getUptime();
    }, 1000 * 60);
});