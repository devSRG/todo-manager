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
                                'settings TEXT DEFAULT NULL);',
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
        TEST_DATA:  `INSERT INTO user (name, avatar, settings) VALUES ("Miyuru", null, '{"theme": "Dark", "fontSize": "small"}'); \n` + 
                    `INSERT INTO user (name, avatar, locale, settings) VALUES ("Sachintha", "../../src/img/IMG_20150729_155952.jpg", "sl-LK", '{"theme": "Light", "fontSize": "medium"}'); \n` + 
                    'INSERT INTO todo (title, desc, categoryId, userId) VALUES ("Complete assignment task 2", null, 1, 1); \n' + 
                    'INSERT INTO todo (title, desc, categoryId, userId) VALUES ("Research about gradle problems", null, 3, 1); \n' + 
                    'INSERT INTO todo (title, desc, categoryId, userId) VALUES ("Develop an app to note all todo comments in code files", null, 3, 1); \n' + 
                    'INSERT INTO todo (title, desc, categoryId, userId) VALUES ("හෙට පන්ති යන්න ඔන", null, 2, 1); \n' + 
                    'INSERT INTO todo (title, desc, categoryId, userId) VALUES ("Another todo", "With description", 1, 1); \n' + 
                    'INSERT INTO todo (title, desc, categoryId, userId) VALUES ("One more", "With description", 1, 1); \n' + 
                    'INSERT INTO todo (title, desc, categoryId, userId) VALUES ("Todo for other user", null, 2, 2); \n' + 
                    'INSERT INTO category (type, color, userId) VALUES ("important", "#db45db", 1); \n' + 
                    'INSERT INTO category (type, color, userId) VALUES ("personal", "#eb4141", 2); \n' + 
                    'INSERT INTO category (type, color, userId) VALUES ("programming", "#55e055", 1); \n' + 
                    'INSERT INTO category (type, color, userId) VALUES ("education", "#5555df", 1); \n' + 
                    'INSERT INTO category (type, color, userId) VALUES ("finance", "#db45db", 2); \n' + 
                    'INSERT INTO category (type, color, userId) VALUES ("books", "#eb4141", 1); \n'
    };
    this.$get = function () {
        return this.schema;
    };
}
