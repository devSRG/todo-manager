var ipcRenderer = require('electron').ipcRenderer;

angular
	.module('todoApp')
	.controller('NavController', NavController);

// eslint-disable-next-line no-unused-vars
function NavController($rootScope, $scope, settings) {
	var vm = this;

	vm.page = 'todo';
	vm.user = localStorage.getItem('username');
	vm.avatar = localStorage.getItem('user_avatar');
	vm.first_letter = localStorage.getItem('username').charAt(0).toUpperCase();
	vm.applyPage = applyPage;
	vm.log_out = logout;
	vm.user_avail = false;

	$scope.$watch(function() {
		return settings.getconfLocale();
	}, function() {
		vm.todo = settings.data.todo;
		vm.new_todo = settings.data.new_todo;
		vm.completed = settings.data.completed;
		vm.settings = settings.data.settings;
		vm.logout = settings.data.logout;
	});

	function applyPage(page) {
		vm.page = page;

		settings.setPage(page);
	}

	function logout() {
		ipcRenderer.send('logout');
	}

	// eslint-disable-next-line no-unused-vars
	ipcRenderer.on('user', function(event, args) {
		vm.user = args[0];
		vm.avatar = args[1];
		vm.first_letter = vm.user.charAt(0).toUpperCase();

		if(vm.avatar != '') vm.user_avail = true;
		$scope.$apply();
	});
}

NavController.$inject = ['$rootScope', '$scope', 'SettingsConfig'];
