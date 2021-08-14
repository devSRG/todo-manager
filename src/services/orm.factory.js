angular
    .module('todo-app')
    .factory('orm', orm);

function orm(user, todo, category) {
    return {
        User: user,
        Todo: todo,
        Category: category
    };
}

orm.$inject = ['user', 'todo', 'category'];
