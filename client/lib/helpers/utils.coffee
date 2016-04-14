### Get a value from the config file ###
readConfig = (callback) ->
  requestedProperty = $.getJSON "#{configFile}?v=#{moment().format('X')}", (configObject) ->
    # Make sure the callback is a function​
    if typeof callback == 'function'
      callback configObject
      return
  return
  
### Show a notice upon request ###
notice = (text) ->
  $('.notice').remove()
  $('body').append "<div class='fadeIn notice'>#{text}</div>"

### Animate element ###
animateElement = (element) ->
  $(element).addClass 'pulse'
  $(element).on 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
    $(this).removeClass 'pulse'
    return

### Check if variable is number ###
isNumber = (obj) ->
  !isNaN(parseFloat(obj))

### Check if variable is empty ###
empty = (data) ->
  if typeof data is 'number' or typeof data is 'boolean'
    return false
  if typeof data is 'undefined' or data is null
    return true
  if typeof data.length isnt 'undefined'
    return data.length == 0
  count = 0
  for i of data
    if data.hasOwnProperty(i)
      count++
  count == 0