angular
    .module('todo-app')
    .value('constants', {
        CONFIG: {
            MAINWINDOW_ONLY_CLOSE: false,
            MAXIMIZE_ENABLED: false
        },
        EVENT: {
            LOCALE_UPDATED: 0,
            FONTSIZE_UPDATED: 1,
            THEME_UPDATED: 2
        }
    });