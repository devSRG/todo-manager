var ipcRenderer = require('electron').ipcRenderer;

angular
    .module('todo-app')
    .controller('NavController', NavController);

function NavController($rootScope, util,  ipc) {
    var vm = this;
    var user = util.localStorage.get('user');

    vm.username = user && user.name;
    vm.avatar = user && user.avatar;
    vm.firstLetter = user && user.name.charAt(0).toUpperCase();
    vm.currentPage = $rootScope.currentPage;
    vm.updatePage = updatePage;
    vm.logOut = logout;
    vm.userAvailable = false;


    $rootScope.$watch(function () {
        return $rootScope.currentPage;
    }, function (page) {
        if (page != null) {
            vm.currentPage = page;
        }
    });



    function updatePage(page) {
        $rootScope.currentPage = page;
    }

    function logout() {
        util.localStorage.remove('user');
        ipc.send(ipc.cmd.LOGOUT);
    }
}

NavController.$inject = ['$rootScope', 'utility', 'ipc'];
