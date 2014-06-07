function getUptime() {
    
    $.get('script/ajax.php', { type: "time" })
        .done(function(data) {
            data = data.split(";");
            
            $('#days').text(data[0]).addClass('fadeInDown');
            $('#hours').text(data[1]).addClass('fadeInDown');
            $('#minutes').text(data[2]).addClass('fadeInDown');
            
            $(".val").each(function(){
                $(this).on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                    $(this).removeClass("fadeInDown");
                });
            });
            
            $('.notice').addClass('fadeInDown');
    });
    
}

function getImage() {
    $.get('script/ajax.php', { type: "image" })
        .done(function(image) {
            image = image.split(";");
            $('body').css('backgroundImage','url(' + image[0] + ')');
            $('#copy').html("Powered by Uptimey. Fork on <a href='https://github.com/stefanbc/uptimey'>Github</a> | Image - " + image[1]);
    });
}

$(document).ready(function() {
    
    $('.notice').addClass('animated');
    $('.val').addClass('animated');
    getImage();
    
    // Initial show
    getUptime();

    // Set interval to 1min
    setInterval(function() {
        getUptime();
    }, 1000 * 60);
    
});