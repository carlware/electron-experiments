const updateOnlineStatus = () => {
	//find the online status
	const status = navigator.onLine ? 'Online' : 'Offline';
	console.log(status);
	//if status is online change background color of the body to green
	if (navigator.onLine) {
		document.body.style.backgroundColor = 'green';
	} else {
		//if sttaus is offline change the background color of the body to red
		document.body.style.backgroundColor = 'red';
	}
};

//attach a listener to offline event
window.addEventListener('online', updateOnlineStatus);
//attach a listener to online event
window.addEventListener('offline', updateOnlineStatus);

document
	.getElementById('checkStatusButton')
	.addEventListener('click', updateOnlineStatus);
