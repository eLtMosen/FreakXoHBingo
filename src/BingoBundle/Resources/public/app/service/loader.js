/**
 * Shows a loader inside a container
 *
 */
BingoApp.factory('LoaderService', ['$timeout', '$sce', '$log',
    function ($timeout, $sce, $log) {
        var loaderTemplate = '<div id="loading"><i class="fa fa-spinner fa-spin"></i></div>';
        var loaderRoot = '#loading';
        var buttonLoaderTemplate = '<div class="button-loader"><i class="fa fa-circle-o-notch fa-spin"></i></div>';

        return {
            buttonLoaderAdd: function (container) {
                var jContainer = angular.element(container);

                jContainer.css('width', jContainer.outerWidth());
                jContainer.css('height', jContainer.outerHeight());
                jContainer.data('loader-content-backup', jContainer.html())
                jContainer.attr('disabled', 'disabled');
                jContainer.html(buttonLoaderTemplate);
            },

            buttonLoaderRemove: function (container) {
                var jContainer = angular.element(container);

                jContainer.css('width', '');
                jContainer.css('height', '');
                jContainer.html(jContainer.data('loader-content-backup'));
                jContainer.removeAttr('disabled');
            },

            loadingShieldAdd: function (container) {
                var jContainer = angular.element(container);

                jContainer.data('overflow-backup-loader', jContainer.css('overflow'));
                jContainer.css('overflow', 'hidden');
                jContainer.append(loaderTemplate);

                jContainer.find(loaderRoot).css('top', jContainer[0].scrollTop);
                //jContainer.find(loaderRoot).css('height', jContainer.offsetHeight());
            },

            loadingShieldRemove: function (container) {
                var jContainer = angular.element(container);

                jContainer.css('overflow', jContainer.data('overflow-backup-loader'));
                jContainer.data('overflow-backup-loader', '');

                jContainer.find(loaderRoot).remove();
            },

            toTrusted: function (htmlCode) {
                return $sce.trustAsHtml(htmlCode);
            }
        };
    }
]);
