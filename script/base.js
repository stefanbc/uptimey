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


/* Gets the uptime from the server using an sh command */
function getUptime() {
    $.get('script/ajax.php', { type: "uptime" })
        .done(function(data) {
            // Split the output
            data = data.split(";");
            // Add it to each element with an animation
            $('#days').text(data[0]).addClass('fadeInDown');
            $('#hours').text(data[1]).addClass('fadeInDown');
            $('#minutes').text(data[2]).addClass('fadeInDown');
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
}

/* Get the image from Bing and add the copyright to it */
function getImage() {
    $.get('script/ajax.php', { type: "image" })
        .done(function(image) {
            // Split the info
            image = image.split(";");
            // Add the image as background-image on body
            $('body').css('backgroundImage','url(' + image[0] + ')');
            // Set the copyright
            $('#copy').html("Powered by Uptimey. Fork on <a href='https://github.com/stefanbc/uptimey'>Github</a> <br> Image - " + image[1]);
    });
}

$(document).ready(function() {
    /* Start initial load */
        // Add the animation base class
        $('.notice').addClass('animated');
        $('.val').addClass('animated');
        // Get the image
        getImage();
        // Get the uptime
        getUptime();
    /* End initial load */

    /* At an interval of 1 min we refresh the uptime */
    setInterval(function() {
        getUptime();
    }, 1000 * 60);
});