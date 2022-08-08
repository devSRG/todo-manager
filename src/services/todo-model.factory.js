angular
    .module('todo-app')
    .factory('todo', todo);

function todo(util, database, settings) {
    var db = database.getDB();

    return {
        get: get,
        add: add,
        update: update,
        remove: remove,
        count: count,
        activeCount: activeCount,
        getAll: getAll,
        markComplete: markComplete
    };

    function get(id) {
        return util.defer(function (deferred) {
            var user = settings.getLoggedInUser();

            if (user && id) {
                db.get('SELECT id, title, description, completed, categoryId, createdTime, createdDate FROM todo WHERE id = ? AND userId = ?', 
                    [id, user.id], 
                    function (err, row) {
                        if (err) {
                            deferred.reject(err);
                        }

                        deferred.resolve(row);
                    });
            }
        });
    }

    function add(data) {
        return util.defer(function (deferred) {
            var user = settings.getLoggedInUser();

            if (user) {
                db.run('INSERT INTO todo (title, description, completed, dueDate, categoryId, userId) VALUES (?, ?, ?, ?, ?, ?)', 
                    [data.title, data.description, data.completed, data.dueDate, data.categoryId, user.id],
                    function (err) {
                        if (err) {
                            deferred.reject(err);
                        }

                        deferred.resolve();
                    });
            }
        });
    }

    function update(id, data) {
        return util.defer(function (deferred) {
            var user = settings.getLoggedInUser();

            if (user && id) {
                db.run('UPDATE todo SET title = ?, description = ?, completed = ?, dueDate = ?, categoryId = ? WHERE id = ? AND userId = ?',
                    [data.title, data.description, data.completed, data.dueDate, data.categoryId, id, user.id],
                    function (err) {
                        if (err) {
                            deferred.reject(err);
                        }

                        deferred.resolve(this.changes);
                    }.bind(db));
            }
        });
    }

    function remove(id) {
        return util.defer(function (deferred) {
            var user = settings.getLoggedInUser();

            if (user && id) {
                db.run('DELETE FROM todo WHERE id = ? AND userId = ?', 
                    [id, user.id], 
                    function (err) {
                        if (err) {
                            deferred.reject(err);
                        }

                        deferred.resolve();
                    });
            }
        });
    }

    function count() {
        return util.defer(function (deferred) {
            var user = settings.getLoggedInUser();

            if (user) {
                db.get('SELECT COUNT(id) AS count FROM todo WHERE userId = ?', 
                    [user.id], 
                    function (err, row) {
                        if (err) {
                            deferred.reject(err);
                        }

                        deferred.resolve(row);
                    });
            }
        });
    }

    function activeCount() {
        return util.defer(function (deferred) {
            var user = settings.getLoggedInUser();

            if (user) {
                db.get('SELECT COUNT(id) AS count FROM todo WHERE userId = ? AND completed = false', 
                    [user.id], 
                    function (err, row) {
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
            var user = settings.getLoggedInUser();

            if (user) {
                db.all('SELECT id, title, description, completed, categoryId, createdTime, createdDate FROM todo WHERE userId = ?', 
                    [user.id], 
                    function (err, rows) {
                        if (err) {
                            deferred.reject(err);
                        }

                        deferred.resolve(rows);
                    });
            }
        });
    }

    function markComplete(id, condition) {
        return util.defer(function (deferred) {
            var user = settings.getLoggedInUser();

            if (user && id && (condition == true || condition == false)) {
                db.run('UPDATE todo SET completed = ? WHERE id = ? AND userId = ?', 
                    [condition, id, user.id], 
                    function (err) {
                        if (err) {
                            deferred.reject(err);
                        }

                        deferred.resolve(this.changes);
                    }.bind(db));
            }
        });
    }
}

todo.$inject = ['utility', 'database', 'settings'];
