<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

  <h1>{{memotext}}</h1>
  <h1 class="red-text" >{{memotext2}}</h1>

  <hr>

  <editorComp id=1 @memo="onMemoSubmit"/><hr>
  <editorComp id=2 @memo="onMemoSubmit"/><hr>

  <!-- <loginDlgComp /><hr> -->

</template>

<script>
import editorComp from './components/editor.vue'
// import loginDlgComp from './components/loginDlg.vue'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  
  components: {
    // HelloWorld
    editorComp,
    // loginDlgComp
  },
  methods: {
    onMemoSubmit(data,id) {
      console.log(data,id)
      console.log('memo submit')
      if(id == 1)
        this.memotext = data
      else if(id == 2) {
        this.memotext2 = data

      }
    }
  },
  data() {
    return {
      memotext : "",
      memotext2 : 'the red'
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
.red-text {
  color:red
}
</style>
