angular
	.module('todoApp')
	.component('tmSelect', {
		templateUrl: 'tm-select.component.html',
		controller: TMSelectController,
		bindings: {
			options: '<',
			defaultValue: '<',
			onChange: '&'
		}
	});

function TMSelectController() {
	var vm = this;

	vm.expand = false;
	vm.value = null;

	vm.$onInit = function() {
		vm.value = vm.defaultValue;
	};
	vm.toggle = function() {
		vm.expand = vm.expand ? false: true;
	};
	vm.selectValue = function(event) {
		var value = event.target.textContent;
		vm.value = value;
		vm.onChange({fontsize: value});
	};
}