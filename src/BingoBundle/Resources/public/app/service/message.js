/**
 * The message service to handle notifications as a bootstrap alert from application to the client.
 *
 * Types: success info warning danger
 */
BingoApp.factory('MessageService', ['$timeout', '$sce', '$log', '$modal',
    function ($timeout, $sce, $log) {
        var messages = [];

        return {
            messages: messages,
            set: function (type, message) {
                notifications.push({type: type, message: message});
                $timeout(function () {
                    notifications.shift();
                }, 5000);
            },

            hasMessage: function(message, namespace) {
                for (i = 0; i < messages.length; i++) {
                    if (messages[i].message == message && messages[i].namespace == namespace) {
                        console.log("found message ", message, " in ", messages);
                        return true;
                    }
                }

                return false;
            },

            addMessage: function (type, message, namespace, id) {

                if (this.hasMessage(message, namespace)) {
                    return false;
                }

                messages.push({type: type, message: message, namespace : namespace,'id': id});

                this.removeDoubles();
                this.renderMessages();
            },
            addMessages: function (messagesToLoad) {
                if (messagesToLoad && messagesToLoad.length >= 1) {
                    var i = 0, len = messagesToLoad.length, type = '';

                    for (; i < len; i++) {
                        type = messagesToLoad[i].type;

                        if (messagesToLoad[i].type == 'error') {
                            type = 'danger';
                        }

                        this.addMessage(type, messagesToLoad[i].message, messagesToLoad[i].namespace, messagesToLoad[i].id);
                    }
                }

                this.renderMessages();
            },
            hasErrors: function () {
                var i = 0, len = messages.length;

                for (; i < len; i++) {
                    if (messages[i].type == 'error' || messages[i].type == 'danger' || messages[i].type == 'danger') {
                        return true;
                    }
                }

                return false;
            },
            getMessages: function() {
                return messages;
            },
            closeMessage: function(index) {
                messages.splice(index, 1);
            },
            clearMessages: function(container) {
                var i = messages.length;

                while (i--) {
                    messages.splice(i, 1);
                }

                if (container !== 'undefined') {
                    angular.element(container).find('.alert').remove();
                }
            },

            clearMessagesByNamespace: function(namespace) {
                angular.element('.message-insert[data-message-namespace="' + namespace + '"]').find('.alert').remove();
            },

            renderMessages : function() {
                var i = 0, len = messages.length, markup = '';

                for (; i < len; i++) {
                    markup = '<div class="msg-id-'+messages[i].id+' alert alert-' + messages[i].type + '" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;' +
                    '</span><span class="sr-only">Close</span></button>' + messages[i].message + '</div>';

                    angular.element('.message-insert[data-message-namespace="' + messages[i].namespace + '"]').find('.alert').remove();
                    angular.element('.message-insert[data-message-namespace="' + messages[i].namespace + '"]').append(markup);
                }
            },

            removeDoubles : function() {
                var i = 0, len = messages.length, markup = '';

                for (; i < len; i++) {
                    var msg = messages[i].message;

                }
            },

            flushToContainer : function(selectorString) {
                var i = 0, len = messages.length, markup = '';

                for (; i < len; i++) {
                    markup = markup + '<div class="alert alert-' + messages[i].type + '" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;' +
                        '</span><span class="sr-only">Close</span></button>' + messages[i].message + '</div>';
                }

                if (angular.element(selectorString).length == 0) {
                    $log.log('MessageService :: flushToContainer > Container \'' + selectorString + '\' could not be found.');
                }

                angular.element(selectorString).find('.alert').remove();
                angular.element(selectorString).append(markup);
                this.clearMessages();
            },

            toTrusted: function(htmlCode) {
                return $sce.trustAsHtml(htmlCode);
            }
        };
    }
]);
