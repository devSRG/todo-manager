var translator = require('i18n');

angular
    .module('todo-app')
    .factory('i18n', i18n);

function i18n() {
    return {
        configure: configure,
        setLocale: setLocale,
        translate: translate,
    };

    function configure(options) {
        translator.configure(options);
    }

    function setLocale(locale) {
        translator.setLocale(locale);
    }

    function translate(key, defaultValue) {
        var translation = translator.__(key);

        if (translation.indexOf('.') != -1) {
            translation = defaultValue || null;
        }

        return translation;
    }
}
