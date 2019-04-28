// Modules to control application life and create native browser window
const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');
const ElectronOnline = require('electron-online');
const connection = new ElectronOnline();

require('electron-reload')(__dirname, {
	electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});

	mainWindow.loadFile('index.html');

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
	connection.on('online', () => {
		console.log('App is online!');
	});

	connection.on('offline', () => {
		console.log('App is offline!');
	});

	console.log(connection.status);
}

app.on('ready', () => {
	createWindow();
});

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	if (mainWindow === null) {
		createWindow();
	}
});

