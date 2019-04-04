// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
require('electron-reload')(__dirname, {
	electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
let mainWindow;

let template = [
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Undo',
				role: 'undo',
				accelartor: 'CmdOrCtrl+Z'
			},
			{
				label: 'Redo',
				role: 'redo',
				accelartor: 'Shift+CmdOrCtrl+Z'
			},
			{
				type: 'separator'
			},
			{
				label: 'Cut',
				role: 'cut',
				accelartor: 'CmdOrCtrl+X'
			},
			{
				label: 'Copy',
				role: 'copy',
				accelartor: 'CmdOrCtrl+C'
			},
			{
				label: 'Paste',
				role: 'paste',
				accelartor: 'CmdOrCtrl+V'
			},
			{
				label: 'Select All',
				role: 'selectall',
				accelartor: 'CmdOrCtrl+A'
			},
			{
				type: 'separator'
			},
			{
				type: 'submenu',
				label: 'Edit Layout',
				submenu: [
					{
						label: 'Split Up',
						click: function(menuItem, browserWindow, event) {
							console.log('menuItem ', menuItem);
							console.log('browserWindow ', browserWindow);
							console.log('event ', event);
						}
					},
					{
						label: 'Split Down'
					}
				]
			},
			{
				label: 'submenu with checkbox',
				type: 'submenu',
				submenu: [
					{
						label: 'Hello-1',
						type: 'radio',
						checked: true
					},
					{
						label: 'Hello-2',
						type: 'radio',
						checked: false
					}
				]
			}
		]
	},
	{
		label: 'View',
		submenu: [
			{
				label: 'Reload',
				accelartor: 'CmdorCtrl+R',
				click: (menuItem, focusedWindow) => {
					if (focusedWindow) {
						focusedWindow.reload();
					}
				}
			},
			{
				label: 'Toggle Full Screen',
				accelerator: (function() {
					if (process.platform === 'darwin') {
						return 'Ctrl+Command+F';
					} else {
						return 'F11';
					}
				})(),
				click: function(item, focusedWindow) {
					if (focusedWindow) {
						focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
					}
				}
			},
			{
				label: 'Toggle Dev Tools',
				accelerator: (function() {
					if (process.platform === 'darwin') {
						return 'Ctrl+Command+I';
					} else {
						return 'F10';
					}
				})(),
				click: function(item, focusedWindow) {
					if (focusedWindow) {
						focusedWindow.toggleDevTools();
					}
				}
			}
		]
	},
	{
		label: 'Window',
		submenu: [
			{
				label: 'Minimize',
				accelartor: 'Cmd+Ctrl+M',
				role: 'minimize'
			},
			{
				label: 'Close',
				accelartor: 'Cmd+Ctrl+C',
				role: 'close'
			},
			{
				label: 'Help',
				role: 'help',
				submenu: [
					{
						label: 'Learn more',
						click: () => {
							shell.openExternal('http://electron.atom.io');
						}
					}
				]
			}
		]
	}
];

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({ width: 800, height: 600 });

	// and load the index.html of the app.
	mainWindow.loadFile('index.html');
	// Open the DevTools.
	// mainWindow.webContents.openDevTools();
	const ctxMenu = Menu.buildFromTemplate([
		{
			label: 'Go to definition',
			click: () => {
				console.log('Go to definition clicked');
			},
        role: 'definition',
		},
		{
			label: 'copy',
			role: 'copy'
		},
		{
			label: 'Cut',
			role: 'cut'
		},
		{
			label: 'Paste',
			role: 'paste'
		},
		{
			type: 'separator'
		},
		{
			label: 'SelectAll',
			role: 'selectall'
		}
	]);

	mainWindow.webContents.on('context-menu', (event, params) => {
		event.preventDefault();
		console.log('right clicked on window');
		// console.log(params);
		//display the context menu
		ctxMenu.popup(mainWindow, params.x, params.y);
	});

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});

    mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
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
