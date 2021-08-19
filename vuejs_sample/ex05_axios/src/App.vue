<template>
  <button @click="test" >test</button>
  <button @click="test2" >test 2</button>
  
</template>

<script>
// import func from 'vue-editor-bridge'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  methods : {
    test() {
      (async ()=> {
        let {status,data} = await this.axios.get('https://randomuser.me/api?results=5');
        console.log(status)
        console.log(data)
      })();
    },
    async test2() {
      let {status,data} = await this.axios.get('http://localhost:8080/api/v1/memo/find/skip/2/limit/5');
      console.log(status)
      console.log(data)
    }
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
</style>
