const { app, BrowserWindow } = require('electron');

// Set env: 'development' or 'production'
process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true: false;

let mainWindow;

function createMainWindow () {
  // BrowserWindow options: https://www.electronjs.org/docs/latest/api/browser-window
  mainWindow = new BrowserWindow({
    title: 'ImageShrink',
    width: 500,
    height: 600,
    icon: `./${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev, // Allow resizing window in development only
  });

  mainWindow.loadFile('./app/index.html');

}

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// Run on event: ready, calling createMainWindow()
app.on('ready', createMainWindow);
