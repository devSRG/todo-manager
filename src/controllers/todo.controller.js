var fs = require('fs');
const { util } = require('webpack');

angular
    .module('todo-app')
    .controller('TodoController', TodoController);

function TodoController($rootScope, $scope, $document, util, orm, settings, popup) {
    var vm = this;

    vm.todos = [];
    vm.filteredTodos = [];
    vm.categories = [];
    vm.complete = false; 
    vm.editEnabled = false;
    vm.formFocused = false;
    vm.formFocus = false;
    vm.expand = false;
    vm.selectedTodo = null;

    vm.remove = remove;
    vm.toggle = toggle;
    vm.toggleOptions = toggleOptions;
    vm.completeTask = completeTask;
    vm.toggleModal = toggleModal;
    vm.toggleCategory = toggleCategory;
    vm.getCategoryColor = getCategoryColor;

    $scope.updateCategoryList = updateCategoryList;
    $scope.updateTodoList = updateTodoList;

    updateCategoryList();
    updateTodoList();

    // $document.on('click', function () {
    //     if (vm.selectedTodo != null) {
    //         vm.selectedTodo = null;
    //     }
    // });

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

    function remove(id) {
        // vm.todos.splice(findTodo(id), 1);
    }

    function completeTask(id) {
        
    }

    function toggle(id) {
        vm.selectedTodo = findTodo(id);
    }

    function toggleOptions() {
        vm.expand = vm.expand ? false : true;
    }

    function toggleModal(edit) {
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

TodoController.$inject = ['$rootScope', '$scope', '$document', 'utility', 'orm', 'settings', 'popup'];
