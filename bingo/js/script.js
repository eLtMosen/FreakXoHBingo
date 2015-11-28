$(document).ready(function() {

  var AnzahlBuzzwords = 57;
  var benutzteKarten = new Array(AnzahlBuzzwords);
  var geklicktArray = new Array(48);
  var gewinnArray = {
    "Vertikal1": [0, 1, 2, 3, 4, 5, 6],
    "Vertikal2": [7, 8, 9, 10, 11, 12, 13],
    "Vertikal3": [14, 15, 16, 17, 18, 19, 20],
    "Vertikal4": [21, 22, 23, 48, 24, 25, 26],
    "Vertikal5": [27, 28, 29, 30, 31, 32, 33],
    "Vertikal6": [34, 35, 36, 37, 38, 39, 40],
    "Vertikal7": [41, 42, 43, 44, 45, 46, 47],
    "Horizontal1": [0, 7, 14, 21, 27, 34, 41],
    "Horizontal2": [1, 8, 15, 22, 28, 35, 42],
    "Horizontal3": [2, 9, 16, 23, 29, 36, 43],
    "Horizontal4": [3, 10, 17, 48, 30, 37, 44],
    "Horizontal5": [4, 11, 18, 24, 31, 38, 45],
    "Horizontal6": [5, 12, 19, 25, 32, 39, 46],
    "Horizontal7": [6, 13, 20, 26, 33, 40, 47],
    "Diagonal1": [0, 8, 16, 48, 31, 39, 47],
    "Diagonal2": [6, 12, 18, 48, 29, 35, 41],
    "FreakshowF": [15, 16, 17, 18, 19, 22, 28, 30, 35, 48],
    "Diamant": [3, 9, 11, 15, 19, 21, 26, 28, 32, 36, 38, 44],
    "atzeichen": [1, 2, 3, 4, 5, 6, 7, 13, 14, 17, 18, 20, 21, 23, 24, 26, 27, 30, 31, 33, 34, 38, 40, 42, 43, 44, 47],
    "Bierkrug": [8, 9, 10, 11, 12, 20, 26, 28, 29, 30, 31, 32, 35, 38, 43, 44],
    "Apfel": [3, 4, 9, 10, 11, 12, 16, 17, 18, 19, 20, 22, 23, 24, 25, 27, 29, 30, 31, 32, 33, 36, 39, 48]
  }
  var erreichteBingos = new Array(21);
  var nummer = 0;

  init();

  function enthaeltAlle(nadeln, heuhaufen) {
    for (var i = 0, len = nadeln.length; i < len; i++) {
      if ($.inArray(nadeln[i], heuhaufen) == -1) return false;
    }
    return true;
  }

  function init() {
    for (var i = 0; i < 48; i++) {
      karte_fuellen(i);
    }

    var l = 1;
    for (var k = 1; k < AnzahlBuzzwords; k++) {
      if (benutzteKarten[k] != true) {
        $('#fehlt' + l).html('<img src="images/' + k + '.svg">');
        l++;
      }
    }
  }

  function karte_fuellen(i) {
    nummer = (Math.floor(Math.random() * AnzahlBuzzwords) + 1); -

    if (benutzteKarten[nummer] != true) {
      $('#zelle' + i).html('<img src="images/' + nummer + '.svg">');
      benutzteKarten[nummer] = true;
    } else {
      karte_fuellen(i);
    }
  }

  function benutzteKartenZuruecksetzen() {
    for (var j = 0; j < benutzteKarten.length; j++) {
      benutzteKarten[j] = false;
    }
  }


  $('#neueKarte').click(function() {
    $('div.resize img').css({
      'width': '100px'
    });
    $('div.resize img').css({
      'height': '100px'
    });
    $('div.resize td').css({
      'width': '100px'
    });
    $('div.resize td').css({
      'height': '100px'
    });
    $('div.resize').css({
      'width': '750px'
    });
    benutzteKartenZuruecksetzen();
    init();
  });

  $('#klein').click(function() {
    $('div.resize img').css({
      'width': '75px'
    });
    $('div.resize img').css({
      'height': '75px'
    });
    $('div.resize td').css({
      'width': '75px'
    });
    $('div.resize td').css({
      'height': '75px'
    });
    $('div.resize').css({
      'width': '575px'
    });
  });

  $('#normal').click(function() {
    $('div.resize img').css({
      'width': '100px'
    });
    $('div.resize img').css({
      'height': '100px'
    });
    $('div.resize td').css({
      'width': '100px'
    });
    $('div.resize td').css({
      'height': '100px'
    });
    $('div.resize').css({
      'width': '750px'
    });
  });

  $('#mittel').click(function() {
    $('div.resize img').css({
      'width': '150px'
    });
    $('div.resize img').css({
      'height': '150px'
    });
    $('div.resize td').css({
      'width': '150px'
    });
    $('div.resize td').css({
      'height': '150px'
    });
    $('div.resize').css({
      'width': '1100px'
    });
  });
  $('#gross').click(function() {
    $('div.resize img').css({
      'width': '200px'
    });
    $('div.resize img').css({
      'height': '200px'
    });
    $('div.resize td').css({
      'width': '200px'
    });
    $('div.resize td').css({
      'height': '200px'
    });
    $('div.resize').css({
      'width': '1450px'
    });
  });
  $('#riesig').click(function() {
    $('div.resize img').css({
      'width': '300px'
    });
    $('div.resize img').css({
      'height': '300px'
    });
    $('div.resize td').css({
      'width': '300px'
    });
    $('div.resize td').css({
      'height': '300px'
    });
    $('div.resize').css({
      'width': '2150px'
    });
  });

  $("#BingoBody td").click(function() {
    $(this).toggleClass("gelbe_zelle");
    geklicktArray[this.id.slice(5)] = parseInt(this.id.slice(5), 10);
    var i = 1;
    $.each(gewinnArray, function(key, value) {
      if (enthaeltAlle(value, geklicktArray)) {
        erreichteBingos[i] = key;
        $('#result' + i).html(key);
        $.each(gewinnArray, function(key, value) {
          if (enthaeltAlle(value, geklicktArray)) {
            for (var j = 0; j < value.length;) {
              $('#zelle' + value[j]).addClass("gruene_zelle");
              j++;
            }
          }
        });
        i++;
      }
    });
    console.log($(location).attr('href'));
  });
});