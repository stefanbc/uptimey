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

### Button action ###
action = (type) ->
  status = ''
  switch type
    when 'toggle'
      # Get the status of the button
      status = $('.toggle-button').attr('data-status')
      # Check the status
      if status is 'closed'
        # Animate the container (bring it down)
        $('.button-container').animate top: 0
        # Change the button status
        $('.toggle-button').attr 'data-status', 'open'
        # Change the icon
        $('.toggle-button').removeClass 'fa-angle-double-down'
        $('.toggle-button').addClass 'fa-angle-double-up'
      else if status is 'open'
        # Animate the container (bring it up)
        $('.button-container').animate top: '-80px'
        # Change the button status
        $('.toggle-button').attr 'data-status', 'closed'
        # Change the icon
        $('.toggle-button').removeClass 'fa-angle-double-up'
        $('.toggle-button').addClass 'fa-angle-double-down'
      return
    when 'adv'
      # Animated it
      $('.adv-button').addClass 'pulse'
      $('.adv-button').on 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
        $(this).removeClass 'pulse'
        return
      # Get the status of the button
      status = $('.adv-button').attr('data-status')
      # Check the state
      if status is 'default'
        # Show the correct panel and set the button state
        $('.adv-button').attr 'data-status', 'advanced'
        $('.adv-button').addClass 'active'
        $('.default-panel').fadeOut 500
        $('.advanced-panel').fadeIn 500
        # Get the data for this panel
        $.ajax globalFile,
          method : 'GET'
          data   : 
            action : 'advanced',
            flag   : 'advanced'
          success: (notice) ->
            # Set the data from ajax
            $('.advanced-panel .top-container').html notice
            return
      else if status is 'advanced'
        # Show the correct panel and set the button state
        $('.adv-button').attr 'data-status', 'default'
        $('.adv-button').removeClass 'active'
        $('.advanced-panel').fadeOut 500
        $('.default-panel').fadeIn 500
      return
    when 'refresh'
      # Animated it
      $('.refresh-button').addClass 'fa-spin'
      # Refresh the values
      output 'uptime', 'refresh'
      output 'time', 'refresh'
      output 'ping'
      # Stop animation after 1s
      setTimeout (->
        $('.refresh-button').removeClass 'fa-spin'
        return
      ), 1000
      return
    when 'twitter'
      # Animated it
      $('.twitter-button').addClass 'pulse'
      $('.twitter-button').on 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
        $(this).removeClass 'pulse'
        return
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
      window.open "http://twitter.com/share?url=#{projectLink}&text=#{text}&hashtags=#{hashtag}&", 'twitterwindow', 'height=450, width=550, top=' + $(window).height() / 2 - 225 + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0'
      return
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
        ), 3000
      return
    when 'clear'
      # Clear the session
      $.ajax globalFile,
        method : 'GET'
        data   : 
          action : 'clear'
      return
