angular
    .module('todo-app')
    .directive('taI18n', taI18n)
    .directive('taI18nPlaceholder', taI18n)
    .directive('taI18nTitle', taI18n);

function taI18n($rootScope, constants, i18n) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            function updateTranslation() {
                var attributeType = null;
                var key = null;
                var translation = null;

                if (attrs.taI18nTitle) {
                    attributeType = 'title';
                    key = attrs.taI18nTitle;
                } else if (attrs.taI18nPlaceholder) {
                    attributeType = 'placeholder';
                    key = attrs.taI18nPlaceholder;
                } else {
                    key = attrs.taI18n;
                }

                translation = i18n.translate(key);

                if (translation) {
                    if (attributeType) {
                        element.attr(attributeType, translation);
                    } else {
                        element.text(translation);
                    }
                }
            }

            updateTranslation();

            $rootScope.$on(constants.EVENT.LOCALE_UPDATED, updateTranslation);
        }
    };
}

taI18n.$inject = ['$rootScope', 'constants', 'i18n'];
