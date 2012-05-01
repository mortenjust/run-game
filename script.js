(function() {
  var countdown, duration, lightUpSegment, noPosition, points, status, targetSpeed, updateCheer, updateMeter, updatePoints, updatePosition;

  targetSpeed = getParameterByName('speed');

  if (!targetSpeed) targetSpeed = 13;

  duration = getParameterByName('duration');

  if (!duration) duration = 120;

  points = 0;

  $(function() {
    setTimeout(function() {
      return window.scrollTo(0, 1);
    }, 0);
    navigator.geolocation.watchPosition(updatePosition, noPosition, {});
    window.setInterval(countdown, 1000);
    $('#points').html("100");
    return $('#target').html(targetSpeed);
  });

  updatePosition = function(p) {
    var difference, speed;
    speed = (p.coords.speed * 3.6).toFixed(1);
    $('#speed').html(speed);
    difference = speed - targetSpeed;
    updatePoints(Math.abs(difference));
    updateMeter(difference);
    updateCheer(difference);
    status("" + p.coords.accuracy + " accuracy, " + p.coords.altitude + " altitude, " + p.coords.latitude + " " + p.coords.longitude);
    return console.log(p);
  };

  noPosition = function(e) {};

  status = function(s) {
    return $('#status').html(s);
  };

  countdown = function() {
    $('#time').html(duration--);
    if (duration === 0) return alert(Math.round(points));
  };

  updatePoints = function(howMuch) {
    return $('#points').html(Math.round(points += howMuch));
  };

  updateMeter = function(diff) {
    var indicator, meter, newPos;
    meter = $('#meter');
    indicator = $('#indicator');
    if (diff < -3) diff = -3;
    if (diff > 3) diff = 3;
    newPos = ((diff + 3) / 6) * 100;
    indicator.css('left', newPos + '%');
    if ((0 < newPos && newPos < 20)) lightUpSegment(20);
    if ((20 < newPos && newPos < 40)) lightUpSegment(40);
    if ((40 < newPos && newPos < 60)) lightUpSegment(60);
    if ((60 < newPos && newPos < 80)) lightUpSegment(80);
    if ((80 < newPos && newPos < 100)) return lightUpSegment(80);
  };

  lightUpSegment = function(seg) {
    $('.segment').css('opacity', '.3');
    return $('#seg' + seg).css('opacity', '1');
  };

  updateCheer = function(diff) {
    var cheer, message;
    cheer = $('#cheer');
    cheer.css('opacity', '0');
    if (diff < 0) message = "GO FASTER";
    if (diff > 0) message = "SLOW DOWN";
    if ((0.5 > diff && diff > -0.5)) message = "KEEP GOING";
    cheer.css('opacity', '1');
    return cheer.html(message);
  };

}).call(this);
