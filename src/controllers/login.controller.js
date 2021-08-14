var ipcRenderer = require('electron').ipcRenderer;

angular
    .module('todo-app')
    .controller('LoginController', LoginController);

function LoginController($rootScope, $scope, util, file, orm, ipc) {
    var vm = this;

    vm.name = '';
    vm.avatar = null;
    vm.notify = null;
    vm.users = []; 
    vm.userAvailable = false;
    vm.showLogin = true;
    vm.loginBtnDisabled = true;
    vm.registerBtnDisabled = false;
    vm.login = login;
    vm.blur = onblur;
    vm.register = register;
    vm.checkUser = checkUser;
    vm.toggleNew = toggleNew;
    vm.updateAvatar = updateAvatar;
    vm.onDragEnter = onDragEnter;
    vm.onDragOver = onDragOver;
    vm.onDrop = onDrop;

    $rootScope.mainWindowOnlyClose = true;

    orm.User.getAll().then(function (data) {
        vm.users = data;
        console.log('Users:', data)
    });

    function login() {
        if (vm.name != '') {
            var user = vm.users.filter(function (user) { return user.name == vm.name; })[0];

            $rootScope.user = [vm.name, vm.avatar];
            console.log('rootScope user', $rootScope.user, util.localStorage.get('user'))
            util.localStorage.set('user', user);
            ipc.send(ipc.cmd.LOGIN, [vm.name, vm.avatar]);
        }
    }

    function register() {
        if (vm.name != '') {
            vm.users.push({ 'name': vm.name, 'avatar': vm.avatar });
            vm.name = '';
            vm.notify = 'New user added!';
			
            // eslint-disable-next-line no-console
            console.log('Saving user!');

            orm.User.add(vm.name, vm.avatar);
        }
    }

    function checkUser() {
        for (var i = 0; i < vm.users.length; i++) {
            if (vm.users[i].name == vm.name) {
                vm.avatar = vm.users[i].avatar;
                vm.userAvailable = true;
            } else {
                vm.avatar = null;
                vm.userAvailable = false;
                vm.notify = null;
            }

            if (vm.userAvailable) {
                vm.loginBtnDisabled = false;
                vm.registerBtnDisabled = true;
                vm.notify = !vm.showLogin ? 'User exists!': null;

                break;
            } else {
                vm.loginBtnDisabled = true;
                vm.registerBtnDisabled = false;
                vm.notify = null;
            }
        }
    }

    window.test = function() {
        vm.notify = "Testing";
        $scope.$apply();

        setTimeout(function() {
            vm.notify = null;
        }.bind(vm), 4000);
    }

    function toggleNew() {
        vm.showLogin = !vm.showLogin;
        vm.notify = null;
    }

    function updateAvatar() {

    }

    function onDragEnter(evt) {
        var acceptedTypes = ['file'];
        var acceptedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        var items = evt.dataTransfer.items;

        if (items.length > 1) {
            vm.notify = 'Drag only one image.'
        } else {
            if (acceptedTypes.indexOf(items[0].kind) != -1 && acceptedMimes.indexOf(items[0].type) != -1) {
                evt.preventDefault();
            }
        }
    }

    function onDragOver(evt) {
        evt.preventDefault();
    }

    function onDrop(evt) {
        console.log('Drop', evt)
        evt.preventDefault();
        vm.notify = null;

        evt.dataTransfer.items[0].getAsFile();
    }
}

LoginController.$inject = ['$rootScope', '$scope', 'utility', 'file', 'orm', 'ipc'];
