angular
    .module('todo-app')
    .controller('AddTodoController', AddTodoController);

function AddTodoController($scope, orm) {
    var vm = this;

    vm.editTodo = $scope.getDialogData();
    vm.title = vm.editTodo && vm.editTodo.title || "";
    vm.description = vm.editTodo && vm.editTodo.description || "";
    vm.categoryId = vm.editTodo && vm.editTodo.categoryId || null;
    vm.dueDate = null;
    vm.complete = false;
    vm.categories = [];
    vm.showDatePicker = false;
    vm.textareaLimit = 150;

    vm.toggleCategory = toggleCategory;
    vm.toggleDatePicker = toggleDatePicker;
    vm.textareaKeyDown = textareaKeyDown;

    $scope.setSubmitCb(vm.editTodo ? update: add);

    orm.Category.getAll().then(function (data) {
        vm.categories = data;
    });

    function add() {
        if (vm.title) {
            orm.Todo.add({
                title: vm.title,
                description: vm.description,
                completed: vm.complete,
                dueDate: vm.dueDate,
                categoryId: vm.categoryId
            }).catch(function (err) {
                console.error('ERROR:', err);
            });
        }
    }

    function update() {
        if (vm.title) {
            orm.Todo.update(vm.editTodo.id, {
                title: vm.title,
                description: vm.description,
                completed: vm.complete,
                dueDate: vm.dueDate,
                categoryId: vm.categoryId
            }).catch(function (err) {
                console.error('ERROR:', err);
            });
        }
    }

    function toggleCategory(id) {
        vm.categoryId = id;
    }

    function toggleDatePicker() {
        vm.showDatePicker = !vm.showDatePicker;
    }

    function textareaKeyDown(evt) {
        if (vm.description == vm.textareaLimit) {
            evt.preventDefault();
        }
    }
}

AddTodoController.$inject = ['$scope', 'orm'];
