const { ipcRenderer } = require('electron');

ipcRenderer.send('async-msg', 'Hello from renderer process');

ipcRenderer.on('async-reply', (event, arg) => {
	console.log(arg);
});


const msgBtn = document.getElementById('sendMsg');

msgBtn.addEventListener('click', event => {
	//send message to the receiver
	//send message to main process
	const reply = ipcRenderer.sendSync(
		'send-sync-msg',
		'Hello from renderer process'
	);
	console.log(reply);
	document.getElementById('syncMsg').innerHTML = `Reply: ${reply}`;
});
