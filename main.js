const path = require("path");

const { app, BrowserWindow, dialog, nativeImage } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: __dirname + "/icon.ico",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  win.loadFile("index.html");

  return win;
}

app.on("ready", () => {
  win = createWindow();

  win.on("close", async (event) => {
    event.preventDefault();

    const { response } = await dialog.showMessageBox(win, {
      type: "question",
      buttons: ["Yes", "No"],
      title: "Confirm Exit",
      message: "Are you sure you want to exit?",
    });

    if (response === 0) {
      win.destroy();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
