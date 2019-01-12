angular
	.module('todoApp')
	.component('todoItem', {
		templateUrl: 'todo-item.component.html',
		controller: TodoItemController,
		bindings: {
			todo: '<',
			selectedTask: '<',
			onToggle: '&',
			onRemove: '&'
		}
	});


function TodoItemController() {
	var vm = this;

	vm.duration = 1;

	vm.emitRemove = function emitRemove(id) {
		vm.onRemove({id: id});
	};
	vm.toggle = function toggle(id) {
		vm.onToggle({id: id});
	};

}
