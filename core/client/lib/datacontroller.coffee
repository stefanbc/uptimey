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

### Output the data requested ###
output = (type, setFlag) ->
  switch type
    when 'image'
      $.ajax globalFile,
        method : 'GET'
        data   : 
          action : type
        success: (image) ->
          # Split the output
          image = image.split(';')
          # Add the image as background-image on body
          $('body').css 'backgroundImage', "url(#{image[0]})"
          # Set the copyright
          copyrightText = "Built using Uptimey. Fork on <a href='#{projectLink}'>Github</a>. Image by Unsplash."
          $('#copy').html copyrightText
          return
    when 'location'
      $.ajax globalFile,
        method : 'GET'
        data   : 
          action : type
        success: (location) ->
          # Set up the URL for location call using ipinfo.io
          ip_geocode = "http://ipinfo.io/#{location}"
          # Get the response and set the value
          $.getJSON ip_geocode, (response) ->
            # Add it to the element with an animation
            $('#location').text("#{response.city}, #{response.region}, #{response.country}").addClass 'fadeIn'
            # Add latlong for maps href
            latlong = response.loc.split(',')
            $('#location').attr 'data-latlong', "#{latlong[0]}+#{latlong[1]}"
            # Set the global location
            globalLocation = "#{response.city}, #{response.region}, #{response.country}"
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
      $.ajax globalFile,
        method : 'GET'
        data   : 
          action : type,
          flag   : setFlag
        success: (uptime) -> 
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
      $.ajax globalFile,
        method : 'GET'
        data   : 
          action : type,
          flag   : setFlag
        success: (time) ->
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
      break
  # After the animation is done remove the class so
  # we can animate again on next iteration
  $('.val').each ->
    $(this).on 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
      $(this).removeClass 'fadeIn'
      return
    return
  return