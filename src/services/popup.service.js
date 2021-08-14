angular
    .module('todo-app')
    .factory('popup', popup);

function popup($rootScope, $compile, $document) {
    var TYPE = {
        DIALOG: 0,
        TOAST: 1
    };
    var dialog = [];
    var toast = [];

    var dialogOptions = {
        submitCb: null,
        closeCb: null,
        content: null,
        showClose: true
    };

    return {
        TYPE: TYPE,
        openDialog: openDialog,
        closeDialog: closeDialog,
        getDialog: getDialog,
        showToast: showToast
    }

    function openDialog(title, content, options, scope, data) {
        var compiled;
        var template = '<ta-dialog ' + 
        'title="' + title + '" ' + 
        'content="' + content + '"></ta-dialog>';
        
        options = Object.assign(dialogOptions, options);
        compiled = $compile(template)(scope);

        $document.eq(0).find('main').after(compiled);

        dialog.push({
            options: options,
            data: data,
            element: angular.element(compiled)
        });
    }

    function closeDialog() {
        if (this.element) {
            this.element.remove();
        }
    }

    function getDialog() {
        return dialog[dialog.length - 1];
    }

    function showToast(options) {

    }
}

popup.$inject = ['$rootScope', '$compile', '$document'];