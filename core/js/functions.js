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

/* Set the global vars*/
var globalFile = 'core/handlers/app.handler.php';
var globalLocation, globalSunrise, globalSunset;

/* Output the data requested */
function output(type, setFlag) {
    switch (type) {
        case 'image':
            $.get(globalFile, {
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
        case 'location':
            $.get(globalFile, {
                action: type
            })
                .done(function(location) {
                    // Set up the URL for location call using ipinfo.io
                    var ip_geocode = "http://ipinfo.io/" + location.ip + "/json";
                    // Get the response and set the value
                    $.get(ip_geocode, function(response) {
                        // Add it to the element with an animation
                        $('#location').text(response.city + ", " + response.region + ", " + response.country).addClass('fadeIn');
                        // Add latlong for maps href
                        var latlong = response.loc.split(",");
                        $('#location').attr('data-latlong', latlong[0] + '+' + latlong[1]);
                        // Set the global location
                        globalLocation = response.city + ", " + response.region + ", " + response.country;
                        // Set the sunrise/sunset times
                        $.simpleWeather({
                            location: globalLocation,
                            success: function(weather) {
                                globalSunrise = weather.sunrise;
                                globalSunset = weather.sunset;
                            }
                        });
                    }, "jsonp");
                    // We only animate the whole container once
                    $('.location-inner').addClass('fadeIn');
                });
            break;
        case 'uptime':
            $.get(globalFile, {
                action: type,
                flag: setFlag
            })
                .done(function(uptime) {
                    // Split the output
                    uptime = uptime.split(";");
                    // Add it to each element with an animation
                    $('#days').text(uptime[0]).addClass('fadeIn');
                    $('#days').attr('data-value', uptime[0]);
                    
                    $('#hours').text(uptime[1]).addClass('fadeIn');
                    $('#hours').attr('data-value', uptime[1]);

                    $('#minutes').text(uptime[2]).addClass('fadeIn');
                    $('#minutes').attr('data-value', uptime[2]);
                    // We only animate the whole container once
                    $('.bottom-container').addClass('fadeIn');
                });
            break;
        case 'time':
            $.get(globalFile, {
                action: type,
                flag: setFlag
            })
                .done(function(time) {
                    // Split the output
                    time = time.split(";");
                    // Set the times
                    $('#current').text(time[0]).addClass('fadeIn');
                    $('#time').text(time[1]).addClass('fadeIn');
                    $('#since').text(time[2]).addClass('fadeIn');
                    // Format the times
                    setTimeout(function() {
                        var sunrise = moment(globalSunrise, 'h:m a').format('X');
                        var sunset = moment(globalSunset, 'h:m a').format('X');
                        var ttime = moment(time[1], 'h:m a').format('X');
                        // Check if the current time is between sunset, sunrise and set the icon
                        if (ttime >= sunrise && ttime <= sunset) {
                            $(".time .fa").removeClass("fa-moon-o fa-circle-o");
                            $(".time .fa").addClass("fa-sun-o");
                        } else {
                            $(".time .fa").removeClass("fa-sun-o fa-circle-o");
                            $(".time .fa").addClass("fa-moon-o");
                        }
                    }, 3000);
                    // We only animate the whole container once
                    $('.top-container').addClass('fadeIn');
                });
            break;
    }
    // After the animation is done remove the class so
    // we can animate again on next iteration
    $(".val").each(function() {
        $(this).on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
            $(this).removeClass("fadeIn");
        });
    });
}
/* Button action */
function action(type) {
    var status;
    switch (type) {
        case 'toggle':
            // Get the status of the button
            status = $(".toggle-button").attr("data-status");
            // Check the status
            if (status == "closed") {
                // Animate the container (bring it down)
                $(".button-container").animate({
                    top: 0
                });
                // Change the button status
                $(".toggle-button").attr("data-status", "open");
                // Change the icon
                $(".toggle-button").removeClass("fa-angle-double-down");
                $(".toggle-button").addClass("fa-angle-double-up");
            } else if (status == "open") {
                // Animate the container (bring it up)
                $(".button-container").animate({
                    top: "-80px"
                });
                // Change the button status
                $(".toggle-button").attr("data-status", "closed");
                // Change the icon
                $(".toggle-button").removeClass("fa-angle-double-up");
                $(".toggle-button").addClass("fa-angle-double-down");
            }
            break;
        case 'adv':
            // Animated it
            $(".adv-button").addClass('pulse');
            $(".adv-button").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                $(this).removeClass("pulse");
            });
            // Get the status of the button
            status = $(".adv-button").attr("data-status");
            // Check the state
            if (status == "default") {
                // Show the correct panel and set the button state
                $(".adv-button").attr("data-status", "advanced");
                $(".adv-button").addClass('active');
                $(".default-panel").fadeOut(500);
                $(".advanced-panel").fadeIn(500);
                // Get the data for this panel
                $.get(globalFile, {
                    action: "advanced",
                    flag: "advanced"
                })
                    .done(function(notice) {
                        // Set the data from ajax
                        $(".advanced-panel .top-container").html(notice);
                    });
            } else if (status == "advanced") {
                // Show the correct panel and set the button state
                $(".adv-button").attr("data-status", "default");
                $(".adv-button").removeClass('active');
                $(".advanced-panel").fadeOut(500);
                $(".default-panel").fadeIn(500);
            }
            break;
        case 'refresh':
            // Animated it
            $(".refresh-button").addClass('fa-spin');
            // Refresh the values
            output('uptime', 'refresh');
            output('time', 'refresh');
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
            var uptime = "";
            if ($("#days").attr('data-value') !== 0) uptime += $("#days").attr('data-value') + " days ";
            if ($("#hours").attr('data-value') !== 0) uptime += $("#hours").attr('data-value') + " hours ";
            if ($("#minutes").attr('data-value') !== 0) uptime += $("#minutes").attr('data-value') + " minutes";
            // Set the tweet
            var text = uptime + " server uptime. Can you beat this? via";
            // Set the hashtag
            var hashtag = "uptimey,devops";
            // Open the Twitter share window
            window.open('http://twitter.com/share?url=' + url + '&text=' + text + '&hashtags=' + hashtag + '&', 'twitterwindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 225) + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
            break;
        case 'screenshot':
            var screenshotButton = $('.screenshot-button');
            // Animated it
            screenshotButton.addClass('pulse');
            screenshotButton.on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                $(this).removeClass("pulse");
            });
            // Check the button status
            if (screenshotButton.hasClass('fa-camera')) {
                // Change the button icon
                screenshotButton.removeClass('fa-camera').addClass('fa-download');
                // Create an image from canvas
                html2canvas(document.body, {
                    onrendered: function(canvas) {
                        // Save the canvas to a data URL
                        var dataURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                        // Set the data url on the screenshot button
                        screenshotButton.attr('href', dataURL);
                        // Get the current date for the filename
                        fileName = moment().format('DDMMYYYYHHmmss');
                        // Set the filename on the screenshot button 
                        screenshotButton.attr('download', 'Screenshot_' + fileName + '.png');
                    }
                });
            } else {
                setTimeout(function(){
                    // Change the button icon
                    screenshotButton.removeClass('fa-download').addClass('fa-camera');
                    screenshotButton.removeAttr("href").removeAttr("download");
                }, 3000);
            }
            break;
        case 'clear':
            // Clear the session
            $.get(globalFile, {
                action: "clear"
            });
            break;
    }
}