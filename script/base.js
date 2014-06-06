function getUptime() {
    $.get('script/ajax.php?type=time', function(data) {
        data = data.split(";");
        
        var output = "<div class='col'><span class='val'>" + data[0] + "</span><span class='label'>days</span></div>";
        output += "<div class='col'><span class='val'>" + data[1] + "</span><span class='label'>hours</span></div>";
        output += "<div class='col'><span class='val'>" + data[2] + "</span><span class='label'>minutes</span></div>";
        
        $('.notice section').addClass('animated fadeInDown');
        $('.notice section').html(output);
    });
}

function getImage() {
    $.get('script/ajax.php?type=image', function(image) {
        image = image.split(";");
        $('body').css('backgroundImage','url(' + image[0] + ')');
        $('#copy').html(image[1]);
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