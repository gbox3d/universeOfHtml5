<template>
  <Header/>
  <router-view />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
// import Vuex from 'vuex'

// const store = new Vuex.Store({
//     state: {
//       count: 0
//     },
//     mutations: {
//       increment (state) {
//         state.count++
//       }
//     }
//   })


export default {
  name: 'App',
  components: {
    Header,
    // HelloWorld
  },
  // store : store,
  mounted() {
    console.log('mounted app.vue')
  }
}
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
.red {
  background-color : red
}
</style>
