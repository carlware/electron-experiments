const electron = require("electron");
const fs = require("fs");
const path = require("path");
const sanitize = require("sanitize-filename");
const ytdl = require("ytdl-core");
const ffmpegPath = require("ffmpeg-binaries");
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, ipcMain, Menu } = electron;

let mainWindow;
let settings = {
  //Default Settings
  folderPath: path.join(__dirname, "songs")
};

fs.readFile("settings.json", (err, jsonSettings) => {
  if (err) {
    return;
  }
  settings = JSON.parse(jsonSettings);
});

const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    height: 450,
    width: 800,
    resizable: false
  });

  const menuTemplate = [
    {
      label: "View",
      submenu: [{ role: "reload" }, { role: "toggledevtools" }]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        }
      ]
    }
  ];

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  if (process.platform === "darwin") {
    Menu.setApplicationMenu(mainMenu);
  } else {
    mainWindow.setMenu(mainMenu);
  }
  const startUrl =
    process.env.ELECTRON_START_URL || `file://${__dirname}/build/index.html`;
  mainWindow.loadURL(startUrl);

  //enable garbage collector
  mainWindow.on("closed", () => {
    const jsonSettings = JSON.stringify(settings);
    fs.writeFileSync("settings.json", jsonSettings);

    app.quit();
    mainWindow = null;
  });
};

app.on("ready", createWindow);

ipcMain.on("video:url", async (event, data) => {
  try {
    const info = await ytdl.getInfo(data.url);

    mainWindow.webContents.send("video:info", {
      title: info.title,
      length_seconds: info.length_seconds,
      thumbnail_url: info.thumbnail_url
    });

    const videoStream = ytdl(data.url, {
      quality: "highestaudio",
      filter: "audioonly"
    });

    await ffmpeg(videoStream)
      .setFfmpegPath(ffmpegPath)
      .audioBitrate(128)
      .on("progress", progress => {
        mainWindow.webContents.send("video:progress", { info, progress });
      })
      .on("end", () => {
        mainWindow.webContents.send("video:end");
      })
      .save(path.join(settings.folderPath, sanitize(`${info.title}.m4a`)));
  } catch (err) {
    mainWindow.webContents.send("video:error", { message: err.message });
  }
});

ipcMain.on("settings:request", event => {
  mainWindow.webContents.send("settings:response", settings);
});

ipcMain.on("folder:select", async event => {
  const folderPath = await electron.dialog.showOpenDialog({
    properties: ["openDirectory"]
  });
  if (folderPath) {
    settings.folderPath = folderPath[0];
    mainWindow.webContents.send("folder:change", { folderPath });
  }
});
