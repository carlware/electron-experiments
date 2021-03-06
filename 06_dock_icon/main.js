// Modules to control application life and create native browser window
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
require('electron-reload')(__dirname, {
	electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
let mainWindow;
function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});

	// and load the index.html of the app.
	mainWindow.loadFile('index.html');
	// Open the DevTools.
	// mainWindow.webContents.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
	shell.beep();
	// const filePath = app.getAppPath() + '/test.txt';
	// shell.showItemInFolder(filePath);

	// shell.openItem(filePath);

	// const filePath = 'file:///' + app.getAppPath() + '/test.html';
	// shell.openExternal(filePath);
	// shell.openExternal('https://electron.atom.io');
  //set icon to dock
	if (process.platform === 'darwin') {
		mainWindow.on('blur', event => {
			setTimeout(() => {
				app.dock.setIcon(path.join(__dirname, '/assets/apple-app.png'));
				app.dock.bounce('critical');
			}, 5000);
		});
		mainWindow.on('focus', event => {
			app.dock.setBadge('2');
			app.dock.setIcon(path.join(__dirname, '/assets/circle.png'));
		});
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
