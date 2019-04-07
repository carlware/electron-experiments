// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, webContents } = require('electron');
const path = require('path');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
require('electron-reload')(__dirname, {
	electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
let mainWindow, secondWindow, captureWindow;

function createWindow(filename, options) {
	// Create the browser window.
	let win = new BrowserWindow(options);

	win.webContents.on('did-start-loading', event => {
		//custom logic
		console.log('did-start-loading');
	});
	win.webContents.on('dom-ready', event => {
		//custom logic
		console.log('dom-ready');
	});
	win.webContents.on('did-finish-load', event => {
		//custom logic
		console.log('did-finish-load');
	});

	// and load the index.html of the app.
	win.loadFile(filename);
	// Open the DevTools.
	win.webContents.openDevTools();
	// Emitted when the window is closed.
	win.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});
	// console.log(webContents.getAllWebContents());
	return win;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	mainWindow = createWindow('index.html', {
		width: 800,
		height: 600,
		title: 'Main Window'
	});
	secondWindow = createWindow('index.html', {
		width: 600,
		height: 400,
		title: 'Second Window'
	});
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
ipcMain.on('capture-window', event => {
	//get the current focused browserwindow by id
	captureWindow = BrowserWindow.fromId(event.sender.webContents.id);
	// get the width and height of current focused window
	const bounds = captureWindow.getBounds();
	//call the capture page method by rectangle options
	captureWindow.webContents.capturePage(
		{
			x: 0,
			y: 0,
			width: bounds.width,
			height: bounds.height
		},
		image => {
			const desktop = app.getPath('desktop');
			const filePath = `${desktop}/${captureWindow.getTitle()}-captured.png`;
			console.log(filePath);
			//generate a png file
			const png = image.toPNG();
			fs.writeFileSync(filePath, png);
		}
	);
});
