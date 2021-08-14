angular
    .module('todo-app')
    .component('taTodoItem', {
        templateUrl: '../html/components/todo-item.component.html',
        controller: TodoItemController,
        bindings: {
            todo: '<',
            selectedTask: '<',
            categoryColor: '<',
            onToggle: '&',
            onEdit: '&',
            onRemove: '&'
        }
    });


function TodoItemController() {
    var vm = this;

    vm.duration = 1;
    vm.categoryColor = '#' + vm.categoryColor;

    vm.emitRemove = emitRemove;
    vm.toggle = toggle;
    vm.editTodo = editTodo;

    function emitRemove(id) {
        vm.onRemove({id: id});
    }

    function toggle(id) {
        vm.onToggle({id: id});
    }

    function editTodo(id) {
        vm.onEdit({id: id});
    }
}
