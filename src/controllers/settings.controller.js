angular
    .module('todo-app')
    .controller('SettingsController', SettingsController);

function SettingsController($scope, settings) {
    var vm = this;

    vm.keymaps = [
        {
            def: 'Close window',
            com: 'Alt + F4'
        },
        {
            def: 'Copy',
            com: 'Alt + C'
        }
    ];
    vm.locales = settings.getLocales();
    vm.fontSizes = settings.getFontSizes();
    vm.themes = settings.getThemes();
    vm.locale = settings.getUserLocale();
    vm.fontSize = settings.getUserFontSize();
    vm.theme = settings.getUserTheme();
    vm.setLocale = setLocale;
    vm.setFontSize = setFontSize;
    vm.setTheme = setTheme;
    vm.enableMaximize = settings.maximize;
    vm.toggleMaximize = settings.toggleMaximize;

    function setLocale(locale) {
        settings.setUserLocale(locale);
    }

    function setFontSize(size) {
        settings.setUserFontSize(size);
    }

    function setTheme(theme) {
        settings.setUserTheme(theme);

        vm.theme = settings.getUserTheme();
    }
}

SettingsController.$inject = ['$scope', 'settings'];
