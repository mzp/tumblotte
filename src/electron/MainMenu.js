// electronのrequireを使いたいので、globalをつけて
// browserifyされるのを回避する。
const remote = global.require('remote');

const Menu = remote.require('menu');
const app = remote.require('app');
const mainWindow = remote.getCurrentWindow();

function setMenu(template) {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

export default function(actions, store, tumblr) {
  const authenticated = store.getState().authenticate.isAuthenticated;

  const main = [
    { label: 'About Tumblotte', role: 'about' },
    { type: 'separator' },
    { label: 'Services', role: 'services', submenu: [] },
    { type: 'separator' },
    { label: 'Hide ' + name, accelerator: 'Command+H', role: 'hide' },
    { label: 'Hide Others', accelerator: 'Command+Shift+H', role: 'hideothers' },
    { label: 'Show All', role: 'unhide' },
    { type: 'separator' },
    { label: 'Quit', accelerator: 'Command+Q', click: function() { app.quit(); } }
  ];

  const file = [
    { label: 'New', accelerator: 'Command+N', enabled: authenticated,
      click: () => {
        const { blogs } = store.getState();
        const blog = blogs.find((blog) => blog.selected);

        if(blog) {
          actions.posts.create(blog.name);
        }
      } },
    { label: 'Fetch', enabled: authenticated,
      click: () => {
        actions.loading.start('fetch');
        actions.posts.fetch(tumblr);
      } },
    { label: 'Post/Update', accelerator: 'Command+U', enabled: authenticated,
      click: () => {
        const { posts } = store.getState();
        posts.forEach((post) => {
          if (post.selected) {
            actions.loading.start('post');
            actions.posts.post(tumblr, post);
          }
        });
      } },
    { type: 'separator' },
    { label: 'Logout', enabled: authenticated,
      click: () => { actions.authenticate.logout(); } }
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
    { label: 'Develop', submenu: develop }
  ]);
}
