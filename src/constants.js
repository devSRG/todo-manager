angular
    .module('todo-app')
    .value('constants', {
        CONFIG: {
            MAINWINDOW_ONLY_CLOSE: false,
            MAXIMIZE_ENABLED: false
        },
        EVENT: {
            INIT: 0,
            DISPOSE: 1,
            LOGGED_IN_USER: 2,
            LOCALE_UPDATED: 3,
            FONT_SIZE_UPDATED: 4,
            THEME_UPDATED: 5
        }
    });