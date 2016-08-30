<template>
	<footer class="footer" v-show="todos.length">
		<span class="todo-count">
			<strong v-text="remain"></strong> {{remain | pluralize 'item'}} left
		</span>
		<ul class="filters">
			<li><a href="#/all" :class="{selected: visibility == 'all'}">All</a></li>
			<li><a href="#/active" :class="{selected: visibility == 'active'}">Active</a></li>
			<li><a href="#/completed" :class="{selected: visibility == 'completed'}">Completed</a></li>
		</ul>
		<button class="clear-completed" @click="removeCompleted" v-show="todos.length > remain">Clear completed</button>
	</footer>
</template>

<script>
	import Filter from '../modules/filter';
	import Store from '../modules/store';
	import {getters} from '../vuex/getters';
	import {actions} from '../vuex/actions';

	export default {
		data(){
			return {
				visibility: 'all'
			}
		},
		vuex: {
			getters: {
				todos: getters.getTodos,
				remain: getters.getRemain
			},
			actions: {
				clearTodos: actions.clearTodos
			}
		},
		events: {
			visibilityChange(visibility){
				this.visibility = visibility;
			}
		},
		methods: {
			removeCompleted(){
				let todos = Filter.active(this.todos);
				this.clearTodos(todos);
			}
		}
	}
</script>

<style lang="scss">
	@import '../modules/scss/variable';
	@import '../modules/scss/footer';
</style>