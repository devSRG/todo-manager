var util = require('../util'),
	ipcRenderer = require('electron').ipcRenderer;

var saveJSON = util.saveJSON,
	readJSON = util.readJSON;

angular
	.module('todoLogin', ['app', 'ngAnimate'])
	.controller('loginController', loginController);

function loginController($rootScope, $scope) {
	var vm = this;
	
	vm.heading = 'Log In';
	vm.name = '';
	vm.avatar = '';
	vm.err = '';
	vm.login = login;
	vm.blur = onblur;
	vm.register = register;
	vm.checkUser = checkUser;
	vm.toggleNew = toggleNew;
	vm.users = [];
	vm.user_avail = false;
	vm.create_user_visible = false;
	vm.login_btn_disabled = true;
	vm.register_btn_disabled = false;

	readJSON('./users.json', function(result) {
		vm.users = result;
	});

	function login() {
		if (vm.name != '') {
			ipcRenderer.send('username', [vm.name, vm.avatar]);

			$rootScope.user = [vm.name, vm.avatar];

			localStorage.setItem('username', vm.name);
			localStorage.setItem('user_avatar', vm.avatar);
		}
	}

	function register() {
		if (vm.name != '') {
			vm.users.push({ 'name': vm.name, 'avatar': vm.avatar });
			vm.name = '';
			vm.notify = 'New user added!';
			
			// eslint-disable-next-line no-console
			console.log('Saving user!');

			saveJSON('./users.json', vm.users);
			saveJSON('./' + vm.name.toLowerCase() + '.todo.json', []);
		}
	}

	// eslint-disable-next-line no-unused-vars
	function checkUser(e) {
		var keys = Object.keys(vm.users);
		for (var i = 0; i < keys.length; i++) {
			if (vm.users[keys[i]].name == vm.name) {
				vm.avatar = vm.users[keys[i]].avatar;
				vm.user_avail = true;
			} else {
				vm.avatar = '';
				vm.user_avail = false;
				vm.notify = '';
			}
			if (vm.user_avail) {
				vm.login_btn_disabled = false;
				vm.register_btn_disabled = true;
				if (vm.create_user_visible) {
					vm.notify = 'User exists!';
				} else {
					vm.notify = '';
				}
				break;
			} else {
				vm.login_btn_disabled = true;
				vm.register_btn_disabled = false;
			}
		}
	}

	function toggleNew() {
		vm.heading = vm.heading == 'Log In' ? 'Add User' : 'Log In';
		vm.create_user_visible = !vm.create_user_visible;
		vm.notify = '';
	}
}

loginController.$inject = ['$rootScope', '$scope'];
