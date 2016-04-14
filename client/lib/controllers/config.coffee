sheet = do ->
  # Create the <style> tag
  style = document.createElement 'style'
  style.appendChild document.createTextNode ''
  # Add the <style> element to the page
  document.head.appendChild style
  style.sheet

addCSSRule = (sheet, selector, rules, index) ->
  if 'insertRule' of sheet
    sheet.insertRule selector + '{' + rules + '}', index
  else if 'addRule' of sheet
    sheet.addRule selector, rules, index
  return

### Get a value from the config file ###
config = ->
  $.ajax globalFile,
    method : 'GET'
    data   : 
      action : 'override',
      flag   : 'override'
    error  : (response) ->
      console.log response
    success: (configObject) ->

      config = $.parseJSON configObject
      
      if not empty config.background_color
        bodyRules  = "background-color: #{config.background_color};"
      if not empty config.font_family
        bodyRules += "font-family: #{config.font_family};"
      if not empty config.font_color
        bodyRules += "color: #{config.font_color};"
      
      addCSSRule sheet, 'body', bodyRules, 0
      
      if config.remove_menu is true
        menuRules = "display: none"
        addCSSRule sheet, '.button-container', menuRules, 0
      
      if config.default_view is 'advanced'
        action 'advanced'
      
      if config.show_location is false
        locationRules = "display: none"
        addCSSRule sheet, '.location-inner', locationRules, 0
        
      if config.show_menu_always is true
        action 'toggle'

      return
  return