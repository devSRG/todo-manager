var i18n = require('i18n');

angular
    .module('todo-app')
    .filter('i18n', function($timeout, SettingsService) {
        return function(label) {
            function updateString() {
                if (SettingsService.isInitialized()) {
                    return i18n.__(label);
                } else {
                    return $timeout(updateString, 100);
                }
            }

            return updateString();
        };
    });