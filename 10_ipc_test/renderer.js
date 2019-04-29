const { ipcRenderer } = require('electron');

const greetButton = document.getElementById('greetButton');
const greetElement = document.getElementById('greet');

greetButton.addEventListener('click', () => {
	ipcRenderer.send('greet-me', 'Hello');
});

ipcRenderer.on('greeting', (event, args) => {
	greetElement.innerText = args;
});
