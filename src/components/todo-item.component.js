angular
    .module('todo-app')
    .component('taTodoItem', {
        templateUrl: '../html/components/todo-item.component.html',
        controller: TodoItemController,
        bindings: {
            todo: '<',
            categoryColor: '<',
            showEdit: '<',
            showReUse: '<',
            showMarkComplete: '<',
            showDelete: '<',
            onEdit: '&',
            onReUse: '&',
            onMarkComplete: '&',
            onRemove: '&'
        }
    });

function TodoItemController($timeout) {
    var vm = this;

    vm.duration = null;
    vm.categoryColor = '#' + vm.categoryColor;
    vm.removeConfirmPending = false;
    vm.edit = edit;
    vm.reUse = reUse;
    vm.markComplete = markComplete;
    vm.remove = remove;


    function edit(id) {
        vm.onEdit({id: id});
    }

    function reUse(id) {
        vm.onReUse({id: id});
    }

    function markComplete(id) {
        vm.onMarkComplete({id: id});
    }

    function remove(id, event) {
        event.stopImmediatePropagation();

        if (vm.removeConfirmPending) {
            vm.onRemove({id: id});
            vm.removeConfirmPending = false;
        } else {
            vm.removeConfirmPending = true;

            $timeout(function () {
                vm.removeConfirmPending = false;
            }, 2000);
        }
    }
}

TodoItemController.$inject = ['$timeout'];
