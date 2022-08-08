var electron = require('electron');
var app = electron.app,
    ipcMain = electron.ipcMain,
    BrowserWindow = electron.BrowserWindow;            

console.log('Chrome version: ', process.versions.chrome);
console.log('Electron version: ', process.versions.electron);

var loginWindow = null,
    mainWindow = null;

function createLoginWindow() {
    loginWindow = new BrowserWindow({
        width: 400,
        height: 500,
        title: 'To do Manager',
        resizable: false,
        frame: false,
        show: false,
        backgroundColor: '#666',
        icon: electron.nativeImage.createFromPath('assets/todo_icon.png'),
        webPreferences: {
            devTools: true,
            nodeIntegration: true
        }
    });
    
    loginWindow.loadFile('./build/html/login.html');
}

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 880,
        height: 550,
        title: 'To do Manager',
        resizable: false,
        frame: false,
        show: false,
        backgroundColor: '#666',
        icon: electron.nativeImage.createFromPath('assets/todo_icon.png'),
        webPreferences: {
            devTools: true,
            nodeIntegration: true
        }
    });

    var swh = electron.screen.getPrimaryDisplay().workAreaSize;
    
    scr_width = swh.width;
    scr_height = swh.height;
    x_center = (scr_width / 2) - 400;
    y_center = (scr_height / 2) - 250;

    mainWindow.loadFile(`./build/html/index.html`);
}

app.on('ready', function() {
    createLoginWindow();
    createMainWindow();
    mainWindow.webContents.openDevTools();
});

app.on('render-process-gone', renderLog);
app.on('child-process-gone', childLog);
app.on('gpu-process-crashed', gpuLog);

function renderLog(event) {
    // console.log('RENDER', event)
}

function childLog(event) {
    console.log('CHILD', event)
}

function gpuLog(event) {
    console.log('GPU', event)
}

/*------------------ IPC -------------------*/

ipcMain.on('show-log-in-window', function () {
    loginWindow.show();
});

ipcMain.on('show-main-window', function () {
    mainWindow.show();
})

ipcMain.on('log-in', function (evt, args) {
    loginWindow.hide();

    mainWindow.webContents.send('user', args);
    mainWindow.webContents.openDevTools();
    mainWindow.show();
});

ipcMain.on('log-out', function () {
    mainWindow.hide();
    loginWindow.show();
});

ipcMain.on('minimize', function () {
    mainWindow.minimize();
});

ipcMain.on('maximize', function () {
    if (!mainWindow.isMaximized()) {
        mainWindow.maximize();
    } else {
        mainWindow.unMaximize();
    }
});

ipcMain.on('close', function () {
    app.exit();
});
