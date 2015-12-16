$(document).ready(function() {
  var config = {
    bingoCard: {
      width: 7,
      height: 7,
      size: 49,

    },
    buzzwordCount: 81 	// Anzahl der Buzzwords +1 wegen Freifeld
  };
  
  var wonBingos = new Array(103);
  var UserRejected = new Array(49);
  var totalScore = 0;
  var $bingoBody = $('#BingoBody');
  var PlayMode = false;
  var missingBingoCardsCount = config.buzzwordCount - config.bingoCard.size;

  var model = {
    bingoCard: _.fill(new Array(config.bingoCard.size), false)
  };
  
  function goodbye(e) {
    if(PlayMode) {
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
    //console.log(tmp[1]);
    if(typeof tmp[1] != 'undefined') {
      missingBingoCards = tmp[1];
    } else {
      missingBingoCards = 1;
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

    var UserRejectedNum = 0;      
    $("#BingoBody td").click(function() {
    if (UserRejectedNum >= missingBingoCardsCount) {  
      alert('Es können nur ' + missingBingoCardsCount + ' Buzzwords ausgeschlossen werden!');
    
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
	//MPOG -> Zelle für propibilistische überprüfung in intervall vormerken (vorbereitungen)
	//(function doStuff() {
	//console.log('works');
	//setTimeout(doStuff, 10000);}());
	
	//$(this).addClass("question");
	//$(this).addClass("pulse-button");
	
	var idx = parseInt($(this).attr('data-id'));	// idx = integerwert der geklickten zelle
	model.bingoCard[idx] = true;  // geklickete Zelle in bingoCard true setzen
	checkWin(model.bingoCard);
	$('#score').html('<div style="width: 198px" id="scoreback">' + pad(totalScore, 6) + '</div>');
	}  
    }  
    });
    

    $("#BuzzwordsBody td").click(function() {
    if (UserRejectedNum >= missingBingoCardsCount) {  
      alert('Es können nur ' + missingBingoCardsCount + ' Buzzwords ausgeschlossen werden!');
      
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