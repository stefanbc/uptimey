###
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
###

### Set the global files ###

globalFile = 'core/controllers/maincontroller.php'

### Set the global vars ###

globalLocation = ''
globalSunrise = ''
globalSunset = ''

### Output the data requested ###

module.exports.output = (type, setFlag) ->
  switch type
    when 'image'
      $.get(globalFile, action: type).done (image) ->
        # Split the output
        image = image.split(';')
        # Add the image as background-image on body
        $('body').css 'backgroundImage', 'url(' + image[0] + ')'
        # Set the copyright
        $('#copy').html 'Powered by Uptimey. Fork on <a href=\'https://github.com/stefanbc/uptimey\'>Github</a> <br> Image - ' + image[1]
        return
    when 'location'
      $.get(globalFile, action: type).done (location) ->
        # Set up the URL for location call using ipinfo.io
        ip_geocode = 'http://ipinfo.io/' + location + '/json'
        # Get the response and set the value
        $.getJSON ip_geocode, (response) ->
          # Add it to the element with an animation
          $('#location').text(response.city + ', ' + response.region + ', ' + response.country).addClass 'fadeIn'
          # Add latlong for maps href
          latlong = response.loc.split(',')
          $('#location').attr 'data-latlong', latlong[0] + '+' + latlong[1]
          # Set the global location
          globalLocation = response.city + ', ' + response.region + ', ' + response.country
          # Set the sunrise/sunset times
          $.simpleWeather
            location: globalLocation
            success: (weather) ->
              globalSunrise = weather.sunrise
              globalSunset = weather.sunset
              return
          return
        # We only animate the whole container once
        $('.location-inner').addClass 'fadeIn'
        return
    when 'uptime'
      $.get(globalFile,
        action: type
        flag: setFlag).done (uptime) ->
        # Split the output
        uptime = uptime.split(';')
        # Add it to each element with an animation
        $('#days').text(uptime[0]).addClass 'fadeIn'
        $('#days').attr 'data-value', uptime[0]
        $('#hours').text(uptime[1]).addClass 'fadeIn'
        $('#hours').attr 'data-value', uptime[1]
        $('#minutes').text(uptime[2]).addClass 'fadeIn'
        $('#minutes').attr 'data-value', uptime[2]
        # We only animate the whole container once
        $('.bottom-container').addClass 'fadeIn'
        return
    when 'time'
      $.get(globalFile,
        action: type
        flag: setFlag).done (time) ->
        # Split the output
        time = time.split(';')
        # Set the times
        $('#current').text(time[0]).addClass 'fadeIn'
        $('#time').text(time[1]).addClass 'fadeIn'
        $('#since').text(time[2]).addClass 'fadeIn'
        # Format the times
        setTimeout (->
          sunrise = moment(globalSunrise, 'h:m a').format('X')
          sunset = moment(globalSunset, 'h:m a').format('X')
          ttime = moment(time[1], 'h:m a').format('X')
          # Check if the current time is between sunset, sunrise and set the icon
          if ttime >= sunrise and ttime <= sunset
            $('.time .fa').removeClass 'fa-moon-o fa-circle-o'
            $('.time .fa').addClass 'fa-sun-o'
          else
            $('.time .fa').removeClass 'fa-sun-o fa-circle-o'
            $('.time .fa').addClass 'fa-moon-o'
          return
        ), 3000
        # We only animate the whole container once
        $('.top-container').addClass 'fadeIn'
        return
  # After the animation is done remove the class so
  # we can animate again on next iteration
  $('.val').each ->
    $(this).on 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
      $(this).removeClass 'fadeIn'
      return
    return
  return

### Button action ###

module.exports.action = (type) ->
  status = ''
  switch type
    when 'toggle'
      # Get the status of the button
      status = $('.toggle-button').attr('data-status')
      # Check the status
      if status == 'closed'
        # Animate the container (bring it down)
        $('.button-container').animate top: 0
        # Change the button status
        $('.toggle-button').attr 'data-status', 'open'
        # Change the icon
        $('.toggle-button').removeClass 'fa-angle-double-down'
        $('.toggle-button').addClass 'fa-angle-double-up'
      else if status == 'open'
        # Animate the container (bring it up)
        $('.button-container').animate top: '-80px'
        # Change the button status
        $('.toggle-button').attr 'data-status', 'closed'
        # Change the icon
        $('.toggle-button').removeClass 'fa-angle-double-up'
        $('.toggle-button').addClass 'fa-angle-double-down'
    when 'adv'
      # Animated it
      $('.adv-button').addClass 'pulse'
      $('.adv-button').on 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
        $(this).removeClass 'pulse'
        return
      # Get the status of the button
      status = $('.adv-button').attr('data-status')
      # Check the state
      if status == 'default'
        # Show the correct panel and set the button state
        $('.adv-button').attr 'data-status', 'advanced'
        $('.adv-button').addClass 'active'
        $('.default-panel').fadeOut 500
        $('.advanced-panel').fadeIn 500
        # Get the data for this panel
        $.get(globalFile,
          action: 'advanced'
          flag: 'advanced').done (notice) ->
          # Set the data from ajax
          $('.advanced-panel .top-container').html notice
          return
      else if status == 'advanced'
        # Show the correct panel and set the button state
        $('.adv-button').attr 'data-status', 'default'
        $('.adv-button').removeClass 'active'
        $('.advanced-panel').fadeOut 500
        $('.default-panel').fadeIn 500
    when 'refresh'
      # Animated it
      $('.refresh-button').addClass 'fa-spin'
      # Refresh the values
      output 'uptime', 'refresh'
      output 'time', 'refresh'
      # Stop animation after 1s
      setTimeout (->
        $('.refresh-button').removeClass 'fa-spin'
        return
      ), 1000
    when 'twitter'
      # Animated it
      $('.twitter-button').addClass 'pulse'
      $('.twitter-button').on 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
        $(this).removeClass 'pulse'
        return
      # The action
      # Set the URL
      url = 'https://github.com/stefanbc/uptimey'
      # Get the current uptime
      uptime = ''
      if $('#days').attr('data-value') != 0
        uptime += $('#days').attr('data-value') + ' days '
      if $('#hours').attr('data-value') != 0
        uptime += $('#hours').attr('data-value') + ' hours '
      if $('#minutes').attr('data-value') != 0
        uptime += $('#minutes').attr('data-value') + ' minutes'
      # Set the tweet
      text = uptime + ' server uptime. Can you beat this? via'
      # Set the hashtag
      hashtag = 'uptimey,devops'
      # Open the Twitter share window
      window.open 'http://twitter.com/share?url=' + url + '&text=' + text + '&hashtags=' + hashtag + '&', 'twitterwindow', 'height=450, width=550, top=' + $(window).height() / 2 - 225 + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0'
    when 'screenshot'
      screenshotButton = $('.screenshot-button')
      # Animated it
      screenshotButton.addClass 'pulse'
      screenshotButton.on 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
        $(this).removeClass 'pulse'
        return
      # Check the button status
      if screenshotButton.hasClass('fa-camera')
        # Change the button icon
        screenshotButton.removeClass('fa-camera').addClass 'fa-download'
        # Create an image from canvas
        html2canvas document.body, onrendered: (canvas) ->
          # Save the canvas to a data URL
          dataURL = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
          # Set the data url on the screenshot button
          screenshotButton.attr 'href', dataURL
          # Get the current date for the filename
          fileName = moment().format('DDMMYYYYHHmmss')
          # Set the filename on the screenshot button 
          screenshotButton.attr 'download', 'Screenshot_' + fileName + '.png'
          return
      else
        setTimeout (->
          # Change the button icon
          screenshotButton.removeClass('fa-download').addClass 'fa-camera'
          screenshotButton.removeAttr('href').removeAttr 'download'
          return
        ), 3000
    when 'clear'
      # Clear the session
      $.get globalFile, action: 'clear'
  return