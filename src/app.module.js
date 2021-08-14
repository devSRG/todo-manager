require('angular');
require('angular-animate');
require('angular-date-picker');

var i18n = require('i18n');

angular
    .module('todo-app', ['ngAnimate', 'mp.datePicker'])
    .config(['databaseProvider', 'schemaProvider', function (database, schema) {
        database.setSchema(schema.schema);
        database.init();
    }])
    .run(Initialize);

function Initialize($rootScope, settings, ipc, constants) {
    $rootScope.close = close;
    $rootScope.minimize = minimize;
    $rootScope.maximize = maximize;
    $rootScope.mainWindowOnlyClose = constants.CONFIG.MAINWINDOW_ONLY_CLOSE;
    $rootScope.maximizeEnabled = constants.CONFIG.MAXIMIZE_ENABLED;
    $rootScope.user = null;

    var locales = settings.getLocales();
    var i18nOpts = {
        defaultLocale: locales[0].value,
        locales: locales.map(function (locale) { return locale.value; }),
        directory: './locales',
        objectNotation: true
    };

    i18n.configure(i18nOpts);

    function minimize() {
        if (!$rootScope.windowBtnsDisabled && !$rootScope.mainWindowOnlyClose) {
            ipc.send(ipc.cmd.MINIMIZE);
        }
    }

    function maximize() {
        if (!$rootScope.windowBtnsDisabled && !$rootScope.mainWindowOnlyClose && $rootScope.maximizeEnabled) {
            ipc.send(ipc.cmd.MAXIMIZE);
        }
    }

    function close() {
        if (!$rootScope.windowBtnsDisabled) {
            ipc.send(ipc.cmd.CLOSE);
        }
    }
}

Initialize.$inject = ['$rootScope', 'settings', 'ipc', 'constants'];
