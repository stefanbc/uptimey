sheet = do ->
  # Create the <style> tag
  style = document.createElement 'style'
  style.appendChild document.createTextNode ''
  # Add the <style> element to the page
  document.head.appendChild style
  style.sheet

addCSSRule = (sheet, selector, rules) ->
  if 'insertRule' of sheet
    sheet.insertRule selector + '{' + rules + '}', sheet.cssRules.length
  else if 'addRule' of sheet
    sheet.addRule selector, rules, sheet.cssRules.length
  return

### Get a value from the config file ###
config = ->
  $.ajax data,
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
      
      addCSSRule sheet, 'body', bodyRules
      
      $.each config.buttons[0], (index, value) ->
        if value is false
          buttonRules = "display: none"
          addCSSRule sheet, "##{index}", buttonRules
          $("##{index}").parent().remove()
        return
      
      if config.default_view is 'advanced'
        action 'advanced'
      
      if config.menu_placement isnt 'top'
        $('.action-container').removeClass('top-menu').addClass("#{config.menu_placement}-menu")
        $('.action-container').attr 'data-position', "#{config.menu_placement}"
        switch config.menu_placement
          when 'bottom'
            changeIcon '#toggle', 'fa-angle-double-down', 'fa-angle-double-up'
            $('.action-container #toggle').insertBefore('.action-container .action-block')
      
      if config.remove_menu is true
        menuRules = "display: none"
        addCSSRule sheet, '.action-container', menuRules
        
      if config.show_location is false
        locationRules = "display: none"
        addCSSRule sheet, '#location-wrapper', locationRules
        
      if config.show_menu_always is true
        action 'toggle'

      return
  return