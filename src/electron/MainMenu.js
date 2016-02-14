// electronのrequireを使いたいので、globalをつけて
// browserifyされるのを回避する。
function setMenu(template) {
  const remote = global.require('remote');
  const Menu = remote.require('menu');
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function fetch(name, options = {}) {
  if(options[name]) {
    return { enabled: true, click: options[name] }
  } else {
    return { enabled: false }
  }
}

export default function(options) {
  const remote = global.require('remote');

  const app = remote.require('app');
  const mainWindow = remote.getCurrentWindow();

  const main = [
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

  const file = [
    { label: 'New', accelerator: 'Command+N', ...fetch('create', options) },
    { label: 'Fetch', ...fetch('fetch', options) },
    { label: 'Post/Update', accelerator: 'Command+U', ...fetch('post', options) },
    { type: 'separator' },
    { label: 'Logout', ...fetch('logout', options) }
  ];

  const edit  = [
    { label: "Undo", accelerator: "Command+Z", selector: "undo:" },
    { label: "Redo", accelerator: "Shift+Command+Z", selector: "redo:" },
    { type: "separator" },
    { label: "Cut", accelerator: "Command+X", selector: "cut:" },
    { label: "Copy", accelerator: "Command+C", selector: "copy:" },
    { label: "Paste", accelerator: "Command+V", selector: "paste:" }
  ];

  const window_menu = [
    { label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
    { label: 'Close', accelerator: 'CmdOrCtrl+W', role: 'close' },
    { type: 'separator' },
    { label: 'Bring All to Front', role: 'front' }
  ];

  const help = [
    { label: 'Send Feedback',
      click: () => {
        global.require('shell').openExternal('https://github.com/mzp/tumblotte/issues');
      }
    }
  ];

  const develop = [
    { label: 'Reload', accelerator: 'Command+R',
      click: () => { mainWindow.restart(); } },
    { label: 'Toggle Full Screen', accelerator: 'Ctrl+Command+F',
      click: () => { mainWindow.setFullScreen(!mainWindow.isFullScreen()); } },
    { label: 'Toggle Developer Tools', accelerator: 'Alt+Command+I',
      click: function() { mainWindow.toggleDevTools(); }
    }
  ];

  setMenu([
    { label: 'Tumblr', submenu: main },
    { label: 'File', submenu: file },
    { label: 'Edit', submenu: edit },
    { label: 'Window', role: 'window', submenu: window_menu },
    { label: 'Help', role: 'help', submenu: help },
    { label: 'Develop', submenu: develop }
  ]);
}
