angular
	.module('todoApp')
	.controller('PageController', PageController);

function PageController(settings) {
	var vm = this;
	
	vm.page = settings.getPage;
	vm.pages = ['todo', 'todo_form', 'completed', 'settings'];
	vm.fontsize = '';
	vm.alert = true;
}

PageController.$inject = ['SettingsConfig'];
