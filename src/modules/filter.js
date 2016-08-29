export default {
	all: function(todos){
		return todos;
	},
	active: function(todos){
		return todos.filter(function(item){
			return !item.completed;
		});
	},
	completed: function(todos){
		return todos.filter(function(item){
			return item.completed;
		});
	}
}