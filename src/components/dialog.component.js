angular
    .module('todo-app')
    .component('taDialog', {
        templateUrl: '../html/components/dialog.component.html',
        controller: DialogController,
        bindings: {
            title: '@',
            content: '@'
        }
    });

function DialogController($scope, popup) {
    var vm = this;
    var dialog;

    vm.title = null;
    vm.titleTranslationKey = null;
    vm.content = null;
    vm.data = null;
    vm.options = null;
    vm.showDialog = false;
    vm.showButtons = false;
    vm.showClose = true;
    vm.buttons = null;
    vm.button = {
        onSubmit: null,
        onCancel: null
    };

    vm.$onInit = $onInit;
    vm.onCancel = onCancel;
    vm.onSubmit = onSubmit;
    vm.onClose = onClose;

    $scope.getDialogData = getDialogData;
    $scope.setSubmitCb = setSubmitCb;
    $scope.setCancelCb = setCancelCb;

    function $onInit() {
        dialog = popup.getDialog();

        vm.showDialog = !!(vm.title || vm.content);
        vm.data = dialog.data;
        vm.options = dialog.options;
        vm.showButtons = vm.options.showButtons;
        vm.showClose = vm.options.showClose;
        vm.buttons = vm.options.buttons;
    }

    function onCancel() {
        if (angular.isFunction(vm.button.onCancel)) {
            vm.button.onCancel();
        }
        
        onClose();
    }

    function onSubmit() {
        if (angular.isFunction(vm.button.onSubmit)) {
            vm.button.onSubmit();
        }

        onClose();
    }
    
    function onClose() {
        vm.heading = null;
        vm.content = null;
        vm.showDialog = false;

        if (vm.options && angular.isFunction(vm.options.closeCb)) {
            vm.options.closeCb();
        }

        popup.closeDialog.apply(dialog);
    }

    function getDialogData() {
        return vm.data;
    }

    function setSubmitCb(cb) {
        if (angular.isFunction(cb)) {
            vm.button.onSubmit = cb;
        }
    }

    function setCancelCb(cb) {
        if (angular.isFunction(cb)) {
            vm.button.onCancel = cb;
        }
    }
}

DialogController.$inject = ['$scope', 'popup'];
