angular
    .module('todo-app')
    .controller('PageController', PageController);

function PageController($rootScope) {
    var vm = this;

    vm.pages = ['dashboard', 'todo', /*'todo_form', 'completed',*/ 'settings'];
    vm.currentPage = vm.pages[0];

    $rootScope.$watch(function () {
        return $rootScope.currentPage;
    }, function (page) {
        if (page != null) {
            vm.currentPage = page;
        }
    });
}

PageController.$inject = ['$rootScope'];
