function getUptime() {
    $.get('script/ajax.php?type=time', function(data) {
        data = data.split(";");
        
        $('#days').text(data[0]);
        $('#hours').text(data[1]);
        $('#minutes').text(data[2]);
        
        $('.val').addClass('animated fadeInDown');
        $('.notice').addClass('animated fadeInDown');

    });
}

function getImage() {
    $.get('script/ajax.php?type=image', function(image) {
        image = image.split(";");
        $('body').css('backgroundImage','url(' + image[0] + ')');
        $('#copy').html("Powered by Uptimey. Fork on <a href='https://github.com/stefanbc/uptimey'>github</a> | Image - " + image[1]);
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