BingoApp.controller('BingoClicksController', function ($scope, $interval, $locale, $window, $uibModal, $log, Restangular, LoaderService, MessageService, MessageBoxService) {
    /**
     * Get the global logger to the local scope.
     *
     * @type {*}
     */
    $scope.$log = $log;

    $log.log('The "BingoClicksController" started!');

    /**
     * This app is not loading by default.
     *
     * @type {boolean}
     */
    $scope.isLoading = false;

    /**
     * Set the loading true or false.
     *
     * @param loading
     */
    $scope.setLoading = function (loading) {
        if (loading == true) {
            LoaderService.loadingShieldAdd('body');
        } else {
            LoaderService.loadingShieldRemove('body');
        }
    };

    /**
     * Get the message service to the local scope.
     *
     * @type {*}
     */
    $scope.messageService = MessageService;

    /**
     * Get the messages from the message service to the local scope to.
     *
     * @type {messages|*|ui.autocomplete.options.messages|.options.messages}
     */
    $scope.messages = MessageService.messages;

    /**
     * Restangular Clicks AJAX target.
     */
    var clicksAjax = Restangular.all('/rest/clicks');

    /**
     * List of Bingo Clicks Data.
     *
     * @type {Array}
     */
    $scope.clicks = [];

    /**
     * Methode zum Überprüfen ob die Karte bereits geklickt wurde und somit bekannt ist.
     *
     * @param card
     * @returns {boolean}
     */
    $scope.cardExist = function (card) {
        for (var i = 0, len = $scope.clicks.length; i < len; i++) {
            //if (typeof $scope.clicks[i] != 'undefined') {
            if ($scope.clicks[i].card == card) {
                return true;
            }
        }

        return false;
    };

    /**
     * Methode zum Herausfinden des Index der Karte innerhalb der Liste von Karten.
     *
     * @param card
     * @returns {number}
     */
    $scope.getCardIndex = function (card) {
        for (var i = 0, len = $scope.clicks.length; i < len; i++) {
            if ($scope.clicks[i].card == card) {
                return i;
            }
        }

        return i + 1;
    };

    /**
     * Get Clicks Data.
     * @todo Loading Animation nur etwas dezenter einbauen.
     */
    $scope.getClicks = function () {
        //$scope.setLoading(true);

        clicksAjax.get('').then(function (response) {
            //$scope.setLoading(false);

            if (typeof response.clicks != 'undefined') {
                //$scope.clicks = response.clicks;

                for (var i = 0; i < response.clicks.length; i++) {
                    if (!$scope.cardExist(response.clicks[i].card)) {
                        $scope.clicks.push(response.clicks[i]);
                    }

                    $scope.clicks[$scope.getCardIndex(response.clicks[i].card)].order = i;
                }
            }
        }, function () {
            //$scope.setLoading(false);
            $scope.messageService.addMessage('danger', 'There was an error getting clicks data from request!');
        });
    };

    //var interval = $interval($scope.getClicks, 5000);
    $interval($scope.getClicks, 7128);

    // -- LIST ORDER ---------------------------------------------------------------------------------------------------

    // DRAFT: http://output.jsbin.com/eYiDIKO/4#/

    $scope.order = 'false';

    $scope.myList = [
        {id: 0, text: 'HTML5 Boilerplate'},
        {id: 1, text: 'AngularJS'},
        {id: 2, text: 'Karma'},
        {id: 3, text: 'Hello'},
        {id: 4, text: 'World'},
        {id: 5, text: 'How'},
        {id: 6, text: 'Are'},
        {id: 7, text: 'You'},
        {id: 8, text: '?'},
        {id: 9, text: 'I'},
        {id: 10, text: 'write'},
        {id: 11, text: 'more'},
        {id: 12, text: 'to'},
        {id: 13, text: 'make'},
        {id: 14, text: 'the'},
        {id: 15, text: 'list'},
        {id: 16, text: 'longer'}
    ];

    $scope.$watch('order', function () {
        $scope.setOrder();
    });

    $scope.setOrder = function () {
        var i;

        if ($scope.order === 'random') {
            var t = [];

            for (i = 0; i < $scope.myList.length; i++) {
                var r = Math.floor(Math.random() * $scope.myList.length);

                while (inArray(t, r)) {
                    r = Math.floor(Math.random() * $scope.myList.length);
                }

                t.push(r);
                $scope.myList[i].order = r;
            }
        } else if ($scope.order === 'false') {
            for (i = 0; i < $scope.myList.length; i++) {
                $scope.myList[i].order = i;
            }
        } else {
            for (i = 0; i < $scope.myList.length; i++) {
                $scope.myList[i].order = ($scope.myList.length - 1 - i);
            }
        }

        calcGridPosition();
    };

    function inArray(a, value) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === value) {
                return true;
            }
        }

        return false;
    }

    function calcGridPosition() {
        for (var i = 0; i < $scope.myList.length; i++) {
            var item = $scope.myList[i];

            // columns, left-to-right, top-to-bottom
            var columns = 13;
            item.column = item.order % columns;
            item.row = Math.floor(item.order / columns);

            // rows, top-to-bottom, left-to-right
            // var rows = 3;
            // item.column = Math.floor(item.order/rows);
            // item.row = item.order%rows;
        }
    }
});
