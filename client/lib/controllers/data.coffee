### Output the data requested ###
output = (type, setFlag) ->
  switch type
    when 'image'
      $.ajax data,
        method : 'GET'
        data   : 
          action : type
        success: (image) ->
          # Split the output
          image = image.split(';')
          # Add the image as background-image on body
          $('body').css 'backgroundImage', "url(#{image[0]})"
          return
    when 'location'
      $.ajax data,
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
            LOCATION = "#{response.city}, #{response.region}, #{response.country}"
            # Set the sunrise/sunset times
            $.simpleWeather
              location: LOCATION
              success: (weather) ->
                SUNRISE = weather.sunrise
                SUNSET  = weather.sunset
                return
            return
          # We only animate the whole container once
          $('.location-inner').addClass 'fadeIn'
          return
    when 'uptime'
      $.ajax data,
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
      $.ajax data,
        method : 'GET'
        data   : 
          action : type,
          flag   : setFlag
        success: (time) ->
          # Split the output
          time = time.split(';')
          # Set the times
          $('#current').text(time[0]).addClass 'fadeIn'
          # Set blinking time
          outputTime = time[1].split(':');
          $('#time').html("#{outputTime[0]}<span class='blink'>:</span>#{outputTime[1]}").addClass 'fadeIn'
          $('#since').text(time[2]).addClass 'fadeIn'
          # Format the times
          setTimeout (->
            sunrise = moment(SUNRISE, 'h:m a').format('X')
            sunset  = moment(SUNSET, 'h:m a').format('X')
            ttime   = moment(time[1], 'h:m a').format('X')
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
    when 'ping'
      $.ajax data,
        method : 'GET'
        data   :
          action : type
        error  : (jqXHR, status) ->
          notice status
        success: (ping) ->
          notice ping
      break
  # After the animation is done remove the class so
  # we can animate again on next iteration
  $('.val').each ->
    $(this).on 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
      $(this).removeClass 'fadeIn'
      return
    return
  return