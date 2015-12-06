var BingoApp = angular.module('BingoApp', []).config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[').endSymbol(']}');
});

/**
 * HTML ohne weitere Behandlung ausgeben. Wir vertrauen unserem HTML ;)
 */
BingoApp.filter('unsafe', function ($scope) {
    return $scope.trustAsHtml;
});
