import MainWindow from './MainWindow';
import menu from './MainMenu';
import { nodeRequire } from './ModuleHelper';

var app = nodeRequire('app');

export default class Application {
  constructor(dev) {
    app.on('ready', ::this.createWindow);
    app.on('activate', ::this.createWindow);
    app.on('window-all-closed', ::this.onClose);
  }

  createWindow() {
    if(this.window) { return; };
    this.window = new MainWindow(this.isDev());
    this.window.onClose(() => {
      this.window = null;
    })
  }

  onClose() {
    menu({});
  }

  isDev() {
    return process.env.TUMBLOTTE_ENV == 'dev';
  }
}
