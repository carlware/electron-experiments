const DataStore = require('electron-store');
const store = new DataStore({ name: 'Todos Data' });
function getTodos() {
	store.set('todos', [
		{ id: '1', title: 'Learning Electron', completed: false }
	]);
	return store.get('todos').filter(todo => !todo.completed) || [];
}
function addTodo(newTodo) {
	const todos = [...getTodos(), newTodo];
	store.set('todos', todos);
}
function updateTodo(todoId) {
	const todos = getTodos();
	const updatedTodos = todos.filter(todo => todo.id !== todoId);
	store.set('todos', updatedTodos);
}
module.exports = {
	getTodos,
	addTodo,
	updateTodo
};
