var ipcRenderer = require('electron').ipcRenderer;

angular
    .module('todo-app')
    .factory('ipc', ipc);

function ipc() {
    return {
        cmd: {
            LOGIN: 'login',
            LOGOUT: 'logout',
            MINIMIZE: 'minimize',
            MAXIMIZE: 'maximize',
            CLOSE: 'close'
        },
        send: send,
        on: on
    };

    function send(cmdType, values) {
        ipcRenderer.send(cmdType, values);
    }

    function on(cmdType, cb) {
        ipcRenderer.on(cmdType, cb);
    }
}
