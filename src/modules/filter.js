export default {
	all(todos){
		return todos;
	},
	active(todos){
		return todos.filter(item => !item.completed);
	},
	completed(todos){
		return todos.filter(item => item.completed);
	}
}