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

// When the page finishes loading
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

    /* At an interval of 1 min we refresh the uptime and time */
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

// Clear session on tab close
$(window).bind('beforeunload', function() {
    action('clear');
});