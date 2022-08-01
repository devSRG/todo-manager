angular
    .module('todo-app')
    .controller('PageController', PageController);

function PageController($rootScope) {
    var vm = this;

    vm.currentPage = $rootScope.currentPage;

    $rootScope.$watch(function () {
        return $rootScope.currentPage;
    }, function (page) {
        if (page != null) {
            vm.currentPage = page;
        }
    });
}

PageController.$inject = ['$rootScope'];
