angular
    .module('todo-app')
    .controller('MainController', MainController);

function MainController($rootScope, $scope, $document, util, settings, constants, i18n, ipc, orm) {
    var vm = this;

    $rootScope.blurBackground = false;
    $rootScope.showOverlay = false;
    $rootScope.showAlert = false;
    $rootScope.currentPage = 'todo';
    $rootScope.updatePage = updatePage;

    vm.blurBackground = $rootScope.blurBackground;
    vm.showAlert = $rootScope.showAlert;
    vm.showOverlay = $rootScope.showOverlay;
    vm.dialogTitle = null;
    vm.dialogContent = null;
    vm.dialogOptions = null;
    vm.fontSize = settings.getUserFontSize().value;
    
    $scope.openDialog = openDialog;

    $scope.$on(constants.EVENT.FONT_SIZE_UPDATED, updateFontSize);
    $scope.$on(constants.EVENT.THEME_UPDATED, updateTheme);
    $scope.$on(constants.EVENT.LOGGED_IN_USER, setup)
    $scope.$on(constants.EVENT.DISPOSE, dispose);

    ipc.on('user', function (evt, userData) {
        setup(null, userData);
    });

    // Settings needs to be initialized within the controller for events to work properly
    // or else controllers might not have been initialized before the events are fired.
    settings.initialize();

    // var locales = settings.getLocales();
    // var i18nOpts = {
    //     defaultLocale: locales[0].value,
    //     locales: locales.map(function (locale) { return locale.value; }),
    //     directory: './locales',
    //     objectNotation: true
    // };

    // i18n.configure(i18nOpts);
    
    function setup(evt, userData) {
        settings.initialize(userData);
        $scope.$broadcast(constants.EVENT.INIT);
    }

    function updatePage(page) {
        $rootScope.currentPage = page;
    }

    function openDialog(title, content, options) {
        vm.dialogTitle = title;
        vm.dialogContent = content;
        vm.dialogOptions = Object.assign(options || {}, { closeCb: closeDialog });

        $rootScope.blurBackground = true;
    }

    function closeDialog() {
        vm.dialogTitle = null;
        vm.dialogContent = null;

        $rootScope.blurBackground = false;
    }
    
    function updateFontSize() {
        vm.fontSize = settings.getUserFontSize().value;
    }

    function updateTheme() {
        var links = $document.find('link');
        var theme = settings.getUserTheme().name;

        links[links.length - 1].href = '../css/' + theme.toLowerCase() + '-styles.css';
    }

    function dispose() {
        settings.removeLoggedInUser();
    }
}

MainController.$inject = ['$rootScope', '$scope', '$document', 'utility', 'settings', 'constants', 'i18n', 'ipc', 'orm'];
