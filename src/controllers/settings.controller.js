angular
    .module('todo-app')
    .controller('SettingsController', SettingsController);

function SettingsController($scope, constants, settings, orm) {
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
    vm.locale = null;
    vm.fontSize = null;
    vm.theme = null;
    vm.setLocale = setLocale;
    vm.setFontSize = setFontSize;
    vm.setTheme = setTheme;

    $scope.$on(constants.EVENT.INIT, init);
    $scope.$on(constants.EVENT.DISPOSE, dispose);

    function init() {
        vm.locale = settings.getUserLocale();
        vm.fontSize = settings.getUserFontSize();
        vm.theme = settings.getUserTheme();
    }

    function setLocale(locale) {
        settings.setUserLocale(locale);

        var user = settings.getLoggedInUser();

        user.locale = locale;

        orm.User.update(user.id, formatUser(user));
    }

    function setFontSize(size) {
        settings.setUserFontSize(size);

        var user = settings.getLoggedInUser();

        user.settings.fontSize = size;

        orm.User.update(user.id, formatUser(user));
    }

    function setTheme(theme) {
        settings.setUserTheme(theme);

        var user = settings.getLoggedInUser();

        user.settings.theme = theme;
        vm.theme = settings.getUserTheme();

        orm.User.update(user.id, formatUser(user));
    }

    function formatUser(data) {
        var user = JSON.parse(JSON.stringify(data));

        user.settings = JSON.stringify(user.settings);

        return user;
    }

    function dispose() {
        vm.locale = settings.getDefaultLocale();
        vm.fontSize = settings.getDefaultFontSize();
        vm.theme = settings.getDefaultTheme();
    }
}

SettingsController.$inject = ['$scope', 'constants', 'settings', 'orm'];
