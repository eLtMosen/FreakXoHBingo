BingoApp.controller('BingoClicksController', function ($scope, $locale, $window, $uibModal, $log, Restangular, LoaderService, MessageService, MessageBoxService) {
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
     * Get Clicks Data.
     */
    $scope.getClicks = function () {
        $scope.setLoading(true);

        clicksAjax.get('').then(function (response) {
            $scope.setLoading(false);

            if (typeof response.clicks != 'undefined') {
                $scope.clicks = response.clicks;
            }
        }, function () {
            $scope.setLoading(false);
            $scope.messageService.addMessage('danger', 'There was an error getting clicks data from request!');
        });
    };

    /**
     * Open the click modal to create or update a click.
     *
     * @param click
     */
    $scope.openClickModal= function (click) {
        var modalInstance = $uibModal.open({
            windowClass: 'modal fade in',
            templateUrl: 'ClickModalContent.html',
            keyboard: true,
            controller: ClickModalInstanceCtrl,
            resolve: {
                click: function() {
                    return typeof click != 'undefined' ? click : {};
                }
            }
        });
    };

    $scope.$on("updateList",function(){
        $scope.getClicks();
    });





    $scope.$watch('order', function () {
        $scope.setOrder();
    });

    $scope.setOrder = function () {
        var i;

        if ($scope.order === 'random') {
            var t = [];
            for (i = 0; i < $scope.myList.length; i++) {
                var r = Math.floor(Math.random() * $scope.myList.length);
                while (inArray(t,r)) {
                    r = Math.floor(Math.random() * $scope.myList.length);
                }
                t.push(r);
                $scope.myList[i].order = r;
            }
        }
        else if ($scope.order === 'false') {
            for (i = 0; i < $scope.myList.length; i++) {
                $scope.myList[i].order = i;
            }
        }
        else {
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
            var columns = 5;
            item.column = item.order%columns;
            item.row = Math.floor(item.order/columns);

            // rows, top-to-bottom, left-to-right
            // var rows = 3;
            // item.column = Math.floor(item.order/rows);
            // item.row = item.order%rows;
        }
    }

});
