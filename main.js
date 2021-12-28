const { app, BrowserWindow } = require('electron');

let mainWindow;

function createMainWindow () {
  // BrowserWindow options: https://www.electronjs.org/docs/latest/api/browser-window
  mainWindow = new BrowserWindow({
    title: 'ImageShrink',
    width: 500,
    height: 600
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
}

// Run on event: ready, calling createMainWindow()
app.on('ready', createMainWindow);
