import Vue from 'vue';
import Vuex from 'vuex';
import Store from '../modules/store';

Vue.use(Vuex);

const state = {
	todo: '',
	todos: Store.fetch()
}

const mutations = {
	ADDTODO(state,txt){
			console.log(txt)
		if(txt.trim()){
			state.todos.push({
				todoText: txt,
				completed: false
			});
			state.todo = '';
		}
	},
	UPDATETODOS(state){

	}
}

export const VStore = new Vuex.Store({state,mutations});