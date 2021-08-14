var fs = require('fs');

angular
    .module('todo-app')
    .factory('file', file);

function file() {
    return {
        readFile, readFile,
        readJSON: readJSON,
        saveJSON: saveJSON
    }

    function openFilePicker(options) {
        showOpenFilePicker(options).then(function (fileHandle) {
            
        });
    }

    function readFile(path) {
        return fs.stat(path, function (err) {
            if (err == null) {
                return fs.readFile(path, {}, function (err, data) {
                    return data;
                })
            }
        })
    }
    
    function readJSON(path, cb) {
        fs.stat(path, function (err) {
            console.log(path, err)
            if (err == null) {
                fs.readFile(path, 'utf8', function (err, data) {
                    if (err) throw err;
    
                    var json = null;
                    
                    if (data) {
                        try {
                            json = JSON.parse(data);
                        } catch (e) {
                            console.warn('Incompatible JSON data on file ' + path);
                        }
                    }
    
                    if (cb instanceof Function) {
                        cb(json, null);
                    } else {
                        return json;
                    }
                });
            } else {
                if (cb instanceof Function) {
                    cb(null, err);
                } else {
                    throw err;
                }
            }
        });
    }

    function saveJSON(path, data) {
        var jsonData = angular.toJson(data, true);
    
        fs.writeFileSync(path, jsonData, 'utf8');
    }
}
