function getUptime() {
    $.get('script/ajax.php?type=time', function(data) {
        $('.notice h1').html(data);
    }, "json");
}

function getImage() {
    $.get('script/ajax.php?type=image', function(image) {
        $('body').css('backgroundImage','url(' + image + ')');
    });
}

$(document).ready(function() {

    getImage();
    
    // Initial show
    getUptime();

    // Set interval to 1min
    setInterval(function() {
        getUptime();
    }, 1000 * 60);
    
});