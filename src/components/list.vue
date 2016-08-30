<template>
	<section class="main">
		<input type="checkbox" class="toggle-all" v-show="todos.length" v-model="allDone" />
		<ul class="todo-list">
			<li class="todo" :class="{completed: todo.completed,editing: todo == editedTodo}" v-for="todo in filteredTodos">
				<div class="view">
					<input type="checkbox" class="toggle" v-model="todo.completed" @change="setCompleted($index,todo)">
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
	import {getters} from '../vuex/getters';
	import {actions} from '../vuex/actions';

	export default {
		data(){
			return {
				visibility: 'all',
				editedTodo: null
			}
		},
		vuex: {
			getters: {
				todos: getters.getTodos,
				remain: getters.getRemain
			},
			actions: {
				updateTodos: actions.updateTodos,
				removeTodo: actions.removeTodo,
				setRemain: actions.setRemain,
				todoCompleted: actions.setCompleted
			}
		},
		events: {
			visibilityChange(visibility){
				this.visibility = visibility;
			}
		},
		methods: {
			setCompleted(index,todo){
				this.todoCompleted(index,todo);
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
				this.updateTodos(this.todos);
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
					this.setRemain(remain);
					return remain;
				}
			},
			allDone: {
				get(){
					return this.remaining === 0;
				},
				set(val){
					this.todos.forEach(item => {
						item.completed = val;
					});
					this.updateTodos(this.todos);
				}
			}
		},
		directives: {
			todofocus(value){
				if(!value){
					return;
				}
				this.vm.$nextTick(() => {
					let el = this.el;
					el.focus();
				});
			}
		}
	}
</script>

<style lang="scss">
	@import '../modules/scss/variable';
	@import '../modules/scss/list';
</style>