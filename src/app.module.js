require('angular');
require('angular-animate');
require('angular-date-picker');

angular
    .module('todo-app', ['ngAnimate', 'mp.datePicker'])
    .config(['databaseProvider', 'schemaProvider', function (database, schema) {
        database.setSchema(schema.schema);
        database.init();
    }])
    .run(Initialize);

function Initialize($rootScope, settings, ipc, constants, i18n, orm) {
    $rootScope.mainWindowOnlyClose = constants.CONFIG.MAIN_WINDOW_ONLY_CLOSE;
    $rootScope.maximizeEnabled = constants.CONFIG.MAXIMIZE_ENABLED;
    $rootScope.close = close;
    $rootScope.minimize = minimize;
    $rootScope.maximize = maximize;

    orm.User.getPersistedUser().then(function (data) {
        if (data) {
            $rootScope.$broadcast(constants.EVENT.LOGGED_IN_USER, data);
            ipc.send(ipc.cmd.SHOW_MAIN_WINDOW);
        } else {
            ipc.send(ipc.cmd.SHOW_LOG_IN_WINDOW);
        }
    });

    var locales = settings.getLocales();
    var i18nOpts = {
        defaultLocale: locales[0].value,
        locales: locales.map(function (locale) { return locale.value; }),
        directory: './locales',
        syncFiles: true,
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

Initialize.$inject = ['$rootScope', 'settings', 'ipc', 'constants', 'i18n', 'orm'];
