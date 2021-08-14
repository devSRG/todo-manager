angular
    .module('todo-app')
    .factory('category', category);

function category(util, database) {
    var db = database.getDB();
    var user = util.localStorage.get('user');

    return {
        get: get,
        getAll: getAll,
        count: count
    };

    function get(type) {
        if (user) {
            return util.defer(function (deferred) {
                db.get('SELECT id, type, color FROM category WHERE type = ? AND userId = ?', [type, user.id], function (err, row) {
                    if (err) {
                        deferred.reject(err)
                    }

                    deferred.resolve(row);
                });
            });
        } else {
            return null;
        }
    }

    function getAll() {
        if (user) {
            return util.defer(function (deferred) {
                db.all('SELECT id, type, color FROM category WHERE userId = ?', [user.id], function (err, rows) {
                    if (err) {
                        deferred.reject(err);
                    }

                    deferred.resolve(rows);
                });
            });
        } else {
            return null;
        }
    }

    function count() {
        if (user) {
            return util.defer(function (deferred) {
                db.get('SELECT COUNT(id) AS count FROM category WHERE userId = ?', [user.id], function (err, row) {
                    if (err) {
                        deferred.reject(err);
                    }

                    deferred.resolve(row);
                });
            });
        }
    }
}

category.$inject = ['utility', 'database'];
