# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

horizontal = ['left', 'right']
vertical = ['up', 'down']


$ ->
  directionCheck = (fish) ->
    if parseInt( (fish.css 'top').slice(0,-2) )  > window.innerHeight - 110
      fish.removeClass "down"
      fish.addClass "up"

    if parseInt( (fish.css 'top').slice(0,-2) )  < 0
      fish.removeClass "up"
      fish.addClass "down"

    if parseInt( (fish.css 'left').slice(0,-2) )  > window.innerWidth - 300
      fish.removeClass "right"
      fish.addClass "left"

    if parseInt( (fish.css 'left').slice(0,-2) )  < 0
      fish.removeClass 'left'
      fish.addClass 'right'

  movement = (fish) ->
    directionCheck fish
    fClass = fish.attr 'class'
    move = 1
    currentTop = parseInt( (fish.css 'top').slice(0,-2) )
    currentLeft = parseInt( (fish.css 'left').slice(0, -2) )

    if fClass.includes 'down'
      fish.css 'top', currentTop + move + "px"

    if fClass.includes 'up'
      fish.css 'top', currentTop - move + "px"

    if fClass.includes 'left'
      fish.css 'left', currentLeft - move + "px"

    if fClass.includes 'right'
      fish.css 'left', currentLeft + move + "px"


  $(".fishbody").each () ->
    $(this).css { top: Math.random() * window.innerHeight + "px", left: Math.random() * window.innerWidth + "px"}
    $(this).addClass vertical[Math.round(Math.random())]
    $(this).addClass horizontal[Math.round(Math.random())]
    $(this).children('.tail').css('animation', "wiggle 0.3s linear "+Math.random()+"s alternate infinite")
    return


  update = () ->
    a = requestAnimationFrame(update)
    if a % 6 == 0
      $(".fishbody").each () ->
        movement $(this)

  update()
