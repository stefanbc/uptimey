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

init = ->
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

# When the page finishes loading
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

  ### Click action on each top button ###
  $('.button').each ->
    $(this).on 'click', ->
      buttonAction = $(this).attr('data-action')
      action buttonAction
      return
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
