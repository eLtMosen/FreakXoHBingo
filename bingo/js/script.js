$(document).ready(function() {
  var config = {
    bingoCard: {
      width: 7,
      height: 7,
      size: 49,

    },
    buzzwordCount: 77 	// Anzahl der Buzzwords +1...
  };
  
  var WinBoards = {
	"Ecken innen": [16, 18, 30, 32],
	"Ecken mitte": [8, 12, 36, 40],
	"Ecken aussen": [0, 6, 42, 48],
	"Zen Garten": [11, 15, 33, 37],
	"Kreuz": [17, 23, 25, 31],
	"Briefmarke": [12, 13, 19, 20],
	"Pong frame 1": [3, 14, 21, 34, 41],
	"Pong frame 2": [19, 21, 27, 28, 34],
	"Pong frame 3": [11, 20, 21, 27, 28],
	"Pong frame 4": [9, 20, 27, 28, 35],
	"Pong frame 5": [15, 20, 21, 27, 28],
	"Pong frame 6": [9, 21, 27, 28, 34],
	"Ameisen frame 1": [1, 19, 22, 37, 46],
	"Ameisen frame 2": [11, 14, 30, 39, 44],
	"Ameisen frame 3": [5, 8, 22, 31, 36],
	"Ameisen frame 4": [2, 13, 15, 23, 28],
	"Ameisen frame 5": [8, 13, 21, 23, 45],
	"Speed Racer frame 1": [8, 19, 36, 45, 47],
	"Speed Racer frame 2": [15, 26, 38, 43, 45],
	"Speed Racer frame 3": [5, 22, 31, 33, 38],
	"Speed Racer frame 4": [1, 12, 24, 29, 40],
	"Speed Racer frame 5": [8, 17, 19, 36, 47],
	"Speed Racer frame 6": [10, 15, 17, 26, 43],
	"Speed Racer frame 7": [3, 5, 10, 22, 33],
	"BreakOut frame 1": [8, 10, 12, 17, 41],
	"BreakOut frame 2": [8, 12, 17, 40, 41],
	"BreakOut frame 3": [8, 12, 23, 39, 40],
	"BreakOut frame 4": [8, 12, 23, 38, 39],
	"BreakOut frame 5": [8, 12, 29, 37, 38],
	"BreakOut frame 6": [8, 12, 29, 36, 37],
	"BreakOut frame 7": [8, 12, 29, 35, 36],
	"Jeder Pfeil (unten)": [29, 33, 37, 39, 45],
	"Jeder Pfeil (rechts)": [11, 19, 27, 33, 39],
	"Jeder Pfeil (oben)": [3, 9, 11, 15, 19],
	"Jeder Pfeil (links)": [9, 15, 21, 29, 37],
	"Jeder Winkel (unten rechts)": [26, 33, 38, 39, 40],
	"Jeder Winkel (oben rechts)": [10, 11, 12, 19, 26],
	"Jeder Winkel (oben links)": [8, 9, 10, 15, 22],
	"Jeder Winkel (unten links)": [22, 29, 36, 37, 38],
	"Jede Ecke (oben links)": [0, 1, 2, 7, 8, 14],
	"Jede Ecke (oben rechts)": [4, 5, 6, 12, 13, 20],
	"Jede Ecke (unten rechts)": [34, 40, 41, 46, 47, 48],
	"Jede Ecke (unten links)": [28, 35, 36, 42, 43, 44],
	"Six Pack": [17, 18, 24, 25, 31, 32],
	"Wuerfel 6": [9, 11, 23, 25, 37, 39],
	"Twin Peaks": [2, 8, 10, 39, 45, 47],
	"Slashes": [16, 19, 22, 25, 28, 31],
	"Ungleich": [16, 18, 22, 26, 30, 32],
	"Vertikal 1" : [0, 7, 14, 21, 28, 35, 42],
	"Vertikal 2" : [1, 8, 15, 22, 29, 36, 43],
	"Vertikal 3" : [2, 9, 16, 23, 30, 37, 44],
	"Vertikal 4" : [3, 10, 17, 24, 31, 38, 45],
	"Vertikal 5" : [4, 11, 18, 25, 32, 39, 46],
	"Vertikal 6" : [5, 12, 19, 26, 33, 40, 47],
	"Vertikal 7" : [6, 13, 20, 27, 34, 41, 48],
	"Horizontal 1" : [0, 1 , 2, 3, 4, 5, 6],
	"Horizontal 2" : [7, 8, 9, 10, 11, 12, 13],
	"Horizontal 3" : [14, 15, 16, 17, 18, 19, 20],
	"Horizontal 4" : [21, 22, 23, 24, 25, 26, 27],
	"Horizontal 5" : [28, 29, 30, 31, 32, 33, 34],
	"Horizontal 6" : [35, 36, 37, 38, 39, 40, 41],
	"Horizontal 7" : [42, 43, 44, 45, 46, 47, 48],
	"Diagonal 1" : [0, 8, 16, 24, 32, 40, 48],
	"Diagonal 2" : [6, 12, 18, 24, 30, 36, 42],
	"Saphir": [10, 16, 18, 22, 26, 30, 32, 38],
	"Schluessel 1": [8, 9, 15, 16, 24, 32, 39, 40],
	"Schluessel 2": [8, 16, 24, 32, 40],
	"Schluessel 3": [8, 9, 15, 16, 24, 32, 33, 40],
	"Echo Kammer": [23, 24, 25, 29, 33, 35, 41, 42, 48],
	"Knochen": [15, 19, 22, 23, 24, 25, 26, 29, 33],
	"Freakshow F": [9, 10, 11, 12, 16, 23, 24, 25, 30, 37],
	"Vogelscheuche": [10, 15, 16, 17, 18, 19, 24, 30, 32, 36, 40],
	"Diamant": [3, 9, 11, 15, 19, 21, 27, 29, 33, 37, 39, 45],
	"Satellit": [8, 12, 16, 17, 18, 23, 25, 30, 31, 32, 36, 40],
	"Double Six Pack": [11, 12, 18, 19, 22, 23, 25, 26, 29, 30, 36, 37],
	"3er Ecken": [0, 1, 5, 6, 7, 13, 35, 41, 42, 43, 47, 48],
	"3er Ecken": [8, 9, 11, 12, 15, 19, 29, 33, 36, 37, 39, 40],
	"Space Invaders": [0, 2, 4, 6, 15, 17, 19, 30, 39, 45, 46, 47],
	"Snake": [8, 9, 10, 15, 17, 22, 24, 25, 26, 33, 34, 36],
	"Sinus frame 1": [7, 11, 15, 17, 19, 22, 24, 26, 29, 31, 33, 37, 41],
	"Sinus frame 2": [8, 12, 14, 16, 18, 20, 21, 23, 25, 27, 28, 30, 32, 34, 38],
	"Sinus frame 3": [9, 13, 15, 17, 19, 22, 24, 26, 29, 31, 33, 35, 39],
	"Sinus frame 4": [10, 14, 16, 18, 20, 21, 23, 25, 27, 28, 30, 32, 34, 36, 40],
	"Sternhimmel":[1, 4, 7, 13, 17, 23, 24, 25, 28, 31, 40, 44, 48],
	"Bulls_Eye": [9, 10, 11, 15, 19, 22, 24, 26, 29, 33, 37, 38, 39],
	"CCC": [1, 2, 7, 14, 18, 19, 21, 27, 29, 30, 33, 41, 46, 47],
	"Nethack": [9, 11, 12, 13, 18, 21, 22, 23, 25, 30, 32, 39, 44, 46],
	"Hangman": [9, 10, 11, 15, 18, 22, 24, 25, 26, 29, 32, 36, 38, 40, 43],
	"Schmetterling 1": [8, 12, 15, 16, 18, 19, 22, 24, 26, 29, 30, 32, 33, 36, 40],
	"Schmetterling 2": [9, 11, 15, 16, 18, 19, 23, 24, 25, 29, 30, 32, 33, 37, 39],
	"Bierkrug": [8, 11, 12, 15, 18, 20, 22, 25, 27, 29, 32, 33, 36, 39, 44, 45],
	"Bloecke": [8, 9, 11, 12, 15, 16, 18, 19, 29, 30, 32, 33, 36, 37, 39, 40],
	"Jedes 1/4 Dreieck (unten)": [24, 30, 31, 32, 36, 37, 38, 39, 40, 42, 43, 44, 45, 46, 47, 48],
	"Jedes 1/4 Dreieck (links)": [0, 7, 8, 14, 15, 16, 21, 22, 23, 24, 28, 29, 30, 35, 36, 42],
	"Jedes 1/4 Dreieck (oben)": [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 16, 17, 18, 24],
	"Jedes 1/4 Dreieck (rechts)": [6, 12, 13, 18, 19, 20, 24, 25, 26, 27, 32, 33, 34, 40, 41, 48],
	"Apfel": [4, 10, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 28, 29, 30, 31, 32, 36, 37, 38, 39, 40, 44, 46],
	"Schachbrett 1": [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47],
	"Schachbrett 1": [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48],
	"Tannenbaum": [3, 9, 10, 11, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 29, 31, 33, 38, 44, 45, 46],
	"AT zeichen": [1, 2, 3, 4, 5, 7, 13, 14, 17, 20, 21, 23, 25, 27, 28, 30, 31, 32, 33, 35, 43, 44, 45, 46, 47, 48],
	"Defender": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 23, 35, 36, 38, 39, 40, 42, 43, 44, 45, 46, 47, 48],
	"Monster Bingo": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
      }

  
  var wonBingos = new Array(103);
  var UserRejected = new Array(49);
  var totalScore = 0;
  var $bingoBody = $('#BingoBody');
  var PlayMode = false;

  var model = {
    bingoCard: _.fill(new Array(config.bingoCard.size), false)
  };
  
  function goodbye(e) {
	if(!e) e = window.event;
	//IE
	e.cancelBubble = true; 
	e.returnValue = 'WIRKLICH SICHER? Die aktuelle Karte geht dann verloren!'; //This is displayed on the dialog

	//Firefox
	if (e.stopPropagation) {
		e.stopPropagation();
		e.preventDefault();
	}
  }
  window.onbeforeunload=goodbye;
  
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
        $cell.attr('id', 'cell24');
      }
      $cell.attr('data-id', i);
      $cell.append($('<img>'));
      $cell.attr('class', 'cell');
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
    diff = allBingoCards.filter(function(x) { return UserRejected.indexOf(x) < 0 }); // Benuztzer abgewaehlte buzzwords vom array abziehen	

    // Mische alle Bingo-Karten außer die ausgeschlossenen und Teile alle Karten in Zwei-Teile auf
    var tmp = _.chunk(_.shuffle(diff), config.bingoCard.size - 1);
    var usedBingoCards = tmp[0];
    console.log(tmp[1]);
    if(typeof tmp[1] != 'undefined') {
      var missingBingoCards = tmp[1];
    } else {
      var missingBingoCards = 1;
    }
    setImgOnFree('#cell24', 'frei');
    setImgOn('#cell', usedBingoCards);
    setImgOff('#missing', usedBingoCards);
    setImgOnSpare('#missing', missingBingoCards);
    $("#BingoBody td").removeClass('gelbe_zelle');
    $("#BingoBody td").removeClass('gruene_zelle');
    $("#BingoBody td").removeClass('rote_zelle');
    $("#BuzzwordsBody td").removeClass('rote_zelle');
    setImgOnRejected('#missing', UserRejected);
    wonBingos = [];
    model.bingoCard.length = 0;
  }

  function resetUserdata() {
    UserRejected = [];
    UserRejectedNum = 0;
  }
  
  function setImgOn(htmlId, imgIds) {
    _.times(imgIds.length, function(id) {
      if(id == 24) {					// wenn id 24 erreicht, in cell48 schreiben
	var $elem = $(htmlId + 48);
	$elem.find('img').attr('src', 'images/' + imgIds[id] + '.svg');
	$elem.attr('data-img-id', imgIds[id]);
	$elem.addClass("gelbe_zelle");
      }else{
      
      var $elem = $(htmlId + id);
      $elem.find('img').attr('src', 'images/' + imgIds[id] + '.svg');
      $elem.attr('data-img-id', imgIds[id]);
      }
    });
  }
  
  function setImgOnSpare(htmlId, imgIds) {
    _.times(imgIds.length, function(id) {
      var $elem = $(htmlId + id);
      $elem.find('img').attr('src', 'images/' + imgIds[id] + '.svg');
      $elem.attr('data-img-id', imgIds[id]);
    });
  }  
  
    function setImgOnRejected(htmlId, imgIds) {
    _.times(imgIds.length+1, function(id) {
      if(!isNaN(imgIds[id])) {
      var $elem = $(htmlId + (47-id));
      $elem.find('img').attr('src', 'images/' + imgIds[id] + '.svg');
      $elem.attr('data-img-id', imgIds[id]);
      $elem.addClass("rote_zelle");
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
    
    $(document).keydown(function(evt){ // m Taste an mischen funktion binden
    if(!PlayMode) {  
      if (evt.keyCode==77){
	  evt.preventDefault();
	  initBingoCard();
      }
    }
    });

    $('#neueKarte').click(function() {
    if(!PlayMode) {  
      initBingoCard();
    }  
    });

    $('#reset').click(function() {
    if(!PlayMode) {
      UserRejectedNum = 0;
      resetUserdata();
      $("#BuzzwordsBody td").removeClass('rote_zelle');
      $("#BingoBody td").removeClass('rote_zelle');
    }
    });  
    
    $('#spielstart').click(function() {
      PlayMode = true;
      UserRejectedNum = 0;
      $('#score').html('<div style="width: 198px" id="scoreback">' + pad(totalScore, 6) + '</div>');
      new CountUp(((new Date()).getTime()), 'counter');
      $('#counter').html('<div id="start">&nbsp</div>');
      $('#reset').html('<div id="reset">&nbsp</div>');
      $("#BuzzwordsBody td").removeClass('missing');
      $("#BuzzwordsBody td").removeClass('rote_zelle');
      $("#BingoBody td").removeClass('missing');
      $("#BingoBody td").removeClass('rote_zelle');
      $("#BuzzwordsBody td").addClass('mouseoverbuzz');
      $("#BingoBody td").addClass('mouseoverbingo');
    });    

//    $('.resizeTiles').click(function() {
//      resizeTiles(parseInt($(this).attr('data-tile-size')));
//    });
    
    var UserRejectedNum = 0;      
    $("#BingoBody td").click(function() {
    if (UserRejectedNum >= 28) {  
      alert('Es können nur 28 Buzzwords ausgeschlossen werden!');
    
    }else{
      if (!PlayMode) {
	var idx = parseInt($(this).attr('data-img-id'));	// idx = integerwert der geklickten zelle
	if (idx != 0) {				// Frei Logo nicht ausschliessbar machen
	$(this).toggleClass("rote_zelle");
	if(isNaN(idx) || $.inArray(idx, UserRejected) != -1) {
	  }else{
	  UserRejected[UserRejectedNum] = idx;
	  UserRejectedNum++;
	  console.log(idx);  
	  }  
	}
      }else{
      $(this).addClass("gelbe_zelle");
      var idx = parseInt($(this).attr('data-id'));	// idx = integerwert der geklickten zelle
      model.bingoCard[idx] = true;  // geklickete Zelle in bingoCard true setzen
      checkWin(model.bingoCard);

      $('#score').html(pad(totalScore, 6));
      }
    }  
    });
    

    $("#BuzzwordsBody td").click(function() {
    if (UserRejectedNum >= 28) {  
      alert('Es können nur 28 Buzzwords ausgeschlossen werden!');
      
    }else{
    if(!PlayMode) {
      $(this).addClass("rote_zelle");
      var idx = parseInt($(this).attr('data-img-id'));	// idx = integerwert der geklickten zelle
      if(isNaN(idx) || $.inArray(idx, UserRejected) != -1) {
      }else{
      UserRejected[UserRejectedNum] = idx;
      UserRejectedNum++;
      console.log(UserRejectedNum);
      }
    }else{
      $(this).addClass("gelbe_zelle");
    }  
    }
    });
  }
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
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
    console.log(convertedToNum);
    var i = 1;
    totalScore = 0;
    $.each(WinBoards, function( key, value ) {
      if(containsAll(value, convertedToNum)){
	wonBingos[i] = key;
	$('#result'+i).html(key + ' ' + value.length * 10 + ' punkte');
	totalScore = (totalScore + value.length * 10); 
	
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

//  function resizeTiles(tileSize) {
//    $('div.resize img').width(tileSize).height(tileSize);
//    $('div.resize td').width(tileSize).height(tileSize);
//    $('div.resize').width(tileSize * config.bingoCard.width + 50)
//  }


/**********************************************************************************************
* CountUp script by Praveen Lobo (http://PraveenLobo.com/techblog/javascript-countup-timer/)
* This notice MUST stay intact(in both JS file and SCRIPT tag) for legal use.
* http://praveenlobo.com/blog/disclaimer/
**********************************************************************************************/
function CountUp(initDate, id){
    this.beginDate = new Date(initDate);
    this.countainer = document.getElementById(id);
    this.numOfDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
    this.hours = 0, this.minutes = 0, this.seconds = 0;
    this.updateNumOfDays();
    this.updateCounter();
}
  
CountUp.prototype.updateNumOfDays=function(){
    var dateNow = new Date();
    var currYear = dateNow.getFullYear();
    if ( (currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0 ) {
        this.numOfDays[1] = 29;
    }
    var self = this;
    setTimeout(function(){self.updateNumOfDays();}, (new Date((currYear+1), 1, 2) - dateNow));
}
  
CountUp.prototype.datePartDiff=function(then, now, MAX){
    var diff = now - then - this.borrowed;
    this.borrowed = 0;
    if ( diff > -1 ) return diff;
    this.borrowed = 1;
    return (MAX + diff);
}
  
CountUp.prototype.calculate=function(){
    var currDate = new Date();
    var prevDate = this.beginDate;
    this.seconds = this.datePartDiff(prevDate.getSeconds(), currDate.getSeconds(), 60);
    this.minutes = this.datePartDiff(prevDate.getMinutes(), currDate.getMinutes(), 60);
    this.hours = this.datePartDiff(prevDate.getHours(), currDate.getHours(), 24);
    this.days = this.datePartDiff(prevDate.getDate(), currDate.getDate(), this.numOfDays[currDate.getMonth()]);
    this.months = this.datePartDiff(prevDate.getMonth(), currDate.getMonth(), 12);
    this.years = this.datePartDiff(prevDate.getFullYear(), currDate.getFullYear(),0);
}
  
CountUp.prototype.addLeadingZero=function(value){
    return value < 10 ? ("0" + value) : value;
}
  
CountUp.prototype.formatTime=function(){
    this.seconds = this.addLeadingZero(this.seconds);
    this.minutes = this.addLeadingZero(this.minutes);
    this.hours = this.addLeadingZero(this.hours);
}
 
CountUp.prototype.updateCounter=function(){
    this.calculate();
    this.formatTime();
    this.countainer.innerHTML =
	'<div style="padding-left: 5px; padding-top: 34px; overflow: visible;">' +
        this.hours + ':' +
        this.minutes + ':' +
        this.seconds +
        '</div>';
    var self = this;
    setTimeout(function(){self.updateCounter();}, 1000);
}

});