<template>
	<section class="main">
		<input type="checkbox" class="toggle-all" v-show="todos.length" v-model="allDone" />
		<ul class="todo-list">
			<li class="todo" :class="{completed: todo.completed,editing: todo == editedTodo}" v-for="todo in filteredTodos">
				<div class="view">
					<input type="checkbox" class="toggle" v-model="todo.completed">
					<label @dblclick="editTodo(todo)">{{todo.todoText}}</label>
					<button class="edit-btn" @click="editTodo(todo)"></button>
					<button class="destroy" @click="removeTodo(todo)"></button>
				</div>
				<input class="edit" v-todofocus="todo == editedTodo" v-model="todo.todoText" @keyup.enter="doneEdit(todo)" @blur="doneEdit(todo)" @keyup.esc="cancelTodo(todo)">
			</li>
		</ul>
	</section>
</template>

<script>
	import Filter from '../modules/filter';
	import Store from '../modules/store';

	export default {
		data(){
			return {
				todos: Store.fetch(),
				editedTodo: null,
				visibility: 'all'
			}
		},
		watch: {
			todos: {
				deep: true,
				handler(){
					Store.save(this.todos);
					this.$dispatch('totalTodos',this.todos);
				}
			}
		},
		events: {
			newtodoForchild(txt){
				this.todos.push({
					todoText: txt,
					completed: false
				});
				this.$dispatch('totalTodos',this.todos);
			},
			todosObjForchild(todos){
				this.todos = todos;
			},
			visibilityChange(visibility){
				this.visibility = visibility;
			}
		},
		methods: {
			removeTodo(todo){
				this.todos.$remove(todo);
				this.$dispatch('totalTodos',this.todos);
			},
			editTodo(todo){
				this.beforeEditCache = todo.todoText;
				this.editedTodo = todo;
			},
			doneEdit(todo){
				if(!this.editedTodo){
					return;
				}
				this.editedTodo = null;
				todo.todoText = todo.todoText.trim();
				if(!todo.todoText){
					this.removeTodo(todo);
				}
			},
			cancelTodo(todo){
				if(!this.editedTodo){
					return;
				}
				this.editedTodo = null;
				todo.todoText = this.beforeEditCache;
			}
		},
		computed: {
			filteredTodos(){
				return Filter[this.visibility](this.todos);
			},
			remaining(){
				if(this.todos.length){
					var remain = Filter.active(this.todos).length;
					this.$dispatch('remaining',remain);
					return remain;
				}
			},
			allDone: {
				get(){
					return this.remaining === 0;
				},
				set(value){
					this.todos.forEach(item => {
						item.completed = value;
					});
				}
			}
		},
		directives: {
			todofocus(value){
				if(!value){
					return;
				}
				let el = this.el;
				el.focus();
			}
		}
	}
</script>

<style lang="scss">
@import '../modules/scss/variable';
@import '../modules/scss/list';
</style>