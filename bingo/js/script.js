$(document).ready(function() {
  var config = {
    bingoCard : {
      width : 7,
      height : 7,
      size : 49
    },
    buzzwordCount : 57
  };

  var gewinnArray = {
    "Diagonal1": [0, 8, 16, 48, 31, 39, 47],
    "Diagonal2": [6, 12, 18, 48, 29, 35, 41],
    "FreakshowF": [15, 16, 17, 18, 19, 22, 28, 30, 35, 48],
    "Diamant": [3, 9, 11, 15, 19, 21, 26, 28, 32, 36, 38, 44],
    "atzeichen": [1, 2, 3, 4, 5, 6, 7, 13, 14, 17, 18, 20, 21, 23, 24, 26, 27, 30, 31, 33, 34, 38, 40, 42, 43, 44, 47],
    "Bierkrug": [8, 9, 10, 11, 12, 20, 26, 28, 29, 30, 31, 32, 35, 38, 43, 44],
    "Apfel": [3, 4, 9, 10, 11, 12, 16, 17, 18, 19, 20, 22, 23, 24, 25, 27, 29, 30, 31, 32, 33, 36, 39, 48]
  }

  init();

  function init() {
    createBingoCard();
    bindEventHandler();
    initBingoCard();
  }

  function createBingoCard() {
    var $BingoBody = $('#BingoBody');
    var $row = $('<tr>');
    
    _.times(config.bingoCard.size, function(i) {
      $cell = $('<td>');
      $cell.attr('id' , 'cell' + i);
      $cell.append($('<img>'));

      $row.append($cell);

      // Ueberpruefe ob Reihe voll
      if(i % config.bingoCard.width == config.bingoCard.width - 1) {
        $BingoBody.append($row);
        $row = $('<tr>');
      }
    });
  }

  function initBingoCard() {
    var allBingoCardIds = _.range(1, config.buzzwordCount);

    _.times(config.bingoCard.size, function(i) {
      var randomNum = _.random(1, allBingoCardIds.length - 1);
      var id = allBingoCardIds[randomNum];
      $('#cell' + i).find('img').attr('src', 'images/' + id + '.svg');

      allBingoCardIds = _.without(allBingoCardIds, id);
    });

    _.times(allBingoCardIds.length, function(i) {
      console.log(i);
      $('#missing' + i).find('img').attr('src', 'images/' + allBingoCardIds[i] + '.svg');
    });
  }

  function bindEventHandler() {
    $('#neueKarte').click(function() {
      initBingoCard();
    });

    $('#klein').click(function() {
      resizeTiles(75);
    });

    $('#normal').click(function() {
      resizeTiles(100);
    });

    $('#mittel').click(function() {
      resizeTiles(150);
    });
    
    $('#gross').click(function() {
      resizeTiles(200);
    });

    $('#riesig').click(function() {
      resizeTiles(300);
    });

    $("#BingoBody td").click(bingoCardClicked);
  }

  function bingoCardClicked() {
    $(this).toggleClass("clickedCell");
  }

  function resizeTiles(tileSize) {
    $('div.resize img').width(tileSize).height(tileSize);
    $('div.resize td').width(tileSize).height(tileSize);
    $('div.resize').width(tileSize * config.bingoCard.width + 50)
  }
});