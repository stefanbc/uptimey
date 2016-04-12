### Get a value from the config file ###
readConfig = (property) ->
  $.getJSON "#{configFile}?ver=#{moment().format('X')}", (configObject) ->
    console.log configObject[property]
    return configObject[property]
  
### Show a notice upon request ###
notice = (text) ->
  $('.notice').remove()
  $('body').append "<div class='fadeIn notice'>#{text}</div>"