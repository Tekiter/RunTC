import { enable, initialize } from "@electron/remote/main";
import { app, BrowserWindow, dialog, Menu, shell } from "electron";
import log from "electron-log";
import { autoUpdater } from "electron-updater";
import { release } from "os";
import { join } from "path";

import { version } from "../../package.json";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

process.on("unhandledRejection", (err) => {
  log.error("UnhandledPromise:", err);
});

initialize();

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, "../.."),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? "../.." : "../../../public"),
};

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(ROOT_PATH.dist, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "RunTC - " + version,
    icon: join(ROOT_PATH.public, "favicon.svg"),
    autoHideMenuBar: true,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
    // win.webContents.openDevTools()
  }

  enable(win.webContents);

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("context-menu", (_e, props) => {
    const InputMenu = Menu.buildFromTemplate([
      {
        label: "????????????",
        role: "cut",
      },
      {
        label: "??????",
        role: "copy",
      },
      {
        label: "????????????",
        role: "paste",
      },
      {
        type: "separator",
      },
      {
        label: "?????? ??????",
        role: "selectAll",
      },
    ]);
    const { isEditable } = props;

    if (isEditable) {
      InputMenu.popup({ window: win });
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  setAutoUpdater();
});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow().catch((err) => {
      dialog.showErrorBox("????????? ???????????? ????????? ??????????????????", err);
    });
  }
});

async function setAutoUpdater() {
  log.transports.file.level = "debug";
  autoUpdater.logger = log;

  if (process.platform === "darwin") {
    const checks = await autoUpdater.checkForUpdates();

    if (!checks) {
      return;
    }

    const { updateInfo } = checks;

    const { response } = await dialog.showMessageBox(null, {
      message: `??????????????? ???????????????.\n??????: ${updateInfo.version}\n??????: ${updateInfo.releaseDate}`,
      buttons: ["??????", "???????????? ???????????? ??????"],
      defaultId: 1,
    });

    if (response === 1) {
      shell.openExternal("https://github.com/Tekiter/run-tc/releases");
    }

    return;
  }

  autoUpdater.checkForUpdatesAndNotify();
}
