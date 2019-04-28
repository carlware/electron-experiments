const { BrowserWindow } = require('electron');
//default properties
const defaultOptions = {
	width: 600,
	height: 400,
	show: false
};

class Window extends BrowserWindow {
	constructor({ file, ...options }) {
		super({ ...defaultOptions, ...options });

		this.loadFile(file);
		// this.webContents.openDevTools();
		this.on('ready-to-show', event => {
			this.show();
		});
	}
}
module.exports = Window;
