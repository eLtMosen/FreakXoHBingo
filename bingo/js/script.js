$(document).ready(function() {
  var config = {
	bingoCard: {
	  width: 7,
	  height: 7,
	  size: 49,
	},
	
	buzzwordCard: {
	  width: 6,
	  height: 8,
	  size: 48,
	},
	
	// Anzahl der Buzzwords +1 wegen Freifeld
	buzzwordCount: 81
  };
  
  var timeoutArray = new Array(49);
  var buzzwordConfirmed = new Array(config.buzzwordCount);
  var buzzwordBusy = new Array(config.buzzwordCount);
  var wonBingos = new Array(103);
  var UserRejected = new Array(49);
  var totalScore = 0;
  var $bingoBody = $('#BingoBody');
  var $BuzzwordsBody = $('#BuzzwordsBody');
  var PlayMode = false;
  var missingBingoCardsCount = config.buzzwordCount - config.bingoCard.size;
  var captionOff = true;
  var placeCaptionLeftOfMousecourser = false;

  var model = {
	bingoCard: _.fill(new Array(config.bingoCard.size), false)
  };
  
  function goodbye(e) {
	if(PlayMode) {
	  if(!e) e = window.event;
	    //IE
	    e.cancelBubble = true; 
	    e.returnValue = 'SICHER?!? -> Die aktuelle Karte und der Punktestand gehen dann verloren!';
	    //Firefox
	    if (e.stopPropagation) {
	      e.stopPropagation();
	      e.preventDefault();
	}
	}
  }
  window.onbeforeunload=goodbye;
  
  window.onload = function(){
                var bsDiv = document.getElementById("buzzwordText");
                var x, y;
    // On mousemove use event.clientX and event.clientY to set the location of the div to the location of the cursor:
                window.addEventListener('mousemove', function(event){
                    x = event.clientX;
                    y = event.clientY;                    
                    if ( typeof x !== 'undefined' ){
		      if (!placeCaptionLeftOfMousecourser) {
                        bsDiv.style.left = (x+20) + "px";
                        bsDiv.style.top = (y-35) + "px";
		      } else {
			bsDiv.style.left = (x-390) + "px";
                        bsDiv.style.top = (y-35) + "px";
		      }
                    }
                }, false);
            }
  
  init();

  function init() {
    createBingoCard();
    createBuzzwordCard();
    bindEventHandler();
    initBingoCard();
    changeCaptionOnOff();
  }

  function createBingoCard() {
    var $row = $('<tr>');

    _.times(config.bingoCard.size, function(i) {
      $cell = $('<td>');
      // 24= Freifeld in der Mitte mit Show-Logo definieren
      if(i != 24) {		
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
  
  function createBuzzwordCard() {
    var $row = $('<tr>');

    _.times(config.buzzwordCard.size, function(i) {
      $cell = $('<td>');
      $cell.attr('id', 'missing' + i);
      $cell.attr('data-id', i);
      $cell.append($('<img>'));
      $cell.attr('class', 'missing');
      $row.append($cell);
      // Ueberpruefe ob Reihe voll
      if (i % config.buzzwordCard.width == config.buzzwordCard.width - 1) {
        $BuzzwordsBody.append($row);
        $row = $('<tr>');
      }
    });
  }  

  function initBingoCard() {
    var allBingoCards = _.range(1, config.buzzwordCount);    
    // Benutzer abgewaehlte buzzwords vom array abziehen	
    diff = allBingoCards.filter(function(x) { return UserRejected.indexOf(x) < 0 });
    // Mische alle Bingo-Karten außer die ausgeschlossenen und Teile alle Karten in Zwei-Teile auf
    var tmp = _.chunk(_.shuffle(diff), config.bingoCard.size - 1);
    var usedBingoCards = tmp[0];
    if(typeof tmp[1] != 'undefined') {
      missingBingoCards = tmp[1];
    } else {
      missingBingoCards = 1;
    }  
    setImgOn('#cell', usedBingoCards);
    setImgOff('#missing', usedBingoCards);
    setImgOnSpare('#missing', missingBingoCards);
    $("#BingoBody td").removeClass('gelbe_zelle');
    $("#BingoBody td").removeClass('gruene_zelle');
    $("#BingoBody td").removeClass('rote_zelle');
    $("#BuzzwordsBody td").removeClass('rote_zelle');
    setImgOnRejected('#missing', UserRejected);
    setImgOnFree('#cell24', 'frei');
    wonBingos = [];
    model.bingoCard.length = 0;
  }

  function resetUserdata() {
    UserRejected = [];
    UserRejectedNum = 0;
  }
  
  function changeCaptionOnOff() {  
	  if (captionOff) {
	    captionOff = false;
	    for(var i = 0; i < config.bingoCard.size; i++){
	      $('#cell' + i).removeClass('cell');
	    }
	    for(var i = 0; i < config.buzzwordCard.size; i++){
	      $('#missing' + i).removeClass('missing');
	    }
	  } else {
	    captionOff = true;
	    $('#buzzwordText').removeClass('buzzwordTextFilled');
	    $('#buzzwordText').html("");
	    for(var i = 0; i < config.bingoCard.size; i++){
	      $('#cell' + i).addClass('cell');
	    }
	    for(var i = 0; i < config.buzzwordCard.size; i++){
	      $('#missing' + i).addClass('missing');
	    }
	    
	  }  
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
      if (PlayMode) {
	$elem.addClass("gelbe_zelle");
      }
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
    
    $(document).keydown(function(evt){ // c Taste an captionOff binden
    if(!PlayMode) {  
      if (evt.keyCode==67){
	evt.preventDefault();
	changeCaptionOnOff();
      }
    }
    });  
    
    $('#BingoBody td').mouseover(function() {
      if (!captionOff && !PlayMode) {
	var idx = parseInt($(this).attr('data-img-id'));
	placeCaptionLeftOfMousecourser = false;
	$('#buzzwordText').html('<img src="images/' + idx + '.svg" height="150px" width="150px" align="left">'+ BuzzwordText[idx]);
	$('#buzzwordText').removeClass('buzzwordTextEmpty');
	$('#buzzwordText').addClass('buzzwordTextFilled');
    }}); 
    
    $('#BingoBody td').mouseleave(function() {
      if (!captionOff && !PlayMode) {
	$('#buzzwordText').removeClass('buzzwordTextFilled');
	$('#buzzwordText').addClass('buzzwordTextEmpty');
    }});
    
    $('#BuzzwordsBody td').mouseover(function() {
      if (!captionOff && !PlayMode) {
	var idx = parseInt($(this).attr('data-img-id'));
	placeCaptionLeftOfMousecourser = true;
	$('#buzzwordText').html('<img src="images/' + idx + '.svg" height="150px" width="150px" align="right">'+ BuzzwordText[idx]);
	$('#buzzwordText').removeClass('buzzwordTextEmpty');
	$('#buzzwordText').addClass('buzzwordTextFilled');
    }}); 
    
    $('#BuzzwordsBody td').mouseleave(function() {
      if (!captionOff && !PlayMode) {
	$('#buzzwordText').removeClass('buzzwordTextFilled');
	$('#buzzwordText').addClass('buzzwordTextEmpty');
    }});
 
    $('#mischen').mouseover(function() {
      if (!PlayMode) {
	var idx = parseInt($(this).attr('data-img-id'));
	placeCaptionLeftOfMousecourser = true;
	$('#buzzwordText').html('Dieser Button mischt alle nicht per klick abgewählten buzzwords. auch die "m" taste mischt!');
	$('#buzzwordText').removeClass('buzzwordTextEmpty');
	$('#buzzwordText').addClass('buzzwordTextFilled');
    }}); 
    
    $('#mischen').mouseleave(function() {
      if (!PlayMode) {
	$('#buzzwordText').removeClass('buzzwordTextFilled');
	$('#buzzwordText').addClass('buzzwordTextEmpty');
    }});  
    
    $('#reset').mouseover(function() {
      if (!PlayMode) {
	  var idx = parseInt($(this).attr('data-img-id'));
	  placeCaptionLeftOfMousecourser = true;
	  $('#buzzwordText').html('reset loest alle abgewählten karten wieder und entfernt die mit der "c" taste schaltbaren erklär captionsb');
	  $('#buzzwordText').removeClass('buzzwordTextEmpty');
	  $('#buzzwordText').addClass('buzzwordTextFilled');
    }}); 
    
    $('#reset').mouseleave(function() {
      if (!PlayMode) {
	$('#buzzwordText').removeClass('buzzwordTextFilled');
	$('#buzzwordText').addClass('buzzwordTextEmpty');
    }}); 

    $('#start').mouseover(function() {
      if (!PlayMode) {
	var idx = parseInt($(this).attr('data-img-id'));
	placeCaptionLeftOfMousecourser = true;
	$('#buzzwordText').html('mit dem spielstart wird die karte fixiert und die spielzeit an dieser stelle angezeigt');
	$('#buzzwordText').removeClass('buzzwordTextEmpty');
	$('#buzzwordText').addClass('buzzwordTextFilled');
    }}); 
    
    $('#start').mouseleave(function() {
	$('#buzzwordText').removeClass('buzzwordTextFilled');
	$('#buzzwordText').addClass('buzzwordTextEmpty');
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
      changeCaptionOnOff();
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
      setImgOnFree('#cell24', 'frei');
      // mittleres Show-Freifeld immer aktivieren
      model.bingoCard[24] = true;
    });    

    var UserRejectedNum = 0;      
    $("#BingoBody td").click(function() {
    if (UserRejectedNum >= missingBingoCardsCount && !$(this).hasClass("rote_zelle")) {  
      // nothing!!    
    }else{
      
      if (!PlayMode) {
	// idx = integerwert der geklickten zelle
	var idx = parseInt($(this).attr('data-img-id'));
	// Frei Logo nicht ausschliessbar machen
	if (idx != 0 && !isNaN(idx)) {				
	  if ($(this).hasClass("rote_zelle")) {
	    $(this).removeClass("rote_zelle");
	    UserRejected = jQuery.grep(UserRejected, function(value) {
			      return value != idx;
	    });
	    UserRejectedNum = UserRejectedNum-1;
	  } else {  
	    $(this).addClass("rote_zelle", UserRejected[UserRejectedNum++] = idx);
	  }
		 
	}
      }else{
	var id_img = parseInt($(this).attr('data-img-id'));
	var buzzwordBusyToNum = _.reduce(buzzwordBusy, function(result, val, idx) {
      if(val) {
        result.push(idx);
      }
      return result;
    }, []);
	//console.log(buzzwordBusyToNum.length);
	if (!buzzwordBusy[id_img] && buzzwordBusyToNum.length < 6) {
	  buzzwordBusy[id_img] = true;
	  $(this).addClass("orange_zelle");
	  $(this).addClass("question");
	  $(this).addClass("pulse-button");
	  var timeoutExit = 1;
	  // Buzzword id_img in DB schreiben
	  //this in das timeout intervall überführen
	  var that = this;
	  // rekursives Timeout für 40 mal 3 sekunden, unterbrochen von buzzwordbestätigung per DB
	  (function checkBuzzword() {
	    //console.log(id_img);
	    //console.log(timeoutExit);
	    // simulierter probabilistik erfolg -> ENTER DB ABFRAGE HERE!
	    if (timeoutExit >= 5){
	      buzzwordConfirmed[id_img] = true;      
	    }
	    // simulation nde
	    timeoutExit++;  
	    if (!buzzwordConfirmed[id_img] && timeoutExit < 40) { 
	      setTimeout(checkBuzzword, 3000);
	      //console.log(buzzwordConfirmed[id_img]);
	    }
	    if (buzzwordConfirmed[id_img]) {
	      $(that).removeClass("orange_zelle");
	      $(that).removeClass("question");
	      $(that).removeClass("pulse-button");
	      $(that).addClass("gelbe_zelle");
	      // idx = integerwert der geklickten zelle
	      var idx = parseInt($(that).attr('data-id'));
	      // geklickete Zelle in bingoCard true setzen
	      model.bingoCard[idx] = true;
	      checkWin(model.bingoCard);
	      $('#score').html('<div style="width: 198px" id="scoreback">' + pad(totalScore, 6) + '</div>');
	      buzzwordConfirmed[id_img] =true;
	      buzzwordBusy[id_img] = false;	    
	    } else {
	      if (!buzzwordConfirmed[id_img] && timeoutExit >= 40) {
		$(that).removeClass("orange_zelle");
		$(that).removeClass("question");
		$(that).removeClass("pulse-button");
		timeoutExit = 1;
		clearTimeout(checkBuzzword);
		buzzwordBusy[id_img] = false;
	      } 
	    }    
	  }());	  
	}  
      }
    }  
    });
    

    $("#BuzzwordsBody td").click(function() {
    if (UserRejectedNum >= missingBingoCardsCount && !$(this).hasClass("rote_zelle")) {  
      // nothing!!      
    }else{
    if(!PlayMode) {
	var idx = parseInt($(this).attr('data-img-id'));	// idx = integerwert der geklickten zelle
	if (idx != 0 && !isNaN(idx)) {				// Frei Logo nicht ausschliessbar machen
	  if ($(this).hasClass("rote_zelle")) {
	    $(this).removeClass("rote_zelle");
	    UserRejected = jQuery.grep(UserRejected, function(value) {
			      return value != idx;
	    });
	    UserRejectedNum = UserRejectedNum-1;
	  } else {  
	    $(this).addClass("rote_zelle", UserRejected[UserRejectedNum++] = idx);
	  }
		 
//	console.log(idx);
//	console.log(UserRejectedNum);
//	console.log(UserRejected);  
	}
    }else{
      $(this).toggleClass("gelbe_zelle");
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