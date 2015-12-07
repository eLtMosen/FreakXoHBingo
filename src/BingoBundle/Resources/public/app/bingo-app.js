var BingoApp = angular.module('BingoApp', ['restangular', 'ui.bootstrap']).config(function ($httpProvider, $interpolateProvider) {
    $httpProvider.defaults.headers.common['Content-Type'] = "application/json; charset=UTF-8";
    $interpolateProvider.startSymbol('{[').endSymbol(']}');
});

/**
 * HTML ohne weitere Behandlung ausgeben. Wir vertrauen unserem HTML ;)
 */
BingoApp.filter("unsafe", function ($scope) {
    return $scope.trustAsHtml;
});

/**
 * Restangular erweitern...
 */
BingoApp.config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl("https://freakxohbingo.de/app_dev.php/");
    RestangularProvider.setDefaultHeaders({
        "Content-Type": "application/json; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest"
    });
    RestangularProvider.setDefaultHttpFields({
        'withCredentials': true
    });
});
