angular
    .module('todo-app')
    .factory('category', category);

function category(util, database) {
    var db = database.getDB();
    var user = util.localStorage.get('user');

    return {
        get: get,
        count: count,
        getAll: getAll
    };

    function get(type) {
        return util.defer(function (deferred) {
            if (user) {
                db.get('SELECT id, type, color FROM category WHERE type = ? AND userId = ?', [type, user.id], function (err, row) {
                    if (err) {
                        deferred.reject(err)
                    }

                    deferred.resolve(row);
                });
            }
        });
    }

    function count() {
        return util.defer(function (deferred) {
            if (user) {
                db.get('SELECT COUNT(id) AS count FROM category WHERE userId = ?', [user.id], function (err, row) {
                    if (err) {
                        deferred.reject(err);
                    }

                    deferred.resolve(row);
                });
            }
        });
    }

    function getAll() {
        return util.defer(function (deferred) {
            if (user) {
                db.all('SELECT id, type, color FROM category WHERE userId = ?', [user.id], function (err, rows) {
                    if (err) {
                        deferred.reject(err);
                    }

                    deferred.resolve(rows);
                });
            }
        });
    }
}

category.$inject = ['utility', 'database'];
