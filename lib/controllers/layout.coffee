(($, _) ->

  $document = $(document)

  Layout = 
    tolerance: 4
    init: ->
      _.bindAll this
      preference = undefined
      @$sidebar = $('.sidebar-cloud')
      @$layoutWrapper = $('.layout-wrapper')
      @$sidebarControl = $('.layout-sidebar-controls')
      @$copyright = $('.cloud-copyright')
      @$body = $('body')
      @$navLinks = $('#nav .top')
      @$menus = $('#nav .top .sub')
      @$sidebarControl.find('.minimize-menu, .expand-menu').tooltip
        placement: 'right'
        animation: false
      @open = false
      if window._sidebarCollapseTest()
        @minimize true
      else
        preference = @getPreference()
        if preference != undefined
          @minimize preference
      @$sidebarControl.click @clickMinimize
      $window.resize @resizeWindow
      @$navLinks.find('a.top_link').click @clickItem
      $document.mousemove @documentMouseMove
      @$navLinks.find('a.top_link').mouseenter @hoverCallback('hover-in', @hoverInItem)
      @$navLinks.mouseenter @hoverBackInItem
      @$navLinks.mouseleave @hoverCallback('hover-out', @hoverOutItem)
      @timeouts = {}
      return
    resetTracking: ->
      @initialX = @x
      @tracking = true
      @difference = 0
      return
    documentMouseMove: (ev) ->
      @x = ev.pageX
      if @tracking
        diff = Math.abs(@x - (@initialX))
        if diff > @difference
          @difference = diff
      return
    hoverCallback: (identifier, callback) ->
      _.bind ((ev) ->
        $item = $(ev.currentTarget)
        if identifier == 'hover-in'
          $item = $item.parent()
        if @isMinimized()
          if !@open
            callback $item, false
          else
            if identifier == 'hover-in' and @difference < @tolerance
              callback $item, true
            else
              @setTimeout $item, identifier, ->
                callback $item, true
                return
        return
      ), this
    hoverBackInItem: (ev) ->
      $item = $(ev.currentTarget)
      if @isMinimized() and @open and $item.is(@$openItem)
        @clearTimeout 'hover-in'
        @clearTimeout 'hover-out'
      return
    hoverInItem: ($item, openSubmenu) ->
      $item.addClass 'hover'
      if openSubmenu
        @openItem $item
      return
    hoverOutItem: ($item) ->
      $item.removeClass 'hover'
      @closeItem $item
      return
    setTimeout: ($caller, identifier, callback) ->
      if @timeouts[identifier]
        window.clearTimeout @timeouts[identifier]
      if $caller.data('timeout')
        window.clearTimeout $caller.data('timeout')
      @timeouts[identifier] = window.setTimeout(_.bind(callback, this), 500)
      $caller.data 'timeout', @timeouts[identifier]
      return
    clearTimeout: (identifier) ->
      window.clearTimeout @timeouts[identifier]
      return
    clickItem: (ev) ->
      $this = $(ev.currentTarget).parent()
      $sub = $this.find('.sub')
      url = $this.find('a').attr('href')
      if url == '#' or url == ''
        if $this.hasClass('open')
          if $sub.has($(ev.target)).length == 0
            @closeItem $this
            return false
        else
          @$navLinks.each _.bind(((i, item) ->
            @closeItem $(item)
            return
          ), this)
          @openItem $this
          @setDocumentClick $this
          return false
      return
    clickMinimize: ->
      @minimize null, true
      return
    clickBody: (ev) ->
      $target = $(ev.target)
      if window._sidebarCollapseTest() and @$sidebar.has($target).length == 0 and !@$sidebar.is($target)
        @minimize true
      return
    openItem: ($item) ->
      @closeItem @$navLinks.filter('.open'), true
      $item.addClass 'open'
      @$openItem = $item
      @open = true
      @resetTracking()
      return
    closeItem: ($item) ->
      $item.removeClass('open').removeClass('hover').trigger 'close'
      # Make sure there's no residual actions.
      window.clearTimeout $item.data('timeout')
      delete @$openItem
      @open = false
      return
    setDocumentClick: ($button) ->
      $document.one 'mousedown', _.bind(((ev) ->
        if ev.target
          $target = $(ev.target)
          if $button.has($target).length == 0 and $button.filter($target).length == 0
            @closeItem $button
          else
            @setDocumentClick $button
        else
          @closeItem $button
        return
      ), this)
      return
    resizeWindow: ->
      @minimize window._sidebarCollapseTest()
      return
    getPreference: ->
      preference = window.getCookie('isMenuCollapsed')
      if preference == 'true'
        return true
      if preference == 'false'
        return false
      undefined
    isMinimized: ->
      @$layoutWrapper.hasClass 'sidebar-closed'
    minimize: (minimize, clicked) ->
      minimize = if minimize != false and minimize != true then !@isMinimized() else minimize
      @$body.off 'mousedown', @clickBody
      @$sidebarControl.children(':visible').tooltip 'hide'
      setTimeout _.bind((->
        if minimize
          @$layoutWrapper.addClass 'sidebar-closed'
          @$body.addClass 'sidebar-closed'
          window.setCookie 'isMenuCollapsed', true, 365
        else
          @$layoutWrapper.removeClass 'sidebar-closed'
          @$body.removeClass('sidebar-closed').on 'mousedown', @clickBody
          window.setCookie 'isMenuCollapsed', false, 365
        if clicked
          @$sidebarControl.children(':visible').tooltip 'show'
        if window.resize_fixed_header != undefined
          window.resize_fixed_header()
          setTimeout window.resize_fixed_header, 50
        $(document).trigger 'smart-report-resize'
        return
      ), this), 50
      return

  $document.ready ->
    
    rsr = Raphael('rsr', '64', '64')
    group_a = rsr.set()
    path_b = rsr.path('M52,55.5c0,1.1-0.9,2-2,2H14c-1.1,0-2-0.9-2-2V8.5c0-1.1,0.9-2,2-2H50c1.1,0,2,0.9,2,2V55.5z').attr(
        fill: 'none'
        stroke: '#4D4D4D'
        'stroke-linecap': 'round'
        'stroke-linejoin': 'round'
        'stroke-miterlimit': '10'
        'stroke-width': '2'
        parent: 'group_a'
        'stroke-opacity': '1').data('id', 'path_b')
    circle_c = rsr.circle(44, 13, 2).attr(
        fill: 'none'
        stroke: '#4D4D4D'
        'stroke-linecap': 'round'
        'stroke-linejoin': 'round'
        'stroke-miterlimit': '10'
        'stroke-width': '2'
        parent: 'group_a'
        'stroke-opacity': '1').data('id', 'circle_c')
    circle_d = rsr.circle(44, 32, 2).attr(
        fill: 'none'
        stroke: '#4D4D4D'
        'stroke-linecap': 'round'
        'stroke-linejoin': 'round'
        'stroke-miterlimit': '10'
        'stroke-width': '2'
        parent: 'group_a'
        'stroke-opacity': '1').data('id', 'circle_d')
    circle_e = rsr.circle(44, 49, 2).attr(
        fill: 'none'
        stroke: '#4D4D4D'
        'stroke-linecap': 'round'
        'stroke-linejoin': 'round'
        'stroke-miterlimit': '10'
        'stroke-width': '2'
        parent: 'group_a'
        'stroke-opacity': '1').data('id', 'circle_e')
    group_a.attr 'name': 'group_a'
    rsrGroups = [ group_a ]
    group_a.push path_b, circle_c, circle_d, circle_e

    if $('.sidebar-cloud').length > 0
      Layout.init()
      window.Layout = Layout
    return

  return

) window.jQuery, window._