<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

  <div>
    title : <input type="text" v-model="editTitle"><br>
    text : <input type="text" v-model="editText"><br>
    <button>add</button>
    <button>update</button>
  </div>

  <hr>
  <div v-for="(item,index) in todoList" :key="index" @click="itemClick(item)">
    <div class="title" >{{item.title}}</div>
    <div>{{item.text}}</div>
    <button>del</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data() {
    return {
      editTitle : "",
      editText : "",
      todoList : [
        {
          title: 'zooom...',
          text : '설겆이 점심준비'
        },
        {
          title : '민아 응원글',
          text : '인스타 들려서 글남기기 '
        }
      ]
    }
  },
  methods : {
    itemClick(item) {
      console.log(item)
      this.editTitle = item.title
      this.editText = item.text
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
  margin-top: 10px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  color: green;
}
</style>
