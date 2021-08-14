angular
    .module('todo-app')
    .component('taCategorySelector', {
        templateUrl: '../html/components/category-selector.component.html',
        controller: CategoryController,
        bindings: {
            categories: '<',
            defaultCategory: '@',
            selected: '<',
            maxDisplay: '<',
            onToggle: '&'
        }
    });

function CategoryController($rootScope, $scope, $document, util) {
    var vm = this;

    vm.visibleCategories = [];
    vm.hiddenCategories = [];
    vm.activeCategory = null;
    vm.showHidden = false;

    vm.$onInit = $onInit;
    vm.$onDestroy = $onDestroy;
    vm.$onChanges = $onChanges;
    vm.toggleCategory = toggleCategory; 
    vm.showHiddenCategories = showHiddenCategories;

    function $onInit() {
        $document.on('click', collapseListEvent);
    }

    function $onDestroy() {
        $document.on('click', collapseListEvent);
    }

    function $onChanges(changes) {
        if (changes.categories && changes.categories.currentValue.length > 0) {
            if (vm.visibleCategories.length + vm.hiddenCategories.length !== vm.categories.length) {
                if (vm.categories.length > vm.maxDisplay) {
                    vm.visibleCategories = vm.categories.slice(0, vm.maxDisplay - 1);
                    vm.hiddenCategories = vm.categories.slice(vm.maxDisplay - 1);
                } else {
                    vm.visibleCategories = vm.categories;
                }
            }

            if (vm.selected) {
                toggleCategory(null, vm.selected);
            }
        }
    }

    function toggleCategory(id) {
        function checkHiddenCategories() {
            var categoryIndex;
            var category = vm.hiddenCategories.find(function (category, index) {
                if (category.id == id) {
                    categoryIndex = index;
                    vm.activeCategory = category.id;

                    return true;
                } else {
                    vm.activeCategory = null;
                    
                    return false;
                }
            });

            if (categoryIndex != undefined) {
                vm.hiddenCategories.splice(categoryIndex, 1);
                vm.hiddenCategories.push(vm.visibleCategories.pop());
                vm.visibleCategories.push(category);
            }
        }

        if (id && vm.hiddenCategories.length) {
            checkHiddenCategories();
        } else if (id) {
            vm.activeCategory = vm.visibleCategories.find(function (cat) {
                return cat.id == id;
            }).type;

            if (!vm.activeCategory) {
                checkHiddenCategories();
            }
        } else {
            vm.activeCategory = null;
        }

        vm.onToggle({id: id});
    }

    function showHiddenCategories() {
        vm.showHidden = vm.showHidden ? false: true;

        $rootScope.showOverlay = vm.showHidden;
    }

    function collapseListEvent(e) {
        if (vm.showHidden && 
            (e.target.classList.length && 
            (e.target.classList.contains('more') || 
            !util.checkParentClass(e.target, ['more'], 'div')))) {
            vm.showHidden = false;
            $rootScope.showOverlay = false;

            $scope.$apply();
        }
    }
}

CategoryController.$inject = ['$rootScope', '$scope', '$document', 'utility'];
