<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

  <h1>{{memotext}}</h1>
  <h1 class="red-text" >{{memotext2}}</h1>

  <hr>

  <editorComp id=1 @memo="onMemoSubmit" ref="editor_inst_1" paramMsg="ready ok" /><hr>
  <editorComp :id="second_id" @memo="onMemoSubmit"/><hr>
  
  <button @click="test" >test</button>
  <hr>
  <TextBox ref="textboxInst" :propTextContent="textBox" />

</template>

<script>
import editorComp from './components/editor.vue'
import TextBox from './components/TextBox.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    editorComp,
    TextBox
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
    },
    test() {
      //인스턴스 통해 메써드 직접호출하기 
      this.$refs.editor_inst_1.clear()
      this.$refs.textboxInst.setText('------------')
      
    }
  },
  data() {
    return {
      second_id : "2",
      memotext : "",
      memotext2 : 'the red',
      textBox : "text hello"
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
