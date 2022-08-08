var ipcRenderer = require('electron').ipcRenderer;

angular
    .module('todo-app')
    .factory('ipc', ipc);

function ipc() {
    return {
        cmd: {
            LOG_IN: 'log-in',
            LOG_OUT: 'log-out',
            SHOW_LOG_IN_WINDOW: 'show-log-in-window',
            SHOW_MAIN_WINDOW: 'show-main-window',
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
