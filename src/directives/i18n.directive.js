var i18n = require('i18n');

angular
    .module('todo-app')
    .directive('taI18n', taI18n)
    .directive('taI18nPlaceholder', taI18n);

function taI18n($rootScope, constants) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var label = attrs.taI18n;
            var placeholderLable = attrs.taI18nPlaceholder;

            function updateTranslation() {
                var translation;

                if (placeholderLable) {
                    translation = i18n.__(placeholderLable);

                    if (translation.indexOf('.') == -1) {
                        element.attr('placeholder', translation);
                    }
                } else {
                    translation = i18n.__(label);

                    if (translation.indexOf('.') == -1) {
                        element.text(translation);
                    }
                }
            }

            updateTranslation();

            $rootScope.$on(constants.EVENT.LOCALE_UPDATED, updateTranslation);
        }
    };
}

taI18n.$inject = ['$rootScope', 'constants'];