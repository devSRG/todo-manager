var sql = require('sqlite3');

angular
    .module('todo-app')
    .provider('database', database);
    
function database() {
    this.db = null;
    this.schema = null;
    this.initialized = false;

    this.init = init;
    this.setup = setup;
    this.restore = restore;
    this.setSchema = setSchema;
    this.close = close;
    this.isInitialized = isInitialized;
    this.getDB = getDB;

    this.$get = function () {
        return {
            isInitialized: this.isInitialized.bind(this),
            getDB: this.getDB.bind(this),
            close: this.close.bind(this)
        };
    };

    function setSchema(schema) {
        this.schema = schema;
    }

    function init() {
        this.db = new sql.Database('todo', function (err) { if (err) console.log('DB connected:', err, this.db); });

        this.db.exec('SELECT * FROM user', function (err) {
            if (err) {
                console.log('Exec ERROR:', err);
                this.setup();
            }
            this.initialized = true;             
        }.bind(this));

        this.initialized = true;
    }

    function setup() {
        this.db.serialize(function () {
            // Important: Maintain order with respect to foreign keys
            this.db.exec(this.schema.CREATE_USER_TABLE, function (err) { if (err) { console.log('ERROR:', err); }});
            this.db.exec(this.schema.CREATE_CATEGORY_TABLE, function (err) { if (err) { console.log('ERROR', err); }});
            this.db.exec(this.schema.CREATE_TODO_TABLE, function (err) { if (err) { console.log('ERROR:', err); }});
            this.db.exec(this.schema.TEST_DATA, function (err) { if (err) { console.log('ERROR', err); }});
        }.bind(this));
    }

    function restore() {
        this.db.serialize(function () {
            this.db.exec(this.schema.DROP_TABLE_USER, function (err) { if (err) { console.log('ERROR:', err); }});
            this.db.exec(this.schema.DROP_TABLE_TODO, function (err) { if (err) { console.log('ERROR:', err); }});

            this.setup();
        }.bind(this));
    }

    function close() {
        this.db.close(function (err) { if (err) console.log('ERROR', err); });
    }

    function isInitialized() {
        return this.initialized;
    }

    function getDB() {
        return this.db;
    }
}
