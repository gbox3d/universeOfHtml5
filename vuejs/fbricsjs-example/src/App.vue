<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <canvas ref="mainCanvas" class="border-1" width="512" height="512"> </canvas>
  <hr />
  <button @click="addRect">add rect</button>
</template>

<script>
import { fabric } from "fabric";
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  components: {
    // HelloWorld
  },
  mounted() {
    const ref = this.$refs.mainCanvas;
    const canvas = new fabric.Canvas(ref);
    const rect = new fabric.Rect({
      fill: "red",
      width: 64,
      height: 64,
    });
    canvas.add(rect);

    //클릭하면 마우스 포인터위치에 클로닝해서 추가하기 
    canvas.on('mouse:down',(options)=> {
      console.log(options.e)
      console.log(this)
      var object = fabric.util.object.clone(rect); //클로닝 
      object.set({left:options.e.offsetX-32, top: options.e.offsetY-32}) //위치지정
      this.canvas.add(object) //추가 
    })

    
    this.canvas = canvas;
    this.protoRect = rect
  },
  methods: {
    addRect() {
      var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "#ff0000",
        width: 64,
        height: 64,
      });
      
      this.canvas.add(rect);
    },
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
  margin-top: 10px;
}

.border-1 {
  border: 1px solid;
}
</style>
