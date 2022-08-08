angular
    .module('todo-app')
    .controller('MainController', MainController);

function MainController($rootScope, $scope, $document, util, settings, constants, i18n, ipc, orm) {
    var vm = this;

    $rootScope.currentPage = 'todo';
    $rootScope.updatePage = updatePage;

    vm.fontSize = settings.getUserFontSize().value;

    $scope.$on(constants.EVENT.FONT_SIZE_UPDATED, updateFontSize);
    $scope.$on(constants.EVENT.THEME_UPDATED, updateTheme);
    $scope.$on(constants.EVENT.LOGGED_IN_USER, setup)
    $scope.$on(constants.EVENT.DISPOSE, dispose);

    ipc.on('user', function (evt, userData) {
        setup(null, userData);
    });

    function setup(evt, userData) {
        settings.initialize(userData);
        $scope.$broadcast(constants.EVENT.INIT);
    }

    function updatePage(page) {
        $rootScope.currentPage = page;
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
