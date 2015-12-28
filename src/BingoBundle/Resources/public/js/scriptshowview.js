$(document).ready(function () {
    var host = location.protocol.concat('//').concat(window.location.hostname);

    if (window.location.href.indexOf('app_dev.php') > -1) {
        host = host.concat('/app_dev.php');
    }

    /**
     * @type {{bingoCard: {width: number, height: number, size: number}, buzzwordCard: {width: number, height: number, size: number}, buzzwordCount: number}}
     */
    var config = {
        srcImg: '/bundles/bingo/img',
        bingoCard: {
            width: 7,
            height: 7,
            size: 49,
        },
        buzzwordCard: {
            width: 6,
            height: 6,
            size: 36,
        },

        // Anzahl der Buzzwords +1 wegen Freifeld
        buzzwordCount: 81
    };

    var timeoutArray = new Array(49);
    var buzzwordConfirmed = new Array(config.buzzwordCount);
    var buzzwordBusy = new Array(config.buzzwordCount);
    var wonBingos = new Array(103);
    var userRejected = new Array(49);
    var totalScore = 0;
    var $bingoBody = $('#BingoBody');
    var $BuzzwordsBody = $('#BuzzwordsBody');
    var playMode = false;
    var missingBingoCardsCount = config.buzzwordCount - config.bingoCard.size;
    var captionOff = true;
    var placeCaptionLeftOfMousecourser = false;

    var model = {
        bingoCard: _.fill(new Array(config.bingoCard.size), false)
    };

    var bsDiv = document.getElementById("buzzwordText");
    bsDiv.style.left = 880 + "px";
    bsDiv.style.top = 15 + "px";

    $('#buzzwordText').html('Buzzword Monitor<br><br>Klicks von allen Online Spielern werden probabilisiert ausgewertet und bestätigten diese Buzzwords!');
    $('#buzzwordText').removeClass('buzzwordTextEmpty');
    $('#buzzwordText').addClass('buzzwordTextBuzz');


    function goodbye(e) {
        if (!playMode) {
            if (!e) e = window.event;
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

    window.onbeforeunload = goodbye;

    window.onload = function () {
        //var bsDiv = document.getElementById("buzzwordText");
        //bsDiv.style.left = 880 + "px";
        //bsDiv.style.top = 0 + "px";
    }

    init();

    function init() {
        createBingoCard();
        createBuzzwordCard();
        bindEventHandler();
        initBingoCard();
        //toggleCaptionOnOff();
    }

    function createBingoCard() {
        var $row = $('<tr>');

        _.times(config.bingoCard.size, function (i) {
            var $cell = $('<td>');
            // 24= Freifeld in der Mitte mit Show-Logo definieren
            if (i !== 24) {
                $cell.attr('id', 'cell' + i);
            } else {
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

        _.times(config.buzzwordCard.size, function (i) {
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
        var diff = allBingoCards.filter(function (card) {
            return userRejected.indexOf(card) < 0;
        });

        // Mische alle Bingo-Karten außer die ausgeschlossenen und Teile alle Karten in Zwei-Teile auf
        var tmp = _.chunk(_.shuffle(diff), config.bingoCard.size - 1);
        var usedBingoCards = tmp[0];

        if (typeof tmp[1] != 'undefined') {
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
        setImgOnRejected('#missing', userRejected);
        setImgOnFree('#cell24', 'frei');
        wonBingos = [];
        model.bingoCard.length = 0;
    }

    function toggleCaptionOnOff() {
        if (captionOff) {
            captionOff = false;
            for (var i = 0; i < config.bingoCard.size; i++) {
                $('#cell' + i).removeClass('cell');
            }
            for (var i = 0; i < config.buzzwordCard.size; i++) {
                $('#missing' + i).removeClass('missing');
            }
        } else {
            captionOff = true;
            $('#buzzwordText').removeClass('buzzwordTextFilled');
            $('#buzzwordText').html("");
            for (var i = 0; i < config.bingoCard.size; i++) {
                $('#cell' + i).addClass('cell');
            }
            for (var i = 0; i < config.buzzwordCard.size; i++) {
                $('#missing' + i).addClass('missing');
            }

        }
    }

    // -- AJAX GET CARD CLICKS :: BEGIN --------------------------------------------------------------------------------

    /**
     * Methode zum Überprüfen on eine Karte im Klicks Response enhalten ist. Weil wenn nicht, dann soll das wieder
     * demakiert werden :)
     *
     * @todo Warum auch immer, das liefert immer ein False zurück oO
     *
     * @param clicksData
     * @param clickedCard
     * @returns {boolean}
     */
    var isClicked = function(clicksData, clickedCard) {
        clicksData.forEach(function (entry) {
            //if (entry.card == clickedCard) {
            if (parseInt(entry.card, 10) == parseInt(clickedCard, 10)) {
                return true;
            }
        });

        return false;
    };

    /**
     * Methode zum Auslesen der Klicks alles geklickten Karten.
     */
    var getCardClicks = function () {
        $.ajax({
            type: 'GET',
            url: host + '/rest/clicks',
            crossDomain: false,
            cache: false,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function (cardClicksResponseData) {
                cardClicksResponseData.clicks.forEach(function (entry) {
                    buzzwordConfirmed[entry.card] = true;
                });

                // Karten, die aus dem Spiel genommen wurden und ggf. schon geklickt waren wieder rausnehmen...
                for (var confirmedCard in buzzwordConfirmed) {
                    var result = $.grep(cardClicksResponseData.clicks, function (e) {
                        return e.card == confirmedCard;
                    });

                    if (result.length == 0) {
                        buzzwordConfirmed[confirmedCard] = false;
                    }
                }
            }
        });
    };

    /**
     * Wie oft soll der neueste Stand beim Server abgefragt werden?
     *
     * @type {number}
     */
    var interval = 6128;

    setInterval(getCardClicks, interval);

    // -- AJAX GET CARD CLICKS :: END ----------------------------------------------------------------------------------

    /**
     * setImgOn
     *
     * @param htmlId
     * @param imgIds
     */
    function setImgOn(htmlId, imgIds) {
        _.times(imgIds.length, function (id) {
            // wenn id 24 erreicht, in cell48 schreiben
            if (id == 24) {
                var $elem = $(htmlId + 48);
                $elem.find('img').attr('src', config.srcImg + '/' + imgIds[id] + '.svg');
                $elem.attr('data-img-id', imgIds[id]);
                $elem.addClass("gelbe_zelle");
            } else {
                var $elem = $(htmlId + id);

                $elem.find('img').attr('src', config.srcImg + '/' + imgIds[id] + '.svg');
                $elem.attr('data-img-id', imgIds[id]);

                // this in das timeout intervall überführen
                var that = $elem;
                var id_img = imgIds[id];

                // rekursives Timeout für 40 mal 3 sekunden, unterbrochen von buzzwordbestätigung per DB
                (function checkBuzzword() {
                    if (buzzwordConfirmed[id_img]) {
                        clearTimeout(checkBuzzword);
                        captionOff = true;
                        $(that).addClass("gelbe_zelle");
                        // idx = integerwert der geklickten zelle
                        var idx = parseInt($(that).attr('data-id'));
                        // geklickete Zelle in bingoCard true setzen
                        model.bingoCard[idx] = true;
                        buzzwordConfirmed[id_img] = true;
                        buzzwordBusy[id_img] = false;
                        $('#buzzwordText').html('<img src="' + config.srcImg + '/' + id_img + '.svg" height="225px" width="225px" align="left"> BUZZWORD FREIGEGEBEN!');
                        $('#buzzwordText').removeClass('buzzwordTextEmpty');
                        $('#buzzwordText').addClass('buzzwordTextBuzz');
                    }

                    if (!buzzwordConfirmed[id_img]) {
                        //console.log(buzzwordConfirmed[id_img]);
                        setTimeout(checkBuzzword, 5000);
                    }
                }());
            }
        });
    }

    /**
     * setImgOnSpare
     *
     * @param htmlId
     * @param imgIds
     */
    function setImgOnSpare(htmlId, imgIds) {
        _.times(imgIds.length, function (id) {
            var $elem = $(htmlId + id);
            $elem.find('img').attr('src', config.srcImg + '/' + imgIds[id] + '.svg');
            $elem.attr('data-img-id', imgIds[id]);

            // this in das timeout intervall überführen
            var that = $elem;
            var id_img = imgIds[id];

            // rekursives Timeout für 40 mal 3 sekunden, unterbrochen von buzzwordbestätigung per DB
            (function checkBuzzword() {
                if (!buzzwordConfirmed[id_img]) {
                    //console.log(buzzwordConfirmed[id_img]);
                    setTimeout(checkBuzzword, 5000);
                }

                if (buzzwordConfirmed[id_img]) {
                    captionOff = true;
                    $(that).addClass("gelbe_zelle");

                    // idx = integerwert der geklickten zelle
                    var idx = parseInt($(that).attr('data-id'));

                    // geklickete Zelle in bingoCard true setzen
                    model.bingoCard[idx] = true;
                    buzzwordConfirmed[id_img] = true;
                    buzzwordBusy[id_img] = false;
                    $('#buzzwordText').html('<img src="' + config.srcImg + '/' + id_img + '.svg" height="225px" width="225px" align="left">BUZZWORD FREIGEGEBEN!');
                    $('#buzzwordText').removeClass('buzzwordTextEmpty');
                    $('#buzzwordText').addClass('buzzwordTextBuzz');
                }
            }());
        });
    }

    /**
     * setImgOnRejected
     *
     * @param htmlId
     * @param imgIds
     */
    function setImgOnRejected(htmlId, imgIds) {
        _.times(imgIds.length + 1, function (id) {
            if (!isNaN(imgIds[id])) {
                var $elem = $(htmlId + (47 - id));
                $elem.find('img').attr('src', config.srcImg + '/' + imgIds[id] + '.svg');
                $elem.attr('data-img-id', imgIds[id]);
                $elem.addClass("rote_zelle");
            }
        });
    }

    /**
     * Zum Reseten der Buzzword Tabelle nach einem Ausschluss.
     *
     * @param htmlId
     * @param imgIds
     */
    function setImgOff(htmlId, imgIds) {
        _.times(imgIds.length, function (id) {
            var $elem = $(htmlId + id);
            $elem.find('img').attr('src', config.srcImg + '/vorschlag.svg');

        });
    }

    /**
     * Frei Feld Logo setzen
     *
     * @param htmlId
     * @param imgId
     */
    function setImgOnFree(htmlId, imgId) {
        var $elem = $(htmlId);
        $elem.find('img').attr('src', config.srcImg + '/' + imgId + '.svg');
        $elem.attr('data-img-id', '0');
        if (playMode) {
            $elem.addClass("gelbe_zelle");
        }
    }

    function bindEventHandler() {
        $(document).keydown(function (evt) { // c Taste an captionOff binden
            if (!playMode) {
                if (evt.keyCode == 67) {
                    evt.preventDefault();
                    toggleCaptionOnOff();
                }
            }
        });

        var userRejectedNum = 0;

        $('#BingoBody td').mouseover(function () {
            if (!captionOff && !playMode) {
                var idx = parseInt($(this).attr('data-img-id'));
                if (idx != '0') {
                    placeCaptionLeftOfMousecourser = false;
                    $('#buzzwordText').html('<img src="'+ config.srcImg + '/' + idx + '.svg" height="225px" width="225px" align="left">' + BuzzwordText[idx]);
                    $('#buzzwordText').removeClass('buzzwordTextEmpty');
                    $('#buzzwordText').addClass('buzzwordTextFilled');
                }
            }
        });

        $('#BingoBody td').mouseleave(function () {
            if (!captionOff && !playMode) {
                $('#buzzwordText').removeClass('buzzwordTextFilled');
                $('#buzzwordText').addClass('buzzwordTextEmpty');
            }
        });

        $('#BuzzwordsBody td').mouseover(function () {
            if (!captionOff && !playMode) {
                var idx = parseInt($(this).attr('data-img-id'));
                if (!isNaN(idx)) {
                    $('#buzzwordText').html('<img src="'+ config.srcImg + '/' + idx + '.svg" height="225px" width="225px" align="left">' + BuzzwordText[idx]);
                    $('#buzzwordText').removeClass('buzzwordTextEmpty');
                    $('#buzzwordText').addClass('buzzwordTextFilled');
                }
            }
        });

        $('#BuzzwordsBody td').mouseleave(function () {
            if (!captionOff && !playMode) {
                $('#buzzwordText').removeClass('buzzwordTextFilled');
                $('#buzzwordText').addClass('buzzwordTextEmpty');
            }
        });
    }

    function pad(n, width, z) {
        z = z || '0';
        n = n + '';

        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function containsAll(needle, haystack) {
        for (var i = 0, len = needle.length; i < len; i++) {
            if ($.inArray(needle[i], haystack) == -1) return false;
        }

        return true;
    }

    /**********************************************************************************************
     * CountUp script by Praveen Lobo (http://PraveenLobo.com/techblog/javascript-countup-timer/)
     * This notice MUST stay intact(in both JS file and SCRIPT tag) for legal use.
     * http://praveenlobo.com/blog/disclaimer/
     **********************************************************************************************/

    function CountUp(initDate, id) {
        this.beginDate = new Date(initDate);
        this.countainer = document.getElementById(id);
        this.numOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
        this.hours = 0, this.minutes = 0, this.seconds = 0;
        this.updateNumOfDays();
        this.updateCounter();
    }

    CountUp.prototype.updateNumOfDays = function () {
        var dateNow = new Date();
        var currYear = dateNow.getFullYear();
        if ((currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0) {
            this.numOfDays[1] = 29;
        }
        var self = this;
        setTimeout(function () {
            self.updateNumOfDays();
        }, (new Date((currYear + 1), 1, 2) - dateNow));
    };

    CountUp.prototype.datePartDiff = function (then, now, MAX) {
        var diff = now - then - this.borrowed;
        this.borrowed = 0;
        if (diff > -1) return diff;
        this.borrowed = 1;
        return (MAX + diff);
    };

    CountUp.prototype.calculate = function () {
        var currDate = new Date();
        var prevDate = this.beginDate;
        this.seconds = this.datePartDiff(prevDate.getSeconds(), currDate.getSeconds(), 60);
        this.minutes = this.datePartDiff(prevDate.getMinutes(), currDate.getMinutes(), 60);
        this.hours = this.datePartDiff(prevDate.getHours(), currDate.getHours(), 24);
        this.days = this.datePartDiff(prevDate.getDate(), currDate.getDate(), this.numOfDays[currDate.getMonth()]);
        this.months = this.datePartDiff(prevDate.getMonth(), currDate.getMonth(), 12);
        this.years = this.datePartDiff(prevDate.getFullYear(), currDate.getFullYear(), 0);
    };

    CountUp.prototype.addLeadingZero = function (value) {
        return value < 10 ? ("0" + value) : value;
    };

    CountUp.prototype.formatTime = function () {
        this.seconds = this.addLeadingZero(this.seconds);
        this.minutes = this.addLeadingZero(this.minutes);
        this.hours = this.addLeadingZero(this.hours);
    };

    CountUp.prototype.updateCounter = function () {
        this.calculate();
        this.formatTime();
        this.countainer.innerHTML =
            '<div style="padding-left: 5px; padding-top: 34px; overflow: visible;">' +
            this.hours + ':' +
            this.minutes + ':' +
            this.seconds +
            '</div>';
        var self = this;
        setTimeout(function () {
            self.updateCounter();
        }, 1000);
    };
});
