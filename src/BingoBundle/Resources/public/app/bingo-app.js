var BingoApp = angular.module('BingoApp', ['ngAnimate', 'restangular', 'ui.bootstrap']).config(function ($httpProvider, $interpolateProvider) {
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
    var host = location.protocol.concat('//').concat(window.location.hostname);

    if (window.location.href.indexOf('app_dev.php') > -1) {
        host = host.concat('/app_dev.php');
    }

    RestangularProvider.setBaseUrl(host);
    RestangularProvider.setDefaultHeaders({
        "Content-Type": "application/json; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest"
    });
    RestangularProvider.setDefaultHttpFields({
        'withCredentials': true
    });
});
