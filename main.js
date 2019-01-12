'use-strict';

const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');
const i18n = require('i18n');

console.log('Chrome version: ', process.versions.chrome);
console.log('Electron version: ', process.versions.electron);

let loadingWindow = null,
    loginWindow = null,
    mainWindow = null;
let scr_width = 0,
    scr_height = 0;
let maximized = false;

function loginScreen() {
  loginWindow = new BrowserWindow({
    width: 400,
    height: 500,
    resizable: false,
    frame: false,
    show: false
  });

  loginWindow.loadURL(`file://${__dirname}/build/html/login.html`);
  loginWindow.on('close', () => {
    loginWindow = null;
  });
}

function mainScreen() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    userContentSize: true,
    title: 'To do Manager',
    resizable: false,
    frame: false,
    backgroundColor: '#666',
    icon: 'assets/todo_icon.png',
    webPreferences: {
      devTools: true
    }
  });
  let s = require('electron').screen;
  let swh = s.getPrimaryDisplay().workAreaSize;

  scr_width = swh.width;
  scr_height = swh.height;
  x_center = (scr_width / 2) - 400;
  y_center = (scr_height / 2) - 250;
  mainWindow.loadURL(`file://${__dirname}/build/html/index.html`);

  mainWindow.on('ready-to-show', () => {
    init();
  });
  mainWindow.on('close', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  loginScreen();
  mainScreen();

    /*loginWindow.webContents.on('did-finish-load', function() {
      if(loadingWindow) {
        loadingWindow.close();
      }
    });*/


  mainWindow.hide();
  loginWindow.show();

});
/*
function loadingScreen() {
  loadingWindow = new BrowserWindow({
    width: 500,
    height: 250,
    resizable: false,
    frame: false,
    backgroundColor: '#555'
  });
  loadingWindow.loadURL(`file://${__dirname}/public/html/loading.html`);
  loadingWindow.show();
}
*/


/*------------------ IPC -------------------*/

ipcMain.on('username', (event, args) => {
  loginWindow.hide();
  mainWindow.webContents.send('user', args);
  mainWindow.show();
  console.log('Username',args);
});

ipcMain.on('logout', () => {
  mainWindow.hide();
  loginWindow.show();
});

ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
});
ipcMain.on('maximize-window', () => {
  if(!maximized) {
    mainWindow.setBounds({x: 0, y: 0, width: scr_width, height: scr_height});
    maximized = true;
  } else {
    mainWindow.setBounds({x: x_center, y: y_center, width: 800, height: 500});
    maximized = false;
  }
});
ipcMain.on('close-window', () => {
    app.quit();
});


function init() {

}