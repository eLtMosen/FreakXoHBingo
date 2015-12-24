/**
 * Dieser Service zeigt eine BS Modal basierte Messagebox an.
 *
 * Types: alert confirm
 *
 * Konfigurations-Einstellungen
 *
 * title: Text für die Titelzeile
 * message: Die Nachricht, die angezeigt werden soll
 * icon: Ein Icon das links neben der Nachricht angezeigt wird: info | warning | question | error
 * btn_0_label: Beschriftung für den ersten Button von links
 * btn_1_label: Beschriftung für den zweiten Button von links (nur bei confirm)
 */
BingoApp.factory('MessageBoxService', ['$timeout', '$sce', '$log', '$modal',
    function ($timeout, $sce, $log, $modal) {
        return {
            /**
             * Zeigt eine einfache Messagebox mit einem Button
             *
             * @param config Konfiguration
             * @param closed Callback das beim schließen der MessageBox ausgeführt wird
             */
            'alert': function (config, closed) {
                var that = this;

                var modalInstance = $modal.open({
                        templateUrl: 'UIBaseMessageboxAlert.html',
                        keyboard: true,
                        size: 'sm',
                        controller: 'MessageBoxServiceModalController',
                        resolve: {
                            'msgBoxConfig': function () {
                                return {
                                    'title': config.title,
                                    'message': config.message,
                                    'icon': (!config.icon ? 'info' : config.icon),
                                    'btn_0_label': (!config.btn_0_label ? 'Okay' : config.btn_0_label),
                                    'boxtype': 'alert'
                                };
                            }
                        }
                    })
                    .result.then(function () {
                        if (undefined !== closed) {
                            closed();
                        }
                    });
            },

            /**
             * Zeigt eine einfache Messagebox mit zwei Buttons
             * Das Callback erhält als einzigen Parameter den reply, dieser kann sein
             * 'yes' oder 'no', je nachdem welcher Button betätigt wurde
             *
             * @param config Konfiguration
             * @param closed Callback das beim schließen der MessageBox ausgeführt wird
             */
            'confirm': function (config, closed) {
                var that = this;

                var modalInstance = $modal.open({
                        templateUrl: 'UIBaseMessageboxAlert.html',
                        keyboard: true,
                        size: 'sm',
                        controller: 'MessageBoxServiceModalController',
                        resolve: {
                            'msgBoxConfig': function () {
                                return {
                                    'title': config.title,
                                    'message': config.message,
                                    'icon': (!config.icon ? 'question' : config.icon),
                                    'btn_0_label': (!config.btn_0_label ? 'Cancel' : config.btn_0_label),
                                    'btn_1_label': (!config.btn_1_label ? 'Okay' : config.btn_1_label),
                                    'boxtype': 'confirm'
                                };
                            }
                        }
                    })
                    .result.then(function (reply) {
                        if (undefined !== closed) {
                            closed(reply);
                        }
                    });
            }
        };
    }
]);

/**
 * Dies ist der Controller für das generische MessageboxModal
 */
BingoApp.controller('MessageBoxServiceModalController', function ($scope, $sce, $modalInstance, msgBoxConfig) {
    /**
     * Registriert die Config der aktuellen Messagebox im Scope
     */
    $scope.msgBoxConfig = msgBoxConfig;

    /**
     * alert: Es wurde ok geklickt (btn_0)
     */
    $scope.ok = function () {
        $modalInstance.close();
    };

    /**
     * alert | confirm: Es wurde abgebrochen (X in der Titelzeile)
     */
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    /**
     * confirm: Es wurde ja geklickt (btn_1)
     */
    $scope.yes = function () {
        $modalInstance.close('yes');
    };

    /**
     * confirm: Es wurde nein geklickt (btn_0)
     */
    $scope.no = function () {
        $modalInstance.close('no');
    };

    /**
     * Transfer a HTML code part to trusted.
     *
     * @param htmlCode
     * @returns {*}
     */
    $scope.toTrusted = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
});
