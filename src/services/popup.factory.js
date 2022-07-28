angular
    .module('todo-app')
    .factory('popup', popup);

function popup($rootScope, $compile, $document) {
    var TYPE = {
        DIALOG: 0,
        TOAST: 1
    };
    var dialog = null;
    var toast = [];

    window.showToast = showToast;

    return {
        TYPE: TYPE,
        openDialog: openDialog,
        closeDialog: closeDialog,
        getDialog: getDialog,
        showToast: showToast
    }

    function openDialog(title, content, options, scope, data) {
        var template = '<ta-dialog ' + 
        'heading="' + title + '" ' + 
        'content="' + content + '"></ta-dialog>';
        var compiled = $compile(template)(scope);

        if (dialog == null) {
            $document.eq(0).find('main').after(compiled);

            dialog = {
                options: options,
                data: data,
                element: angular.element(compiled)
            };
        }
    }

    function closeDialog() {
        if (this.element) {
            setTimeout(function () {
                this.element.remove();
                dialog = null;
            }.bind(this), 0);
        }
    }

    function getDialog() {
        return dialog;
    }

    function showToast(message, options) {

    }
}

popup.$inject = ['$rootScope', '$compile', '$document'];
