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
function output(type) {
    switch (type) {
        case 'time':
            $.get('script/ajax.php', {
                action: type
            })
                .done(function(time) {
                    // Split the output
                    time = time.split(";");
                    // Set the times
                    $('#current').text(time[0]).addClass('fadeInDown');
                    $('#time').text(time[1]).addClass('fadeInDown');
                    $('#since').text(time[2]).addClass('fadeInDown');
                    // Set the icon for AM or PM
                    if (time[1].indexOf("am") >= 0) {
                        $(".time .fa").addClass("fa-sun-o");
                    } else {
                        $(".time .fa").addClass("fa-moon-o");
                    }
                    // We only animate the whole container once
                    $('.top-container').addClass('fadeInDown');
                });
            break;
        case 'image':
            $.get('script/ajax.php', {
                action: type
            })
                .done(function(image) {
                    // Split the output
                    image = image.split(";");
                    // Add the image as background-image on body
                    $('body').css('backgroundImage', 'url(' + image[0] + ')');
                    // Set the copyright
                    $('#copy').html("Powered by Uptimey. Fork on <a href='https://github.com/stefanbc/uptimey'>Github</a> <br> Image - " + image[1]);
                });
            break;
        case 'uptime':
            $.get('script/ajax.php', {
                action: type
            })
                .done(function(uptime) {
                    // Split the output
                    uptime = uptime.split(";");
                    // Add it to each element with an animation
                    $('#days').text(uptime[0]).addClass('fadeInDown');
                    $('#hours').text(uptime[1]).addClass('fadeInDown');
                    $('#minutes').text(uptime[2]).addClass('fadeInDown');
                    // We only animate the whole container once
                    $('.bottom-container').addClass('fadeInDown');
                });
            break;
        case 'location':
            $.get('script/ajax.php', {
                action: type
            })
                .done(function(location) {
                    // Set up the URL for location call using ipinfo.io
                    var ip_call = "http://ipinfo.io/" + location + "/geo";
                    // Get the response and set the value
                    $.get(ip_call, function(response) {
                        // Add it to the element with an animation
                        $('#location').text(response.city + ", " + response.region + ", " + response.country).addClass('fadeInDown');
                    }, "jsonp");
                    // We only animate the whole container once
                    $('.location-inner').addClass('fadeInDown');
                });
            break;
    }
    // After the animation is done remove the class so
    // we can animate again on next iteration
    $(".val").each(function() {
        $(this).on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
            $(this).removeClass("fadeInDown");
        });
    });
}
/* Button action */
function action(type) {
    switch (type) {
        case 'adv':
            // Animated it
            $(".adv-button").addClass('pulse');
            $(".adv-button").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                $(this).removeClass("pulse");
            });
            // Get the status of the button
            var status = $(".adv-button").attr("data-status");
            // Check the state
            if (status == "default") {
                // Show the correct panel and set the button state
                $(".adv-button").attr("data-status", "advanced");
                $(".default-panel").fadeOut(500);
                $(".advanced-panel").fadeIn(500);
            } else if (status == "advanced") {
                // Show the correct panel and set the button state
                $(".adv-button").attr("data-status", "default");
                $(".advanced-panel").fadeOut(500);
                $(".default-panel").fadeIn(500);
            }
            break;
        case 'refresh':
            // Animated it
            $(".refresh-button").addClass('fa-spin');
            // Stop animation after 1s
            setTimeout(function() {
                $(".refresh-button").removeClass("fa-spin");
            }, 1000);
            break;
        case 'twitter':
            // Animated it
            $(".twitter-button").addClass('pulse');
            $(".twitter-button").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                $(this).removeClass("pulse");
            });
            // The action
            // Set the URL
            var url = "https://github.com/stefanbc/uptimey";
            // Get the current uptime
            var uptime = $("#days").text() + " days " + $("#hours").text() + " hours " + $("#minutes").text() + " minutes";
            // Set the tweet
            var text = "My server has been online for " + uptime + ". Can you beat this uptime? via";
            // Set the hashtag
            var hashtag = "uptimey,devbranch";
            // Open the Twitter share window
            window.open('http://twitter.com/share?url=' + url + '&text=' + text + '&hashtags=' + hashtag + '&', 'twitterwindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 225) + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
            break;
    }
}

$(document).ready(function() {
    /* Start initial load */
    // Add the animation base class
    $('.top-container').addClass('animated');
    $('.bottom-container').addClass('animated');
    $('.val').addClass('animated');
    $('.button').addClass('animated');
    // Get the image
    output('image');
    // Get the location
    output('location');
    // Get the uptime
    output('uptime');
    // Get the time (let uptime be the first request so that the session updates needed values for time)
    output('time');
    /* End initial load */

    /* At an interval of 1 min we refresh the uptime */
    setInterval(function() {
        output('uptime');
        output('time');
    }, 1000 * 60);

    /* Click action on each button */
    $(".button").each(function() {
        $(this).on("click", function() {
            var buttonAction = $(this).attr("data-action");
            action(buttonAction);
        });
    });
});