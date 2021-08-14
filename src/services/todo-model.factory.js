angular
    .module('todo-app')
    .factory('todo', todo);

function todo(util, database) {
    var db = database.getDB();
    var user = util.localStorage.get('user');

    return {
        get: get,
        getAll: getAll,
        add: add,
        update: update,
        remove: remove,
        markComplete: markComplete,
        count: count,
        activeCount: activeCount
    };

    function get(id) {
        if (user) {
            return util.defer(function (deferred) {
                db.get('SELECT id, title, description, completed, categoryId, createdTime, createdDate ' + 
                'FROM todo WHERE id = ? AND userId = ?', [id, user.id], function (err, row) {
                    if (err) {
                        deferred.reject(err);
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
                db.all('SELECT id, title, description, completed, categoryId, createdTime, createdDate FROM todo WHERE userId = ?', [user.id], function (err, rows) {
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

    function add(data) {
        if (user) {
            return util.defer(function (deferred) {
                db.run('INSERT INTO todo (title, description, completed, dueDate, categoryId, userId) VALUES (?, ?, ?, ?, ?, ?) WHERE id = ?', 
                    [data.title, data.description, data.completed, data.dueDate, data.categoryId, user.id],
                    function (err) {
                        if (err) {
                            deferred.reject(err);
                        }

                        deferred.resolve();
                    });
            });
        }
    }

    function update(id, data) {
        if (user) {
            return util.defer(function (deferred) {
                db.run('UPDATE todo SET title = ?, description = ?, completed = ?, dueDate = ?, categoryId = ? WHERE id = ? AND userId = ?',
                    [data.title, data.description, data.completed, data.dueDate, data.categoryId, id, user.id],
                    function (err) {
                        if (err) {
                            deferred.reject(err);
                        }

                        deferred.resolve(this.changes);
                    }.bind(db));
            })
        }
    }

    function remove(id) {
        if (user) {
            return util.defer(function (deferred) {
                db.run('DELETE FROM todo WHERE id = ? AND userId = ?', [id, user.id], function (err) {
                    if (err) {
                        deferred.reject(err);
                    }

                    deferred.resolve();
                });
            })
        }
    }

    function markComplete(id) {
        if (user) {
            return util.defer(function (deferred) {
                db.run('UPDATE todo SET complete = true WHERE id = ? AND userId = ?', [id, user.id], function (err) {
                    if (err) {
                        deferred.reject(err);
                    }

                    deferred.resolve(this.changes);
                }.bind(db));
            });
        }
    }

    function count() {
        if (user) {
            return util.defer(function (deferred) {
                db.get('SELECT COUNT(id) AS count FROM todo WHERE userId = ?', [user.id], function (err, row) {
                    if (err) {
                        deferred.reject(err);
                    }

                    deferred.resolve(row);
                });
            });
        }
    }

    function activeCount() {
        if (user) {
            return util.defer(function (deferred) {
                db.get('SELECT COUNT(id) AS count FROM todo WHERE userId = ? AND completed = false', [user.id], function (err, row) {
                    if (err) {
                        deferred.reject(err);
                    }

                    deferred.resolve(row);
                });
            });
        }
    }
}

todo.$inject = ['utility', 'database'];
