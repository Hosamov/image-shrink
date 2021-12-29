const { app, BrowserWindow, Menu } = require('electron');

// Set env: 'development' or 'production'
process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true: false;

let mainWindow;
let aboutWindow;

function createMainWindow () {
  // BrowserWindow options: https://www.electronjs.org/docs/latest/api/browser-window
  mainWindow = new BrowserWindow({
    title: 'ImageShrink',
    width: 500,
    height: 600,
    icon: `./${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev, // Allow resizing window in development only
    backgroundColor: 'white'
  });
  mainWindow.loadFile('./app/index.html');
}

function createAboutWindow () {
  // BrowserWindow options: https://www.electronjs.org/docs/latest/api/browser-window
  aboutWindow = new BrowserWindow({
    title: 'About ImageShrink',
    width: 300,
    height: 300,
    icon: `./${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: false,
    backgroundColor: 'white'
  });
  aboutWindow.loadFile('./app/about.html');
}

const menu = [
  ...(isMac ? [{
      label: app.name,
      submenu: [
        {
          label: 'About',
          click: createAboutWindow,
        }
      ]
  }] : []),
  {
    role: 'fileMenu',
  },
  ...(!isMac ? [
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: createAboutWindow,
        }
      ]
    }
  ] : []),
  ...(isDev ? [
    {
      label: 'Developer',
      submenu:  [
        { role: 'reload' },
        { role: 'forcereload' },
        { type: 'separator' },
        { role: 'toggledevtools' },
      ]
    }]
     : [])
]

// Run on event: ready, calling createMainWindow()
app.on('ready', () => {
  createMainWindow();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // Garbage collection:
  mainWindow.on('closed', () => mainWindow = null);
});

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
