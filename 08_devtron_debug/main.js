// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
require('electron-reload')(__dirname, {
	electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
const Window = require('./window');
const { getTodos, addTodo, updateTodo } = require('./DataStore');
let mainWindow;
function main() {
	//create main window here
	mainWindow = new Window({
		file: path.join(__dirname, 'renderer', 'index.html'),
		width: 400,
		height: 500
	});

	mainWindow.once('show', event => {
		mainWindow.webContents.send('fetch-todos', getTodos());
	});
	// console.log(app.getPath('userData'));
	let menu = Menu.buildFromTemplate([
		{
			label: process.platform === 'darwin' ? app.getName() : 'Electron Todo',
			submenu: [
				{
					label: 'Add Todo',
					click: () => {
						const addTodoWin = new Window({
							file: path.join(__dirname, 'renderer', 'todo-form.html'),
							width: 300,
							height: 300,
							parent: mainWindow
						});
					}
				}
			]
		},
		{
			label: 'Debug',
			submenu: [
				{
					label: 'Toggle Dev tools',
					click: (item, focusedWindow) => {
						focusedWindow.toggleDevTools();
					}
				}
			]
		}
	]);
	Menu.setApplicationMenu(menu);
}

app.on('ready', main);

app.on('window-all-closed', () => {
	app.quit();
});

ipcMain.on('save-todo', (event, todo) => {
	addTodo(todo);
	mainWindow.send('fetch-todos', getTodos());
});

ipcMain.on('update-todo', (event, todoId) => {
	updateTodo(todoId);
	mainWindow.send('fetch-todos', getTodos());
});
