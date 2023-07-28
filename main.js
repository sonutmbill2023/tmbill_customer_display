  const path = require("path");

const { app, BrowserWindow, dialog, nativeImage } = require("electron");
 

let win = null;

function createWindow() {
  win = new BrowserWindow({
     
    width: 800,
    height: 600,
 
     icon: __dirname + "/icon.ico",
    
    webPreferences: {
      nodeIntegration: true,
      contextIsolation:false,
      
      
    },
    webSecurity: false,
    
     
  });

  win.loadFile("index.html");

    //win.setMenuBarVisibility(false);

  return win;
}

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

app.on("ready", () => {
  win = createWindow();

  win.on("close", async (event) => {
    event.preventDefault();

    const { response } = await dialog.showMessageBox(win, {
      type: "question",
      buttons: ["Yes", "No"],
      title: "TMBill",
      message: "Are you sure you want to exit?",
    });

    if (response === 0) {
      win.destroy();
    }
  });
});

// app.on('activate', () => {
//   // Check if the main window exists, and if not, create it.
//   if ( win === null) {
//     win = createWindow();
//   } else {
//     // If the main window already exists, just focus it instead of creating a new one.
//     win.focus();;
//   }
// });

 

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
