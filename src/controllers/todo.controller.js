angular
    .module('todo-app')
    .controller('TodoController', TodoController);

function TodoController($scope, orm, popup) {
    var vm = this;

    vm.todos = [];
    vm.filteredTodos = [];
    vm.categories = [];
    vm.selectedTodo = null;

    vm.edit = edit;
    vm.remove = remove;
    vm.markComplete = markComplete;
    vm.openDialog = openDialog;
    vm.toggleCategory = toggleCategory;
    vm.getCategoryColor = getCategoryColor;

    $scope.updateCategoryList = updateCategoryList;
    $scope.updateTodoList = updateTodoList;

    updateCategoryList();
    updateTodoList();

    function updateCategoryList() {
        orm.Category.getAll().then(function (data) {        
            vm.categories = data;
        });
    }

    function updateTodoList() {
        orm.Todo.getAll().then(function (data) {
            vm.todos = data;
            vm.filteredTodos = data;
        });
    }

    function edit(id) {
        vm.selectedTodo = findTodo(id);

        openDialog(true);
    }

    function remove(id) {
        orm.Todo.remove(id).then(function () {
            vm.todos.splice(vm.todos.indexOf(findTodo(id)), 1);
        });
    }

    function markComplete(id) {
        orm.Todo.markComplete(id, true).then(function () {
            updateTodoList();
        });
    }

    function toggleCategory(id) {
        if (id) {
            vm.filteredTodos = vm.todos.filter(function(todo) {
                return todo.categoryId == id;
            });
        } else {
            vm.filteredTodos = vm.todos;
        }
    }

    function getCategoryColor(id) {
        var category = null;
        var color = null;
        
        category = vm.categories.find(function (category) {
            return category.id == id;
        });

        if (category) {
            color = category.color;
        }

        return color;
    }

    function openDialog(edit) {
        var options = {
            showClose: false, 
            showButtons: true,
            buttons: [
                {
                    label: 'Cancel',
                    class: 'cancel',
                    onClick: function (ctrl) {
                        ctrl.onCancel();
                    }
                },
                {
                    label: edit ? 'Update': 'Add',
                    class: 'primary',
                    onClick: function (ctrl) {
                        ctrl.onSubmit();
                        updateTodoList();
                        popup.showToast('Success');
                    }
                }
            ]
        };

        if (edit) {
            popup.openDialog('Update Todo', 'partials/todo_form.html', options, $scope, vm.selectedTodo);
        } else {
            popup.openDialog('Add Todo', 'partials/todo_form.html', Object.assign(options, {showClose: true}), $scope);
        }
    }

    function findTodo(id) {
        for (var i = 0; i < vm.todos.length; i++) {
            if (vm.todos[i].id == id) {
                return vm.todos[i];
            }
        }
        
        return null;
    }
}

TodoController.$inject = ['$scope', 'orm', 'popup'];
