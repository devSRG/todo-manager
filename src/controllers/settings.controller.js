angular
    .module('todo-app')
    .controller('SettingsController', SettingsController);

function SettingsController($scope, settings, orm) {
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

    function setLocale(locale) {
        settings.setUserLocale(locale);

        var user = settings.getLoggedInUser();

        user.locale = locale;
        user.settings = JSON.stringify(user.settings);

        orm.User.update(user.id, user);
    }

    function setFontSize(size) {
        settings.setUserFontSize(size);

        var user = settings.getLoggedInUser();

        user.settings.fontSize = size;
        user.settings = JSON.stringify(user.settings);

        orm.User.update(user.id, user);
    }

    function setTheme(theme) {
        settings.setUserTheme(theme);

        var user = settings.getLoggedInUser();

        user.settings.theme = theme;
        user.settings = JSON.stringify(user.settings);
        vm.theme = settings.getUserTheme();

        orm.User.update(user.id, user);
    }
}

SettingsController.$inject = ['$scope', 'settings', 'orm'];
