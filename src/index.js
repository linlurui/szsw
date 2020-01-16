/* jslint esversion: 6*/
const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  shell
} = require('electron');
let path = require('path');
let exePath = path.dirname(app.getPath('exe'));

// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win;

function createWindow() {
  Menu.setApplicationMenu(null)
  // 创建浏览器窗口。
  win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    },
    // frame: false
  });

  // 直接最大化
  win.maximize();
  win.show();

  // 加载index.html文件
  win.loadFile('dist/index.html');

  // 打开开发者工具
  // win.webContents.openDevTools()

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null;
  });
}

// 禁用gpu加速
app.disableHardwareAcceleration();

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow();
  }
});

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。

// 调用对讲机
ipcMain.on('open', () => {
  // console.log(123) // prints "ping"
  // shell.openItem(exePath + '/djj/telClient.exe')
  shell.openItem(exePath + '\\hyj\\telClient.exe');

});

// 调用萤石云
ipcMain.on('YSY', () => {
  // console.log(123) // prints "ping"
  // shell.openItem(exePath + '/djj/telClient.exe')
  shell.openItem(exePath + '\\ysy\\EzvizStudio.exe');

});

// 调用无人机
ipcMain.on('plane', () => {
  // console.log(123) // prints "ping"
  // shell.openItem(exePath + '/djj/telClient.exe')
  shell.openItem(exePath + '\\dj\\FlightHub.exe');

});

// 同步消息
// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })

//在渲染器进程 (网页) 中。
// const { ipcRenderer } = require('electron')
// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg) // prints "pong"
// })
// ipcRenderer.send('asynchronous-message', 'ping')