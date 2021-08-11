<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h2>reactive case :</h2>
    <p>{{msg}}</p>
    <input v-model="msg"/>
    <hr>
    <h2>none reactive case :</h2>
    <p>{{item.name}}</p>
    <div> name : <input v-model="work_item.name" /> </div>
    <div> number : <input v-model="work_item.number" /> </div>

    <button @click="commitItem" >ok</button>
    

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import {cloneDeep} from 'lodash' //딥카피 라이브러리 

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  computed : {
    msg : {
      get() {
        return this.$store.state.msg

      },
      set(_msg) {
        this.$store.commit({
          type: "updateMsg",
          msg: _msg,
        });

      }
    },
    item() {
      return this.$store.state.item
    } 
  },
  data() {
    return {
      work_item : cloneDeep(this.$store.state.item) // https://lodash.com/docs/ lodash를 사용한 딥카피 
    }
  },
  // created() {

  //   // https://lodash.com/docs/ lodash를 사용한 딥카피 
  //   this.work_item = cloneDeep(this.$store.state.item)
  //   //JSON.parse(JSON.stringify(this.$store.state.item) )

  // },
  methods : {
    commitItem() {
      console.log(this.work_item)
      this.$store.commit({
          type: "updateItem",
          item: this.work_item,
        });
    }
  }
}
</script>
