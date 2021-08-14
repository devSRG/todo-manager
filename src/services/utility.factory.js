angular
    .module('todo-app')
    .factory('utility', utility);

function utility($q) {
    return {
        defer: defer,
        localStorage: {
            get: getLocalStorageItem,
            set: setLocalStorageItem,
            remove: removeLocalStorageItem
        },
        checkParentClass: checkParentClass
    };

    function defer(cb) {
        var deferred = $q.defer();

        cb(deferred);

        return deferred.promise;
    }

    function getLocalStorageItem(name) {
        return JSON.parse(localStorage.getItem(name));
    }

    function setLocalStorageItem(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    }

    function removeLocalStorageItem(name) {
        localStorage.removeItem(name);
    }
    
    function checkParentClass(elem, cssClasses, nodeType) {
        var parent = elem.parentElement;
        var matchedEntries = [];

        while(parent) {
            if ((nodeType && parent.nodeName.toLowerCase() == nodeType && parent.classList.length) || 
                (!nodeType && parent.classList.length)) {
                for(var i = 0; i < parent.classList.length; i++) {
                    for(var j = 0; j < cssClasses.length; j++) {
                        if (parent.classList[i] === cssClasses[j]) {
                            matchedEntries.push(cssClasses[j]);
                            break;
                        }
                    }
                }
            }
            
            parent = parent.parentElement;
        }

        return matchedEntries.length == cssClasses.length;
    }
}

utility.$inject = ['$q'];
