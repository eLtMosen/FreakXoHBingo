/**
 * @param $scope
 * @param $sce
 * @param $window
 * @param $modalInstance
 * @param $log
 * @param Restangular
 * @param MessageService
 * @param game
 * @param LoaderService
 * @constructor
 */
var GameModalInstanceCtrl = function ($scope, $rootScope, $sce, $window, $modalInstance, $log, Restangular, MessageService, game, LoaderService) {
    /**
     * Get the global logger to the local scope.
     *
     * @type {*}
     */
    $scope.$log = $log;

    /**
     * Log that this controller is started.
     */
    $log.log('The "GameModalInstanceCtrl" Controller started!');

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
     * Request Address Data
     */
    $scope.gameAjax = Restangular.all('/admin/rest/game');

    /**
     * The Game Object.
     *
     * @type {{}}
     */
    $scope.game = game;

    /**
     * Submit the modal form.
     *
     * @param game
     */
    $scope.modalFormSubmit = function (game) {
        $scope.setLoading(true);

        $scope.gameAjax.post(game).then(function (result) {
            $scope.setLoading(false);

            if (result.status == true) {
                // @todo Refresh games list
                $rootScope.$broadcast('updateList');
            } else {
                $scope.messageService.addMessage('danger', 'There was an error saving game data from request!');
                MessageService.flushToContainer('');
            }

            return true;
        });
    };

    /**
     * Method to send the modal data.
     */
    $scope.modalOk = function () {
        $scope.messageService.clearMessages();
        $scope.modalFormSubmit($scope.game);
        $modalInstance.close($scope.game);
    };

    /**
     * Method to cancel the modal.
     */
    $scope.modalCancel = function () {
        $scope.messageService.clearMessages();
        //$scope.game = {};
        $modalInstance.dismiss('cancel');
    };

    /**
     * Method to close the modal.
     *
     * @todo This is the same like modalCancel!
     */
    $scope.modalClose = function () {
        $scope.messageService.clearMessages();
        //$modalInstance.close($scope.game);
    };
};
