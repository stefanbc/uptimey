/*
Uptimey - https://github.com/stefanbc/uptimey

Licensed under the MIT license

Copyright (c) 2014 Stefan Cosma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* Output the data requested */
function output(type){
    switch(type){
        case 'time':
            $.get('script/ajax.php', { action: type })
                .done(function(time) {
                    // Split the output
                    time = time.split(";");
                    // Set the time
                    $('.time h2').text(time[0]).addClass('fadeInDown');
                    $('.time h2').on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("fadeInDown");
                    });
                    $('.active-since h2').text(time[1]).addClass('fadeInDown');
                    $('.active-since h2').on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("fadeInDown");
                    });
            });
        break;
        case 'image':
            $.get('script/ajax.php', { action: type })
                .done(function(image) {
                    // Split the output
                    image = image.split(";");
                    // Add the image as background-image on body
                    $('body').css('backgroundImage','url(' + image[0] + ')');
                    // Set the copyright
                    $('#copy').html("Powered by Uptimey. Fork on <a href='https://github.com/stefanbc/uptimey'>Github</a> <br> Image - " + image[1]);
            });
        break;
        case 'uptime':
            $.get('script/ajax.php', { action: type })
                .done(function(uptime) {
                    // Split the output
                    uptime = uptime.split(";");
                    // Add it to each element with an animation
                    $('#days').text(uptime[0]).addClass('fadeInDown');
                    $('#hours').text(uptime[1]).addClass('fadeInDown');
                    $('#minutes').text(uptime[2]).addClass('fadeInDown');
                    // After the animation is done remove the class so
                    // we can animate again on next iteration
                    $(".val").each(function(){
                        $(this).on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                            $(this).removeClass("fadeInDown");
                        });
                    });
                    // We only adnimate the whole container once
                    $('.notice').addClass('fadeInDown');
            });
        break;
    }
}

$(document).ready(function() {
    /* Start initial load */
        // Add the animation base class
        $('.notice').addClass('animated');
        $('.val').addClass('animated');
        $('.time h2').addClass('animated');
        $('.active-since h2').addClass('animated');
        // Get the time
        output('time');
        // Get the image
        output('image');
        // Get the uptime
        output('uptime');
    /* End initial load */

    /* At an interval of 1 min we refresh the uptime */
    setInterval(function() {
        output('uptime');
    }, 1000 * 60);
});