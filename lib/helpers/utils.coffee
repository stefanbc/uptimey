### Animate element ###
animateElement = (element) ->
  $(element).addClass 'pulse'
  $(element).on 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
    $(this).removeClass 'pulse'
    return

### Change button icon ###
changeIcon = (element, removedClass, addedClass) ->
  if element is 'this'
    $(this).removeClass(removedClass).addClass(addedClass)
  else
    $(element).removeClass(removedClass).addClass(addedClass)

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