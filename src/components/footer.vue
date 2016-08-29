<template>
	<footer class="footer" v-show="todos.length">
		<span class="todo-count">
			<strong v-text="remaincount"></strong> {{remaincount | pluralize 'item'}} left
		</span>
		<ul class="filters">
			<li><a href="#/all" :class="{selected: visibility == 'all'}">All</a></li>
			<li><a href="#/active" :class="{selected: visibility == 'active'}">Active</a></li>
			<li><a href="#/completed" :class="{selected: visibility == 'completed'}">Completed</a></li>
		</ul>
		<button class="clear-completed" @click="removeCompleted()" v-show="todos.length > remaincount">Clear completed</button>
	</footer>
</template>

<script>
	import Filter from '../modules/filter';
	import Store from '../modules/store';

	export default {
		data(){
			return {
				todos: Store.fetch(),
				visibility: 'all'
			}
		},
		props: ['remaincount'],
		events: {
			todosObjForchild(todos){
				this.todos = todos;
			},
			visibilityChange(visibility){
				this.visibility = visibility;
			}
		},
		methods: {
			removeCompleted(){
				this.todos = Filter.active(this.todos);
				this.$dispatch('totalTodos',this.todos);
			}
		}
	}
</script>

<style lang="scss">
@import '../modules/scss/variable';
@import '../modules/scss/footer';
</style>