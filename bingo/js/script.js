$(document).ready(function() {
  var config = {
    bingoCard: {
      width: 7,
      height: 7,
      size: 49,

    },
    buzzwordCount: 62 	// Anzahl der Buzzwords +1...
  };
  
  var WinBoards = {
	"Horizontal1" : [0, 1 , 2, 3, 4, 5, 6],
	"Horizontal2" : [7, 8, 9, 10, 11, 12, 13],
	"Horizontal3" : [14, 15, 16, 17, 18, 19, 20],
	"Horizontal4" : [21, 22, 23, 24, 25, 26, 27],
	"Horizontal5" : [28, 29, 30, 31, 32, 33, 34],
	"Horizontal6" : [35, 36, 37, 38, 39, 40, 41],
	"Horizontal7" : [42, 43, 44, 45, 46, 47, 48],
	"Vertikal1" : [0, 7, 14, 21, 28, 35, 42],
	"Vertikal2" : [1, 8, 15, 22, 29, 36, 43],
	"Vertikal3" : [2, 9, 16, 23, 30, 37, 44],
	"Vertikal4" : [3, 10, 17, 24, 31, 38, 45],
	"Vertikal5" : [4, 11, 18, 25, 32, 39, 46],
	"Vertikal6" : [5, 12, 19, 26, 33, 40, 47],
	"Vertikal7" : [6, 13, 20, 27, 34, 41, 48],
	"Diagonal1" : [0, 8, 16, 24, 32, 40, 48],
	"Diagonal2" : [6, 12, 18, 24, 30, 36, 42],
        "FreakshowF": [9, 10, 11, 12, 16, 23, 24, 25, 30, 37],
        "Diamant": [3, 9, 11, 15, 19, 21, 27, 29, 33, 37, 39, 45],
        "atzeichen": [1, 2, 3, 4, 5, 7, 13, 14, 17, 20, 21, 23, 25, 27, 28, 30, 31, 32, 33, 35, 43, 44, 45, 46, 47, 48],
        "Bierkrug": [8, 11, 12, 15, 18, 20, 22, 25, 27, 29, 32, 33, 36, 39, 44, 45],
        "Apfel": [4, 10, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 28, 29, 30, 31, 32, 36, 37, 38, 39, 40, 44, 46]
      }

  
  var wonBingos = new Array(21);
  var UserRejected = new Array(21);
  var totalScore = 0;
  var $bingoBody = $('#BingoBody');

  var model = {
    bingoCard: _.fill(new Array(config.bingoCard.size), false)
  };
  
  
  
  init();

  function init() {
    createBingoCard();
    bindEventHandler();
    initBingoCard();
  }

  function createBingoCard() {
    var $row = $('<tr>');

    _.times(config.bingoCard.size, function(i) {
      $cell = $('<td>');
      if(i != 24) {					// 24= Freifeld in der Mitte mit Freakshow Logo
	$cell.attr('id', 'cell' + i);
      }else{
        $cell.attr('id', 'free');
      }
      $cell.attr('data-id', i);
      $cell.append($('<img>'));
      $row.append($cell);

      // Ueberpruefe ob Reihe voll
      if (i % config.bingoCard.width == config.bingoCard.width - 1) {
        $bingoBody.append($row);
        $row = $('<tr>');
      }
    });
  }

  function initBingoCard() {
    var allBingoCards = _.range(1, config.buzzwordCount);
    diff = allBingoCards.filter(function(x) { return UserRejected.indexOf(x) < 0 }); // Benuztzer abgewaehlte buzzwords ausschließen	

    // Mische alle Bingo-Karten außer die ausgeschlossenen und Teile alle Karten in Zwei-Teile auf
    var tmp = _.chunk(_.shuffle(diff), config.bingoCard.size - 1);
    var usedBingoCards = tmp[0];
    var missingBingoCards = tmp[1];
    console.log('used:' + usedBingoCards);
    console.log('fehlt:' + missingBingoCards);
    
    setImgOnFree('#free', 'frei');
    setImgOn('#cell', usedBingoCards);
    setImgOff('#missing', usedBingoCards);
    setImgOn('#missing', missingBingoCards);
    $("#BingoBody td").removeClass('gelbe_zelle');
    $("#BingoBody td").removeClass('gruene_zelle');
    $("#BuzzwordsBody td").removeClass('rote_zelle');
    wonBingos = [];
    model.bingoCard.length = 0;
  }

  function setImgOn(htmlId, imgIds) {
    _.times(imgIds.length, function(id) {
      if(id == 24) {					// wenn id 24 erreicht, in cell48 schreiben
	var $elem = $(htmlId + 48);
	$elem.find('img').attr('src', 'images/' + imgIds[id] + '.svg');
	$elem.attr('data-img-id', imgIds[id]);
      }else{
      var $elem = $(htmlId + id);
      $elem.find('img').attr('src', 'images/' + imgIds[id] + '.svg');
      $elem.attr('data-img-id', imgIds[id]);
      }
    });
  }
  
    function setImgOff(htmlId, imgIds) {		// zum reseten der Buzzword Tabelle nach einem ausschluss
    _.times(imgIds.length, function(id) {
      var $elem = $(htmlId + id);
      $elem.find('img').attr('src', 'images/vorschlag.svg');
      
    });
  }
  
  function setImgOnFree(htmlId, imgId) {		// Frei Feld Logo setzen
      var $elem = $(htmlId);
      $elem.find('img').attr('src', 'images/' + imgId + '.svg');
      $elem.attr('data-img-id', '0');
  }

  function bindEventHandler() {
    $('#neueKarte').click(function() {
      initBingoCard();
    });

    $('.resizeTiles').click(function() {
      resizeTiles(parseInt($(this).attr('data-tile-size')));
    });

    $("#BingoBody td").click(function() {
      $(this).addClass("gelbe_zelle");
      var idx = parseInt($(this).attr('data-id'));	// idx = integerwert der geklickten zelle
      model.bingoCard[idx] = true;  // geklickete Zelle in bingoCard true setzen
      checkWin(model.bingoCard);
      
    });
    
    $("#BuzzwordsBody td").click(function() {
      $(this).addClass("rote_zelle");
      var idx = parseInt($(this).attr('data-img-id'));	// idx = integerwert der geklickten zelle
      UserRejected[idx] = idx;      
      console.log('weg: ' + UserRejected);
    });
  }

  $(document).keydown(function(evt){ // m Taste an mishen funktion binden
   if (evt.keyCode==77){
       evt.preventDefault();
       initBingoCard();
   }
  });
  
  function containsAll(needle, haystack){ 
    for(var i = 0 , len = needle.length; i < len; i++){
      if($.inArray(needle[i], haystack) == -1) return false;
      }
  return true;
  }

  function checkWin(bingoCard) {
    var convertedToNum = _.reduce(bingoCard, function(result, val, idx) {
      if(val) {
        result.push(idx);
      }
      return result;
    }, []);

    var i = 1;
    $.each(WinBoards, function( key, value ) {
      if(containsAll(value, convertedToNum)){
	wonBingos[i] = key;
	$('#result'+i).html(key + ' Punkte: ' + value.length * 10);
//	totalScore = (totalScore + value.length * 10);
	console.log(totalScore);		    
	$.each(WinBoards, function( key, value ) {
	  if(containsAll(value, convertedToNum)){
	    for(var j = 0; j < value.length;){
	      $('#cell'+value[j]).addClass("gruene_zelle");
	      j++;
	    }
	  }
	});
	i++;
      }
    });
  }

  function resizeTiles(tileSize) {
    $('div.resize img').width(tileSize).height(tileSize);
    $('div.resize td').width(tileSize).height(tileSize);
    $('div.resize').width(tileSize * config.bingoCard.width + 50)
  }
});