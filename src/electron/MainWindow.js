import { nodeRequire } from './ModuleHelper';
var BrowserWindow = nodeRequire('browser-window');

export default class MainWindow {
  constructor(dev) {
    this.window = new BrowserWindow({
      width: 1024,
      height: 600
    });

    if(dev) {
      this.window.toggleDevTools();
      this.window.loadURL('file://' + __dirname + '/index_dev.html');
    } else {
      this.window.loadURL('file://' + __dirname + '/index.html');
    }
  }

  onClose(f) {
    this.window.on('closed', f);
  }
}
