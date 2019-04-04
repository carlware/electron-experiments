const { app, BrowserWindow } = require('electron');
let mainWidnow = null;
app.on('ready', () => {
	console.log('Hello from Electron');
	mainWidnow = new BrowserWindow();
});
