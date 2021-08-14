angular
    .module('todo-app')
    .factory('user', user);

function user(util, database) {
    var db = database.getDB();

    return {
        get: get,
        getAll: getAll,
        add: add
    };

    function get(username) {
        return util.defer(function (deferred) {
            db.get('SELECT * FROM user WHERE name = ?', [username], function (err, row) {
                if (err) {
                    deferred.reject(err);
                }

                deferred.resolve(row);
            });
        });
    }

    function getAll() {
        return util.defer(function (deferred) {
            db.all('SELECT * FROM user', [], function (err, rows) {
                if (err) {
                    deferred.reject(err);
                }

                deferred.resolve(rows);
            });
        });
    }

    function add(data) {
        return util.defer(function (deferred) {
            db.run('INSERT INTO todo (name, avatar, locale) VALUES  (?, ?)', 
                [data.name, data.avatar], 
                function (err) {
                    if (err) {
                        deferred.reject(err);
                    }

                    deferred.resolve(this.changes);
            }.bind(db));
        });
    }
}

user.$inject = ['utility', 'database'];
