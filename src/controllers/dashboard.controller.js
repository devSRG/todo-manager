angular
    .module('todo-app')
    .controller('DashboardController', DashboardController);

function DashboardController(orm) {
    var vm = this;

    vm.totalTodos = null;
    vm.totalActiveTodos = null;
    vm.totalCategories = null;
    vm.activeTodos = [];

    orm.Todo.count().then(function (data) {
        vm.totalTodos = data.count;
    });

    orm.Todo.activeCount().then(function (data) {
        vm.totalActiveTodos = data.count;
    });

    orm.Category.count().then(function (data) {
        vm.totalCategories = data.count;
    });

    orm.Todo.getAll().then(function (todos) {
        vm.activeTodos = todos.splice(-2);
    });
}

DashboardController.$inject = ['orm'];
