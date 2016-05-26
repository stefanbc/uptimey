### Button action ###
action = (type) ->
  status = ''
  switch type
    when 'toggle'
      # Get the status of the button
      status = $('#toggle').attr('data-status')
      buttonPlacement = $('#toggle').parent().attr("data-position")
      # Check the status
      if status is 'closed'
        # Animate the container (bring it down)
        $('.action-container').animate "#{buttonPlacement}": 0
        # Change the button status
        $('#toggle').attr 'data-status', 'open'
        # Change the icon
        switch buttonPlacement
          when 'top'
            changeIcon '#toggle', 'fa-angle-double-down', 'fa-angle-double-up'
          when 'bottom'
            changeIcon '#toggle', 'fa-angle-double-up', 'fa-angle-double-down'
      else if status is 'open'
        # Animate the container (bring it up)
        $('.action-container').animate "#{buttonPlacement}": '-80px'
        # Change the button status
        $('#toggle').attr 'data-status', 'closed'
        # Change the icon
        switch buttonPlacement
          when 'top'
            changeIcon '#toggle', 'fa-angle-double-up', 'fa-angle-double-down'
          when 'bottom'
            changeIcon '#toggle', 'fa-angle-double-down', 'fa-angle-double-up'
      return
    when 'advanced'
      # Animated it
      animateElement '#advanced'
      # Get the status of the button
      status = $('#advanced').attr('data-status')
      # Check the state
      if status is 'default'
        # Show the correct panel and set the button state
        $('#advanced').attr 'data-status', 'advanced'
        $('#advanced').addClass 'active'
        $('#default-panel').fadeOut 500
        $('#advanced-panel').fadeIn 500
        # Get the data for this panel
        $.ajax data,
          method : 'GET'
          data   : 
            action : 'advanced',
            flag   : 'advanced'
          success: (info) ->
            # Set the data from ajax
            $('#advanced-panel .left-container').append info
            notice "This section is still in development!"
            return
      else if status is 'advanced'
        # Show the correct panel and set the button state
        $('#advanced').attr 'data-status', 'default'
        $('#advanced').removeClass 'active'
        $('#advanced-panel').fadeOut 500
        $('#default-panel').fadeIn 500
      return
    when 'refresh'
      # Animated it
      $('#refresh').addClass 'fa-spin'
      # Refresh the values
      output 'uptime', 'refresh'
      output 'time', 'refresh'
      output 'ping'
      # Stop animation after 1s
      setTimeout (->
        $('#refresh').removeClass 'fa-spin'
        return
      ), 1000
      return
    when 'twitter'
      # Animated it
      animateElement '#twitter'
      # The action
      # Get the current uptime
      uptime = ''
      if $('#days').attr('data-value') isnt 0
        uptime += $('#days').attr('data-value') + ' days '
      if $('#hours').attr('data-value') isnt 0
        uptime += $('#hours').attr('data-value') + ' hours '
      if $('#minutes').attr('data-value') isnt 0
        uptime += $('#minutes').attr('data-value') + ' minutes'
      # Set the tweet
      text = uptime + ' server uptime. Can you beat this? via'
      # Set the hashtag
      hashtag = 'uptimey,devops'
      # Open the Twitter share window
      window.open "http://twitter.com/share?url=#{projectLink}&text=#{text}&hashtags=#{hashtag}&", 'twitterwindow', "height=450, width=550, top=#{$(window).height() / 2 - 225}, left=#{$(window).width() / 2}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0"
      return
    when 'google-plus'
      # Animated it
      animateElement '#google-plus'
      # The action
      notice "Feature still in development"
      return
    when 'facebook'
      # Animated it
      animateElement '#facebook'
      # The action
      notice "Feature still in development"
      return
    when 'screenshot'
      screenshotButton = $('#screenshot')
      # Animated it
      animateElement screenshotButton
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
        ), 3000
      return
    when 'clear'
      # Clear the session
      $.ajax data,
        method : 'GET'
        data   : 
          action : 'clear'
      return
