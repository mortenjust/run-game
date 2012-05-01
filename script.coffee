


targetSpeed = getParameterByName 'speed'
if !targetSpeed then targetSpeed = 13

duration = getParameterByName 'duration'
if !duration then duration = 120

points = 0

$ ->
	setTimeout ->
		window.scrollTo 0, 1
	,0

	navigator.geolocation.watchPosition updatePosition, noPosition, {}
	
	window.setInterval countdown, 1000

	$('#points').html "100"
	$('#target').html targetSpeed


updatePosition = (p) ->
	speed = (p.coords.speed * 3.6).toFixed 1
	$('#speed').html speed

	#dif between speed and target speed
	difference = speed - targetSpeed
	updatePoints Math.abs(difference)
	updateMeter difference
	updateCheer difference

	status "#{p.coords.accuracy} accuracy, #{p.coords.altitude} altitude, #{p.coords.latitude} #{p.coords.longitude}"
	console.log p

noPosition = (e) ->

status = (s) ->
	$('#status').html s
	
countdown = ->
	$('#time').html duration--
	if duration is 0
		alert Math.round points

updatePoints = (howMuch) -> 
	$('#points').html Math.round (points+=howMuch)
 

updateMeter = (diff) ->
	meter = $('#meter')
	indicator = $('#indicator')
	
	if diff < -3 then diff = -3	
	if diff > 3 then diff = 3

	newPos = ((diff+3)/6)*100
	indicator.css 'left', newPos+'%'

	if 0 < newPos < 20 then lightUpSegment 20
	if 20 < newPos < 40 then lightUpSegment 40
	if 40 < newPos < 60 then lightUpSegment 60
	if 60 < newPos < 80 then lightUpSegment 80
	if 80 < newPos < 100 then lightUpSegment 80


lightUpSegment = (seg) ->
	$('.segment').css 'opacity', '.3'
	$('#seg'+seg).css 'opacity', '1'


updateCheer = (diff) ->
	cheer = $('#cheer')
	cheer.css 'opacity', '0'
	if diff < 0 then message = "GO FASTER"
	if diff > 0 then message = "SLOW DOWN"
	if 0.5 > diff > -0.5 then message = "KEEP GOING"	
	cheer.css 'opacity', '1'
	cheer.html message
