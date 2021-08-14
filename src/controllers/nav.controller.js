var ipcRenderer = require('electron').ipcRenderer;

angular
    .module('todo-app')
    .controller('NavController', NavController);

function NavController($rootScope, util,  ipc) {
    var vm = this;
    var user = util.localStorage.get('user');

    vm.currentPage = 'dashboard';
    vm.username = user && user.name;
    vm.avatar = user && user.avatar;
    vm.firstLetter = user && user.name.charAt(0).toUpperCase();
    vm.updatePage = updatePage;
    vm.logOut = logout;
    vm.userAvailable = false;

    function updatePage(page) {
        vm.currentPage = page;

        $rootScope.updatePage(page);
    }

    function logout() {
        util.localStorage.remove('user');
        ipc.send(ipc.cmd.LOGOUT);
    }
}

NavController.$inject = ['$rootScope', 'utility', 'ipc'];
