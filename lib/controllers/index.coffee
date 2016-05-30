### Init main function ###
init = ->
  
  config()

  # Add the animation base class
  $('.top-container').addClass 'animated'
  $('.bottom-container').addClass 'animated'
  $('.val').addClass 'animated'
  $('.button').addClass 'animated'
  
  # Get the image
  output 'image'
  # Get the location
  output 'location'
  # Get the uptime
  output 'uptime'
  # Get the time (let uptime be the first request so that the session updates needed values for time)
  output 'time'

### When the page finishes loading ###
$ ->

  ### Start initial load ###
  init()
  ### End initial load ###
  
  ### At an interval of 1 min we refresh the uptime and time ###
  setInterval (->
    output 'uptime'
    output 'time'
    return
  ), 1000 * 60
  
  setInterval (->
    output 'ping'
    return
  ), 1000 * 60 * 5

  ### Click action on each top button ###
  $('header span.action').each ->
    $(this).on 'click', ->
      buttonAction = $(this).attr('data-action')
      action buttonAction
      return
    return
  
  $('#axis-wrapper ul li span').each ->
    $(this).hover (->
      changeIcon this, 'fa-dot-circle-o', 'fa-circle'
      return
    ), ->
      changeIcon this, 'fa-circle', 'fa-dot-circle-o'
      return
  
  ### Click action for location ###
  $('#location').on 'click', ->
    latlong = $(this).attr('data-latlong')
    window.location.href = "https://www.google.com/maps/place/#{latlong}"
    return
  return

#   ### Clear everything on refresh of close ###
#   $(window).bind 'beforeunload', ->
#     action 'clear'
#     return
#   return