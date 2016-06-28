(($, _) ->

  $document = $(document)

  Layout = 
    init: ->
      @$server = $('#server')
      if @$server.length > 0
        @drawLayout()
      return
      return
    drawLayout: ->

      server = SVG('server')

      networkWrapper = server.group()
      icon = networkWrapper.group().attr 'id', 'icon-wrapper'
      branches = networkWrapper.group().attr 'id', 'branches-wrapper'

      icon.path('M52, 55.5c0, 1.1-0.9, 2-2, 2H14c-1.1, 0-2-0.9-2-2V8.5c0-1.1, 0.9-2, 2-2H50c1.1, 0, 2, 0.9, 2, 2V55.5z')
      icon.line(12, 22.7, 52, 22.7)
      icon.line(12, 39.7, 50.8, 39.7)
      icon.circle(4).attr(
        cx: 44
        cy: 13
      )
      icon.circle(4).attr(
        cx: 44
        cy: 32
      )
      icon.circle(4).attr(
        cx: 44
        cy: 49
      )
      icon.line(19.3, 13.5, 37.3, 13.5)
      icon.line(19.3, 32.5, 37.3, 32.5)
      icon.line(19.3, 49.5, 37.3, 49.5)

      for key of branchesObject
        if branchesObject.hasOwnProperty(key)
          obj = branchesObject[key]
          for prop of obj
            if obj.hasOwnProperty(prop)
              poz = obj['end'].split ','
              branches.path(obj['path']).attr 'class', 'serverBranch'
              branches.ellipse(3, 3).attr(
                cx: poz[0]
                cy: poz[1]
              )
      return

  $document.ready ->

    if $('#default-layout').length > 0
      Layout.init()
    return

  return

) window.jQuery, window._