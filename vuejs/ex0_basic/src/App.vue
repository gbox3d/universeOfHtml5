<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <h2>hello {{animal}}</h2>
  <h2 :class="animal" >hello {{animal}}</h2>
  <input type="text" v-model="animal" />
  <div v-html="alertMsg" ></div>
  <img  v-bind:src="placeimg"/>

  <hr>

  <h2 :class="{red : age > 30, green : age < 30, blue : age==30 }" >ur age : {{age}} </h2>
  <input v-model="age" /> <br>
  <p v-if="age>20 && age < 30" >young</p>
  <p v-else-if="age<20" >too young</p>
  <p v-else > old </p>

  <hr>
  <button @click="toggleHide" > toggle </button><br>
  <h2 v-if="display" > v-if Look ! </h2>
  <h2 v-show="display" > v-show Look ! </h2>

  <hr>
  <p>{{count}}</p>
  <p>{{mouseInfo}}</p>
  <div class='box' @mousemove="onMouseMove($event,1)" ></div>
  <div class='blue-box' @mousemove="onMouseMove($event,-1)" ></div>
  

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
      animal : 'monkey',
      alertMsg : '<h2 class="red-font"> render html sample </h2>',
      placeimg : 'https://placeimg.com/100/100/tech',
      age : 20,
      display : true,
      count : 0,
      mouseInfo : "0,0"
    }
  },
  methods : {
    toggleHide() {
      this.display = !this.display
    },
    onMouseMove(evt,inc) {
      this.mouseInfo = `${evt.pageX} , ${evt.pageY}`
      this.count += inc
      
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
.box {
  width: 300px;
  height : 300px;
  background-color: orange;
}
.blue-box {
  width: 300px;
  height : 300px;
  background-color: blue;
}
.cat {
  color: red;
}

.lion {
  color:yellow
}

.red {
  color : red
}
.green {

  color : green
}
.blue {
  color : blue
}

</style>
