<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

  <div id="navbar" >
    <router-link to="/chapter_1">chapter 1 (v-model) </router-link>
    <router-link to="/chapter_2">chapter 2</router-link>
    <router-link to="/chapter_3">chapter 3 </router-link>
    <router-link to="/chapter_4">chapter 4 (v-if) </router-link>
    <router-link to="/chapter_5">chapter 5 ( method )</router-link>
  </div>

  <router-view></router-view>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  components: {
    // HelloWorld
  },
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
#navbar {
  background-color: gainsboro;
}
.box {
  width: 300px;
  height: 300px;
  background-color: orange;
}
.router-link-active {
  font-size: 20px;
  margin-right: 10px;

}

.blue-box {
  width: 300px;
  height: 300px;
  background-color: blue;
}
.cat {
  color: red;
}

.lion {
  color: yellow;
}

</style>
