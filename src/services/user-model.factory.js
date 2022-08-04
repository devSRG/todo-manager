angular
    .module('todo-app')
    .factory('user', user);

function user(util, database) {
    var db = database.getDB();

    return {
        get: get,
        add: add,
        update: update,
        getAll: getAll,
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

    function add(data) {
        return util.defer(function (deferred) {
            db.run('INSERT INTO user (name, avatar, locale) VALUES  (?, ?)', 
                [data.name, data.avatar], 
                function (err) {
                    if (err) {
                        deferred.reject(err);
                    }

                    deferred.resolve(this.changes);
                }.bind(db));
        });
    }

    function update(id, data) {
        return util.defer(function (deferred) {
            db.run('UPDATE user SET name = ?, avatar = ?, locale = ?, settings = ? WHERE id = ?',
                [data.name, data.avatar, data.locale, data.settings, id],
                function (err) {
                    if (err) {
                        deferred.reject(err);
                    }

                    deferred.resolve(this.changes);
                }.bind(db));
        });
    }

    function getAll() {
        return util.defer(function (deferred) {
            db.all('SELECT id, name, avatar FROM user', [], function (err, rows) {
                if (err) {
                    deferred.reject(err);
                }

                deferred.resolve(rows);
            });
        });
    }

}

user.$inject = ['utility', 'database'];
