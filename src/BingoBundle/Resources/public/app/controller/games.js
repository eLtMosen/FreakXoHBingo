BingoApp.controller('BingoGamesController', function ($scope, $locale, $window, $modal, $log, Restangular, LoaderService, MessageService, MessageBoxService) {
    /**
     * Get the global logger to the local scope.
     *
     * @type {*}
     */
    $scope.$log = $log;

    $log.log('The "BingoGamesController" started!');

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
     * Restangular Games AJAX target.
     */
    var gamesAjax = Restangular.all('/rest/games');

    /**
     * List of Bingo Games Data.
     *
     * @type {Array}
     */
    $scope.games = [];

    /**
     * Get Games Data.
     */
    $scope.getGames = function () {
        $scope.setLoading(true);

        gamesAjax.get('').then(function (response) {
            $scope.setLoading(false);

            if (typeof response.games != 'undefined') {
                $scope.games = response.games;
            }
        }, function () {
            $scope.setLoading(false);
            $scope.messageService.addMessage('danger', 'There was an error getting games data from request!');
        });
    };

    /**
     * Open the game modal to create or update a game.
     *
     * @param game
     */
    $scope.openGameModal= function (game) {
        var modalInstance = $modal.open({
            windowClass: 'modal fade in',
            templateUrl: 'GameModalContent.html',
            keyboard: true,
            controller: GameModalInstanceCtrl,
            resolve: {
                game: function() {
                    return typeof game != 'undefined' ? game : {};
                }
            }
        });
    };

    $scope.$on("updateList",function(){
        $scope.getGames();
    });

    /*
    var myModal = $modal.open({
        animation: true,
        templateUrl: 'editForm.html',
        backdrop: 'static',
        keyboard: false,
        scope: $scope
    });

    myModal.result.then(function(){
        //Call function to reload the list
    });
    */
});
