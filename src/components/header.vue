<template>
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo(todo)">
  </header>
</template>

<script>
  import {getters} from '../vuex/getters';
  import {actions} from '../vuex/actions';

  export default {
    vuex: {
      getters: {
        todo: getters.getTodo
      },
      actions: {
        bindingNewTodo: actions.bindingNewTodo,
        addTodo: actions.addTodo
      }
    },
    computed: {
      newTodo: {
        get(){
          return this.todo;
        },
        set(val){
          this.bindingNewTodo(val);
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../modules/scss/variable';
  @import '../modules/scss/header';
</style>