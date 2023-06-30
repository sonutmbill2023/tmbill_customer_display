
// const { app, BrowserWindow, Menu, nativeImage, dialog } = require("electron");
 
  const path = require("path");
// // const menuItems = [
// //   {
// //     label: "Window",
// //     submenu: [
// //       {
// //         role: "minimize",
// //       },
// //       {
// //         role: "toggleDevTools",
// //       },
// //       {
// //         role: "close",
// //       },
// //     ],
// //   },
// //   {
// //     label: "Help",
// //     submenu: [
// //       {
// //         label: "Learn More",
// //         click: async () => {
// //           const { shell } = require("electron");
// //           await shell.openExternal("https://tmbill.com");
// //         },
// //       },
// //     ],
// //   },
// // ];

// // const menu = Menu.buildFromTemplate(menuItems);
// // Menu.setApplicationMenu(menu);

 

// let win;

// function createWindow() {
//   win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     autoHideMenuBar: false,
//     icon: __dirname + "/icon.ico",
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: true,
//       // preload: path.join(__dirname, "renderer.js"),
//     },
//   });
//   win.loadFile("index.html");
//   win.setOverlayIcon(nativeImage.createFromPath("icon.ico"));


//    return win
// }

// // require("electron-reload")(__dirname, {
// //   electron: path.join(__dirname, "node_modules", ".bin", "electron"),
// // });

 
// app.on('ready', () => {
//   win = createWindow();

//   // Handle the window's close event
//   win.on('close', (event) => {
//     // Prevent the window from closing immediately
//     event.preventDefault();

//     // Show the confirmation dialog asynchronously
//     dialog.showMessageBox(win, {
//       type: 'question',
//       buttons: ['Yes', 'No'],
//       title: 'Confirm Exit',
//       message: 'Are you sure you want to exit?'
//     }).then(({ response }) => {
//       if (response === 0) {
//         // User clicked "Leave", close the window manually
//         win.destroy();
//       }
//       else{
//         event.preventDefault()
//       }
//     });
//   });
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });
 

const { app, BrowserWindow, dialog, nativeImage } = require("electron");

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
    },
  });

  win.loadFile("index.html");
  //win.setOverlayIcon(nativeImage.createFromPath("icon.ico"));

  return win;
}

 

app.on("ready", () => {
  win = createWindow();

  // Handle the window's close event
  win.on("close", async (event) => {
    // Prevent the window from closing immediately
    event.preventDefault();

     
    // Show the confirmation dialog asynchronously
    const { response } = await dialog.showMessageBox(win, {
      type: "question",
      buttons: ["Yes", "No"],
      title: "Confirm Exit",
      message: "Are you sure you want to exit?",
    });

    if (response === 0) {
      // User clicked "Yes", close the window manually
      win.destroy();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});