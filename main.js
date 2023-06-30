const { app, BrowserWindow, Menu, nativeImage, dialog } = require("electron");
 
const path = require("path");
const menuItems = [
  {
    label: "Window",
    submenu: [
      {
        role: "minimize",
      },
      {
        role: "toggleDevTools",
      },
      {
        role: "close",
      },
    ],
  },
  {
    label: "Help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://tmbill.com");
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

 

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: false,
    icon: __dirname + "/icon.ico",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      // preload: path.join(__dirname, "renderer.js"),
    },
  });
  win.loadFile("index.html");
  win.setOverlayIcon(nativeImage.createFromPath("icon.ico"));


   
}

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

app.whenReady().then(() => {
  createWindow();
});

 

app.on("exit", (event) => {
  //  event.preventDefault()
  const choice = dialog.showMessageBoxSync(win, {
    type: "question",
    buttons: ["Yes", "No"],
    defaultId: 1,
    message: "Are you sure you want to quit?",
  });

  if (choice === 0) {
    
    app.quit();
  }
});

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (win === null) {
//     win = createWindow();
//   }
// });
