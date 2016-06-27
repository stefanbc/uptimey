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

      server = SVG('server').viewbox 0, 0, 220, 220

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

      branches.path('M 315.41 172.35 L 315.41 175.88 Q 315.41 179.41 325.41 179.41 L 418.35 179.41 Q 428.35 179.41 428.35 189.41 L 428.35 229.41 Q 428.35 239.41 438.35 239.41 L 507.76 239.41 Q 517.76 239.41 517.76 230.91 L 517.76 222.41').attr 'class', 'serverBranch'
      branches.ellipse(3, 3).attr(
        cx: 518
        cy: 219
      )
      branches.path('M 315.41 204.12 L 315.41 229.41 Q 315.41 239.41 325.41 239.41 L 378.35 239.41 Q 388.35 239.41 388.35 249.41 L 388.35 318.82 Q 388.35 328.82 398.35 328.82 L 434.76 328.82').attr 'class', 'serverBranch'
      branches.ellipse(3, 3).attr(
        cx: 438
        cy: 329
      )
      branches.path('M 253.06 234.71 L 207.76 234.71 Q 197.76 234.71 197.76 244.71 L 197.76 258.82 Q 197.76 268.82 207.76 268.82 L 278.35 268.82 Q 288.35 268.82 288.35 278.82 L 288.35 318.82 Q 288.35 328.82 279.85 328.82 L 271.35 328.82').attr 'class', 'serverBranch'
      branches.ellipse(3, 3).attr(
        cx: 268
        cy: 329
      )
      branches.path('M 253.06 110 L 238.35 110 Q 228.35 110 228.35 100 L 228.35 75.29 Q 228.35 65.29 238.35 65.29 L 245.12 65.29 Q 251.88 65.29 251.88 55.29 L 251.88 11.82').attr 'class', 'serverBranch'
      branches.ellipse(3, 3).attr(
        cx: 252
        cy: 9
      )
      branches.path('M 283.65 110 L 283.65 74.12 Q 283.65 64.12 293.65 64.12 L 438.35 64.12 Q 448.35 64.12 448.27 54.12 L 448.02 22').attr 'class', 'serverBranch'
      branches.ellipse(3, 3).attr(
        cx: 448
        cy: 19
      )
      branches.path('M 315.41 141.76 L 315.41 129.41 Q 315.41 119.41 325.41 119.41 L 418.35 119.41 Q 428.35 119.41 428.35 124.12 L 428.35 126.47 Q 428.35 128.82 438.35 128.82 L 494.76 128.82').attr 'class', 'serverBranch'
      branches.ellipse(3, 3).attr(
        cx: 498
        cy: 129
      )
      branches.path('M 189.53 172.35 L 189.53 172.94 Q 189.53 173.53 179.53 173.53 L 108.94 173.53 Q 98.94 173.53 98.94 166.47 L 98.94 162.94 Q 98.94 159.41 88.94 159.41 L 67.76 159.41 Q 57.76 159.41 57.76 169.41 L 57.76 189.41 Q 57.76 199.41 47.76 199.41 L 11.35 199.41').attr 'class', 'serverBranch'
      branches.ellipse(3, 3).attr(
        cx: 8
        cy: 199
      )
      branches.path('M 189.53 141.76 L 189.53 118.82 Q 189.53 108.82 179.53 108.82 L 58.35 108.82 Q 48.35 108.82 48.35 98.82 L 48.35 62.41').attr 'class', 'serverBranch'
      branches.ellipse(3, 3).attr(
        cx: 48
        cy: 59
      )
      branches.path('M 189.53 204.12 L 158.35 204.12 Q 148.35 204.12 148.35 214.12 L 148.35 318.82 Q 148.35 328.82 138.35 328.82 L 47.76 328.82 Q 37.76 328.82 37.76 320.32 L 37.76 311.82').attr 'class', 'serverBranch'
      branches.ellipse(3, 3).attr(
        cx: 38
        cy: 309
      )
      return

  $document.ready ->

    if $('#default-layout').length > 0
      Layout.init()
    return

  return

) window.jQuery, window._