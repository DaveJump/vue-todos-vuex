<template>
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="todo" @keyup.enter="addtodo">
  </header>
</template>

<script>
  export default {
    data(){
      return {
        todo: ''
      }
    },
    methods: {
      addtodo(){
        this.$dispatch('newtodo',this.todo);
        this.todo = '';
      }
    }
  }
</script>

<style lang="scss">
@import '../modules/scss/variable';
@import '../modules/scss/header';
</style>