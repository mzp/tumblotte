
var nodeRequire = require;
var app = nodeRequire('app');
var BrowserWindow = nodeRequire('browser-window');

var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    } else {
      // set default menu
      var main = [
        { label: 'About Tumblotte', role: 'about' },
        { type: 'separator' },
        { label: 'Services', role: 'services', submenu: [] },
        { type: 'separator' },
        { label: 'Hide Tumblotte', accelerator: 'Command+H', role: 'hide' },
        { label: 'Hide Others', accelerator: 'Command+Shift+H', role: 'hideothers' },
        { label: 'Show All', role: 'unhide' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click: function() { app.quit(); } }
      ];

      var Menu = nodeRequire('menu');
      Menu.setApplicationMenu(Menu.buildFromTemplate([{ label: 'Tumblotte', submenu: main }]));
    }
});

function createWindow() {
  if(mainWindow) { return; }

  mainWindow = new BrowserWindow({width: 1024, height: 600});

  if(process.env.TUMBLOTTE_ENV == 'dev') {
    mainWindow.toggleDevTools();
    mainWindow.loadURL('file://' + __dirname + '/index_dev.html');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/index.html');
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
};

app.on('ready', createWindow);
app.on('activate', createWindow);
