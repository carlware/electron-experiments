const { ipcRenderer } = require('electron');
const chooseBtn = document.getElementById('choose-btn');

chooseBtn.addEventListener('click', event => {
	ipcRenderer.send('open-dialog');
});

ipcRenderer.on('selected-items', (events, args) => {
	console.log(args);
});
const saveBtn = document.getElementById('save-file');
saveBtn.addEventListener('click', event => {
	ipcRenderer.send('save-file-dialog');
});

const infoButton = document.getElementById('info-dialog');
const errorButton = document.getElementById('error-dialog');
const errorBoxButton = document.getElementById('error-box-btn');
const questionButton = document.getElementById('question-dialog');

infoButton.addEventListener('click', () => {
	ipcRenderer.send('message-dialog', 'info');
});

errorButton.addEventListener('click', () => {
	ipcRenderer.send('message-dialog', 'error');
});

errorBoxButton.addEventListener('click', () => {
	ipcRenderer.send('error-box', 'none');
});

questionButton.addEventListener('click', () => {
	ipcRenderer.send('message-dialog', 'question');
});
