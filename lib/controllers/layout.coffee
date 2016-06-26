(($, _) ->

  $document = $(document)

  Layout = 
    init: ->
      @$server = $('#server')
      if @$server.length > 0
        @drawServer()
        @drawBranches()
      return
      return
    drawServer: ->
      server = SVG('server').attr(
        viewBox: '0 0 64 64'
      )
      group  = server.group()
      group.path('M52, 55.5c0, 1.1-0.9, 2-2, 2H14c-1.1, 0-2-0.9-2-2V8.5c0-1.1, 0.9-2, 2-2H50c1.1, 0, 2, 0.9, 2, 2V55.5z')
      group.line(12, 22.7, 52, 22.7)
      group.line(12, 39.7, 50.8, 39.7)
      group.circle(2).attr(
        cx: 44
        cy: 13
      )
      group.circle(2).attr(
        cx: 44
        cy: 32
      )
      group.circle(2).attr(
        cx: 44
        cy: 49
      )
      group.line(19.3, 13.5, 37.3, 13.5)
      group.line(19.3, 32.5, 37.3, 32.5)
      group.line(19.3, 49.5, 37.3, 49.5)
      return
    drawBranches: ->
      branch = SVG('branch').attr(
        viewBox: '0 0 64 64'
      )
      group = branch.group()
      group.path('m0.75,3.21589l271.31125,-2.46589c0.60696,0 37.02458,13.56242 0.60696,33.28957c-36.41762,19.72715 3.64176,56.71556 -37.63154,19.72715c-41.2733,-36.98841 -63.12387,40.68725 -63.73083,40.68725')
      return

  $document.ready ->

    if $('#default-layout').length > 0
      Layout.init()
    return

  return

) window.jQuery, window._