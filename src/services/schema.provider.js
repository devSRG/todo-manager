angular
    .module('todo-app')
    .provider('schema', schema);

function schema() {
    this.schema = {
        CREATE_USER_TABLE: 'CREATE TABLE IF NOT EXISTS user (' + 
                                'id INTEGER PRIMARY KEY, ' + 
                                'name VARCHAR(20) NOT NULL UNIQUE, ' + 
                                'avatar VARCHAR(60), ' + 
                                'locale VARCHAR(5) DEFAULT "en-US", ' + 
                                'settings TEXT DEFAULT NULL), ' + 
                                'persist BOOLEAN DEFAULT FALSE;',
        CREATE_CATEGORY_TABLE: 'CREATE TABLE IF NOT EXISTS category (' + 
                                'id INTEGER PRIMARY KEY, ' + 
                                'type VARCHAR(20), ' + 
                                'color VARCHAR(7), ' + 
                                'userId INTEGER REFERENCES user(id));',
        CREATE_TODO_TABLE: 'CREATE TABLE IF NOT EXISTS todo (' + 
                                'id INTEGER PRIMARY KEY, ' + 
                                'title TEXT NOT NULL, ' + 
                                'desc TEXT, ' +
                                'completed BOOLEAN DEFAULT FALSE, ' + 
                                'dueDate DATE DEFAULT NULL' + 
                                'categoryId INTEGER REFERENCES category(id), ' +
                                'userId INTEGER REFERENCES user(id), ' + 
                                'createdTime TIME DEFAULT CURRENT_TIME, ' + 
                                'createdDate DATE DEFAULT CURRENT_DATE);',
        DROP_USER_TABLE: 'DROP TABLE IF EXISTS user;',
        DROP_TODO_TABLE: 'DROP TABLE IF EXISTS todo;',
        DROP_CATEGORY_TABLE: 'DROP TABLE IF EXISTS category;',
        ALTER_QUERY: ''
    };
    this.$get = function () {
        return this.schema;
    };
}
