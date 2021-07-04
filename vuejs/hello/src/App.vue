<template>
  <h1>{{ msg1 }}</h1>
  <input type="text" v-model="msg1">
  <button @click="testClick" > test </button>
  
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  data() {
    return {
      msg1: "Hello World",
    };
  },
  method : {
    testClick() {
      console.log('click')
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
