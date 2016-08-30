<template>
  <section class="todoapp" v-cloak>
    <Todoheader></Todoheader>
    <Todolist></Todolist>
    <Todofooter></Todofooter>
  </section>
</template>

<script>
import Todoheader from './components/header';
import Todolist from './components/list';
import Todofooter from './components/footer';
import {VStore} from './vuex/vstore';

export default {
  data(){
    return {
      visibility: 'all'
    }
  },
  watch: {
    visibility: {
      deep: true,
      handler(){
        this.$broadcast('visibilityChange',this.visibility);
      }
    }
  },
  components: {Todoheader,Todolist,Todofooter},
  store: VStore
}
</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
  }

  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }

  body {
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #f5f5f5;
    color: #5d5d5d;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
    font-weight: 300;
  }

  button,
  input[type="checkbox"] {
    outline: none;
  }

  .hidden {
    display: none;
  }

  [v-cloak]{
    display: none;
  }
</style>
