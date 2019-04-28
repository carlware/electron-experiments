const { ipcRenderer } = require('electron');
const todoForm = document.getElementById('todoForm');

todoForm.addEventListener('submit', e => {
	e.preventDefault();

	const todoTitle = e.target[0].value;

	ipcRenderer.send('save-todo', {
		title: todoTitle,
		id: Date.now().toString(),
		completed: false
	});

	todoForm.reset();
});
