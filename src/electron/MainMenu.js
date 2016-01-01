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

export default function(actions, store) {
  const main = [
    { label: 'Quit', accelerator: 'Command+Q',
      click: () => { app.quit(); } }
  ];

  const file = [
    { label: 'New', accelerator: 'Command+N',
      click: () => { actions.create(); } },
    { label: 'Fetch',
      click: () => { actions.fetch(); } },
    { label: 'Post/Update', accelerator: 'Command+U',
      click: () => {
        const { posts } = store.getState();
        posts.forEach((post) => {
          if (post.selected) {
            if (post.isPosted) {
              actions.edit(post);
            } else {
              actions.post(post);
            }
          }
        });
      } }
  ];

  const edit  = [
    { label: "Undo", accelerator: "Command+Z", selector: "undo:" },
    { label: "Redo", accelerator: "Shift+Command+Z", selector: "redo:" },
    { type: "separator" },
    { label: "Cut", accelerator: "Command+X", selector: "cut:" },
    { label: "Copy", accelerator: "Command+C", selector: "copy:" },
    { label: "Paste", accelerator: "Command+V", selector: "paste:" }
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
    { label: 'Develop', submenu: develop }
  ]);
}
