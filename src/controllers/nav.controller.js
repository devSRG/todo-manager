var ipcRenderer = require('electron').ipcRenderer;

angular
    .module('todo-app')
    .controller('NavController', NavController);

function NavController($rootScope, $scope, constants, util, ipc, orm, settings) {
    var vm = this;

    vm.currentPage = $rootScope.currentPage;
    vm.username = null;
    vm.avatar = null;
    vm.firstLetter = null;
    vm.updatePage = updatePage;
    vm.logOut = logout;
    vm.userAvailable = false;

    $scope.$on(constants.EVENT.INIT, init);
    $scope.$on(constants.EVENT.DISPOSE, dispose);

    $rootScope.$watch(function () {
        return $rootScope.currentPage;
    }, function (page) {
        if (page != null) {
            vm.currentPage = page;
        }
    });

    function init() {
        var user = settings.getLoggedInUser();

        vm.username = user && user.name;
        vm.avatar = user && user.avatar;
        vm.firstLetter = user && user.name.charAt(0).toUpperCase();
    }

    function updatePage(page) {
        $rootScope.currentPage = page;
    }

    function logout() {
        orm.User.getPersistedUser().then(function (data) {
            if (data && data.persist) {
                orm.User.setPersist(data.id, false).then(function () {
                    ipc.send(ipc.cmd.LOG_OUT);
                });
            } else {
                ipc.send(ipc.cmd.LOG_OUT);
            }
        });

        $rootScope.$broadcast(constants.EVENT.LOG_OUT);
    }

    function dispose() {
        vm.username = null;
        vm.avatar = null;
        vm.firstLetter = null;
    }
}

NavController.$inject = ['$rootScope', '$scope', 'constants', 'utility', 'ipc', 'orm', 'settings'];
