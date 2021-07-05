<template>

  <h1>{{ msg1 }}</h1>
  <input type="text" v-model="msg1">
  <hr>

  <button @click="testClick" > test </button> <!-- () 가 생략되면 test($event) 와 같다. -->
  <button @click="testClick()" > test call () </button>
  <button @click="test2Click('hello')"> test2 </button>

  <hr>
  <p>{{ count }}</p>
  <button @click="incCount(1,$event)">count 1</button>
  <button @click="incCount(-1,$event)">count -1</button>

  <hr>
  <HomeComponent/>
  <StatusComponent :param1="msg1"/>
  <StatusComponent /> 
  
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HomeComponent from './Home' 
import StatusComponent from './Status'

export default {
  name: "App",
  components : {
    HomeComponent,
    StatusComponent
  },
  data() {
    return {
      count : 0,
      msg1: "Hello World",
    };
  }
  ,methods : {
    testClick(evt) {
      //인자가 없으면 기본적으로 첫번째 인자에 DOM이밴트 오브잭트가 전달된다.
      console.log(evt)
      console.log('click')
    },
    test2Click(msg) {
      console.log(msg)
    },
    incCount(val,evt) {
      //전달하는 측에서 $event로 DOM 이밴트객체를 보내줄수있다.
      console.log(evt)
      this.count += val
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
