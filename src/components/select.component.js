angular
    .module('todo-app')
    .component('taSelect', {
        templateUrl: '../html/components/select.component.html',
        controller: SelectController,
        bindings: {
            options: '<',
            defaultValue: '<',
            onChange: '&'
        }
    });

function SelectController($scope, $document, util) {
    var vm = this;

    vm.id = Math.floor(Math.random() * 1e4);
    vm.expand = false;
    vm.selected = null;
    
    vm.$onInit = $onInit;
    vm.$onDestroy = $onDestroy;
    vm.$onChanges = $onChanges;
    vm.toggle = toggle;
    vm.selectValue = selectValue;
    
    function $onInit() {
        vm.selected = vm.defaultValue;

        $document.on('click', collapseSelectEvent);
    }

    function $onDestroy() {
        $document.off('click', collapseSelectEvent);
    }

    function $onChanges() {
        vm.selected = vm.defaultValue;
    }
    
    function toggle() {
        vm.expand = !vm.expand;
    }

    function selectValue(e) {
        vm.selected = e.target.textContent;

        vm.onChange({value: e.target.dataset['value']});
    }

    function collapseSelectEvent(e) {
        if (vm.expand && 
            ((e.target.classList.contains('ta-select') && 
            !e.target.classList.contains('id-' + vm.id)) || 
            (!e.target.classList.contains('ta-select') && 
            !util.checkParentClass(e.target, ['ta-select', 'id-' + vm.id], 'div')))) {
                vm.expand = false;

                $scope.$apply();
        }
    }
}

SelectController.$inject = ['$scope', '$document', 'utility'];
