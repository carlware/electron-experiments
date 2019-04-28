const { ipcRenderer } = require('electron');

ipcRenderer.on('fetch-todos', (event, todos) => {
	//render the todos in html
	const todoItems = todos.reduce((prevValue, currentValue) => {
		prevValue += `<li class="list-group-item"> ${currentValue.title}
		<input type="checkbox" id="${currentValue.id}" class="finish-todo"/>
		</li>`;
		return prevValue;
	}, '');
	const todoList = document.getElementById('todoList');

	todoList.innerHTML = todoItems;

	const finishTodo = e => {
		console.log(e.target.id);
		// alert('checkbox clicked! with id ');
		ipcRenderer.send('update-todo', e.target.id);
	};
	document.querySelectorAll('.finish-todo').forEach(element => {
		element.addEventListener('click', finishTodo);
	});
});
