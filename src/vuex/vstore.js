import Vue from 'vue';
import Vuex from 'vuex';
import Store from '../modules/store';

Vue.use(Vuex);

const state = {
	todo: '',
	todos: Store.fetch(),
	remain: 0
}

const mutations = {
	BINDINGNEWTODO(state,todo){
		state.todo = todo;
	},
	ADDTODO(state,txt){
		if(txt.trim()){
			state.todos.push({
				todoText: txt,
				completed: false
			});
			state.todo = '';
			Store.save(state.todos);
		}
	},
	UPDATETODOS(state,todos){
		state.todos = todos;
		Store.save(state.todos);
	},
	REMOVETODO(state,todo){
		state.todos.$remove(todo);
		Store.save(state.todos);
	},
	SETREMAIN(state,remain){
		state.remain = remain;
	},
	SETCOMPLETED(state,index,todo){
		state.todos[index].completed = todo.completed;
		Store.save(state.todos);
	},
	CLEARTODOS(state,todos){
		state.todos = todos;
		Store.save(state.todos);
	}
}

export const VStore = new Vuex.Store({state,mutations});