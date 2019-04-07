const { ipcRenderer } = require('electron');

document.getElementById('capture-page').addEventListener('click', () => {
	ipcRenderer.send('capture-window');
});
